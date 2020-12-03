const Datastore = require('nedb');

class UserDb {
    constructor(path, datastore) {
        this.db = datastore;

        if(path) {
            this.db = new datastore({ filename: path, autoload: true });
        } else {
            this.db = new Datastore({ filename: 'users.nedb.db', autoload: true});
        }
    }

    async createUser(username, password, organisationId, salt) {
        const user = await this.getUser(username);
        if (user !== null) {
            throw new Error('User exists in datastore');
        }
        this.db.insert({ username, password, organisationId, salt });
    }

    getUser(username) {
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
