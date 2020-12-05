class TicketController {
    passport = null;
    userDb = null;

    constructor (passport, userDb) {
        this.passport = passport;
        this.userDb = userDb;
    }

    async ViewAllTickets(req, res, next) {

        // getTicket(ticketNo) {
        //     return new Promise(( res, rej) => {
        //         this.db.findOne({ ticketNo }, (err, doc) => {
        //             if (err) {
        //                 rej(err);
        //                 return;
        //             }
        //             res(doc);
        //         });
        //     });
        // }
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
// exports.init = init;
exports.TicketControllerClass = TicketController;
