var express = require('express'),
    router = express.Router(),
    controllerTickets = require('../controller/tickets')

function createRouter(passport, DbInstance) {
    var controller = new controllerTickets.TicketControllerClass(passport, DbInstance);

    // /all            -> View all tickets
    // /view/:ticketId -> View ticket

    // var ticketId = req.params['ticketId']
    // dbInsatnce.Tickets.findTicket(ticketId);

    // Viewing /tickets, make the urls something like this:
    // mustache: <a href="/tickets/view/{{ticketId}}"> View Ticket </a>

    register( router, controller, router.get, '/comments', controller.ViewAllComments );

    return router;
}

function register(router, controller, routerFn, path, controllerFn) {
    routerFn.call(
        router, path, 
        (req,res,next) => controllerFn.call(controller, req, res, next));
}

exports = module.exports = {}
module.exports.createRouter = createRouter;