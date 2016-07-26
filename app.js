const app  = require('express')();
const cors = require('cors');
const fs   = require('fs');
const birl = require('./code_exec.js');

// Permitindo CORS
app.use(cors());

app.get ('/', function (req, res) {
  console.log ('GET AT \'/\'');
  res.send ('HELLO');
});

app.post('/compile', cors (), function (req, res) {
  console.log ('POST AT \'/compile\'');

  // Lendo o JSON
  var body = '';
  req.on('data', function (data) {
    body += data;
  });

  // Enviando o código e o stdin para a execução do código
  req.on('end', function () {
    var json = JSON.parse(body);
    birl(json.code, json.stdin, res);
  });
});

app.options('/compile', cors());

var port = process.env.PORT || 3000;
app.listen (port);
console.log ('Listening at http://localhost:' + port);