const db = require('./db')
const {Books, Book_Authors} = require('./models')

exports.getAllBooks = function(callback) {
  Books.findAll()
  .then(function(books) {
    callback([], books)
  }).catch(function(errors) {
    console.log(errors)
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
  }).catch(function(errors) {
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
    }).then(function(books) {
        callback(books, pages)
    }).catch(function(errors) {
      console.log(errors)
      callback(['databaseerror'])
    })
  })
}

exports.createBook = function(book, callback) {
  Books.create({
    ISBN: book.ISBN,
    Title: book.Title,
    SignId: book.SignId,
    PublicationYear: book.PublicationYear,
    PublicationInfo: book.PublicationInfo,
    Pages: book.Pages,
  }).then(function(createdBook) {
    createdBook.addAuthors(book.authors)
    callback([], createdBook)
  })
  .catch(function(errors) {
    console.log("error: " + errors)
    callback(['databaseerror'])
  })
}

exports.editBook = function(book, callback) {
  Books.update({
    ISBN: book.ISBN,
    Title: book.Title,
    SignId: book.SignId,
    PublicationYear: book.PublicationYear,
    PublicationInfo: book.PublicationInfo,
    Pages: book.Pages 
  }, {
    where: {ISBN: book.ISBN}
  }).then(function(updatedBook) {
    callback([], updatedBook)
  }).catch(function(errors) {
    console.log(errors)
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
    
  }).then(function(book) {
    callback([], book[0])
  }).catch(function(errors) {
    console.log(errors)
    callback(['databaseerror'])
  })
}

exports.getBooksBySearch = function(searchTerm, paginationOptions, callback) {
  Books.findAndCountAll({
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
  })
  .then(function(books) {
    console.log("COUNT: " + books.count)
    let pages
    if(books.count > 10) {
      pages = Math.ceil(books.count / paginationOptions.limit)
      paginationOptions.offset = paginationOptions.limit * (paginationOptions.page -1)
    }
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
      },
      limit: paginationOptions.limit,
      offset: paginationOptions.offset
    }).then(function(books) {
      callback([], books, pages)
    }).catch(function(errors) {
      console.log(errors)
      callback(['databaseerror'])
    })
  })
}