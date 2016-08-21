var express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	mongoUrl =  'mongodb://gogo:66@ds029665.mlab.com:29665/libraryapp'

var port = process.env.PORT || 3000;
var bookRouter = express.Router();

app.use('/api', bookRouter);

mongoose.connect(mongoUrl, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/', function(req, res) {
    res.send('hello world');
});

var server = app.listen(port, function () {
    console.log('Gulp running on port %s', port);
});