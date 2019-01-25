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
app.listen(8080)