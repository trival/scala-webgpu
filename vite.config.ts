import { defineConfig } from "vite"
import { readdirSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"

const sketchesDir = resolve(__dirname, "sketches")

// Walks `sketches/` recursively. Every directory containing an `index.html`
// is treated as a sketch and added as a rollup input. The root nav page is
// included under the "index" key.
const sketchInputs = () => {
	const inputs: Record<string, string> = {}
	const walk = (dir: string) => {
		const html = join(dir, "index.html")
		try {
			if (statSync(html).isFile()) {
				const rel = relative(sketchesDir, dir)
				const key = rel === "" ? "index" : rel.replaceAll("/", "_")
				inputs[key] = html
			}
		} catch {}
		for (const entry of readdirSync(dir)) {
			if (entry.startsWith(".") || entry === "node_modules") continue
			const sub = join(dir, entry)
			if (statSync(sub).isDirectory()) walk(sub)
		}
	}
	walk(sketchesDir)
	return inputs
}

export default defineConfig({
	root: "sketches",
	server: {
		port: 3001,
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		rollupOptions: {
			input: sketchInputs(),
		},
	},
})
