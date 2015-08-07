'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HostSchema = new Schema({
  uuid: String,
  active: {
  	type: Boolean, 
  	default: false
  },
  performance: {}
});

module.exports = mongoose.model('Host', HostSchema);