'use strict';
// Import builtin NodeJS modules to instantiate the service
// https server
const https = require("https");
//file system to use local files
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

// Instantiate an Express application
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/welcome', (req,res)=>{
    res.send("Hello from express server.")
})

app.use(bodyParser.urlencoded({ extended: true }));

//Greetings
app.post('/greeting', (req,res) => {
var first_name = req.body.fname;
res.send('hello ' + first_name);
});

//Write to File
app.post('/save', (req,res) => {
var filename = req.body.filename;
var data = req.body.data;
fs.writeFile('pages/' + filename, data, { flag: 'a+' }, err => {
if (err) {
console.error(err)
return
}
res.send("ok");
});
});
app.use('/', express.static('pages'));

// Create a NodeJS HTTPS listener on port 8080 that points to the Express app
// Use a callback function to tell when the server is created.
https
  .createServer(
    { key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('public-cert.pem'),
},
    app)
  .listen(PORT, HOST);
  console.log(`Running on https://${HOST}:${PORT}`);

// Create an try point route for the Express app listening on port 8080.
// This code tells the service to listed to any request coming to the / route.
// Once the request is received, it will display a message on the browser.
