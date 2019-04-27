var express = require('express');
var compression = require('compression');
var app = express();
var port = process.env.PORT || 3000;

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.send('Gabriel Mayta Assets');
});

app.listen(port, function() {
  console.log('App is running on port: ' + port);
});
