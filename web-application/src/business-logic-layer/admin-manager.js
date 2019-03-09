const adminRepository = require('../data-access-layer/admin-repository')
const adminValidator = require('./admin-validator')

exports.getAllAdmins = function(callback) {
    adminRepository.getAllAdmins(function(admins, errors) {
        callback(admins, errors)
    })
}

exports.createAdmin = function(authorized, admin, callback) {
    if(authorized.session){
        const errors = adminValidator.validateNewAccount(admin.username)

        if(0 < errors.length){
            callback([], errors)
            return
        }
        adminRepository.createAdmin(admin, function(admin, errors) {
            callback(admin, errors)
        })
    }else{
        callback([], ["you need to be an admin to do that."])
        return
    }

}

exports.editAdmin = function(authorized, admin, callback) {
    if(authorized.session) {
        const errors = adminValidator.validateNewAccount(admin.Username)

        if(0 < errors.length) {
            callback([], errors)
            return
        }
    
        adminRepository.editAdmin(admin, function(admin, errors) {
            callback(admin, errors)
        })
    } else {
        callback([], ["you need to be an admin to do that."])
        return
    }

}

exports.deleteAdmin = function(authorized, id, callback) {
  if(authorized.session) {
    adminRepository.deleteAdmin(id, function(row, error) {
      callback(row, error)
    })
  } else {
    callback([], ['you need to be an admin to do that.'])
    return
  }
}

exports.getAdminById = function(adminId, callback) {
    adminRepository.getAdminById(adminId, function(admin , errors) {
        callback(admin, errors)
    })
}

exports.login = function(username, password, callback){

    adminRepository.getAdminByUsername(username, function(admin, errors) {
       if(0 < errors.length) {
           callback(errors)
       } else if(!admin) {
           callback(["Wrong username"])
       } else if(admin.Password != password) {
           callback(["Wrong password"])
       } else {
           callback(admin, [])
       }
     })

}