#!/usr/bin/env bun
// Build a single sketch with isolated inputs.
// Usage: bun scripts/sketch.ts <relative/path/from/sketches> [--watch|-w]

import { existsSync } from "node:fs"
import { join, normalize } from "node:path"

const argv = process.argv.slice(2)
const watch = argv.includes("--watch") || argv.includes("-w")
const rawName = argv.find(a => !a.startsWith("-"))
if (!rawName) {
	console.error(
		"usage: bun scripts/sketch.ts <sketches/path | path/from/sketches> [--watch|-w]",
	)
	process.exit(1)
}

// Accept both forms so bash path completion works from the project root:
//   bun run sketch sketches/geometry/voronoi  (tab-completed)
//   bun run sketch geometry/voronoi           (typed directly)
// Strip an optional leading "sketches/" and any trailing slash from tab completion.
const name = normalize(rawName).replace(/^sketches[\/\\]/, "").replace(/[\/\\]$/, "")

const sketchDir = join("sketches", name)
if (!existsSync(sketchDir)) {
	console.error(`sketch not found: ${sketchDir}`)
	process.exit(1)
}
const outFile = join(sketchDir, "main.js")

const args = [
	"--power", "package",
	sketchDir,
	"trivalibs/src",
	"project.scala",
	"--js",
	"-o", outFile,
	"-f",
	...(watch ? ["-w"] : []),
]

const proc = Bun.spawn(["scala-cli", ...args], {
	stdout: "pipe",
	stderr: "pipe",
	stdin: "inherit",
})

const ansi = /\x1b\[[0-9;]*m/g
const formatMs = (ms: number) =>
	ms < 1000 ? `${ms.toFixed(0)}ms` : `${(ms / 1000).toFixed(2)}s`

// Initial fallback: covers the cached one-off case where scala-cli
// skips the "Compiling project" line and jumps straight to "Wrote …".
// Watch-mode rebuilds always print "Compiling project", which resets the
// clock to the real start of work, so the idle wait between rebuilds is
// not counted.
let startTime: number | undefined = performance.now()

const annotate = (line: string): string => {
	const plain = line.replace(ansi, "")
	if (plain.startsWith("Compiling project")) {
		startTime = performance.now()
		return line
	}
	if (plain.startsWith("Wrote ") && startTime !== undefined) {
		const ms = performance.now() - startTime
		startTime = undefined
		return `${line} [${formatMs(ms)}]`
	}
	if (
		(plain.startsWith("Error compiling") ||
			plain.startsWith("Compilation failed")) &&
		startTime !== undefined
	) {
		const ms = performance.now() - startTime
		startTime = undefined
		return `${line} [failed after ${formatMs(ms)}]`
	}
	return line
}

const pipe = async (
	stream: ReadableStream<Uint8Array>,
	out: NodeJS.WriteStream,
) => {
	const reader = stream.getReader()
	const decoder = new TextDecoder()
	let buffer = ""
	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		buffer += decoder.decode(value, { stream: true })
		let idx: number
		while ((idx = buffer.indexOf("\n")) !== -1) {
			const line = buffer.slice(0, idx)
			buffer = buffer.slice(idx + 1)
			out.write(annotate(line) + "\n")
		}
	}
	if (buffer.length > 0) out.write(annotate(buffer))
}

await Promise.all([
	pipe(proc.stdout, process.stdout),
	pipe(proc.stderr, process.stderr),
])
process.exit(await proc.exited)
