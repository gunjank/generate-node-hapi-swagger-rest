'use strict';

const Feed = function () {
    //constructor 
}
Feed.prototype.feedId = function (feedId) {
    this.feedId = feedId;
}
Feed.prototype.feedDesc = function (feedDesc) {
    this.feedDesc = feedDesc;
}

module.exports = Feed;