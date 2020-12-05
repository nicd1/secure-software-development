
// const users = [
//     { username: 'user1', password: 'user1', organisationId: '0001' },
//     { username: 'user2', password: 'user2', organisationId: '0002' },
//     { username: 'user3', password: 'user3', organisationId: '0003'}
// ];
const bcrypt = require('bcrypt');

// Example seeded users - only for test and not following secure password practice.
async function init(instance) {
    await createUser(instance, 'nic', 'nic', '0001').catch(error => {});
    await createUser(instance, 'user1', 'user1', '0002').catch(error => {});
    await createUser(instance, 'admin', 'admin', '0001').catch(error => {});
}

async function addUser(instance, username, password, organisationId) {
    const user = await this.addUser(username);
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    return await instance.createUser(username, hashed, salt, organisationId);

};

exports = module.exports = {}
exports.init = init;
exports.addUser = addUser;