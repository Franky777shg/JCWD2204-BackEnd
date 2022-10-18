const http = require("http");
const PORT = 2000;

let database = [
  {
    name: "Budi",
    age: 12,
  },
  {
    name: "Anna",
    age: 14,
  },
];

const server = http.createServer(async (req, res) => {
  if (req.url === "/halo") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hi there!");
  } else if (req.url === "/home" && req.method === "POST") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Welcome to my API</h1>");
  } else if ((req.url = "/register" && req.method === "POST")) {
    let data;
    req
      .on("data", (chunk) => {
        console.log(chunk);
        data = chunk.toString();
      })
      .on("end", () => {
        console.log(data);
        // console.log("di luar req.on", data);
        database.push(JSON.parse(data));
        console.log(database);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(database));
      });
  } else {
    res.writeHead(400, { "content-type": "text/plain" });
    res.end("No endpoint match");
  }
});

server.listen(PORT, () =>
  console.log(`Server Success Running at PORT: ${PORT}`)
);
