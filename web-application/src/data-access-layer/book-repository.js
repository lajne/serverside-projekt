const db = require('./db')

// const Books = db.sequelize.define('Books', {
//   ISBN: {
//     type: db.Sequelize.TEXT,
//     allowNull: false,
//     primaryKey: true
//   },
//   Title: db.Sequelize.TEXT,
//   SignId: db.Sequelize.INTEGER,
//   PublicationYear: db.Sequelize.TEXT,
//   PublicationInfo: db.Sequelize.TEXT,
//   Pages: db.Sequelize.INTEGER
// }, {
//   createdAt: false,
//   updatedAt: false
// });

const {Books} = require('./models')

exports.getAllBooks = function(callback) {
  Books.findAll({
    /* where: {
      Id: {
        [db.Sequelize.Op.gt]: 600
      }
    } */
  }).then(function(books, error){
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(books)
    }
  })
}

exports.createBook = function(book, callback) {
  console.log("author: " + JSON.stringify(book, null, 2))
  Books.create({
    ISBN: book.isbn,
    Title: book.title,
    SignId: book.signId,
    PublicationYear: book.publicationYear,
    PublicationInfo: book.publicationInfo,
    Pages: book.pages
  }).then(function(createdBook){
    callback(createdBook, [])
  })
  .catch(function(error){
    callback(['databaseerror'])
  })
}

exports.editBook = function(book, callback) {
  console.log("book: " + JSON.stringify(book, null, 2))
  Books.update({
    ISBN: book.isbn,
    Title: book.title,
    SignId: book.signId,
    PublicationYear: book.publicationYear,
    PublicationInfo: book.publicationInfo,
    Pages: book.pages 
  }, {
    where: {ISBN: book.isbn}
  }).then(function(updatedBook){
    callback(updatedBook)
  })
}

exports.getBookByISBN = function(isbn, callback) {
  Books.findAll({
    where: {
      ISBN: isbn
    }
  }).then(function(book, error){
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(book[0])
    }
  })
}

exports.getBooksBySearch = function(searchTerm, callback) {
  Books.findAll({
    where: {
      [db.Sequelize.Op.or]: [{ISBN: searchTerm}, {Title: searchTerm}]
    }
  }).then(function(book, error){
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(book)
    }
  })
}