const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')

router.get('/', function(request, response){
  authorRepo.getAllAuthors(function(authors){
    let model = {
      authors: authors
    }

    const authorsPerPage = 10
    let index = 0
    let currentPage = 1
    let authorsForPage = []

    for(let author of model.authors) {
      if(index < authorsPerPage) {
        // authorsForPage.push(author)
        author.pageIndex = currentPage
        console.log("\nIndex: " + index)
        console.log("Page: " + author.pageIndex)
        console.log("CurrentPage: " + currentPage)
        console.log(JSON.stringify(author, null, 2))
        index++
      } else {
        index = 0
        currentPage++
      }
    }

    /*
            Tänkte att man kunde skicka vidare modeln med vilken sida alla authors ska vara på.
            Men tror inte det fungerar?!
    */
    
    // response.redirect("/page/", model)
  })
})

router.get('/page/:index', function(request, response){

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