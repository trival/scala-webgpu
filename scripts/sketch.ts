#!/usr/bin/env bun
// Build a single sketch with isolated inputs.
// Usage: bun scripts/sketch.ts <sketch-name> [--watch|-w]

import { existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const [, , name, ...rest] = process.argv
if (!name || name.startsWith("-")) {
	console.error("usage: bun scripts/sketch.ts <sketch-name> [--watch|-w]")
	process.exit(1)
}

const sketchDir = join("sketches", name)
if (!existsSync(sketchDir)) {
	console.error(`sketch not found: ${sketchDir}`)
	process.exit(1)
}

const watch = rest.includes("--watch") || rest.includes("-w")
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
	stdio: ["inherit", "inherit", "inherit"],
})
process.exit(await proc.exited)
