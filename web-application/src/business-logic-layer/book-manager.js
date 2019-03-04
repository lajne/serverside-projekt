const bookRepository = require('../data-access-layer/book-repository')
const bookValidator = require('./book-validator')

exports.getAllBooks = function(page, limit, offset, callback) {
  bookRepository.getAllBooks(page, limit, offset, function(books, errors) {
    callback(books, errors)
  })
}

exports.createBook = function(authorized, book, callback) {
  if(authorized.session){
    const errors = bookValidator.validateNewBook(book.isbn)
    if(0 < errors.length) {
      callback([], errors)
      return
    }
    bookRepository.createBook(book, function(bookret, errors){
      callback(bookret, errors)
      console.log("In manager: " + JSON.stringify(bookret, null, 2) + errors)
    })
  }else{
    callback([], ["you need to be an admin to do that."])
    return
  }
  
}

exports.getBookByISBN = function(isbn, callback) {
  bookRepository.getBookByISBN(isbn, function(book, errors) {
    callback(book, errors)
  })
}

exports.editBook = function(authorized, book, callback) {
  if(authorized.session){
    bookRepository.editBook(book, function(book, error) {
      callback(book, error)
    })
  }else{
    callback([], ["you need to be an admin to do that."])
    return
  }
}