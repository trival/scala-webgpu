import { serve } from "bun";
import bufferTriangle from "./drafts/buffer_triangle/index.html";
import index from "./drafts/index.html";
import painterTriangle from "./drafts/painter_triangle/index.html";
import simpleTriangle from "./drafts/simple_triangle/index.html";

const server = serve({
	port: Number(process.env.PORT) || 3000,

	routes: {
		"/": index,
		"/buffer_triangle": bufferTriangle,
		"/painter_triangle": painterTriangle,
		"/simple_triangle": simpleTriangle,
	},

	development: true,
});

console.log(`Dev server running at http://localhost:${server.port}`);
