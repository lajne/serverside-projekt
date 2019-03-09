const db = require('./db')
const {Authors, Author_Books} = require('./models')

exports.getAllAuthors = function(options, callback) {
  if(options.default) {
    if(options.authors) {
      Authors.findAll({
        where: {
          Id: options.authors
        }
      })
      .then(function(authors) {
        callback([], authors)
      })
      .catch(function(error) {
        console.log(error)
        callback(['databaseerror'])
      })
    } else {
      Authors.findAll()
      .then(function(authors) {
        callback([], authors)
      }).catch(function(error) {
        console.log(error)
        callback(['databaseerror'])
      })
    }
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
  Authors.create({
    FirstName: author.firstName,
    LastName: author.lastName,
    BirthYear: author.birthYear
  }).then(function(createdAuthor){
    createdAuthor.addBooks(author.books).then(function(createdAuthorWithBooks) {
      callback([], createdAuthorWithBooks)
    })
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
    },
    include: [{
      association: Author_Books
    }]
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
      [db.Sequelize.Op.or]: [
        {
          FirstName: {
            [db.Sequelize.Op.regexp]: searchTerm
          }
        }, {
          LastName: {
            [db.Sequelize.Op.regexp]: searchTerm
          }
        }
      ]
    }
  }).then(function(authors) {
      callback([], authors)
  }).catch(function(error) {
    console.log(error)
    callback(['databaseerror'])
  })
}