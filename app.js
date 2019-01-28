const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const books = [{
    title: "Book about A",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1234567890"
  }, {
    title: "Book about B",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1234567890"
  }, {
    title: "Book about C",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1234567890"
  }, {
    title: "Book about D",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1234567890"
  } , {
  title: "Book about E",
    author: "Anders Andersson",
    abstract: "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.",
    isbn: "1234567890"
}]

const authors = [{
  surname: "Anders",
  lastname: "Andersson",
  birthdate: "1962-11-24",
  birthplace: "London",
  publisher: "Bonniers"
}, {
  surname: "Anders",
  lastname: "Svensson",
  birthdate: "1963-11-24",
  birthplace: "London",
  publisher: "Publishers CO"
}, {
  surname: "Anders",
  lastname: "Gregersson",
  birthdate: "1964-11-24",
  birthplace: "London",
  publisher: "ABC Bokförlag ÖB"
}, {
  surname: "Anders",
  lastname: "Björnsson",
  birthdate: "1965-11-24",
  birthplace: "London",
  publisher: "Svenssons"
}, {
  surname: "Anders",
  lastname: "Goggenheim",
  birthdate: "1966-11-24",
  birthplace: "Deutchland",
  publisher: "Bonniers"
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
  response.render("page-books.hbs")
 })

 app.get('/authors', function(request, response){
  response.render("page-authors.hbs")
 })

 app.get('/admins', function(request, response){
  response.render("page-administrators.hbs")
 })

 app.get('/login', function(request, response){
  response.render("page-login.hbs")
 })
 
app.listen(8080)