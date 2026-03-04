import { serve } from "bun";
import bufferTriangle from "./drafts/buffer_triangle/index.html";
import index from "./drafts/index.html";
import painterTriangle from "./drafts/painter_triangle/index.html";
import painterDsl from "./drafts/painter_dsl/index.html";
import painterTypedBindings from "./drafts/painter_typed_bindings/index.html";
import simpleTriangle from "./drafts/simple_triangle/index.html";

const server = serve({
	port: Number(process.env.PORT) || 3000,

	routes: {
		"/": index,
		"/buffer_triangle": bufferTriangle,
		"/painter_triangle": painterTriangle,
		"/painter_dsl": painterDsl,
		"/painter_typed_bindings": painterTypedBindings,
		"/simple_triangle": simpleTriangle,
	},

	// development: false,
	development: true,
});

console.log(`Dev server running at http://localhost:${server.port}`);
