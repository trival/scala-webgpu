import { serve, file } from "bun";
import { join } from "path";

const publicDir = "./public";
const outDir = "./src/out";

const server = serve({
  port: Number(process.env.PORT) || 3000,

  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Serve compiled JS from /out/
    if (pathname.startsWith("/out/")) {
      const filePath = join(outDir, pathname.slice(5));
      const f = file(filePath);
      if (await f.exists()) {
        return new Response(f, {
          headers: { "Content-Type": "application/javascript" },
        });
      }
    }

    // Serve static files from public directory
    let filePath = join(publicDir, pathname);

    // If path ends with /, serve index.html
    if (pathname.endsWith("/")) {
      filePath = join(filePath, "index.html");
    }

    const f = file(filePath);
    if (await f.exists()) {
      return new Response(f);
    }

    // Try with .html extension
    const htmlFile = file(filePath + ".html");
    if (await htmlFile.exists()) {
      return new Response(htmlFile);
    }

    return new Response("Not Found", { status: 404 });
  },

  development: true,
});

console.log(`Dev server running at http://localhost:${server.port}`);
