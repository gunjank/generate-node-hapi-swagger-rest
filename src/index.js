'use strict';

const log = require('./config/logger'),
    path = require('path'),
    Lout = require('lout'),
    Good = require('good'),
    GoodFile = require('good-file'),
    bunyan = require('bunyan'),
    Hapi = require('hapi'),
    Inert = require('inert'),
    Vision = require('vision'),
    HapiSwagger = require('hapi-swagger'),
    Pack = require('../package'),
    settings = require('./config/settings'),
    appRoute = require(__dirname + '/routes/appRoute'),
    apiRoute = require(__dirname + '/routes/apiRoute');


/**
 * Construct the server
 */
const server = new Hapi.Server({
    connections: {
        routes: {
            cors: true,
            log: true
        },
        router: {
            stripTrailingSlash: true
        }
    }
});
log.info('server constructed');

/**
 * Create the connection
 */
server.connection({
    port: settings.port

});
//swagger info
const swaggerOptions = {
    info: {
        'title': 'API Documentation',
        'version': Pack.version
    }
};

server.register([Inert, Vision, {
    'register': HapiSwagger,
    'options': swaggerOptions
}], function (err) {
    if (err)
        log.info("Inert or Vision plugin failed, it will stop swagger");
});

/**
 * Build a logger for the server & each service
 */
const reporters = [new GoodFile({
    log: '*'
}, __dirname + '/../logs/server.log')];

//Static file serving - if you want to serve static files - keep all your static (html/js/etc.) inside below given path folder
server.route({
    method: 'get',
    path: '/{param*}',
    handler: {
        directory: {
            path: __dirname + '/../public',
            listing: true
        }
    }
});

/**
 * Add logging
 */
server.register({
    register: Good,
    options: {
        opsInterval: 1000,
        reporters: reporters
    }
}, function (err) {
    if (err)
        throw new Error(err);

    log.debug({
        reporters: reporters
    }, 'registered Good for logging with reporters');
});

/**
 * Add /docs route
 */
server.register({
    register: Lout
}, function (err) {
    if (err)
        throw new Error(err);
    log.info('added Lout for /docs');
});

/**
 * Start the server
 */

server.start(function (err) {
    if (err)
        throw new Error(err);
    log.info('server started!');
    const summary = server.connections.map(function (cn) {
        return {
            labels: cn.settings.labels,
            uri: cn.info.uri
        };
    });
    //initilize appRoute
    appRoute(server);
    //initilize apiRoute
    apiRoute(server);
    log.info({
        summary: summary
    }, 'Connection summary ');
    server.log('server', 'started: ' + JSON.stringify(summary));
});

module.exports = server;