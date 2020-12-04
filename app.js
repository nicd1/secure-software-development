var express = require('express'),
  router = express.Router(),
  mustache = require('mustache-express'),
  path = require('path'),
  app = express(),
  Datastore = require('nedb'),
  passport = require('passport'),
  session = require('express-session'),
  bodyParser = require('body-parser');
  LocalStrategy = require('passport-local').Strategy,
  PassportConfig = require('./config/passport'),
  UserDb = require('./model/userdb.js'),
  TicketDb = require('./model/ticketdb.js'),
  UserController = require('./controller/users'),
  Ticket = require('./controller/tickets');

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

var userDB = new Datastore({ filename: 'users.nedb.db', autoload: true });
var ticketDB = new Datastore({ filename: 'tickets.nedb.db', autoload: true });

const users = new UserDb(userDB);
UserController.init(users);

const tickets = new TicketDb(ticketDB);
Ticket.init(tickets);

PassportConfig.initPassport(users, tickets);

app.use('/',     require('./routes/index'));
app.use('/auth', require('./routes/authentication').createRouter( passport, users ) );


app.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

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