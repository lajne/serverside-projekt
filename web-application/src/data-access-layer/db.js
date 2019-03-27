const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('aleskandersdatabase', 'aleskander', 'aleskander', {
  host: 'ju-library.cgtn27kec3ou.eu-west-1.rds.amazonaws.com',
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

  sequelize.define

  db.Sequelize = Sequelize
  db.sequelize = sequelize
  module.exports = db

