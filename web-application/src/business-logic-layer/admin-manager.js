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
    const errors = adminValidator.validateNewAccount(admin.username)

    if(0 < errors.length) {
      callback(errors)
      return
    }
    adminRepository.createAdmin(admin, function(errors, admin) {
      callback([], admin)
    })
  } else {
    callback([], ["you need to be an admin to do that."])
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
    const hashedPassword = hash(password, admin.Salt)
    if(0 < error.length) {
      errors.push(error)
    } 
    if(admin.Password != hashedPassword) {
      errors.push("Wrong password")
    }
    callback(errors, admin)
  })

}