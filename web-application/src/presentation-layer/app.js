const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const accountRouter = require('./routers/account-router')
const adminRouter = require('./routers/admin-router')
const authorRouter = require('./routers/author-router')
const bookRouter = require('./routers/book-router')

const app = express()

app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', expressHandlebars({
 defaultLayout: 'main',
 extname: '.hbs',
 layoutsDir: path.join(__dirname, 'layouts')
}))

app.use(express.static(path.join(__dirname, 'public')))

// Parse bodies of requests written in
// x-www-form-urlencoded format.
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use('/accounts', accountRouter)
app.use('/admins', adminRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.get('/', function(request, response){
 response.render("page-home.hbs")
})

app.listen(8080)

// --------------    //  BOOKs, AUTHORs‚ ADMINs‚ LOGIN  //    -------------- //

// app.get('/books', function(request, response){
//   const model = {
//     books: books
//   }


//   console.log("Not filtered: " + JSON.stringify(model, null, 2))
//   response.render("page-books.hbs", model)
// })

// app.get('/authors', function(request, response){
//   const model = {
//     authors: authors
//   }
// response.render("page-authors.hbs", model)
// })

// app.get('/admins', function(request, response){
//   const model = {
//     admins: admins
//   }
//   response.render("page-admins.hbs", model)
// })

// app.get('/login', function(request, response){
// response.render("page-login.hbs")
// })

// --------------    //  CREATE  //    -------------- //

// app.get("/books/create", function(request, response){
//   response.render("page-createbook.hbs")
// })

// app.get("/authors/create", function(request, response){
//   response.render("page-createauthor.hbs")
// })

// app.get("/admins/create", function(request, response){
//   response.render("page-createadmin.hbs")
// })

// --------------    //  SEARCHTERM  //    -------------- //

// app.get('/books/search/:searchTerm', function(request, response){
//   const searchTerm = request.params.searchTerm
  
//   if(searchTerm == "") {
//     const model = {
//       books: books
//     }
//     response.render("page-books.hbs", model)  
//   }
  
//   let filteredBooksByTitle = []
//   for(let book of books) {
//     if(book.title.toLowerCase().match(searchTerm.toLowerCase())){
//       filteredBooksByTitle.push(book)
//     }
//   }
//   console.log("Filtered book-array: " + JSON.stringify(filteredBooksByTitle, null, 2))
//   const model = {
//     books: filteredBooksByTitle
//   }
//   console.log("Filtered book-object: " + JSON.stringify(model, null, 2))
//   response.render("page-books.hbs", model)
// })

// app.get('/authors/search/:searchTerm', function(request, response){
//   const searchTerm = request.params.searchTerm

//   if(searchTerm == "") {
//   const model = {
//     authors: authors
//   }
//   response.render("page-authors.hbs", model)  
//   }

//   let filteredAuthorsByName = []
//   for(let author of authors) {
//   if(author.surname.toLowerCase().match(searchTerm.toLowerCase()) || 
//   author.lastname.toLowerCase().match(searchTerm.toLowerCase())){
//     filteredAuthorsByName.push(author)
//   }
//   }
//   console.log("Filtered author-array: " + JSON.stringify(filteredAuthorsByName, null, 2))
//   const model = {
//       authors: filteredAuthorsByName
//     }
//   console.log("Filtered author-object: " + JSON.stringify(model, null, 2))
//   response.render("page-authors.hbs", model)
// })

// --------------    //  SEARCH  //    -------------- //

// app.get('/books/search', function(request, response){
//   const searchTerm = request.query.bookSearch

//   response.redirect("/books/search/" + searchTerm)
// })
  
// app.get('/authors/search', function(request, response){
//   const searchTerm = request.query.authorSearch

//   response.redirect("/authors/search/" + searchTerm)
// })

// --------------    //  GET ID  //    -------------- //

// app.get('/books/:id', function(request, response){
//   const id = request.params.id
//   const book = books.find(b => b.id == id)

//   const model = {
//     book: book
//   }

//   response.render("page-viewbooks.hbs", model)
// })

 
// app.get('/authors/:id', function(request, response){
//   const id = request.params.id
//   const author = authors.find(b => b.id == id)
  
//   const model = {
//     author: author
//   }

//   response.render("page-viewauthors.hbs", model)
// })
  
// app.get('/admins/:id', function(request, response){
//   const id = request.params.id
//   const admin = admins.find(b => b.id == id)
  
//   const model = {
//     admin: admin
//   }

//   response.render("page-viewadmins.hbs", model)
// })
  
// --------------    //  EDIT  //    -------------- //

// app.get("/books/:id/edit", function(request, response){
//   response.render("page-editbook.hbs")
// })

// app.get("/authors/:id/edit", function(request, response){
//   response.render("page-editauthor.hbs")
// })

// app.get("/admins/:id/edit", function(request, response){
//   response.render("page-editadmin.hbs")
// })

 