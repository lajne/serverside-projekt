const express = require('express')
const router = express.Router()
const adminRepo = require('../../data-access-layer/admin-repository')
const adminManager = require('../../business-logic-layer/admin-manager')

router.get('/', function(request, response){
  adminManager.getAllAdmins(function(error, admins){
    const model = {
      admins: admins,
      error: error
    }
    response.render("page-admins.hbs", model)
  })
})

router.get("/create", function(request, response){
  response.render("page-createadmin.hbs")
})

router.post("/create", function(request, response){
  const admin = {
    username: request.body.username,
    salt: "",
    password: request.body.password
  }

  adminManager.createAdmin(request.session.sessionAdmin, admin, function(error, admin){
    if(0 < error.length) {
      const model = {
        admin: admin,
        error: error
      }
      response.render("page-createadmin.hbs", model)
    } else {
      response.redirect("/admins")
    }
  })
})

router.get("/login", function(request, response){
  const model = {
    username: "",
    error: []
  }
  response.render("page-login.hbs", model)
})

router.post("/login", function(request, response){
  const username = request.body.username
  const password = request.body.password

  adminManager.login(username, password, function(errors, admin){
    console.log("errors: " + errors)
    if(0 < errors.length){
      const model = {
        username: username,
        errors: errors
      }
      response.render("page-login.hbs", model)
    } else{
      request.session.sessionAdmin = admin
      response.redirect("/")
    }
  })
})

router.get("/logout", function(request, response) {
  request.session.sessionAdmin = null
  response.redirect("/")
})

router.get('/:id', function(request, response){
  const id = request.params.id

  adminManager.getAdminById(id, function(error, admin) {
    const model = {
      admin: admin
    }
    response.render("page-viewadmins.hbs", model)
  })
  
})

router.get("/:id/edit", function(request, response) {
  const id = request.params.id
  
  adminManager.getAdminById(id, function(error, admin) {
    const model = {
      admin: admin,
      error: error
    }
    response.render("page-editadmin.hbs", model)
  })
})

router.post("/:id/edit", function(request, response) {
  adminManager.getAdminById(request.params.id, function(error, adminReturned) {
    const admin = {
      id: request.params.id,
      Username: request.body.username,
      Salt: adminReturned.Salt,
      Password: request.body.password
    }
    adminManager.editAdmin(request.session.sessionAdmin, admin, function(error, adminret) {
      if(0 < error.length) {
        const model = {
          admin: admin,
          error: error
        }
        response.render("page-editadmin.hbs", model)
      } else {
        response.redirect("/admins")
      }
    })
  })
})

router.get("/:id/delete", function(request, response) {
  const id = request.params.id

  adminManager.deleteAdmin(request.session.sessionAdmin, id, function(error, result) {
    if(0 < error.length) {
      const model = {
        error: error
      }
      response.render("page-viewadmins.hbs", model)
    } else {
      response.redirect("/admins")
    }
  })
})

module.exports = router