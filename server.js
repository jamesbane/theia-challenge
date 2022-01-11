const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(favicon(path.join(__dirname, 'build/favicon/favicon.ico')));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  // eslint-disable-next-line handle-callback-err
  fs.readFile(path.join(__dirname, 'build', 'index.html'), 'utf8', (err, text) => {
    res.send(text);
  });
});
app.listen(port);

