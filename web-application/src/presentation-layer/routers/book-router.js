const express = require('express')
const router = express.Router()

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
  const model = {
    books: books
  }

  response.render("page-books.hbs", model)
})

router.get("/create", function(request, response){
  response.render("page-createbook.hbs")
})

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm
  
  if(searchTerm == "") {
    const model = {
      books: books
    }
    response.render("page-books.hbs", model)
    return
  }
  
  let filteredBooksByTitle = []
  for(let book of books) {
    if(book.title.toLowerCase().match(searchTerm.toLowerCase())){
      filteredBooksByTitle.push(book)
    }
  }
  const model = {
    books: filteredBooksByTitle
  }
  response.render("page-books.hbs", model)
})

router.get('/search', function(request, response){
  const searchTerm = request.query.bookSearch

  response.redirect("/books/search/" + searchTerm)
})

router.get('/:id', function(request, response){
  const id = request.params.id
  const book = books.find(b => b.id == id)

  const model = {
    book: book
  }
  console.log("book by id" + JSON.stringify(model, null, 2))

  response.render("page-viewbooks.hbs", model)
})

router.get("/:id/edit", function(request, response){
  response.render("page-editbook.hbs")
})

module.exports = router