const http = require('http');
const xml2js = require('xml2js');

// create a server object
const server = http.createServer((req, res) => {
  // set the response header
  res.setHeader('Content-Type', 'text/plain');
  
  // handle only POST requests
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      // parse the XML data using xml2js
      const parser = new xml2js.Parser();
      parser.parseString(data, (err, result) => {
        if (err) {
          console.error(err);
          res.end('Error parsing XML data');
        } else {
          console.log(result);
          res.end('XML data received and parsed');
        }
      });
    });
  } else {
    res.end('This server only accepts POST requests');
  }
});

// listen on port 3000
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
