var Datastore = require('nedb');
var tickets = new Datastore({ filename: 'tickets.db', autoload: true });
var users = new Datastore({ filename: 'users.db', autoload: true });

