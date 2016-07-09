//Done
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MoviesSchema = new Schema({
    _id: Number,
    title: String,
    director: String,
    year: Number,
});

var Movie = mongoose.model('Movie', MoviesSchema);
module.exports = Movie;