'use strict';

module.exports = function (server) {
    // read
    server.route({
        method: 'get',
        path: '/',
        handler: function (request, reply) {
            return reply.redirect('/documentation');
        }

    });

}