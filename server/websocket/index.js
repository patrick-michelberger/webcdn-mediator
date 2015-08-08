'use strict';

/**
 * Module dependencies.
 */

var WebSocketServer = require('websocket').server;
var http = require('http');

/**
 * Initialize `Server`
 * @api private
 */
var Server = function() {
    this.init();
};

Server.prototype.init = function() {

    // HTTP SERVER
    var server = http.createServer(function(request, response) {});
    server.listen(1337, function() {
        console.log((new Date()) + " server is listening on port " + 1337);
    });

    // WEBSOCKET SERVER
    var wsServer = new WebSocketServer({
        httpServer: server
    });

    // EVENTS
    wsServer.on('request', function(request) {
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        var connection = request.accept(null, request.origin);
    });

    this._wsServer = wsServer;
};

/**
 * Expose `Server`.
 */

module.exports = Server;
