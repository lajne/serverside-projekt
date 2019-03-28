const db = require('./db')
const {Authors, Author_Books} = require('./models')

exports.getAllAuthors = function(callback) {
  Authors.findAll()
  .then(function(authors) {
    console.log(JSON.stringify("authors i createn: " + authors, null, 2))
    callback([], authors)
  }).catch(function(error) {
    console.log(error)
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
  }).catch(function(error) {
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
    }).then(function(authors){
      callback(authors, pages)
    }).catch(function(error) {
      console.log(error)
      callback(['databaseerror'])
    })
  })
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
    console.log("COUNT: " + authors.count)
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
    }).catch(function(error) {
      console.log(error)
      callback(['databaseerror'])
    })
  })
  

  // Authors.findAll({
  //   where: {
  //     [db.Sequelize.Op.or]: [
  //       {
  //         FirstName: {
  //           [db.Sequelize.Op.regexp]: searchTerm
  //         }
  //       }, {
  //         LastName: {
  //           [db.Sequelize.Op.regexp]: searchTerm
  //         }
  //       }
  //     ]
  //   }
  // }).then(function(authors) {
  //     callback([], authors)
  // }).catch(function(error) {
  //   console.log(error)
  //   callback(['databaseerror'])
  // })
}