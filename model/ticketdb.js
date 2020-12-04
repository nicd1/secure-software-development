class TicketDb {
    constructor(ticketDB) {
        this.db = ticketDB;
    }

    async createTicket(assignedUser, type, ticketNo, date, ticketTimestamp, description, bugFinder, priority, currentStatus, orgnaisationId) {
        const ticket = await this.getTicket(ticketNo);
        if (ticket !== null) {
            throw new Error('Ticket number exists in datastore');
        }
        this.db.insert({ assignedUser, type, ticketNo, date, ticketTimestamp, description, bugFinder, priority, currentStatus, orgnaisationId });
    }

    getTicket(ticketNo) {
        return new Promise(( res, rej) => {
            this.db.findOne({ ticketNo }, (err, doc) => {
                if (err) {
                    rej(err);
                    return;
                }
                res(doc);
            });
        });
    }
}

module.exports = TicketDb;
