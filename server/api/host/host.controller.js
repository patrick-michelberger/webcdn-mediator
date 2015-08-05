'use strict';

var _ = require('lodash');
var Host = require('./host.model');

// Get list of hosts
exports.index = function(req, res) {
  Host.find(function (err, hosts) {
    if(err) { return handleError(res, err); }
    return res.json(200, hosts);
  });
};

// Get a single host
exports.show = function(req, res) {
  Host.findById(req.params.id, function (err, host) {
    if(err) { return handleError(res, err); }
    if(!host) { return res.send(404); }
    return res.json(host);
  });
};

// Creates a new host in the DB.
exports.create = function(req, res) {
  Host.create(req.body, function(err, host) {
    if(err) { return handleError(res, err); }
    return res.json(201, host);
  });
};

// Updates an existing host in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Host.findById(req.params.id, function (err, host) {
    if (err) { return handleError(res, err); }
    if(!host) { return res.send(404); }
    var updated = _.merge(host, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, host);
    });
  });
};

// Deletes a host from the DB.
exports.destroy = function(req, res) {
  Host.findById(req.params.id, function (err, host) {
    if(err) { return handleError(res, err); }
    if(!host) { return res.send(404); }
    host.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}