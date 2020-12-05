// async function init(instance) {
//     await createTicket(instance, 'Matt Damon', 'development', '0001', '04/12/2020', Date.now(), 'Description of Ticket', 'Jason Bourne', 'high', 'open', '0001').catch(error => {});
//     await createTicket(instance, 'John Travolta', 'test', '0002', '02/12/2020', Date.now(), 'Description of Ticket', 'Matt Murdock', 'low', 'resolved', '0002').catch(error => {});
//     await createTicket(instance, 'Harry Peter', 'development', '0003', '01/11/2020', Date.now(), 'Description of Ticket', 'Julie Smith', 'high', 'closed', '0001').catch(error => {});
// }

// async function createTicket(instance, assignedUser, type, ticketNo, date, ticketTimestamp, description, bugFinder, priority, currentStatus, orgnaisationId) {
//     const ticket = await this.addTicket(ticketNo);

//     if (ticket !== null)
//         throw new Error('Post exists');
    
//     return await instance.createTicket(instance, assignedUser, 
//         type, ticketNo, date, ticketTimestamp, description, 
//         bugFinder, priority, currentStatus, orgnaisationId)
// }
