const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config()
const cC = require('./customer_controller');
const bcrypt = require('bcrypt');
const saltRounds = 12

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
}).catch(error => {
    console.log('Error with server', error)
  }
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.use(express.static(`${__dirname}/../build`))

app.post('/signup', (req, res) => {
    const db = app.get('db')
    const {username, password} = req.body
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
        db.create_users([username, hashedPassword]).then(() => {
            req.session.users = {username}
            res.json({users: req.session.users})
        }).catch(error => {
            console.log('error', error);
            res.status(500).json({ message: 'Something bad happened! '})
          });
    })
})

app.post('/login', (req, res) => {
    const db = app.get('db');
    const { username, password } = req.body;
    db.find_user([username]).then(users => {
      if (users.length) {
        bcrypt.compare(password, users[0].password).then(passwordsMatched => {
          if (passwordsMatched) {
            req.session.users = { username: users[0].username };
            res.json({ users: req.session.users });
          } else {
            res.status(403).json({ message: 'Wrong password' })
          }
        })
      } else {
        res.status(403).json({ message: "That user is not registered" })
      }
    });
  });

  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send();
  });

function checkIfLoggedIn(req, res, next){
    if(req.session.users){
        next()
    }else{
        res.status(403).json({message: 'You are not authorized'})
    }
}

app.get('/data', checkIfLoggedIn, (req, res) => {
    res.json({ data: "congrats you logged in" });
})

app.get('/api/customers', cC.getCustomers)
app.get('/api/horses', cC.getHorses)
app.post('/api/customer', cC.createCustomer)
app.post('/api/horse', cC.createHorse)
app.put('/api/customer/date', cC.updateAppDate);
app.put('/api/customer/time', cC.updateAppTime);
app.post('/api/user', cC.createUser)
app.delete('/api/customer/:id', cC.delete);
app.get('/api/customers_horses', cC.getCustomersAndHorses)


const port = process.env.port || 44000;
app.listen(port,() =>{console.log(`Server listening on port ${port}`);});