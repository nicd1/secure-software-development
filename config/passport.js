var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var bcrypt = require("bcrypt");

let UserController = require("../controller/users");

/** @type {UserDb} */
let UserDb = null;
/** @type {TicketDb} */
let TicketDb = null;


passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
	try {
		done(null, await UserDb.getUser(username));
	} catch (e) {
		done(e);
	}
});

passport.use(
	new LocalStrategy(async function (username, password, done) {
		try {
			const user = await UserController.loginValidation(UserDb, username, password);
			done(null, user);
		} catch (e) {
			done(e, undefined, { message: "Username or password is incorrect." });
		}
	})
);


function initPassport(userDb, ticketDb) {
  UserDb = userDb;
  TicketDb = ticketDb;
}

exports.initPassport = initPassport;