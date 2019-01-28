const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const books = [{
  id: 1,
    title: "Book about A",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1234567890"
  }, {
    id: 2,
    title: "Book about B",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1134567890"
  }, {
    id: 3,
    title: "Book about C",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1334567890"
  }, {
    id: 4,
    title: "Book about D",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1434567890"
  } , {
    id: 5,
    title: "Book about E",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
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

   console.log(book)

   const model = {
     book: book
   }

  response.render("page-editbooks.hbs", model)
 })

 app.get('/authors/edit/:id', function(request, response){
  const id = request.params.id
  const author = authors.find(b => b.id == id)

  const model = {
    author: author
  }

  response.render("page-editauthors.hbs", model)
 })

 app.get('/admins/edit/:id', function(request, response){
  const id = request.params.id
  const admin = admins.find(b => b.id == id)

  const model = {
    admin: admin
  }

  response.render("page-editadministrators.hbs", model)
 })

app.listen(8080)