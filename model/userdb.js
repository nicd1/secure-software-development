class UserDb {
    constructor(userDB) {
        this.db = userDB;
    }

    async createUser(instance, username, password, organisationId) {
        const user = await this.getUser(username);
        if (user !== null) {
            throw new Error('User exists in datastore');
        }
        this.db.insert({ username, password, organisationId });
    }

    async getUser(username) {
        return new Promise(( res, rej ) => {
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
