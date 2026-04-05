import { serve } from "bun";
import blur from "./drafts/blur/index.html";
import bufferTriangle from "./drafts/buffer_triangle/index.html";
import index from "./drafts/index.html";
import instances from "./drafts/instances/index.html";
import mipmaps from "./drafts/mipmaps/index.html";
import painterDsl from "./drafts/painter_dsl/index.html";
import painterTriangle from "./drafts/painter_triangle/index.html";
import painterTypedBindings from "./drafts/painter_typed_bindings/index.html";
import panelLayer from "./drafts/panel_layer/index.html";
import panelTex from "./drafts/panel_tex/index.html";
import panelTriangle from "./drafts/panel_triangle/index.html";
import deferred from "./drafts/deferred/index.html";
import simpleTriangle from "./drafts/simple_triangle/index.html";

const server = serve({
	port: Number(process.env.PORT) || 3000,

	routes: {
		"/": index,
		"/blur/": blur,
		"/buffer_triangle/": bufferTriangle,
		"/deferred/": deferred,
		"/instances/": instances,
		"/mipmaps/": mipmaps,
		"/panel_tex/": panelTex,
		"/painter_triangle/": painterTriangle,
		"/painter_dsl/": painterDsl,
		"/painter_typed_bindings/": painterTypedBindings,
		"/panel_layer/": panelLayer,
		"/panel_triangle/": panelTriangle,
		"/simple_triangle/": simpleTriangle,
	},

	// development: false,
	development: true,
});

console.log(`Dev server running at http://localhost:${server.port}`);
