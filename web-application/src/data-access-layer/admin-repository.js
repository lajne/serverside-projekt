const {Admins} = require('./models')
const hash = require('./hash')

exports.getAllAdmins = function(callback) {
  Admins.findAll().then(function(admins){ 
      callback([], admins)  
  }).catch(function(error){
    callback(['databaseerror']) 
  })
}

exports.createAdmin = function(admins, callback){
  const salt = String(Math.random().toString(36).substring(2, 15))
  const hashedPassword = hash(admins.password, salt)
  Admins.create({
    Username: admins.username,
    Salt: salt,
    Password: hashedPassword
  }).then(function(createdAdmin){
    callback([], createdAdmin)
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
     callback([], updatedAdmin)
  }).catch(function(error){
    callback(['databaseerror'])
  })
}

exports.deleteAdmin = function(id, callback ) {
  Admins.destroy({
    where: {id: id}
  }).then(function(row) {
    callback([], row)
  }).catch(function(error) {
    callback(['databaseerror'])
  })
}

exports.getAdminById = function(adminId, callback) {
  Admins.findAll({
    where: {
      id: adminId
    }
  }).then(function(admin) {
    callback([], admin[0])
  }).catch(function(error){
    callback(['databaseerror'])
  })
}

exports.getAdminByUsername = function(username, callback){
  Admins.findOne({where: {Username: username}})
    .then(function(admin){
      callback([], admin)
    }).catch(function(error){
        console.log(error)
        callback(["databaseerror"])
    })
}
