const express = require('express')
const router = express.Router()
const adminRepo = require('../../data-access-layer/admin-repository')
const adminManager = require('../../business-logic-layer/admin-manager')

router.get('/', function(request, response){
  console.log("session admin: " + JSON.stringify(request.session.admin, null, 2))
  adminManager.getAllAdmins(function(admins, error){
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

  const authorized = {
    session: request.session.admin
  }

  const admin = {
    username: request.body.username,
    password: request.body.password
  }

  adminManager.createAdmin(authorized, admin, function(admin, error){
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

  adminManager.login(username, password, function(admin, error){
    // console.log("router admin: " + JSON.stringify(admin, null, 2))
    // console.log("router error: " + error)
    if(0 < error.length){
      const model = {
        username: username,
        error: error
      }
      response.render("page-login.hbs", model)
    } else{
      request.session.admin = admin
      response.redirect("/admins")
    }
  })
})

router.get("/logout", function(request, response) {
  request.session.admin = null
  response.redirect("/")
})

router.get('/:id', function(request, response){
  const id = request.params.id

  adminManager.getAdminById(id, function(admin) {
    const model = {
      admin: admin
    }
    console.log("admin to view: " + JSON.stringify(model, null, 2))
    response.render("page-viewadmins.hbs", model)
  })
  
})

router.get("/:id/edit", function(request, response) {
  const id = request.params.id
  
  adminManager.getAdminById(id, function(admin, error) {
    const model = {
      admin: admin,
      error: error
    }
    response.render("page-editadmin.hbs", model)
  })
})

router.post("/:id/edit", function(request, response){

  const authorized = {
    session: request.session.admin
  }

  const admin = {
    id: request.params.id,
    username: request.body.username,
    password: request.body.password
  }

  adminManager.editAdmin(authorized, admin, function(admin, error) {
    if(0 < error.length){
      const model = {
        admin: admin,
        error: error
      }
      response.render("page-editadmin.hbs", model)
    }else {
      response.redirect("/admins")
    }
  })
})

module.exports = router