class UserDb {
    constructor(userDB) {
        this.db = userDB;
    }

    async createUser(username, password, organisationId, salt) {
        const user = await this.getUser(username);
        if (user !== null) {
            throw new Error('User exists in datastore');
        }
        this.db.insert({ username, password, organisationId, salt });
    }

    async getUser(username) {
        return new Promise(( res, rej) => {
            this.db.findOne({ username }, (err, doc) => {
                if (err) {
                    rej(err);
                    return;
                }
                res(doc);
            });
        });
    }
}

module.exports = UserDb;
