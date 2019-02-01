const express = require('express')
const router = express.Router()

const admins = [{
  id: 1,
  username: "kalleadmin",
  password: "kalle123"
}, {
  id: 2,
  username: "janneadmin",
  password: "janne123"
}, {
  id: 3,
  username: "gurraadmin",
  password: "gurra123"
}]

router.get('/', function(request, response){
  const model = {
    admins: admins
  }
  response.render("page-admins.hbs", model)
})

router.get("/create", function(request, response){
  response.render("page-createadmin.hbs")
})

router.get('/:id', function(request, response){
  const id = request.params.id
  const admin = admins.find(b => b.id == id)
  
  const model = {
    admin: admin
  }

  response.render("page-viewadmins.hbs", model)
})

router.get("/:id/edit", function(request, response){
  response.render("page-editadmin.hbs")
})

module.exports = router