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

var Host = require('../api/host/host.model');

var Server = function(settings) {
    if (!settings.httpServer) {
        console.log("httpServer property is missing");
        return;
    }
    this.httpServer = settings.httpServer;
    this.sockets = {};
    this.init();
};

Server.prototype.init = function() {
	var self = this;

    // WEBSOCKET SERVER
    var wsServer = new WebSocketServer({
        httpServer: this.httpServer
    });

    // EVENTS
    wsServer.on('request', function(request) {
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
        var connection = request.accept(null, request.origin);

        if (request.resourceURL && request.resourceURL.query) {
            // parse query information

            if (request.resourceURL.query.id) {
                // peer ID received
                var peer_id = request.resourceURL.query.id;
                connection.peerid = peer_id;
                self.sockets[peer_id] = connection;

            }

            connection.on('message', function(message) {
                if (message && message.utf8Data) {
                    var msg = JSON.parse(message.utf8Data);
                    var type = msg.type;
                    var data = msg.data;
                    switch (type) {
                        case "host:add":
                            addHost(data);
                            break;
                        case "host:remove":
                            removeHost(data.uuid);
                            break;
                    }
                }
            });

            connection.on('close', function(reasonCode, description) {
                // close user connection
                console.log((new Date()) + " Peer disconnected.");
                var connectionDeleted = false;
                for (var key in self.sockets) {
                    if (self.sockets[key] === connection) {
                    	removeHost(self.sockets[key].peerid);
                        delete self.sockets[key];
                        connectionDeleted = true;
                    }
                }
                if (!connectionDeleted) {
                    console.log("Delete disconnected peer fail");
                }
            });

        }
    });

    this._wsServer = wsServer;
};

var removeHost = function(uuid) {
    Host.findOne({
        uuid: uuid
    }, function(err, host) {
        if (err) {
            console.log("err: ", err);
        }
        if (host) {
            host.remove(function(err) {
                if (err) {
                    console.log("err: ", err);
                }
                console.log("Host removed: " + uuid);
            });
        }
    });
};

var addHost = function(data) {
    Host.create(data, function(err, host) {
        if (err) {
            console.log("err: ", err);
        }
        console.log("Host created: " + data.uuid);
    });
};

/**
 * Expose `Server`.
 */

module.exports = Server;
