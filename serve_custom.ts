import { serve } from "bun"
import { readdirSync, statSync } from "node:fs"
import { extname, join, normalize } from "node:path"

const port = Number(process.env.PORT) || 3001
const rootDir = import.meta.dir
const sketchesDir = join(rootDir, "sketches")
const encoder = new TextEncoder()

const noStoreHeaders = {
	"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
}

const liveReloadSnippet = `
<script>
  const source = new EventSource("/__reload");
  source.onmessage = () => location.reload();
  addEventListener("beforeunload", () => source.close(), { once: true });
</script>`

const reloadClients = new Set<ReadableStreamDefaultController<Uint8Array>>()
let reloadTimer: ReturnType<typeof setTimeout> | undefined
let lastBundleMtime = 0

const discoverSketches = (): Set<string> => {
	const sketches = new Set<string>()
	try {
		for (const entry of readdirSync(sketchesDir)) {
			const dir = join(sketchesDir, entry)
			if (!statSync(dir).isDirectory()) continue
			try {
				statSync(join(dir, "index.html"))
				sketches.add(entry)
			} catch {}
		}
	} catch {}
	return sketches
}

const safeJoin = (baseDir: string, relativePath: string): string | null => {
	const resolved = normalize(join(baseDir, relativePath))
	if (resolved === baseDir || resolved.startsWith(`${baseDir}/`)) {
		return resolved
	}
	return null
}

const newestBundleMtime = (): number => {
	let newest = 0
	for (const sketch of discoverSketches()) {
		const outDir = join(sketchesDir, sketch, "out")
		try {
			for (const entry of readdirSync(outDir)) {
				if (!entry.endsWith(".js")) continue
				const mtime = statSync(join(outDir, entry)).mtimeMs
				if (mtime > newest) newest = mtime
			}
		} catch {}
	}
	return newest
}

const contentTypeFor = (pathname: string): string => {
	switch (extname(pathname)) {
		case ".html":
			return "text/html; charset=utf-8"
		case ".js":
			return "text/javascript; charset=utf-8"
		case ".css":
			return "text/css; charset=utf-8"
		default:
			return "application/octet-stream"
	}
}

const htmlResponse = async (filePath: string): Promise<Response> => {
	const html = await Bun.file(filePath).text()
	const body = html.includes("</body>")
		? html.replace("</body>", `${liveReloadSnippet}\n</body>`)
		: `${html}\n${liveReloadSnippet}`

	return new Response(body, {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			...noStoreHeaders,
		},
	})
}

const fileResponse = (filePath: string): Response => {
	const file = Bun.file(filePath)
	return new Response(file, {
		headers: {
			"Content-Type": contentTypeFor(filePath),
			...noStoreHeaders,
		},
	})
}

const broadcastReload = (): void => {
	const payload = encoder.encode(`data: ${Date.now()}\n\n`)
	for (const client of reloadClients) {
		client.enqueue(payload)
	}
}

lastBundleMtime = newestBundleMtime()

setInterval(() => {
	const currentMtime = newestBundleMtime()
	if (currentMtime <= lastBundleMtime) return

	lastBundleMtime = currentMtime
	clearTimeout(reloadTimer)
	reloadTimer = setTimeout(() => {
		broadcastReload()
	}, 180)
}, 150)

const server = serve({
	port,

	async fetch(req) {
		const url = new URL(req.url)
		const pathname = url.pathname
		const trimmed = pathname.replace(/^\/+|\/+$/g, "")

		if (pathname === "/__reload") {
			let client: ReadableStreamDefaultController<Uint8Array> | undefined
			return new Response(
				new ReadableStream({
					start(controller) {
						client = controller
						reloadClients.add(controller)
						controller.enqueue(encoder.encode(": connected\n\n"))
					},
					cancel() {
						if (client) reloadClients.delete(client)
					},
				}),
				{
					headers: {
						"Content-Type": "text/event-stream",
						Connection: "keep-alive",
						...noStoreHeaders,
					},
				},
			)
		}

		const sketches = discoverSketches()

		if (pathname === "/") {
			return htmlResponse(join(sketchesDir, "index.html"))
		}

		const hadTrailingSlash = pathname.endsWith("/")
		const segments = trimmed.split("/")
		const sketch = segments[0]

		if (!sketches.has(sketch)) {
			return new Response("not found", { status: 404 })
		}

		if (segments.length === 1) {
			if (!hadTrailingSlash) return Response.redirect(`/${sketch}/`, 302)
			return htmlResponse(join(sketchesDir, sketch, "index.html"))
		}

		const sketchDir = join(sketchesDir, sketch)
		const rest = segments.slice(1).join("/")

		if (rest === "index.html") {
			return htmlResponse(join(sketchDir, "index.html"))
		}

		const filePath = safeJoin(sketchDir, rest)
		if (!filePath) return new Response("forbidden", { status: 403 })

		try {
			statSync(filePath)
			return fileResponse(filePath)
		} catch {
			return new Response("not found", { status: 404 })
		}
	},
})

console.log(`Custom dev server running at http://localhost:${server.port}`)
