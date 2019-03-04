const express = require('express')
const router = express.Router()
const adminRepo = require('../../data-access-layer/admin-repository')
const adminManager = require('../../business-logic-layer/admin-manager')

router.get('/', function(request, response){
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
  const admin = {
    username: request.body.username,
    password: request.body.password
  }

  adminManager.createAdmin(admin, function(admin, error){
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
  const admin = {
    id: request.params.id,
    Username: request.body.username,
    Password: request.body.password
  }

  adminManager.editAdmin(admin, function(adminret, error) {
    if(0 < error.length){
      const model = {
        admin: admin,
        error: error
      }
      console.log(JSON.stringify(model, null, 2))
      response.render("page-editadmin.hbs", model)
    }else {
      response.redirect("/admins")
    }
  })
})

module.exports = router