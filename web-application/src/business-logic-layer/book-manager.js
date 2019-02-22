const bookRepository = require('../data-access-layer/book-repository')
const bookValidator = require('./book-validator')

exports.getAllBooks = function(callback) {
  bookRepository.getAllBooks(function(books, errors) {
    callback(books, errors)
  })
}

exports.createBook = function(book, callback) {
  const errors = bookValidator.validateNewBook(book.isbn)

  if(0 < errors.length) {
    callback([], errors)
    return
  }

  bookRepository.createBook(book, function(bookret, errors){
    callback(bookret, errors)
    console.log("In manager: " + JSON.stringify(bookret, null, 2) + errors)
  })
}

exports.getBookByISBN = function(isbn, callback) {
  bookRepository.getBookByISBN(isbn, function(book, errors) {
    callback(book, errors)
  })
}

exports.editBook = function(book, callback) {
  bookRepository.editBook(book, function(book, error) {
    callback(book, error)
  })
}