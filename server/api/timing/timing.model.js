'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimingSchema = new Schema({
	data: {},
	page_load: Number
});

module.exports = mongoose.model('Timing', TimingSchema);