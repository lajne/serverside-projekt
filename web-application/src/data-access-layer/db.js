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

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// id, createdat, updatedat  === false

  const authors = sequelize.define('Authors', {
    Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    FirstName: Sequelize.TEXT,
    LastName: Sequelize.TEXT,
    BirthYear: Sequelize.TEXT,
  }, {
    createdAt: false,
    updatedAt: false
  });

  /* exports.Author.findAll().then(function(allHumans){
    console.log(allHumans)
  }) */

  exports.findAll = function(callback) {
    authors.findAll({
      where: {
        Id: {
          [Sequelize.Op.between]: [100, 120]
        }
      }
    }).then(function(authors, error){
      if(error) {
        callback(['databaseerror'], null)
      } else {
        callback(authors)
      }
    })
  }

/* module.exports = sequelize */

