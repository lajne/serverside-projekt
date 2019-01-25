const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
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