var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/**
 * GET /books
 *
 * return all books from database
 */
router.get('/', function (req, res) {
   Book.find({}, function (err, books) {
     if (err){
       console.log('errror', err);
       res.sendStatus(500);
       return;
     }
     res.send(books);
   });
 });

/**
 * POST /books
 *
 * add a new books to the database
 */
router.post('/', function (req, res) {
  console.log('PODT', req.body);
  var book = Book(req.body);
  book.save(function (err){
    if (err){
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201); //CREATED
  });

});
/**
 * PUT /books/<id>
 *
 * update a book with the given id
 */
router.put('/:id', function (req, res) {
  console.log('error here');
  var book = req.body;
  var id = req.params.id;
  Book.findByIdAndUpdate(id, book, function(err, book){
    if (err){
      res.sendStatus(500);
      return;
    }
    res.status(204).send(book);
  });
});
/**
 * DELETE /book/<id>
 *
 * delete a book with the given id
 */
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  Book.findByIdAndRemove(id, function (err){
    if (err){
      res.sendStatus(500);
      return;
    }
    res.sendStatus(204);
  });
});

//COMMENTS Route
router.post('/:id/comments', function (req, res){
  var id = req.params.id;
  var comment = req.body;

  Book.findById(id, function (err, book){
    console.log(book);
    if (err){
      res.sendStatus(500);
      return;
    }
    book.comment.push(comment);
    book.save(function (err){
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
    });
  });
});

module.exports = router;
