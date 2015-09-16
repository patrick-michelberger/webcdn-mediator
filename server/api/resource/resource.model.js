'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResourceSchema = new Schema({
	"hash": String,
	"uuid": String,
	"seeder": Number,
	"ws_connect_duration": Number,
	"lookup_duration": Number,
	"cdn_fallback_duration": Number,
	"pc_connect_duration": Number,
	"fetch_duration": Number,
	"sendImage_duration": Number,
	"total": Number
});

module.exports = mongoose.model('Resource', ResourceSchema);