const http = require('http');
const xml2js = require('xml2js');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const parser = new xml2js.Parser();
      parser.parseString(data, (err, result) => {
        if (err) {
          console.error(err);
          res.end(`<h1>Error parsing XML data</h1><p>${err.message}</p>`);
        } else {
          console.log(result);
          const responseHtml = `
            <h1>Request Received</h1>
            <p>Request body:</p>
            <pre>${data}</pre>
            <p>Parsed XML:</p>
            <pre>${JSON.stringify(result, null, 2)}</pre>
          `;
          res.end(responseHtml);
        }
      });
    });
  } else {
    res.end('<h1>This server only accepts POST requests</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});