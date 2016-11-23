'use strict';

const log = require('../config/logger'),
    Feed = require('../models/feed');

//exports
module.exports = {

    getFeeds: function (request, reply) {
        const resultFeed = {};
        resultFeed.data = [];
        for (var i = 0; i < 5; i++) {
            const feed = new Feed;
            feed.feedId = "ABC" + Math.round(Math.random() * 1000);
            feed.feedDesc = "this is feed description for " + feed.feedId;
            resultFeed.data.push(feed);
        }
        log.debug({
            resultFeed: resultFeed
        }, 'feeds result');
        reply(resultFeed);
    },
    getFeed: function (request, reply) {
        const feedId = request.params.feedId;
        const feed = new Feed;
        feed.feedId = feedId;
        feed.feedDesc = "this is feed description";
        reply(feed);
    },
    createFeed: function (request, reply) {
            const reqData = request.payload;
            const feed = new Feed;
            feed.feedId = reqData.feedId;
            feed.feedDesc = reqData.feedDesc;
            reply(feed);
        } //end of handler methods
}; //end of module exports