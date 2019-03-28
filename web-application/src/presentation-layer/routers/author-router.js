const express = require('express')
const router = express.Router()
const authorManager = require('../../business-logic-layer/author-manager')
const bookManager = require('../../business-logic-layer/book-manager')
const paginate = require('../pagination/paginate')

router.get('/', function(request, response) {
  response.redirect("/authors/page/1")
})

router.get('/page/:currentPage', function(request, response) {
  const paginationOptions = {
    page: request.params.currentPage,
    limit: 10,
    offset: 0
  }
  authorManager.getAllAuthorsWithPagination(paginationOptions, function(authors, pages) {
    let currentPage = Number(request.params.currentPage)
    const urlAttributes = paginate(currentPage, pages, null)
  
    let model = {
      authors: authors,
      urlAttributes: urlAttributes
    }
    response.render("page-authors.hbs", model)
  })
})

router.get("/create", function(request, response) {
  if(request.session.sessionAdmin) {
    bookManager.getAllBooks(function(errors, books) {
      let model = {
        books: books
      }
      response.render("page-createauthor.hbs", model)
    })
  } else {
    const model = {
      errors: ["You need to be an admin to do that."]
    }
    response.render("page-createauthor.hbs", model)
  }
})

router.post("/create", function(request, response) {
  const author = {
    firstName: request.body.firstname,
    lastName: request.body.lastname,
    birthYear: request.body.birthyear
  }

  bookManager.getBooksByISBN(request.body.selectedBooks, function(errors, booksReturned) {
    if(0 < errors.length) {
      const model = {
        errors: errors
      }
      response.render("page-createauthor.hbs", model)
     } else {
       author.books = booksReturned
       
       authorManager.createAuthor(request.session.sessionAdmin, author, function(errors, authorReturned) {
         if(0 < errors.length) {
          let model = {
            books: "",
            author: author,
            errors: errors
          }
          bookManager.getAllBooks(function(errors, books) {
            model.books = books
            response.render("page-createauthor.hbs", model)
          })
         } else {
           response.redirect('/authors/')
         }
       })
     }
  })
})

router.get('/search/:searchTerm/page/:currentPage', function(request, response) {
  const searchTerm = request.params.searchTerm
  const paginationOptions = {
    page: request.params.currentPage,
    limit: 10,
    offset: 0
  }

  authorManager.getAuthorsBySearch(searchTerm, paginationOptions, function(errors, authors, pages) {
    let currentPage = Number(request.params.currentPage)
    const urlAttributes = paginate(currentPage, pages, searchTerm)
    const model = {
      searchTerm: searchTerm,
      authors: authors,
      urlAttributes: urlAttributes,
      searchPagination: true
    }
    response.render("page-authors.hbs", model)
  })
})

router.get('/search/:searchTerm', function(request, response) {
  const searchTerm = request.params.searchTerm
  response.redirect('/authors/search/' + searchTerm + '/page/1')
})

router.get('/search', function(request, response) {
  const searchTerm = request.query.authorSearch

  response.redirect("/authors/search/" + searchTerm)
})

router.get('/:id', function(request, response) {
  const id = request.params.id

  authorManager.getAuthorById(id, function(errors, author) {
    const model = {
      author: author
    }
    response.render("page-viewauthors.hbs", model)
  })
})

router.get("/:id/edit", function(request, response) {
  if(request.session.sessionAdmin) {
    const id = request.params.id
    
    authorManager.getAuthorById(id, function(errors, author) {
      const model = {
        author: author
      }
      response.render("page-editauthor.hbs", model)
    })
  } else {
    const model = {
      errors: ["You need to be an admin to do that."]
    }
    response.render("page-editauthor.hbs", model)
  }
})

router.post("/:id/edit", function(request, response) {

  const author = {
    id: request.params.id,
    firstName: request.body.firstname,
    lastName: request.body.lastname,
    birthYear: request.body.birthyear
  }

  authorManager.editAuthor(request.session.sessionAdmin, author, function(errors, authorReturned) {
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