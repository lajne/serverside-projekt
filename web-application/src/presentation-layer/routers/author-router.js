const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')
const authorManager = require('../../business-logic-layer/author-manager')

router.get('/', function(request, response){
  response.redirect("/authors/page/1")
})

router.get('/page/:pageIndex', function(request, response){
  let page = request.params.pageIndex
  let limit = 10
  let offset = 0

  authorManager.getAllAuthors(page, limit, offset, function(authors, pages){
    let pageIndexes = []
    for(let index = 1; index < (pages + 1); index++) {
      pageIndexes.push({index: index})
    }
    let model = {
      authors: authors,
      pages: pageIndexes
    }
    response.render("page-authors.hbs", model)
  })
})

router.get("/create", function(request, response){
  response.render("page-createauthor.hbs")
})

router.post("/create", function(request, response){

  const authorized = {
    session: request.session.admin
  }

  const author = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    birthYear: request.body.birthYear
  }
  authorManager.createAuthor(authorized, author, function(authorret, errors){
    if(0 < errors.length) {
      const model = {
        errors: errors
      }
      response.render("page-createauthor.hbs", model)
    } else {
      response.redirect('/authors/')
    }
  })
})

router.get('/search/:searchTerm', function(request, response){
  const searchTerm = request.params.searchTerm

  authorRepo.getAuthorsBySearch(searchTerm, function(authors){
    const model = {
      authors: authors
    }
    response.render("page-authors.hbs", model)
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

  const authorized = {
    session: request.session.admin
  }

  const author = {
    id: request.params.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    birthYear: request.body.birthYear
  }

  authorManager.editAuthor(authorized, author, function(authorret, errors){
    if(0 < errors.length) {
      const model = {
        errors: errors
      }
      response.render("editauthor.hbs", model)
    } else {
      response.redirect("/authors/")
    }
  })
})

module.exports = router