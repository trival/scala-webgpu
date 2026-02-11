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
});

console.log(`Dev server running at http://localhost:${server.port}`);
