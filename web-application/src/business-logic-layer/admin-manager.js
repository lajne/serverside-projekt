const adminRepository = require('../data-access-layer/admin-repository')
const adminValidator = require('./admin-validator')
const hash = require('./calculations/hash')

exports.getAllAdmins = function(callback) {
  adminRepository.getAllAdmins(function(errors, admins) {
    callback(errors, admins)
  })
}

exports.createAdmin = function(sessionAdmin, admin, callback) {
  if(sessionAdmin) {
    
    adminRepository.getAdminByUsername(admin.Username, function(errors, adminFound) {
        if(!adminFound) {
        errors = adminValidator.validateNewAccount(admin.Username)
  
        if(0 < errors.length) {
          callback(errors)
          return
        }
        const salt = String(Math.random().toString(36).substring(2, 15))
        const hashedPassword = hash(admin.Password, salt)
        admin.Salt = salt
        admin.Password = hashedPassword
        adminRepository.createAdmin(admin, function(errors, admin) {
          callback([], admin)
        })
      } else {
        callback(["The username is already taken."])
        return
      }
    })
  } else {
    callback(["you need to be an admin to do that."])
    return
  }
}

exports.editAdmin = function(sessionAdmin, admin, callback) {
  if(sessionAdmin) {
    const errors = adminValidator.validateNewAccount(admin.Username)

    if(0 < errors.length) {
      callback(errors)
      return
    }
    const hashedPassword = hash(admin.Password, admin.Salt)
    admin.Password = hashedPassword
    adminRepository.editAdmin(admin, function(errors, admin) {
      callback(errors, admin)
    })
  } else {
    callback(["you need to be an admin to do that."])
    return
  }
}

exports.deleteAdmin = function(sessionAdmin, id, callback) {
  if(sessionAdmin) {
    adminRepository.deleteAdmin(id, function(errors, row) {
      callback(errors, row)
    })
  } else {
    callback(['you need to be an admin to do that.'])
    return
  }
}

exports.getAdminById = function(adminId, callback) {
  adminRepository.getAdminById(adminId, function(errors, admin) {
    callback(errors, admin)
  })
}

exports.login = function(username, password, callback) {
  const errors = []
  
  if(!username || !password) {
    errors.push("You need to enter username and password")
    callback(errors)
    return
  }
  
  adminRepository.getAdminByUsername(username, function(error, admin) {
    if(0 < error.length) {
      errors.push(['Wrong username'])
      callback(errors)
      return
    } else {
      const hashedPassword = hash(password, admin.Salt)
      console.log(admin.Password + " , " + hashedPassword)
      if(admin.Password != hashedPassword) {
        errors.push("Wrong password")
        callback(errors)
        return
      }
      callback(errors, admin)
    }
  })

}