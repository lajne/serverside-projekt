const authorRepository = require('../data-access-layer/author-repository')
const authorValidator = require('./author-validator')

exports.getAllAuthors = function(callback) {
  authorRepository.getAllAuthors(function(errors, authors) {
    callback(errors, authors)
  })
}

exports.getAuthorsById = function(selectedAuthors, callback) {
  authorRepository.getAuthorsById(selectedAuthors, function(errors, authors) {
    callback(errors, authors)
  })
}

exports.getAllAuthorsWithPagination = function(paginationOptions, callback) {
  authorRepository.getAllAuthorsWithPagination(paginationOptions, function(errors, authors) {
    callback(errors, authors)
  })
}

exports.createAuthor = function(sessionAdmin, author, callback) {
  if(sessionAdmin) {
    const errors = authorValidator.validateNewAuthor(author)

    if(0 < errors.length) {
      callback(errors, [])
      return
    }
  
    authorRepository.createAuthor(author, function(errors, authorret) {
      callback(errors, authorret)
    })
  }else{
    callback(["you need to be an admin to do that."], [])
    return
  }

}

exports.getAuthorById = function(id, callback) {
  authorRepository.getAuthorById(id, function(errors, author) {
    callback(errors, author)
  })
}

exports.getAuthorsBySearch = function(searchTerm, paginationOptions, callback) {
  authorRepository.getAuthorsBySearch(searchTerm, paginationOptions, function(error, authors, pages) {
    callback(error, authors, pages)
  })
}

exports.editAuthor = function(sessionAdmin, author, callback) {
  if(sessionAdmin) {
    const errors = authorValidator.validateNewAuthor(author)

    if(0 < errors.length) {
      callback(errors, [])
      return
    }

    authorRepository.editAuthor(author, function(errors, authorret) {
      callback(errors, authorret)
    })
  }else{
    callback(["you need to be an admin to do that."], [])
    return
  }

}