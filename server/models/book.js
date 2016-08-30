//**Book model for mongoose

//Get dependencies

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment').schema; //little s means we are using the schema NOT the model

//Step 1 Create Schema
var bookSchema=new Schema({
	title: {type: String, required: true},
	author: String,
	publishDate: Date,
	publishedBy: String,
	comment: [Comment]
});

//Step 2 Create the model we will use this model to make queries
var Book = mongoose.model('Book', bookSchema);

//Step 3 Export model so we can use it in other parts of our app
module.exports=Book;
