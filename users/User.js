const Sequelize = require("sequelize");
const connection = require("../database/database");

//Model
const User = connection.define('users', {

  name: {
    type: Sequelize. STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

//User.sync({force: true}); // REMOVE AFTER TABLE CREATION

module.exports = User;