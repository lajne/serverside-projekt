const db = require('./db')

const Admins = db.sequelize.define('Admins', {
  Username: db.Sequelize.TEXT,
  Password: db.Sequelize.TEXT,
});

const Authors = db.sequelize.define('Authors', {
  Id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  FirstName: db.Sequelize.TEXT,
  LastName: db.Sequelize.TEXT,
  BirthYear: db.Sequelize.TEXT,
}, {
  createdAt: false,
  updatedAt: false
});


const Books = db.sequelize.define('Books', {
  ISBN: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    primaryKey: true
  },
  Title: db.Sequelize.TEXT,
  SignId: db.Sequelize.INTEGER,
  PublicationYear: db.Sequelize.TEXT,
  PublicationInfo: db.Sequelize.TEXT,
  Pages: db.Sequelize.INTEGER
}, {
  createdAt: false,
  updatedAt: false
});

const BookAuthors = db.sequelize.define('BookAuthors', {
  BookISBN: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },
  AuthorId: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  }
})

Admins.sync()

Authors.belongsToMany(Books, {
  through: {
    model: BookAuthors
  }
})
Books.belongsToMany(Authors, {
  through: {
    model: BookAuthors
  }
})

exports.Admins = Admins
exports.Authors = Authors
exports.Books = Books
