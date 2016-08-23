var express = require('express');

var routes = function (bookModel) {
    var bookRouter = express.Router();
    var Book = bookModel;
    var bookController = require('../controllers/bookControllers')(Book);

    bookRouter.route('/')
     .post(bookController.post)
     .get(bookController.get)

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else if (book) {
                req.book = book;
                next();
            } else {

                res.status(404).send('no book found')
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function (req, res) {
            var book_as_json = req.book.toJSON();
            book_as_json.links = {};
            book_as_json.links.filtredByThisGenre = 'http://' + req.headers.host + '/api/books?genre=' + book_as_json.genre;

            res.json(book_as_json);

        })
        .put(function (req, res) {
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read || false;
                req.book.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(req.book);
                    }
                });

            })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(req.book);
                    res.json(req.book);
                }
            }, function (){ 
                    console.log(req.book);
                    console.log("i am the next function");
            });
        })
        .delete(function (req, res){
           req.book.remove(function (err){
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).json("Removed");
            }
           }); 
        })

    return bookRouter;

};

module.exports =  routes;