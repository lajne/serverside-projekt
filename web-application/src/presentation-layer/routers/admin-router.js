const express = require('express')
const router = express.Router()
const adminManager = require('../../business-logic-layer/admin-manager')

router.get('/', function(request, response) {
  if(request.session.sessionAdmin) {
    adminManager.getAllAdmins(function(errors, admins) {
      const model = {
        admins: admins,
        errors: errors
      }
      response.render("page-admins.hbs", model)
    })
  } else {
    const model = {
      errors: ["you need to be an admin to do that."]
    }
    response.render("page-admins.hbs", model)
  }
})

router.get("/create", function(request, response) {
  if(request.session.sessionAdmin) {
    response.render("page-createadmin.hbs")
  } else {
    const model = {
      errors: ["you need to be an admin to do that."]
    }
    response.render("page-createadmin.hbs", model)
  }
})

router.post("/create", function(request, response) {
  const admin = {
    Username: request.body.username,
    Salt: "",
    Password: request.body.password
  }

  adminManager.createAdmin(request.session.sessionAdmin, admin, function(errors, admin) {
    if(0 < errors.length) {
      const model = {
        admin: admin,
        errors: errors
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

router.post("/login", function(request, response) {
  const username = request.body.username
  const password = request.body.password

  adminManager.login(username, password, function(errors, admin) {
    console.log("errors: " + errors)
    if(0 < errors.length) {
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

router.post("/logout", function(request, response) {
  request.session.sessionAdmin = null
  response.redirect("/")
})

router.get('/:id', function(request, response) {
  const id = request.params.id

  adminManager.getAdminById(id, function(errors, admin) {
    const model = {
      admin: admin
    }
    response.render("page-viewadmins.hbs", model)
  })
  
})

router.get("/:id/edit", function(request, response) {
  if(request.session.sessionAdmin) {
    const id = request.params.id
    
    adminManager.getAdminById(id, function(errors, admin) {
      const model = {
        admin: admin,
        errors: errors
      }
      response.render("page-editadmin.hbs", model)
    })
  } else {
    const model = {
      errors: ["you need to be an admin to do that."]
    }
    response.render("page-editadmin.hbs", model)
  }
})

router.post("/:id/edit", function(request, response) {
  adminManager.getAdminById(request.params.id, function(errors, adminReturned) {
    const admin = {
      id: request.params.id,
      Username: request.body.username,
      Salt: adminReturned.Salt,
      Password: request.body.password
    }
    adminManager.editAdmin(request.session.sessionAdmin, admin, function(errors, adminReturned) {
      if(0 < errors.length) {
        const model = {
          admin: admin,
          errors: errors
        }
        response.render("page-editadmin.hbs", model)
      } else {
        response.redirect("/admins")
      }
    })
  })
})

router.get("/:id/delete", function(request, response) {
  if(request.session.sessionAdmin) {
    const id = request.params.id
  
    adminManager.deleteAdmin(request.session.sessionAdmin, id, function(errors, result) {
      if(0 < errors.length) {
        const model = {
          errors: errors
        }
        response.render("page-viewadmins.hbs", model)
      } else {
        response.redirect("/admins")
      }
    })
  } else {
    const model = {
      errors: ["you need to be an admin to do that."]
    }
    response.render("page-viewadmins.hbs", model)
  }
})

module.exports = router