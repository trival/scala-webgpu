import { serve } from "bun";
import { readdirSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT) || 3001;
const rootDir = import.meta.dir;
const draftsDir = join(rootDir, "drafts");
const outDir = join(draftsDir, "out");
const encoder = new TextEncoder();

const draftRoutes = new Set([
	"blur",
	"buffer_triangle",
	"painter_dsl",
	"painter_triangle",
	"painter_typed_bindings",
	"panel_layer",
	"panel_tex",
	"panel_triangle",
	"simple_triangle",
]);

const noStoreHeaders = {
	"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

const liveReloadSnippet = `
<script>
  const source = new EventSource("/__reload");
  source.onmessage = () => location.reload();
  addEventListener("beforeunload", () => source.close(), { once: true });
</script>`;

const reloadClients = new Set<ReadableStreamDefaultController<Uint8Array>>();
let reloadTimer: ReturnType<typeof setTimeout> | undefined;
let lastOutMtime = 0;

const safeJoin = (baseDir: string, relativePath: string): string | null => {
	const resolved = normalize(join(baseDir, relativePath));
	if (resolved === baseDir || resolved.startsWith(`${baseDir}/`)) {
		return resolved;
	}
	return null;
};

const newestOutMtime = (): number => {
	try {
		let newest = 0;
		for (const entry of readdirSync(outDir)) {
			if (!entry.endsWith(".js")) continue;
			const mtime = statSync(join(outDir, entry)).mtimeMs;
			if (mtime > newest) newest = mtime;
		}
		return newest;
	} catch {
		return 0;
	}
};

const contentTypeFor = (pathname: string): string => {
	switch (extname(pathname)) {
		case ".html":
			return "text/html; charset=utf-8";
		case ".js":
			return "text/javascript; charset=utf-8";
		case ".css":
			return "text/css; charset=utf-8";
		default:
			return "application/octet-stream";
	}
};

const htmlResponse = async (filePath: string): Promise<Response> => {
	const html = await Bun.file(filePath).text();
	const body = html.includes("</body>")
		? html.replace("</body>", `${liveReloadSnippet}\n</body>`)
		: `${html}\n${liveReloadSnippet}`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			...noStoreHeaders,
		},
	});
};

const fileResponse = (filePath: string): Response => {
	const file = Bun.file(filePath);
	return new Response(file, {
		headers: {
			"Content-Type": contentTypeFor(filePath),
			...noStoreHeaders,
		},
	});
};

const broadcastReload = (): void => {
	const payload = encoder.encode(`data: ${Date.now()}\n\n`);
	for (const client of reloadClients) {
		client.enqueue(payload);
	}
};

lastOutMtime = newestOutMtime();

setInterval(() => {
	const currentMtime = newestOutMtime();
	if (currentMtime <= lastOutMtime) return;

	lastOutMtime = currentMtime;
	clearTimeout(reloadTimer);
	reloadTimer = setTimeout(() => {
		broadcastReload();
	}, 180);
}, 150);

const server = serve({
	port,

	async fetch(req) {
		const url = new URL(req.url);
		const pathname = url.pathname;
		const trimmed = pathname.replace(/^\/+|\/+$/g, "");

		if (pathname === "/__reload") {
			let client: ReadableStreamDefaultController<Uint8Array> | undefined;
			return new Response(
				new ReadableStream({
					start(controller) {
						client = controller;
						reloadClients.add(controller);
						controller.enqueue(encoder.encode(": connected\n\n"));
					},
					cancel() {
						if (client) reloadClients.delete(client);
					},
				}),
				{
					headers: {
						"Content-Type": "text/event-stream",
						"Connection": "keep-alive",
						...noStoreHeaders,
					},
				},
			);
		}

		if (pathname === "/") {
			return htmlResponse(join(draftsDir, "index.html"));
		}

		if (pathname.endsWith("/") && draftRoutes.has(trimmed)) {
			return htmlResponse(join(draftsDir, trimmed, "index.html"));
		}

		if (trimmed.startsWith("out/")) {
			const filePath = safeJoin(outDir, trimmed.slice("out/".length));
			if (filePath) return fileResponse(filePath);
		}

		if (draftRoutes.has(trimmed)) {
			return Response.redirect(`${pathname}/`, 302);
		}

		const segments = trimmed.split("/");
		if (segments.length === 2) {
			const [draft, fileName] = segments;
			if (draftRoutes.has(draft) && fileName === "main.js") {
				return fileResponse(join(draftsDir, draft, "main.js"));
			}
		}

		return new Response("Not found", { status: 404 });
	},
});

console.log(`Custom dev server running at http://localhost:${server.port}`);
