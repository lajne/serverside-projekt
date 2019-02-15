const db = require('./db')

const Authors = db.sequelize.define('Authors', {
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
  Authors.findAll({
    /* where: {
      Id: {
        [db.Sequelize.Op.gt]: 600
      }
    } */
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
  Authors.create({
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

exports.editAuthor = function(author, callback) {
  console.log("author: " + JSON.stringify(author, null, 2))
  Authors.update({
    FirstName: author.firstName,
    LastName: author.lastName,
    BirthYear: author.birthYear
  }, {
    where: {Id: author.authorId}
  }).then(function(updatedAuthor){
    callback(updatedAuthor)
  })
}

exports.getAuthorById = function(authorId, callback) {
  Authors.findAll({
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