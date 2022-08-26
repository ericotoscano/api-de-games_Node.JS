const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connection = require("./database/database");
const Game = require("./games/Game");
const User = require("./users/User")

const JWTSecret = "abcde";

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(() => {
  console.log("Database connection has done!");
}).catch((err) => {
  console.log(err);
});

function auth(req, res, next) { // authentication middleware

    const authToken = req.headers['authorization'];

    if(authToken != undefined) {

      const bearer = authToken.split(' ');
      var token = bearer[1];

      jwt.verify(token, JWTSecret, (err, data) => {
        
        if(err) {

          res.status(401);
          res.json({err: "Invalid Token"});

        } else {

          req.token = token;
          req.loggedUser = {id: data.id, email: data.email}; // saving data on middleware, inside object 'req'
          
          next(); // passes 'req' for route

        }
      })

    } else {

      res.status(401);
      res.json({err: "Invalid Token"});
    
    }
}

var DB = {

  users: [
    {
      id: 1,
      name: "Érico Toscano",
      email: "dev.ericotoscano@gmail.com",
      password: "12345"
    },
    {
      id: 2,
      name: "Sergio Toscano",
      email: "dev.sergiotoscano@gmail.com",
      password: "54321"
    }
  ]

}

app.get("/games", auth, (req, res) => { // "auth" is an authentication middleware
  
  Game.findAll({raw: true, order: [
   
    ['id','ASC']

  ]}).then(games => {
   
    res.statusCode = 200;
    res.json(games);
  
  });

});

app.get("/game/:id", auth, (req, res) => {

  if(isNaN(req.params.id)) {
    
    res.sendStatus(400);
  
  } else {
  
    var id = parseInt(req.params.id);

    Game.findOne({
      where: {id: id}
    }).then(game => {

      if(game != undefined) {
    
        res.statusCode = 200;
        res.json(game);

      } else {

      res.sendStatus(404);
      
      }
    
    });

    }

});

app.post("/game", (req, res) => {

  var {title, year, price} = req.body;

  Game.create({
    title: title,
    year: year,
    price: price
  }).then(() => {
    res.sendStatus(200);
  }, (err) => {
    console.log("err");
  });

});

app.delete("/game/:id", (req, res) => {

  if(isNaN(req.params.id)) {
    
    res.sendStatus(400);
  
  } else {
  
    var id = parseInt(req.params.id);

    Game.findOne({
      where: {id: id}
    }).then(game => {

      if(game != undefined) {
        
        Game.destroy({
          where: {
            id: id
          }
        }).then(() => {

        res.statusCode = 200;

        });

      } else {

      res.sendStatus(404);
      
      }
    
    });

    }

});

app.put("/game/:id", (req, res) => {

  if(isNaN(req.params.id)) {
    
    res.sendStatus(400);
  
  } else {
  
    var id = parseInt(req.params.id);
    var {title, year, price} = req.body;

    Game.findOne({
      where: {id: id}
    }).then(game => {

      if(game != undefined) {
        
        Game.update({title: title, year: year, price: price}, {
          where: {
            id: id
          }
        }).then(() => {

        res.statusCode = 200;

        });

      } else {

      res.sendStatus(404);
      
      }
    
    });

    }

});
  

app.post("/auth", (req, res) => {

  var {email, password} = req.body; //data comes from body of 'req' done by user

  if(email != undefined) {

    var user = DB.users.find(u => u.email == email);

    if(user != undefined) {

      if(user.password == password) {

        jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
          
          if(err) {

            res.status(400);
            res.json({err: "Internal Error"});
          
          } else {
          
            res.status(200);
            res.json({token: token});
          
          }
        });

      } else {

        res.status(401);
        res.json({error: "Invalid Authentication Method"});
      } 

    } else {

      res.status(404);
      res.json({error: "Sended e-mail doesn't exist on database."})

    }

  } else {

    res.status(400);
    res.json({error: "Invalid e-mail."})

  }
});

app.listen(8080, () => {
  console.log("API Running!");
});