const bookRepository = require('../data-access-layer/book-repository')
const bookValidator = require('./book-validator')

exports.createBook = function(book, callback) {
  const errors = bookValidator.validateNewBook(book.ISBN)

  if(0 < errors.length) {
    callback([], errors)
    return
  }

  bookRepository.createBook(book, function(bookret, errors){
    callback(book, errors)
    console.log("In manager: " + bookret + errors)
  })
}