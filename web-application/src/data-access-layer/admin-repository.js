const db = require('./db')

const Admins = db.sequelize.define('Admins', {
  Username: db.Sequelize.TEXT,
  Password: db.Sequelize.TEXT,
});
Admins.sync()

exports.getAllAdmins = function(callback) {
  Admins.findAll({

  }).then(function(admins, error){
    if(error){
      callback(['databaseerror'], null)
    } else {
      callback(admins)
    }
  })
}

exports.createAdmin = function(admins, callback){
  Admins.create({
    Username: admins.username,
    Password: admins.password
  }).then(function(createdAdmin){
    callback(createdAdmin)
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
    console.log("updatedadmin: " + JSON.stringify(updatedAdmin, null, 2))
    callback(updatedAdmin)
  })
}

exports.getAdminById = function(adminId, callback) {
  Admins.findAll({
    where: {
      id: adminId
    }
  }).then(function(admin, error) {
    if(error) {
      callback(['databaseerror'], null)
    } else {
      callback(admin[0])
    }
  })
}
