import { serve } from "bun";
import homepage from "./index.html";

const server = serve({
	port: Number(process.env.PORT) || 3000,

	routes: {
		"/": homepage,
	},

	development: {
		hmr: true,
		console: true,
	},

	// Serve static files (Scala.js output, etc.)
	async fetch(req) {
		const url = new URL(req.url);
		const path = url.pathname;

		const file = Bun.file("." + path);
		if (await file.exists()) {
			return new Response(file);
		}

		return new Response("Not Found", { status: 404 });
	},
});

console.log(`Dev server running at http://localhost:${server.port}`);
