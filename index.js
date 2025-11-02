import { createServer } from "http";
import next from "next";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
      return;
    }
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server running on port ${port}`);
  });
});
