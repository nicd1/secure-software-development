const bcrypt = require('bcrypt');

async function init(instance) {
    await createUser(instance, 'user1', 'user1', '0001').catch(error => {});
    await createUser(instance, 'user2', 'user2', '0001').catch(error => {});
    await createUser(instance, 'user3', 'user3', '0002').catch(error => {});
}

async function createUser(instance, username, password, organisationId) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return await instance.createUser(username, hashed, organisationId, salt);
}

async function loginValidation(UserDb, username, password) {
    const user = await UserDb.getUser(username);
    if (user == null || user === undefined) 
        return null;
    
    if (await bcrypt.compare(password, user.password)) 
        return user;
    
    return null;
}

class UserController {
    passport = null;
    userDb = null;

    constructor (passport, userDb) {
        this.passport = passport;
        this.userDb = userDb;
    }

    
}

exports.UserControllerClass = UserController;
exports.loginValidation = loginValidation;
exports.init = init;