var express = require('express');
var application = express.createServer();

application.configure(function () {
    application.use(express.static(__dirname + '/.'));
});


application.listen(9999);