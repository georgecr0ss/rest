var bookRoute = function (app, bookModel) {
    var express = require('express');
    var bookRouter = express.Router();

    var Book = bookModel;

    bookRouter.route('/books')
     .get(function (req, res) {

        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre
        }
        console.log(query);
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else {
                console.log('pulled data form books collection db');
                res.json(books)
            }
        });

    });

    bookRouter.route('/books/:bookId')
    	.get(function (req, res) {  
        Book.findById(req.params.bookId, function (err, books) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else {
                console.log('pulled single book form books collection db');
                res.json(books)
            }
        });

    });

    return bookRouter;

};

module.exports =  bookRoute;