'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HostSchema = new Schema({
  "uuid": String,
  "active": {
  	"type": Boolean, 
  	"default": false
  },
  "performance": {},
  "resource_timing": [],
  "pc_connect_duration": [],
  "lookup_duration": []
});

module.exports = mongoose.model('Host', HostSchema);