const bcrypt = require('bcryptjs');

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

async function loginValidation(instance, username, password) {
    const user = await instance.getUser(username);
    if (user === undefined) {
        return undefined;
    }
    if (await bcrypt.compare(password, user.password)) {
        return user;
    }
    throw new Error('invalid password');
}

exports.loginValidation = loginValidation;
exports.init = init;