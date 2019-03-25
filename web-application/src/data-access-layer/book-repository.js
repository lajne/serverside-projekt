const db = require('./db')
const {Books, Book_Authors} = require('./models')

exports.getAllBooks = function(callback) {
  Books.findAll().then(function(books) {
    callback([], books)
  }).catch(function(error) {
    callback(['databaseerror'])
  })
}

exports.getBooksByISBN = function(selectedBooks, callback) {
  Books.findAll({
    where: {
      ISBN: selectedBooks
    }
  }).then(function(books) {
    callback([], books)
  }).catch(function(error) {
    callback(['databaseerror'])
  })
}

exports.getAllBooksWithPagination = function(paginationOptions, callback) {
  Books.findAndCountAll()
  .then(function(books) {
    let pages = Math.ceil(books.count / paginationOptions.limit)
    paginationOptions.offset = paginationOptions.limit * (paginationOptions.page - 1)
    
    Books.findAll({
      limit: paginationOptions.limit,
      offset: paginationOptions.offset
    }).then(function(books){
        callback(books, pages)
    }).catch(function(error) {
      console.log(error)
      callback(['databaseerror'])
    })
  })
}

exports.createBook = function(book, callback) {
  Books.create({
    ISBN: book.isbn,
    Title: book.title,
    SignId: book.signId,
    PublicationYear: book.publicationYear,
    PublicationInfo: book.publicationInfo,
    Pages: book.pages,
  }).then(function(createdBook){
    createdBook.addAuthors(book.authors).then(function(createdBookWithAuthors) {
      callback([], createdBookWithAuthors)
    })
  })
  .catch(function(error){
    console.log("error: " + error)
    callback(['databaseerror'])
  })
}

exports.editBook = function(book, callback) {
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
    callback([], updatedBook)
  }).catch(function(error) {
    console.log(error)
    callback(['databaseerror'])
  })
}

exports.getBookByISBN = function(isbn, callback) {
  Books.findAll({
    where: {
      ISBN: isbn
    },
    include: [{
      association: Book_Authors
    }]
    
  }).then(function(book){
    callback([], book[0])
  }).catch(function(error) {
    console.log(error)
    callback(['databaseerror'])
  })
}

exports.getBooksBySearch = function(searchTerm, callback) {
  Books.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          ISBN: {
            [db.Sequelize.Op.regexp]: searchTerm
          } 
        }, {
          Title: {
            [db.Sequelize.Op.regexp]: searchTerm
          }
        }
      ]
    }
  }).then(function(books) {
    callback([], books)
  }).catch(function(error) {
    console.log(error)
    callback(['databaseerror'])
  })
}