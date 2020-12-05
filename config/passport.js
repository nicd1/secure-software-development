var LocalStrategy = require("passport-local").Strategy,
	passport = require("passport"),
	bcrypt = require("bcrypt");

var dbInstance = null;

async function validateUserLogin(username, password) {
	const user = await dbInstance.Users.getUser(username);
    if (user == null || user === undefined) 
        return null;
    
    if (await bcrypt.compare(password, user.password)) 
        return user;
    
    return null;
}

function initPassport(DbInstance) {
	dbInstance = DbInstance;

	passport.serializeUser((user, done) => {
		done(null, user.username);
	});

	passport.deserializeUser(async (username, done) => {
		try {
			done(null, await dbInstance.Users.getUser(username));
		} catch (e) {
			done(e);
		}
	});

	passport.use(
		new LocalStrategy(async function (username, password, done) {
			try {
				const user = await validateUserLogin(username, password);
				done(null, user);
			} catch (e) {
				done(e, undefined, { message: "Username or password is incorrect." });
			}
		})
	);
}

exports = module.exports = {}
module.exports.initPassport = initPassport;