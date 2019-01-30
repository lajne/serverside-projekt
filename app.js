const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

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

const authors = [{
  id: 1,
  surname: "Anders",
  lastname: "Andersson",
  birthdate: "1962-11-24",
  birthplace: "London",
  publisher: "Bonniers"
}, {
  id: 2,
  surname: "Anders",
  lastname: "Svensson",
  birthdate: "1963-11-24",
  birthplace: "London",
  publisher: "Publishers CO"
}, {
  id: 3,
  surname: "Anders",
  lastname: "Gregersson",
  birthdate: "1964-11-24",
  birthplace: "London",
  publisher: "ABC Bokförlag ÖB"
}, {
  id: 4,
  surname: "Anders",
  lastname: "Björnsson",
  birthdate: "1965-11-24",
  birthplace: "London",
  publisher: "Svenssons"
}, {
  id: 5,
  surname: "Anders",
  lastname: "Goggenheim",
  birthdate: "1966-11-24",
  birthplace: "Deutchland",
  publisher: "Bonniers"
}]

const admins = [{
  id: 1,
  username: "kalleadmin",
  password: "kalle123"
}, {
  id: 2,
  username: "janneadmin",
  password: "janne123"
}, {
  id: 3,
  username: "gurraadmin",
  password: "gurra123"
}]

app.engine('hbs', expressHandlebars({
 defaultLayout: 'main',
 extname: '.hbs'
}))

app.use(express.static("public"))

app.get('/', function(request, response){
 response.render("page-home.hbs")
})

app.get('/books', function(request, response){
  const model = {
    books: books
  }

  console.log("Not filtered: " + JSON.stringify(model, null, 2))
  response.render("page-books.hbs", model)
 })

 app.get('/authors', function(request, response){
   const model = {
     authors: authors
   }
  response.render("page-authors.hbs", model)
 })

 app.get('/admins', function(request, response){
   const model = {
     admins: admins
   }
  response.render("page-administrators.hbs", model)
 })

 app.get('/login', function(request, response){
  response.render("page-login.hbs")
 })

 app.get('/books/edit/:id', function(request, response){
   const id = request.params.id
   const book = books.find(b => b.id == id)

   const model = {
     book: book
   }

  response.render("page-viewbooks.hbs", model)
 })

 app.get("/page-editbooks", function(request, response){
   response.render("page-editbooks.hbs")
 })

 app.get('/authors/edit/:id', function(request, response){
  const id = request.params.id
  const author = authors.find(b => b.id == id)

  const model = {
    author: author
  }

  response.render("page-viewauthors.hbs", model)
 })

 app.get('/admins/edit/:id', function(request, response){
  const id = request.params.id
  const admin = admins.find(b => b.id == id)

  const model = {
    admin: admin
  }

  response.render("page-viewadministrators.hbs", model)
 })

 app.get('/books/search', function(request, response){
   const searchTerm = request.query.bookSearch

   response.redirect("/books/search/" + searchTerm)
 })

 app.get('/books/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm

  if(searchTerm == "") {
    const model = {
      books: books
    }
    response.render("page-books.hbs", model)  
  }

  let filteredBooksByTitle = []
  for(let book of books) {
    if(book.title.toLowerCase().match(searchTerm.toLowerCase())){
      filteredBooksByTitle.push(book)
    }
  }
  console.log("Filtered array: " + JSON.stringify(filteredBooksByTitle, null, 2))
  const model = {
    books: filteredBooksByTitle
  }
  console.log("Filtered object: " + JSON.stringify(model, null, 2))
  response.render("page-books.hbs", model)
 })
 
app.listen(8080)