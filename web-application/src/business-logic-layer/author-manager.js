const authorRepository = require('../data-access-layer/author-repository')
const authorValidator = require('./author-validator')

exports.getAllAuthors = function(options, callback) {
  authorRepository.getAllAuthors(options, function(errors, authors) {
    callback(errors, authors)
  })
}

exports.createAuthor = function(authorized, author, callback) {
  if(authorized.session){
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

exports.editAuthor = function(authorized, author, callback) {
  if(authorized.session){
    authorRepository.editAuthor(author, function(errors, authorret) {
      console.log("manager: " + authorret)
      callback(errors, authorret)
    })
  }else{
    callback(["you need to be an admin to do that."], [])
    return
  }

}