/**
 * @fileoverview gRPC-Web generated client stub for jwt
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.jwt = require('./jwt_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.jwt.JwtSenderClient =
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
proto.jwt.JwtSenderPromiseClient =
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
 *   !proto.jwt.JwtRequest,
 *   !proto.jwt.JwtReply>}
 */
const methodDescriptor_JwtSender_SendJwt = new grpc.web.MethodDescriptor(
  '/jwt.JwtSender/SendJwt',
  grpc.web.MethodType.UNARY,
  proto.jwt.JwtRequest,
  proto.jwt.JwtReply,
  /**
   * @param {!proto.jwt.JwtRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.jwt.JwtReply.deserializeBinary
);


/**
 * @param {!proto.jwt.JwtRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.jwt.JwtReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.jwt.JwtReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.jwt.JwtSenderClient.prototype.sendJwt =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/jwt.JwtSender/SendJwt',
      request,
      metadata || {},
      methodDescriptor_JwtSender_SendJwt,
      callback);
};


/**
 * @param {!proto.jwt.JwtRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.jwt.JwtReply>}
 *     Promise that resolves to the response
 */
proto.jwt.JwtSenderPromiseClient.prototype.sendJwt =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/jwt.JwtSender/SendJwt',
      request,
      metadata || {},
      methodDescriptor_JwtSender_SendJwt);
};


module.exports = proto.jwt;

