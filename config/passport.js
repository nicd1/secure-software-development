var LocalStrategy = require('passport-local').Strategy;
    passport = require('passport'),
    bcrypt = require('bcrypt');
    User = require('../controller/users');


passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
  passport.deserializeUser(async(username, done) => {
    try {
      done(null, await TicketDb.getUser(username));
    } catch (e) {
      done(e);
    }
  })
  
  passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        const user = await User.loginValidation(TicketDb, username, password);
        done(null, user);
      } catch (e) {
        done(e, undefined, { message: 'Username or password is incorrect.' });
      }
    }
  ));