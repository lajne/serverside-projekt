const express = require('express')
const router = express.Router()
const bookRepo = require('../../data-access-layer/book-repository')
const bookManager = require('../../business-logic-layer/book-manager')
const authorManager = require('../../business-logic-layer/author-manager')

router.get('/', function(request, response){
  response.redirect("/books/page/1")
})

router.get('/page/:pageIndex', function(request, response){
  const options = {
    default: false,
    page: request.params.pageIndex,
    limit: 10,
    offset: 0
  }

  bookManager.getAllBooks(options, function(books, pages) {
    let pageIndexes = []
    for(let index = 1; index < (pages + 1); index++) {
      pageIndexes.push( {index: index} )
    }
    let model = {
      books: books,
      pages: pageIndexes
    }
    response.render("page-books.hbs", model)
  })
})

router.get("/create", function(request, response){
  const options = {
    default: true
  }
  authorManager.getAllAuthors(options, function(errors, authors) {
    let model = {
      authors: authors
    }
    response.render("page-createbook.hbs", model)
  })
})

router.post("/create", function(request, response){
  const authorized = {
    session: request.session.admin
  }

  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signid,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages,
  }

  const options = {
    default: true,
    authors: request.body.selectedAuthors
  }

  authorManager.getAllAuthors(options, function(errors, authorsret) {
     if(0 < errors.length) {
      const model = {
        errors: errors
      }
      response.render("page-createbook.hbs", model)
     } else {
      book.authors = authorsret
      bookManager.createBook(authorized, book, function(errors, bookret){
        if(0 < errors.length) {
          const model = {
            errors: errors
          }
          response.render("page-createbook.hbs", model)
        } else {
          response.redirect("/books/")
        }
      })
    }
  })

})

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm
  bookRepo.getBooksBySearch(searchTerm, function(books){
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
  const authorized = {
    session: request.session.admin
  }

  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signId,
    publicationYear : request.body.publicationYear,
    publicationInfo : request.body.publicationInfo,
    pages : request.body.pages
  }

  bookManager.editBook(authorized, book, function(errors, bookret){
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