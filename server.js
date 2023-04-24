const http = require("http");
const xml2js = require("xml2js");

const parser = new xml2js.Parser({});
let data = "";
const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      parser.parseString(data, (err, parsedData) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Internal server error");
        } else {
          // process the parsedData as required
          console.log(parsedData);
          res.setHeader("Content-Type", "text/plain");
          res.statusCode = 200;
          res.end("Data received and processed successfully");
        }
      });
    });
  } else if (req.method === "GET") {
    // retrieve the data from the data store or database and convert it to XML
    const builder = new xml2js.Builder({
      headless: true
    });
    const xmlData = builder.buildObject(data);
    const responseHtml = `
    <h1>Request Received</h1>
    <p>Request body:</p>
    <pre>${xmlData}</pre>
   
  `;
    res.end(responseHtml);
    data = '';
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
