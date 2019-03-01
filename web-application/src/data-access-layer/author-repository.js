const db = require('./db')
const {Authors} = require('./models')

exports.getAllAuthors = function(options, callback) {
  
  console.log("options: " + options.default)
  if(options.default) {
    Authors.findAll()
    .then(function(authors) {
      callback(authors)
    }).catch(function(error) {
      console.log(error)
      callback(['databaseerror'])
    })
  } else {
    Authors.findAndCountAll()
    .then(function(authors) {
      let pages = Math.ceil(authors.count / options.limit)
      options.offset = options.limit * (options.page - 1)
  
      Authors.findAll({
        limit: options.limit,
        offset: options.offset
      }).then(function(authors){
        callback(authors, pages)
      }).catch(function(error) {
        console.log(error)
        callback(['databaseerror'])
      })
    })
  }


}

exports.createAuthor = function(author, callback) {
  console.log("author: " + JSON.stringify(author, null, 2))
  Authors.create({
    FirstName: author.firstName,
    LastName: author.lastName,
    BirthYear: author.birthYear
  }).then(function(createdAuthor){
    callback([], createdAuthor)
  })
  .catch(function(error){
    callback(['databaseerror'])
  })
}

exports.editAuthor = function(author, callback) {
  Authors.update({
    FirstName: author.firstName,
    LastName: author.lastName,
    BirthYear: author.birthYear
  }, {
    where: {Id: author.id}
  }).then(function(updatedAuthor){
    console.log("repository: " + updatedAuthor)
    callback([], updatedAuthor)
  }).catch(function(error) {
    console.log(error)
    callback(['databaseerror'])
  })
}

exports.getAuthorById = function(authorId, callback) {
  Authors.findAll({
    where: {
      Id: authorId
    }
  }).then(function(author){
      callback([], author[0])
  }).catch(function(error) {
    console.log(error)
    callback(['databaseerror'])
  })
}

exports.getAuthorsBySearch = function(searchTerm, callback) {
  Authors.findAll({
    where: {
      [db.Sequelize.Op.or]: [{FirstName: searchTerm}, {LastName: searchTerm}]
    }
  }).then(function(author, error){
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(author)
    }
  })
}