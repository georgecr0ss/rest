var bookController = function (Book) {
    var post = function (req, res) {
        var book = new Book(req.body);
        // console.log(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    var get = function (req, res) {
        var query = {};
        console.log(req.query);
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
                var returned_books = [];
                books.forEach(function (elem, index, array) {
                    var book_as_json = elem.toJSON();
                    book_as_json.links = {};
                    book_as_json.links.self = 'http://' + req.headers.host + '/api/books/' + book_as_json._id;
                    returned_books.push(book_as_json);
                    // console.log(book_as_json);
                    // console.log(elem);
                    // console.log(args);
                    // elem.links
                });
                res.json(returned_books)
            }
        });

    };

    return {
        post: post,
        get: get
    };
};

module.exports = bookController;