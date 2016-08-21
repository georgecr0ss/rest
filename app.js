var express = require('express');
var	mongoose = require('mongoose');
var	mongoUrl =  'mongodb://gogo:66@ds029665.mlab.com:29665/libraryapp';

var	app = express();

var port = process.env.PORT || 3000;

var Book = require('./models/bookModel');
// var bookRouter = express.Router();

mongoose.connect(mongoUrl, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});
var bookModel = Book;
var bookRouter = require('./routes/bookRouter')(app, bookModel);
app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('hello world');
});

var server = app.listen(port, function () {
    console.log('Server running on port %s', port);
});