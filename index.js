const express = require("express");
const http = require('http');
const bodyParser = require("body-parser")

const routes = require('./routes');

const app = express();
const server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

server.listen(5000, () => {
    console.log('Firestore API is running on port 5000')
});
