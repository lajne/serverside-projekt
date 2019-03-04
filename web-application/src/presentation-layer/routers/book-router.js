const express = require('express')
const router = express.Router()
const bookRepo = require('../../data-access-layer/book-repository')
const bookManager = require('../../business-logic-layer/book-manager')

router.get('/', function(request, response){
  response.redirect("/books/page/1")
})

router.get('/page/:pageIndex', function(request, response){
  let page = request.params.pageIndex
  let limit = 10
  let offset = 0

  bookManager.getAllBooks(page, limit, offset, function(books, pages) {
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
  response.render("page-createbook.hbs")
})

router.post("/create", function(request, response){

  const authorized = {
    session: request.session.admin
  }

  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signId,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages
  }

  bookManager.createBook(authorized, book, function(bookret, errors){
    console.log("In router: " + JSON.stringify(bookret, null, 2) + errors)
    if(0 < errors.length) {
      const model = {
        errors: errors
      }

      response.render("page-createbook.hbs", model)
    } else {
      response.redirect("/books/")
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

  bookManager.getBookByISBN(isbn, function(bookret, errors){
    const model = {
      book: bookret
    }
    response.render("page-viewbooks.hbs", model)
  })
})

router.get("/:isbn/edit", function(request, response){
  const isbn = request.params.isbn

  bookManager.getBookByISBN(isbn, function(bookret, errors){
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
  

  bookManager.editBook(authorized, book, function(bookret, errors){
    if(0 < errors.length) {
      
      console.log("errors: " + errors)
    } else {
      console.log("response: " + JSON.stringify(bookret, null, 2))
    }
    /* 
          Here we wan't to maybe tell and show the user that we successfully created
          an author. :ppPppP
    */
  })
})

module.exports = router