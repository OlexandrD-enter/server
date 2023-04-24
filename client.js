const xmlData = '<person><name>John Doe</name><age>30</age></person>';

var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://server-qq1q.onrender.com');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    console.log(xhr.response);
    /*const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = xhr.response;*/
  }
};

xhr.onload = function() {
  if (xhr.status === 302) {
    window.location.reload();
  }
};
xhr.send(JSON.stringify(data));