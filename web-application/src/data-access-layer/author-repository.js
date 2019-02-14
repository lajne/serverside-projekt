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
        [db.Sequelize.Op.gt]: 600
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

exports.createAuthor = function(author, callback) {
  console.log("author: " + JSON.stringify(author, null, 2))
  authors.create({
    FirstName: author.firstName,
    LastName: author.lastName,
    BirthYear: author.birthYear
  }).then(function(createdAuthor){
    callback(createdAuthor)
  })
  .catch(function(error){
    callback(['databaseerror'])
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

exports.getAuthorBySearch = function(searchTerm, callback) {
  authors.findAll({
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