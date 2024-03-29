const bookRepository = require('../data-access-layer/book-repository')
const bookValidator = require('./book-validator')

exports.getAllBooks = function(callback) {
  bookRepository.getAllBooks(function(errors, books) {
    callback(errors, books)
  })
}

exports.getBooksByISBN = function(selectedBooks, callback) {
  bookRepository.getBooksByISBN(selectedBooks, function(errors, books) {
    callback(errors, books)
  })
}

exports.getAllBooksWithPagination = function(paginationOptions, callback) {
  bookRepository.getAllBooksWithPagination(paginationOptions, function(errors, books) {
    callback(errors, books)
  })
}

exports.createBook = function(sessionAdmin, book, callback) {
  if(sessionAdmin) {
    const errors = bookValidator.validateNewBook(book) 
    if(0 < errors.length) {
      callback(errors, [])
      return
    }
  
    bookRepository.createBook(book, function(errors, bookret) {
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

exports.getBooksBySearch = function(searchTerm, paginationOptions, callback) {
  bookRepository.getBooksBySearch(searchTerm, paginationOptions, function(errors, books, pages) {
    callback(errors, books, pages)
  })
}

exports.editBook = function(sessionAdmin, book, callback) {
  if(sessionAdmin) {
    const errors = bookValidator.validateNewBook(book)

    if(0 < errors.length) {
      callback(errors, [])
      return
    }
    bookRepository.editBook(book, function(errors, book) {
    callback(errors, book)
   })
  }else{
    callback(["you need to be an admin to do that."], [])
    return
  }

}