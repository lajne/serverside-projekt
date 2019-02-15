const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')

//  DONE
router.get('/', function(request, response){
  authorRepo.getAllAuthors(function(authors){
    const model = {
      authors: authors
    }
    response.render("page-authors.hbs", model)
  })
})

//  DONE 
router.get("/create", function(request, response){
  response.render("page-createauthor.hbs")
})

// DONE
router.post("/create", function(request, response){
  const firstName = request.body.firstname
  const lastName = request.body.lastname
  const birthYear = request.body.birthyear

  console.log("Fname: " + firstName + " Lname: " + lastName + " year: " + birthYear)

  const author = {
    firstName: firstName,
    lastName: lastName,
    birthYear: birthYear
  }
  authorRepo.createAuthor(author, function(msg){
    console.log("response: " + JSON.stringify(msg, null, 2))
    /* 
          Here we wan't to maybe tell and show the user that we successfully created
          an author. :ppPppP
    */
  })
})

//  Done, almost
router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm

  authorRepo.getAuthorsBySearch(searchTerm, function(authors){
    const model = {
      authors: authors
    }
    console.log("URL: " + request.url)
    response.render("page-authors.hbs", model)
    /*
    Om man söker flera gånger efter varandra så lägger den till 
    "/author/search/ + /author/search/ + osv.." 
    */
  })
})
//  Done
router.get('/search', function(request, response){
  const searchTerm = request.query.authorSearch

  response.redirect("/authors/search/" + searchTerm)
})

//  DONE
router.get('/:id', function(request, response){
  const id = request.params.id

  authorRepo.getAuthorById(id, function(author){
    const model = {
      author: author
    }
    response.render("page-viewauthors.hbs", model)
  })
})
// DONE
router.get("/:id/edit", function(request, response){
  const id = request.params.id
  const obj = {
    id: id
  }
  response.render("page-editauthor.hbs", obj)
})

//  Done, almost
router.post("/:id/edit", function(request, response){
  const id = request.params.id
  const firstName = request.body.firstname
  const lastName = request.body.lastname
  const birthYear = request.body.birthyear

  const author = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    birthYear: birthYear
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