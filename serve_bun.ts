import { serve } from "bun";
import blur from "./examples/blur/index.html";
import bufferTriangle from "./examples/buffer_triangle/index.html";
import index from "./examples/index.html";
import instances from "./examples/instances/index.html";
import mipmaps from "./examples/mipmaps/index.html";
import painterDsl from "./examples/painter_dsl/index.html";
import painterTriangle from "./examples/painter_triangle/index.html";
import painterTypedBindings from "./examples/painter_typed_bindings/index.html";
import panelLayer from "./examples/panel_layer/index.html";
import panelTex from "./examples/panel_tex/index.html";
import panelTriangle from "./examples/panel_triangle/index.html";
import deferred from "./examples/deferred/index.html";
import geometry3dScene from "./examples/geometry3d_scene/index.html";
import simpleTriangle from "./examples/simple_triangle/index.html";

const server = serve({
	port: Number(process.env.PORT) || 3000,

	routes: {
		"/": index,
		"/blur/": blur,
		"/buffer_triangle/": bufferTriangle,
		"/deferred/": deferred,
		"/geometry3d_scene/": geometry3dScene,
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
