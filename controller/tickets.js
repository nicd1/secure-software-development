async function init(instance) {
    await createTicket(instance, 'Matt Damon', 'development', '0001', '04/12/2020', Date.now(), 'Description of Ticket', 'Jason Bourne', 'high', 'open', '0001').catch(error => {});
    await createTicket(instance, 'John Travolta', 'test', '0002', '02/12/2020', Date.now(), 'Description of Ticket', 'Matt Murdock', 'low', 'resolved', '0002').catch(error => {});
    await createTicket(instance, 'Harry Peter', 'development', '0003', '01/11/2020', Date.now(), 'Description of Ticket', 'Julie Smith', 'high', 'closed', '0001').catch(error => {});
}

async function createTicket(instance, assignedUser, type, ticketNo, date, ticketTimestamp, description, bugFinder, priority, currentStatus, orgnaisationId) {
    const ticket = await this.addTicket(ticketNo);

    if (ticket !== null)
        throw new Error('Post exists');
    
    return await instance.createTicket(instance, assignedUser, 
        type, ticketNo, date, ticketTimestamp, description, 
        bugFinder, priority, currentStatus, orgnaisationId)
};

//===============================================================

class TicketController {
    passport = null;
    userDb = null;

    constructor (passport, userDb) {
        this.passport = passport;
        this.userDb = userDb;
    }

    async ViewAllTickets(req, res, next) {
        // todo: view all tickets
    }

    async ViewTicket( req, res, next ) {
        // var ticketId = req.params['ticketId']
        // var ticket = dbInstance.Tickets.findTicket(ticketId);
        
        // if (ticket) { DO ERROR MESSAGES }

        // // If no comments return empty array
        // var comments = dbInstance.Comments.findForTicket(ticketId) || [];
        // 
        // res.render( 'tickets-view', { ticket, comments } )

        // in the view:
        //   -> Lookup how to render loops (For the comments)
        //   -> Render the ticket information
        //   <h1> Ticket: {{ ticket.name }} </h1>
    }
    
}




exports = module.exports = {}
exports.init = init;
exports.TicketControllerClass = TicketController;
