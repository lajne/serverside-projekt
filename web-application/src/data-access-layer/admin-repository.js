const {Admins} = require('./models')

exports.getAllAdmins = function(callback) {
  Admins.findAll({

  }).then(function(admins){ 
      callback(admins, [])  
  }).catch(function(error){
    callback(['databaseerror']) 
  })
}

exports.createAdmin = function(admins, callback){
  Admins.create({
    Username: admins.username,
    Password: admins.password
  }).then(function(createdAdmin){
    callback(createdAdmin, [])
  }).catch(function(error){
    callback(['databaseerror'])
  })
}

exports.editAdmin = function(admin, callback) {
  Admins.update({
    Username: admin.username,
    Password: admin.password
  }, {
    where: {id: admin.id}
  }).then(function(updatedAdmin){
    console.log("lyckat")
     callback(updatedAdmin, [])
  }).catch(function(error){
    console.log("misslyckat")
    callback(['databaseerror'])
  })
}

exports.getAdminById = function(adminId, callback) {
  Admins.findAll({
    where: {
      id: adminId
    }
  }).then(function(admin) {
    callback(admin[0], [])
  }).catch(function(error){
    callback(['databaseerror'])
  })
}

exports.getAdminByUsername = function(username, callback){
Admins.findOne({where: {Username: username}})
  .then(function(admin){
    console.log("success")
    callback(admin, [])
  })
  .catch(function(error){
    console.log("fail")
    callback(["databaseerror"])
  })
}
