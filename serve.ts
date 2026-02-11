// Bun native dev server for WebGPU development
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Serve index.html for root
    if (path === "/") {
      path = "/index.html";
    }

    // Try to serve the file
    const file = Bun.file("." + path);
    if (await file.exists()) {
      // Set correct MIME types
      const ext = path.split(".").pop();
      const mimeTypes: Record<string, string> = {
        html: "text/html",
        js: "application/javascript",
        mjs: "application/javascript",
        css: "text/css",
        json: "application/json",
        png: "image/png",
        jpg: "image/jpeg",
        svg: "image/svg+xml",
        wasm: "application/wasm",
      };
      const contentType = mimeTypes[ext ?? ""] ?? "application/octet-stream";

      return new Response(file, {
        headers: { "Content-Type": contentType },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Dev server running at http://localhost:${server.port}`);
