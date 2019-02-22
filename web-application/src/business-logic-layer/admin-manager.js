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