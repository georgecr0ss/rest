var express = require('express');
var	mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var	mongoUrl =  'mongodb://gogo:66@ds029665.mlab.com:29665/libraryapp';
var bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRouter')(Book);
app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);

app.get('/', function(req, res) {
    res.send('hello world');
});

var server = app.listen(port, function () {
    console.log('Server running on port %s', port);
});