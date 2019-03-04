const authorRepository = require('../data-access-layer/author-repository')
const authorValidator = require('./author-validator')

exports.getAllAuthors = function(page, limit, offset, callback) {
  authorRepository.getAllAuthors(page, limit, offset, function(authors, errors) {
    callback(authors, errors)
  })
}

exports.createAuthor = function(authorized, author, callback) {
  if(authorized.session){
    const errors = authorValidator.validateNewAuthor(author)

    if(0 < errors.length) {
      callback([], errors)
      return
    }
  
    authorRepository.createAuthor(author, function(authorret, errors) {
      callback(authorret, errors)
    })
  }else{
    callback([], ["you need to be an admin to do that."])
    return
  }
}

exports.getAuthorById = function(id, callback) {
  authorRepository.getAuthorById(id, function(author, errors) {
    callback(author, errors)
  })
}

exports.editAuthor = function(authorized, author, callback) {
  if(authorized.session){
    authorRepository.editAuthor(author, function(authorret, errors) {
      console.log("manager: " + authorret)
      callback(authorret, errors)
    })
  }else{
    callback([], ["you need to be an admin to do that."])
    return
  }
}