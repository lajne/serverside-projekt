const Sequelize = require('sequelize')
const sequelize = new Sequelize('webAppDatabase', 'root', 'theRootPassword', {
  host: 'database',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

setTimeout(function(){
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

}, 5000)

// id, createdat, updatedat  === false

  const Authors = sequelize.define('Authors', {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FirstName: Sequelize.TEXT,
    LastName: Sequelize.TEXT,
    BirthYear: Sequelize.TEXT,
  }, {
    timestamps: false,

  });

  /* exports.Author.findAll().then(function(allHumans){
    console.log(allHumans)
  }) */

  exports.findAll = function(callback) {
    Authors.findAll().then(function(error, authors){
      if(error) {
        callback(['databaseerror'], null)
      } else {
        callback([], authors[0])
      }
    })
  }

/* module.exports = sequelize */

