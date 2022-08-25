const Sequelize = require("sequelize");
const connection = require("../database/database");

//Model
const User = connection.define('users', {

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

//User.sync({force: true}); REMOVER APÓS CRIAÇÃO DAS TABELAS

module.exports = User;