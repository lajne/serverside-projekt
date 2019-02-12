const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql:library-mysql.sql', 'root', 'thePassword')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Author = sequelize.define('author', {
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    birthYear: Sequelize.TEXT,
  });

  Author.findAll().then(function(allHumans){
    
  })

/* module.exports = sequelize */

