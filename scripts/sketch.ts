#!/usr/bin/env bun
// Build a single sketch with isolated inputs.
// Usage: bun scripts/sketch.ts <sketch-name> [--watch|-w]

import { existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const argv = process.argv.slice(2)
const watch = argv.includes("--watch") || argv.includes("-w")
const name = argv.find(a => !a.startsWith("-"))
if (!name) {
	console.error("usage: bun scripts/sketch.ts <sketch-name> [--watch|-w]")
	process.exit(1)
}

const sketchDir = join("sketches", name)
if (!existsSync(sketchDir)) {
	console.error(`sketch not found: ${sketchDir}`)
	process.exit(1)
}
const outDir = join(sketchDir, "out")
mkdirSync(outDir, { recursive: true })
const outFile = join(outDir, "main.js")

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

let startTime = performance.now()

const annotate = (line: string): string => {
	const plain = line.replace(ansi, "")
	if (plain.startsWith("Wrote ")) {
		const ms = performance.now() - startTime
		startTime = performance.now()
		return `${line} [${formatMs(ms)}]`
	}
	if (
		plain.startsWith("Error compiling") ||
		plain.startsWith("Compilation failed")
	) {
		const ms = performance.now() - startTime
		startTime = performance.now()
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
