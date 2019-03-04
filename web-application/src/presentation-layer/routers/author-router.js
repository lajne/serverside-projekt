const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')
const authorManager = require('../../business-logic-layer/author-manager')
const bookManager = require('../../business-logic-layer/book-manager')

router.get('/', function(request, response){
  response.redirect("/authors/page/1")
})

router.get('/page/:pageIndex', function(request, response){
  const options = {
    default: false,
    page: request.params.pageIndex,
    limit: 10,
    offset: 0
  }

  authorManager.getAllAuthors(options, function(authors, pages){
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
  const options = {
    default: true
  }
  bookManager.getAllBooks(options, function(errors, books) {
    let model = {
      books: books
    }
    response.render("page-createauthor.hbs", model)
  })
})

router.post("/create", function(request, response){
  const author = {
    firstName: request.body.firstname,
    lastName: request.body.lastname,
    birthYear: request.body.birthyear
  }

  const options = {
    default: true,
    books: request.body.selectedBooks
  }
  bookManager.getAllBooks(options, function(errors, booksret) {
    if(0 < errors.length) {
      const model = {
        errors: errors
      }
      console.log(JSON.stringify(model, null, 2))
//      response.render("page-createbook.hbs", model)
     } else {
       author.books = booksret
       
       authorManager.createAuthor(author, function(errors, authorret){
         if(0 < errors.length) {
           const model = {
             errors: errors
           }
           response.render("page-createauthor.hbs", model)
         } else {
           response.redirect('/authors/')
         }
       })
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

  authorRepo.getAuthorById(id, function(errors, author){
    const model = {
      author: author
    }
    response.render("page-viewauthors.hbs", model)
  })
})

router.get("/:id/edit", function(request, response){
  const id = request.params.id
  
  authorRepo.getAuthorById(id, function(errors, author) {
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

  authorManager.editAuthor(author, function(errors, authorret){
    if(0 < errors.length) {
      const model = {
        author: author,
        errors: errors
      }
      response.render("page-editauthor.hbs", model)
    } else {
      response.redirect("/authors/")
    }
  })
})

module.exports = router