'use strict';

let Feed = require('../models/feed');

//exports
module.exports = {

    getFeeds: function (request, reply) {
        let resultFeed = {};
        resultFeed.data = [];
        for (var i = 0; i < 5; i++) {
            let feed = new Feed;
            feed.feedId = "ABC" + Math.round(Math.random() * 1000);
            feed.feedDesc = "this is feed description for " + feed.feedId;
            resultFeed.data.push(feed);
        }

        reply(resultFeed);
    },
    getFeed: function (request, reply) {
        let feedId = request.params.feedId;
        let feed = new Feed;
        feed.feedId = feedId;
        feed.feedDesc = "this is feed description";
        reply(feed);
    },
    createFeed: function (request, reply) {

        let feed = request.payload;
        feed.feedId = feed.feedId;
        feed.feedDesc = feed.feedDesc;
        reply(feed);
    }





}