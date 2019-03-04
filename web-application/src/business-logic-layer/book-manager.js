const bookRepository = require('../data-access-layer/book-repository')
const bookValidator = require('./book-validator')

exports.getAllBooks = function(options, callback) {
  bookRepository.getAllBooks(options, function(errors, books) {
    callback(errors, books)
  })
}

exports.createBook = function(authorized, book, callback) {
  if(authorized.session){
    const errors = bookValidator.validateNewBook(book.isbn) 
    if(0 < errors.length) {
      callback(errors, [])
      return
    }
  
    bookRepository.createBook(book, function(errors, bookret){
      callback(errors, bookret)
    })
  }else{
    callback(["you need to be an admin to do that."], [])
    return
  }
}

exports.getBookByISBN = function(isbn, callback) {
  bookRepository.getBookByISBN(isbn, function(errors, book) {
    callback(errors, book)
  })
}

exports.editBook = function(authorized, book, callback) {
  if(authorized.session){
    bookRepository.editBook(book, function(error, book) {
    callback(error, book)
   })
  }else{
    callback(["you need to be an admin to do that."], [])
    return
  }

}