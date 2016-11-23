'use strict';

const Joi = require('joi'),
    appHandler = require('../handlers/appHandler');

module.exports = function (server) {
    // read
    server.route({
        method: 'get',
        path: '/v1/feeds',
        config: {
            handler: appHandler.getFeeds,
            description: 'GET all available feeds',
            notes: 'Returns a list of feeds',
            tags: ['api'],
            validate: {
                //No input to validat 
            }
        }
    });
    //read
    server.route({
        method: 'get',
        path: '/v1/feeds/{feedId}',
        config: {
            handler: appHandler.getFeed,
            description: 'GET feed for given id',
            notes: 'Returns a feed',
            tags: ['api'],
            validate: {
                params: {
                    feedId: Joi.string()
                }
            }
        }
    });
    //write 
    server.route({
        method: 'post',
        path: '/v1/feed',
        config: {
            handler: appHandler.createFeed,
            description: 'Create a new feed',
            notes: 'Returns a newly created feed',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    feedId: Joi.string(),
                    feedDesc: Joi.string()
                }),
            }
        }
    });
}