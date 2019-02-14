const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')

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

//  DONE
router.get('/', function(request, response){
  authorRepo.getAllAuthors(function(authors){
    const model = {
      authors: authors
    }
    response.render("page-authors.hbs", model)
  })
})

//DONE 
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

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm

  authorRepo.getAuthorBySearch(searchTerm, function(authors){
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

router.get("/:id/edit", function(request, response){
  response.render("page-editauthor.hbs")
})

module.exports = router