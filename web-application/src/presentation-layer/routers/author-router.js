const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')

router.get('/', function(request, response){
  authorRepo.getAllAuthors(function(authors){
    const model = {
      authors: authors
    }
    response.render("page-authors.hbs", model)
  })
})

router.get("/create", function(request, response){
  response.render("page-createauthor.hbs")
})

router.post("/create", function(request, response){
  const author = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    birthYear: request.body.birthYear
  }
  authorRepo.createAuthor(author, function(msg){
    /* 
          Here we wan't to maybe tell and show the user that we successfully created
          an author. :ppPppP
    */
  })
})

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm

  authorRepo.getAuthorsBySearch(searchTerm, function(authors){
    const model = {
      authors: authors
    }
    response.render("page-authors.hbs", model)
    /*
    Om man söker flera gånger efter varandra så lägger den till 
    "/author/search/ + /author/search/ + osv.." 
    */
  })
})

router.get('/search', function(request, response){
  const searchTerm = request.query.authorSearch

  response.redirect("/authors/search/" + searchTerm)
})

router.get('/:id', function(request, response){
  const id = request.params.id

  authorRepo.getAuthorById(id, function(author){
    const model = {
      author: author
    }
    response.render("page-viewauthors.hbs", model)
  })
})

router.get("/:id/edit", function(request, response){
  const id = request.params.id
  
  authorRepo.getAuthorById(id, function(author) {
    const model = {
      author: author
    }
    response.render("page-editauthor.hbs", model)
  })
})

router.post("/:id/edit", function(request, response){
  const author = {
    id: request.params.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    birthYear: request.body.birthYear
  }

  authorRepo.editAuthor(author, function(msg){
    console.log("response: " + JSON.stringify(msg, null, 2))
    /* 
          Here we wan't to maybe tell and show the user that we successfully created
          an author. :ppPppP
    */
  })
})

module.exports = router