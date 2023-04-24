const http = require('http');

// create the XML data to send in the request
const xmlData = '<person><name>John Doe</name><age>30</age></person>';

// create the options object for the request
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/xml'
  }
};

// create the request object and send the request
const req = http.request(options, res => {
  console.log(`Response received: ${res.statusCode}`);
  res.on('data', chunk => {
    console.log(`Response body: ${chunk}`);
  });
});

// handle errors in the request
req.on('error', error => {
  console.error(error);
});

// write the XML data to the request body and end the request
req.write(xmlData);
req.end();
