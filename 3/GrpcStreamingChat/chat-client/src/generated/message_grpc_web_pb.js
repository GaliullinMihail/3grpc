/**
 * @fileoverview gRPC-Web generated client stub for chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.chat = require('./message_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatServerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatServerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.ClientMessage,
 *   !proto.chat.ServerMessage>}
 */
const methodDescriptor_ChatServer_GetServerStream = new grpc.web.MethodDescriptor(
  '/chat.ChatServer/GetServerStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.chat.ClientMessage,
  proto.chat.ServerMessage,
  /**
   * @param {!proto.chat.ClientMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.ServerMessage.deserializeBinary
);


/**
 * @param {!proto.chat.ClientMessage} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.ServerMessage>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServerClient.prototype.getServerStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.ChatServer/GetServerStream',
      request,
      metadata || {},
      methodDescriptor_ChatServer_GetServerStream);
};


/**
 * @param {!proto.chat.ClientMessage} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.ServerMessage>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServerPromiseClient.prototype.getServerStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.ChatServer/GetServerStream',
      request,
      metadata || {},
      methodDescriptor_ChatServer_GetServerStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.ClientMessage,
 *   !proto.chat.Empty>}
 */
const methodDescriptor_ChatServer_SendMessage = new grpc.web.MethodDescriptor(
  '/chat.ChatServer/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.chat.ClientMessage,
  proto.chat.Empty,
  /**
   * @param {!proto.chat.ClientMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.Empty.deserializeBinary
);


/**
 * @param {!proto.chat.ClientMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.chat.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServerClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.ChatServer/SendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatServer_SendMessage,
      callback);
};


/**
 * @param {!proto.chat.ClientMessage} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.Empty>}
 *     Promise that resolves to the response
 */
proto.chat.ChatServerPromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.ChatServer/SendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatServer_SendMessage);
};


module.exports = proto.chat;

