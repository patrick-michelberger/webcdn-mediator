/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Timing = require('./timing.model');

exports.register = function(socket) {
  Timing.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Timing.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('timing:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('timing:remove', doc);
}