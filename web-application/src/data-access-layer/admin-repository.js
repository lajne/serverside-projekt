// const db = require('./db')

// const Admins = db.sequelize.define('Admins', {
//   Username: db.Sequelize.TEXT,
//   Password: db.Sequelize.TEXT,
// });
// Admins.sync()

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
     callback(updatedAdmin, [])
  }).catch(function(error){
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
