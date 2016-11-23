'use strict';

const bunyan = require('bunyan'),
    Pack = require('../../package');

const log = bunyan.createLogger({
    name: Pack.name,
    serializers: bunyan.stdSerializers
});

module.exports = log;