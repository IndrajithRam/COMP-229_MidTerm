// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {

      const sortedBookList = books.sort((a, b) => a.Title.localeCompare(b.Title))

      res.render('books', {
        title: 'Books',
        books: sortedBookList
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Add Book Details',
        books: book
      });
    }
  });


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let ebook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
  book.create(ebook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
  book.findById(id, (err, editbook) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('books/details', {
        title: 'Edit Book Details',
        books: editbook
      });
    }
  });

  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;
  let ubook = book({

    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.updateOne({ _id: id }, ubook, (err) => {
    if (err) {

      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });

  /*****************
   * ADD CODE HERE *
   *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/
});


module.exports = router;
