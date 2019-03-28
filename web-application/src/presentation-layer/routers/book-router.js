const express = require('express')
const router = express.Router()
const bookManager = require('../../business-logic-layer/book-manager')
const authorManager = require('../../business-logic-layer/author-manager')
const paginate = require('../pagination/paginate')

router.get('/', function(request, response) {
  response.redirect("/books/page/1")
})

router.get('/page/:currentPage', function(request, response) {
  const paginationOptions = {
    default: false,
    page: request.params.currentPage,
    limit: 10,
    offset: 0
  }

  bookManager.getAllBooksWithPagination(paginationOptions, function(books, pages) {
    let currentPage = Number(request.params.currentPage)
    const pageIndexes = paginate(currentPage, pages)
    
    let model = {
      books: books,
      pages: pageIndexes
    }
    response.render("page-books.hbs", model)
  })
})

router.get("/create", function(request, response) {
  if(request.session.sessionAdmin) {
    authorManager.getAllAuthors(function(errors, authors) {
      let model = {
        authors: authors
      }
      response.render("page-createbook.hbs", model)
    })
  } else {
    const model = {
      errors: ["You need to be an admin to do that."]
    }
    response.render("page-createauthor.hbs", model)
  }
})

router.post("/create", function(request, response) {
  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signid,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages,
  }

  authorManager.getAuthorsById(request.body.selectedAuthors, function(errors, authorsReturned) {
     if(0 < errors.length) {
      const model = {
        book: book,
        errors: errors
      }
      response.render("page-createbook.hbs", model)
     } else {
      book.authors = authorsReturned
      bookManager.createBook(request.session.sessionAdmin, book, function(errors, bookReturned) {
        if(0 < errors.length) {
          let model = {
            authors: "",
            book: book,
            errors: errors
          }
          authorManager.getAllAuthors(function(errors, authorsReturned) {
            model.authors = authorsReturned
            response.render("page-createbook.hbs", model)
          })
        } else {
          response.redirect("/books/")
        }
      })
    }
  })
})

router.get('/search/:searchTerm/page/:currentPage', function(request, response) {
  const searchTerm = request.params.searchTerm
  const paginationOptions = {
    page: request.params.currentPage,
    limit: 10,
    offset: 0
  }

  bookManager.getBooksBySearch(searchTerm, paginationOptions, function(errors, books, pages) {
    let currentPage = Number(request.params.currentPage)
    const urlAttributes = paginate(currentPage, pages, searchTerm)
    const model = {
      searchTerm: searchTerm,
      books: books,
      urlAttributes: urlAttributes,
      searchPagination: true
    }
    response.render("page-books.hbs", model)
  })
})

router.get('/search/:searchTerm', function(request, response) {
  const searchTerm = request.params.searchTerm
  response.redirect('/books/search/' + searchTerm + '/page/1')
})

router.get('/search', function(request, response) {
  const searchTerm = request.query.bookSearch

  response.redirect("/books/search/" + searchTerm)
})

router.get('/:isbn', function(request, response) {
  const isbn = request.params.isbn

  bookManager.getBookByISBN(isbn, function(errors, bookReturned) {
    const model = {
      book: bookReturned
    }
    response.render("page-viewbooks.hbs", model)
  })
})

router.get("/:isbn/edit", function(request, response) {
  if(request.session.sessionAdmin) {
    const isbn = request.params.isbn

    bookManager.getBookByISBN(isbn, function(errors, bookReturned) {
      const model = {
        book: bookReturned
      }
      response.render("page-editbook.hbs", model)
    })
  } else {
    const model = {
      errors: ["You need to be an admin to do that."]
    }
    response.render("page-editbook.hbs", model)
  }
})

router.post("/:isbn/edit", function(request, response) {
  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signid,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages
  }

  bookManager.editBook(request.session.sessionAdmin, book, function(errors, bookReturned) {
    if(0 < errors.length) {
      const model = {
        book: book,
        errors: errors
      }
      response.render("page-editbook.hbs", model)
    } else {
      response.redirect("/books/")
    }
  })
})

module.exports = router