const Sequelize = require("sequelize");
const connection = require("../database/database");

//Model
const Game = connection.define('games', {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

});

//Game.sync({force: true}); REMOVER APÓS CRIAÇÃO DAS TABELAS

module.exports = Game;