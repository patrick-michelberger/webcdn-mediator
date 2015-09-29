'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    "hash": String,
    "leecher": String,
    "seeder": String,
    "ws_connect": Number,
    "pc_connect": Number,
    "lookup": Number,
    "fetch": Number,
    "cdn_fallback": Number
});

module.exports = mongoose.model('Resource', ResourceSchema);
