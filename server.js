var express = require('express');
var app = express();

var path = require('path');

// body parser require and init
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//files serving
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile('C:/Users/Borys/Dropbox/ngTranslateApp/public/index.html');
    res.end();
});

app.listen(5000, function () {
    console.log('Serwer nasłuchuje na porcie: ', 5000)
});
