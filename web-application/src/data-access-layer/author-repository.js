const db = require('./db')

const authors = db.sequelize.define('Authors', {
  Id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  FirstName: db.Sequelize.TEXT,
  LastName: db.Sequelize.TEXT,
  BirthYear: db.Sequelize.TEXT,
}, {
  createdAt: false,
  updatedAt: false
});

exports.getAllAuthors = function(callback) {
  authors.findAll({
    where: {
      Id: {
        [db.Sequelize.Op.between]: [498, 520]
      }
    }
  }).then(function(authors, error){
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(authors)
    }
  })
}

exports.getAuthorById = function(authorId, callback) {
  authors.findAll({
    where: {
      Id: authorId
    }
  }).then(function(author, error){
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(author[0])
    }
  })
}

//TESTA HÄR

// exports.getAuthorBySearch = function(searchTerm, callback) {
//   authors.findAll({
//     where: {
//       Id: searchTerm
//     }
//   }).then(function(author, error){
//     if(error) {
//       callback(['databaseerror'], null)
//     } else {
//       callback(author[0])
//     }
//   })
// }