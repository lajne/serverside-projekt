const express = require('express')
const router = express.Router()
const adminRepo = require('../../data-access-layer/admin-repository')

router.get('/', function(request, response){
  adminRepo.getAllAdmins(function(admins){
    const model = {
      admins: admins
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

  adminRepo.createAdmin(admin, function(msg){
    console.log("response: " + JSON.stringify(msg, null, 2))
  })
  // response.render("page-createadmin.hbs")
})

router.get('/:id', function(request, response){
  const id = request.params.id

  adminRepo.getAdminById(id, function(admin) {
    const model = {
      admin: admin
    }
    console.log("admin to view: " + JSON.stringify(model, null, 2))
    response.render("page-viewadmins.hbs", model)
  })
  
})

router.get("/:id/edit", function(request, response) {
  const id = request.params.id
  
  adminRepo.getAdminById(id, function(admin) {
    const model = {
      admin: admin
    }
    response.render("page-editadmin.hbs", model)
  })
})

router.post("/:id/edit", function(request, response){
  const admin = {
    id: request.params.id,
    username: request.body.username,
    password: request.body.password
  }

  adminRepo.editAdmin(admin, function(msg) {
    console.log("response: " + JSON.stringify(msg, null, 2))
  })

  // response.render("page-editadmin.hbs")
})

module.exports = router