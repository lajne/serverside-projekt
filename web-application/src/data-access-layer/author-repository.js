const db = require('./db')
const {Authors, Author_Books} = require('./models')

exports.getAllAuthors = function(callback) {
  Authors.findAll()
  .then(function(authors) {
    callback([], authors)
  }).catch(function(errors) {
    console.log(errors)
    callback(['databaseerror'])
  })
}
// Koppla ihop med övrigt
exports.getAuthorsById = function(selectedAuthors, callback) {
  Authors.findAll({
    where: {
      Id: selectedAuthors
    }
  }).then(function(authors) {
    callback([], authors)
  }).catch(function(errors) {
    callback(['databaseerror'])
  })
}

exports.getAllAuthorsWithPagination = function(paginationOptions, callback) {
  Authors.findAndCountAll()
  .then(function(authors) {
    let pages = Math.ceil(authors.count / paginationOptions.limit)
    paginationOptions.offset = paginationOptions.limit * (paginationOptions.page - 1)

    Authors.findAll({
      limit: paginationOptions.limit,
      offset: paginationOptions.offset
    }).then(function(authors) {
      callback(authors, pages)
    }).catch(function(errors) {
      console.log(errors)
      callback(['databaseerror'])
    })
  })
}

exports.createAuthor = function(author, callback) {
  Authors.create({
    FirstName: author.FirstName,
    LastName: author.LastName,
    BirthYear: author.BirthYear
  }).then(function(createdAuthor) {
    createdAuthor.addBooks(author.books)
    callback([], createdAuthor)
  })
  .catch(function(errors) {
    callback(['databaseerror'])
  })
}

exports.editAuthor = function(author, callback) {
  Authors.update({
    FirstName: author.FirstName,
    LastName: author.LastName,
    BirthYear: author.BirthYear
  }, {
    where: {Id: author.Id}
  }).then(function(updatedAuthor) {
    callback([], updatedAuthor)
  }).catch(function(errors) {
    console.log(errors)
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
  }).then(function(author) {
      callback([], author[0])
  }).catch(function(errors) {
    console.log(errors)
    callback(['databaseerror'])
  })
}

exports.getAuthorsBySearch = function(searchTerm, paginationOptions, callback) {
  Authors.findAndCountAll({
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
  })
  .then(function(authors) {
    let pages
    if(authors.count > 10) {
      pages = Math.ceil(authors.count / paginationOptions.limit)
      paginationOptions.offset = paginationOptions.limit * (paginationOptions.page - 1)
    } else {
      paginationOptions.offset = paginationOptions.limit * (paginationOptions.page - 1)
    }
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
      },
      limit: paginationOptions.limit,
      offset: paginationOptions.offset
    }).then(function(authors) {
      callback([], authors, pages)
    }).catch(function(errors) {
      console.log(errors)
      callback(['databaseerror'])
    })
  })
}