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


	// This code won't work due to me using a Debian virtual environment - I can't access the GitHub API or Passport API to do this.
	// This is code should theoretically work in a normal environment (but not here)
	// passport.use('github-auth', new GithubStrategy ({
	// 	consumerKey: GITHUB_CONSUMER_KEY,
	// 	consumerSecret: GITHUB_CONSUMBER_SECRET,
	// 	callbackURL: "http://www.example.com/connect/github/callback",
	// 	passReqToCallback: true
	// },
	// function(token, tokenSecret, profile, done){
	// 	Account.findOne({ domain: 'github.com', uid: client_id }, function(err, account) {
	// 		if(err) { return done(err); }
	// 		if (account) { return done(null, account); }
			
	// 		var account = new Account();
	// 		account.domain = 'github.com';
	// 		account.uid = client_id;
	// 		var t = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret } };

	// 		account.tokens.push(t);
	// 		return done (null,account);
	// 		});
	// 	}
	// ));
}

exports = module.exports = {}
module.exports.initPassport = initPassport;