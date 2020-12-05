var 
    UserDb = require('./model/userdb.js'),
    TicketDb = require('./model/ticketdb.js'),
    Datastore = require('nedb');

class DbInstance {
    Users = null;
    Tickets = null;

    constructor() {
        this.Users   = new UserDb(new Datastore({ filename: 'users.nedb.db', autoload: true }));
        this.Tickets = new TicketDb(new Datastore({ filename: 'tickets.nedb.db', autoload: true }));
    }
}


exports = module.exports = {}
module.exports.DbInstanceClass = DbInstance;