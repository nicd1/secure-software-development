const UserDb = require('./model/userdb.js');
const bcrypt = require('bcrypt');

var express = require('express'),
  mustache = require('mustache-express'),
  path = require('path'),
  app = express(),
  Datastore = require('nedb'),
  passport = require('passport'),
  session = require('express-session'),
  bodyParser = require('body-parser');
  LocalStrategy = require('passport-local').Strategy,
  Users = require('./model/userdb.js');
  User = require('./controller/users');

app.engine('mustache', mustache());

app.use(express.urlencoded());
app.use(express.static('public'));
app.use(session({secret: 'dogs' }));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async(username, done) => {
  try {
    done(null, await Users.getUser(username));
  } catch (e) {
    done(e);
  }
})

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.loginValidation(Users, username, password);
      done(null, user);
    } catch (e) {
      done(e, undefined, { message: 'Username or password is incorrect.' });
    }
  }
))

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/open',
    failureRedirect: '/login',
    failureFlash: true,
  })
);
app.get('/login', (req, res) => {
  res.render("login")
})

// app.get('/open', (req, res) => {
//   if (req.isAuthenticated()) {
//     try {
//       const list = await Tickets.getAllTickets();
//       res.render("opentickets", {
//         "tickets": list
//       });
//     } catch (e) {
//       console.log(`Error:` (e));
//     }
//   } else {
//     res.redirect('/login');
//   }
// });

app.get('/resolved', (req, res) => {
  res.render("resolvedtickets")
})

app.get('/closed', (req, res) => {
  res.render("closedtickets")
})

app.get('/comments', (req, res) => {
  res.render("comments")
})

app.listen(app.get('port'), () => {
  console.log('Express started at port 3000, ctrl^c to stop')
})