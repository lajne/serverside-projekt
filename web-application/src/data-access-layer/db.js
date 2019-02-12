const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql:library-mysql.sql', 'root', 'thePassword', {
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Authors = sequelize.define('authors', {
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    birthYear: Sequelize.TEXT,
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

