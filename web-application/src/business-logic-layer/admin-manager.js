const adminRepository = require('../data-access-layer/admin-repository')
const adminValidator = require('./admin-validator')

exports.getAllAdmins = function(callback) {
    adminRepository.getAllAdmins(function(admins, errors) {
        callback(admins, errors)
    })
}

exports.createAdmin = function(admin, callback) {
    const errors = adminValidator.validateNewAccount(admin.username)

    if(0 < errors.length){
        callback([], errors)
        return
    }
    adminRepository.createAdmin(admin, function(admin, errors) {
        callback(admin, errors)
    })
}

exports.editAdmin = function(admin, callback) {
    const errors = adminValidator.validateNewAccount(admin.username)

    if(0 < errors.length){
        callback([], errors)
        return
    }

    adminRepository.editAdmin(admin, function(admin, errors) {
        callback(admin, errors)
    })
}

exports.getAdminById = function(adminId, callback) {
    adminRepository.getAdminById(adminId, function(admin , errors) {
        callback(admin, errors)
    })
}

exports.login = function(username, password, callback){

    adminRepository.getAdminByUsername(username, function(admin, errors) {
       console.log("admin: " + JSON.stringify(admin, null, 2))
       console.log("errors: " + errors)
      if(0 < errors.length){
          callback(errors)
      } else if(!admin){
          callback(["Wrong username"])
      } else if(admin.Password != password){
          callback(["Wrong password"])
      } else{
          // console.log("callback admin")
          callback(admin, [])
      }
    })

}