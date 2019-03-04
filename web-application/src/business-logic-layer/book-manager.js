const bookRepository = require('../data-access-layer/book-repository')
const authorRepository = require('../data-access-layer/author-repository')
const bookValidator = require('./book-validator')

exports.getAllBooks = function(options, callback) {
  bookRepository.getAllBooks(options, function(errors, books) {
    callback(errors, books)
  })
}

exports.createBook = function(book, callback) {
  const errors = bookValidator.validateNewBook(book.isbn)

  console.log("errors: " +  errors)

  if(0 < errors.length) {
    callback(errors, [])
    return
  }

  bookRepository.createBook(book, function(errors, bookret){
    callback(errors, bookret)
  })
}

exports.getBookByISBN = function(isbn, callback) {
  bookRepository.getBookByISBN(isbn, function(errors, book) {
    callback(errors, book)
  })
}

exports.editBook = function(book, callback) {
  bookRepository.editBook(book, function(error, book) {
    callback(error, book)
  })
}