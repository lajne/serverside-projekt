const db = require('./db')
const {Books, Book_Authors} = require('./models')

exports.getAllBooks = function(page, limit, offset, callback) {
  Books.findAndCountAll()
  .then(function(books) {
    let pages = Math.ceil(books.count / limit)
    offset = limit * (page - 1)
    
    Books.findAll({
      limit: limit,
      offset: offset
    })
    .then(function(books){
        callback(books, pages)
    }).catch(function(error) {
      console.log(error)
      callback(['databaseerror'])
    })
  })
  
}

exports.createBook = function(book, callback) {
  console.log("Repository: " + JSON.stringify(book, null, 2))
  Books.create({
    ISBN: book.isbn,
    Title: book.title,
    SignId: book.signId,
    PublicationYear: book.publicationYear,
    PublicationInfo: book.publicationInfo,
    Pages: book.pages,
    book_authors: book.authors
  }, {
    include: [{
      model: Book_Authors,
      association: 'book_authors',
      all: true
    }]
  }).then(function(createdBook){
    console.log("created book in repo: " + JSON.stringify(createdBook, null, 2))
    callback([], createdBook)
  })
  .catch(function(error){
    console.log("error: " + error)
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
    }
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