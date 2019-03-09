const express = require('express')
const router = express.Router()
const authorRepo = require('../../data-access-layer/author-repository')
const authorManager = require('../../business-logic-layer/author-manager')
const bookManager = require('../../business-logic-layer/book-manager')

router.get('/', function(request, response){
  response.redirect("/authors/page/1")
})

router.get('/page/:currentPage', function(request, response){
  const options = {
    default: false,
    page: request.params.currentPage,
    limit: 10,
    offset: 0
  }
  authorManager.getAllAuthors(options, function(authors, pages){
    let pageIndexes = []
    let currentPage = Number(request.params.currentPage)
    if(currentPage > 3) {
      let index = (currentPage - 3)
      if((currentPage + 3) < pages) {
        for(index; index <= (currentPage + 3); index++) {
          pageIndexes.push({index: index})
        }
      } else {
        for(index; index <= pages; index++) {
          pageIndexes.push({index: index})
        }
      }
    } else {
      let index = 1
      let max = (currentPage + 3)
      if(1 < currentPage) {
        for(index; index < currentPage; index++) {
          pageIndexes.push({index: index})
        }
      }
      let i = currentPage
      for(i; i < max; i++) {
        pageIndexes.push({index: i})
      }
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
  const authorized = {
    session: request.session.sessionAdmin
  }

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
      response.render("page-createauthor.hbs", model)
     } else {
       author.books = booksret
       
       authorManager.createAuthor(authorized, author, function(errors, authorret){
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

  authorManager.getAuthorsBySearch(searchTerm, function(error, authors){
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
  const authorized = {
    session: request.session.sessionAdmin
  }

  const author = {
    id: request.params.id,
    firstName: request.body.firstname,
    lastName: request.body.lastname,
    birthYear: request.body.birthyear
  }

  authorManager.editAuthor(authorized, author, function(errors, authorret){
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