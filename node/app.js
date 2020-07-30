const express = require('express');
const bparser = require('body-parser');

const router = require('./routes/router');

const app = express();

app.use(bparser.json());

app.use(router);

app.listen(5000);

console.log("http-server");
