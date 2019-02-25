const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

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

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "dsfsdfsdfsfdsfdsdfsdf"
}))

app.use(function(request, response, next){
	response.locals.admin = request.session.admin
	next()
})

// Parse bodies of requests written in
// x-www-form-urlencoded format.
app.use(bodyParser.urlencoded({
	extended: false
}))


app.use('/admins', adminRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.get('/', function(request, response){
 response.render("page-home.hbs")
})

app.listen(8080)