//lets start this server

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const app = express();

//Middleware
app.use(morgan('combined')); //Logging framework, logs incoming requests
app.use(bodyParser.json({ type:'*/*' })); // Parse incoming requests into JSON

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on',port)
