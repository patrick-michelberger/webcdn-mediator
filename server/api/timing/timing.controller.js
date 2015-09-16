'use strict';

var _ = require('lodash');
var Timing = require('./timing.model');

// Get list of timings
exports.index = function(req, res) {
  Timing.find(function (err, timings) {
    if(err) { return handleError(res, err); }
    return res.json(200, timings);
  });
};

// Get a single timing
exports.show = function(req, res) {
  Timing.findById(req.params.id, function (err, timing) {
    if(err) { return handleError(res, err); }
    if(!timing) { return res.send(404); }
    return res.json(timing);
  });
};

// Creates a new timing in the DB.
exports.create = function(req, res) {
  Timing.create(req.body, function(err, timing) {
    if(err) { return handleError(res, err); }
    return res.json(201, timing);
  });
};

// Updates an existing timing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Timing.findById(req.params.id, function (err, timing) {
    if (err) { return handleError(res, err); }
    if(!timing) { return res.send(404); }
    var updated = _.merge(timing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, timing);
    });
  });
};

// Deletes a timing from the DB.
exports.destroy = function(req, res) {
  Timing.findById(req.params.id, function (err, timing) {
    if(err) { return handleError(res, err); }
    if(!timing) { return res.send(404); }
    timing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}