var mongoose = require('mongoose'),
	Schema = mongoose.Schema();
var bookModel = new Schema({
    title: {
        type: string
    },
    author : {
        type: string
    },
    genre: {type: string},
    read: { type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookModel);