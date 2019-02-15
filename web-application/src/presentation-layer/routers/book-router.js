const express = require('express')
const router = express.Router()
const bookRepo = require('../../data-access-layer/book-repository')

const books = [{
  id: 1,
    title: "Book about A",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum ............",
    isbn: "1234567890"
  }, {
    id: 2,
    title: "Book about B",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum ............",
    isbn: "1134567890"
  }, {
    id: 3,
    title: "Book about C",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum ............",
    isbn: "1334567890"
  }, {
    id: 4,
    title: "Book about D",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum ............",
    isbn: "1434567890"
  } , {
    id: 5,
    title: "Book about E",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum ............",
    isbn: "1534567890"
}]

router.get('/', function(request, response){
  bookRepo.getAllBooks(function(books){
    const model = {
      books: books
    }
    response.render("page-books.hbs", model)
  })
})

router.get("/create", function(request, response){
  response.render("page-createbook.hbs")
})

router.post("/create", function(request, response){
  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signId,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages
  }

  bookRepo.createBook(book, function(msg){
    console.log("response: " + JSON.stringify(msg, null, 2))
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

  bookRepo.getBookByISBN(isbn, function(book){
    const model = {
      book: book
    }
    response.render("page-viewbooks.hbs", model)
  })
})

router.get("/:isbn/edit", function(request, response){
  const obj = {
    isbn: request.params.isbn
  }
  response.render("page-editbook.hbs", obj)
})

router.post("/:isbn/edit", function(request, response){
  const book = {
    isbn: request.body.isbn,
    title : request.body.title,
    signId : request.body.signId,
    publicationYear : request.body.publicationyear,
    publicationInfo : request.body.publicationinfo,
    pages : request.body.pages
  }

  bookRepo.editBook(book, function(msg){
    console.log("response: " + JSON.stringify(msg, null, 2))
    /* 
          Here we wan't to maybe tell and show the user that we successfully created
          an author. :ppPppP
    */
  })
})

module.exports = router