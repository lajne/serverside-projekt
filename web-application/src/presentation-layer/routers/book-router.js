const express = require('express')
const router = express.Router()
const bookRepo = require('../../data-access-layer/book-repository')
const bookManager = require('../../business-logic-layer/book-manager')
const authorManager = require('../../business-logic-layer/author-manager')
const paginate = require('../pagination/paginate')

router.get('/', function(request, response){
  response.redirect("/books/page/1")
})

router.get('/page/:currentPage', function(request, response){
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

router.get("/create", function(request, response){
  authorManager.getAllAuthors(function(errors, authors) {
    let model = {
      authors: authors
    }
    response.render("page-createbook.hbs", model)
  })
})

router.post("/create", function(request, response){
  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signid,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages,
  }

  authorManager.getAuthorsById(request.body.selectedAuthors, function(errors, authorsret) {
     if(0 < errors.length) {
      const model = {
        book: book,
        errors: errors
      }
      response.render("page-createbook.hbs", model)
     } else {
      book.authors = authorsret
      bookManager.createBook(request.session.sessionAdmin, book, function(errors, bookret){
        if(0 < errors.length) {
          const options = {
            default: true
          }
          let model = {
            authors: "",
            book: book,
            errors: errors
          }
          authorManager.getAllAuthors(options, function(errors, authorsret) {
            model.authors = authorsret
            console.log(JSON.stringify(errors, null, 2))
            response.render("page-createbook.hbs", model)
          })
        } else {
          response.redirect("/books/")
        }
      })
    }
  })

})

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm
  bookManager.getBooksBySearch(searchTerm, function(error, books){
    const model = {
      books: books
    }
    response.render("page-books.hbs", model)
  })
})

router.get('/search', function(request, response){
  const searchTerm = request.query.bookSearch

  response.redirect("/books/search/" + searchTerm)
})

router.get('/:isbn', function(request, response){
  const isbn = request.params.isbn

  bookManager.getBookByISBN(isbn, function(errors, bookret){
    const model = {
      book: bookret
    }
    response.render("page-viewbooks.hbs", model)
  })
})

router.get("/:isbn/edit", function(request, response){
  const isbn = request.params.isbn

  bookManager.getBookByISBN(isbn, function(errors, bookret){
    const model = {
      book: bookret
    }
    response.render("page-editbook.hbs", model)
  })
})

router.post("/:isbn/edit", function(request, response){
  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signid,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages
  }

  bookManager.editBook(request.session.sessionAdmin, book, function(errors, bookret){
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