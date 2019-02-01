const express = require('express')
const router = express.Router()

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

router.get('/', function(request, response){
  const model = {
    authors: authors
  }
response.render("page-authors.hbs", model)
})

router.get("/create", function(request, response){
  response.render("page-createauthor.hbs")
})

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm

  if(searchTerm == "") {
    const model = {
      authors: authors
    }
    response.render("page-authors.hbs", model)  
    return
  }

  let filteredAuthorsByName = []
  for(let author of authors) {
    if(author.surname.toLowerCase().match(searchTerm.toLowerCase()) || 
    author.lastname.toLowerCase().match(searchTerm.toLowerCase())){
        filteredAuthorsByName.push(author)
    }
  }
  console.log("Filtered author-array: " + JSON.stringify(filteredAuthorsByName, null, 2))
  const model = {
      authors: filteredAuthorsByName
    }
  console.log("Filtered author-object: " + JSON.stringify(model, null, 2))
  response.render("page-authors.hbs", model)
})

router.get('/search', function(request, response){
  const searchTerm = request.query.authorSearch

  response.redirect("/authors/search/" + searchTerm)
})

router.get('/:id', function(request, response){
  const id = request.params.id
  const author = authors.find(b => b.id == id)
  
  const model = {
    author: author
  }

  response.render("page-viewauthors.hbs", model)
})

router.get("/:id/edit", function(request, response){
  response.render("page-editauthor.hbs")
})

module.exports = router