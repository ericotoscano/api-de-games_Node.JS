const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "abcde";

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

  games: [
    {
      id: 1,
      title: "Call of Duty: Modern Warfare",
      year: 2019,
      price: 40
    },
    {
      id: 2,
      title: "Formula One 2022",
      year: 2022,
      price: 80
    },
    {
      id: 3,
      title: "Super Mario Bros",
      year: 1990,
      price: 10
    },
  ],

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
  
  res.statusCode = 200;
  res.json(DB.games);

});

app.get("/game/:id", auth, (req, res) => {

  if(isNaN(req.params.id)) {
    
    res.sendStatus(400);
  
  } else {
  
    var id = parseInt(req.params.id);
    var game = DB.games.find(g => g.id == id);

    if(game != undefined) {
    
      res.statusCode = 200;
      res.json(game);
    
    } else {

      res.sendStatus(404);

    }

  }

});

app.post("/game", (req, res) => {

  var {title, year, price} = req.body;

  DB.games.push({
  
    id: 4,
    title,
    year,
    price
  
  });

  res.sendStatus(200);

});

app.delete("/game/:id", (req, res) => {

  if(isNaN(req.params.id)) {
    
    res.sendStatus(400);
  
  } else {
  
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id == id);

    if(index == -1) {

      res.sendStatus(404);
    } else {

      DB.games.splice(index, 1);
      res.sendStatus(200);

    }

  }

});

app.put("/game/:id", (req, res) => {

  if(isNaN(req.params.id)) {
    
    res.sendStatus(400);
  
  } else {
  
    var id = parseInt(req.params.id);
    var game = DB.games.find(g => g.id == id);

    if(game != undefined) {
    
      var {title, year, price} = req.body;

      if(title != undefined) {
        game.title = title;
      }
    
      if(year != undefined) {
        game.year = year;
      }

      if(price != undefined) {
        game.price = price;
      }

      res.sendStatus(200);

    } else {

      res.sendStatus(404);

    }

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