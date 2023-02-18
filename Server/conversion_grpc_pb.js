// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var conversion_pb = require('./conversion_pb.js');

function serialize_conversion_ConversionReply(arg) {
  if (!(arg instanceof conversion_pb.ConversionReply)) {
    throw new Error('Expected argument of type conversion.ConversionReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversion_ConversionReply(buffer_arg) {
  return conversion_pb.ConversionReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversion_ConversionRequest(arg) {
  if (!(arg instanceof conversion_pb.ConversionRequest)) {
    throw new Error('Expected argument of type conversion.ConversionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversion_ConversionRequest(buffer_arg) {
  return conversion_pb.ConversionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The conversion service definition.
var ConverterService = exports.ConverterService = {
  fileConvert: {
    path: '/conversion.Converter/fileConvert',
    requestStream: true,
    responseStream: true,
    requestType: conversion_pb.ConversionRequest,
    responseType: conversion_pb.ConversionReply,
    requestSerialize: serialize_conversion_ConversionRequest,
    requestDeserialize: deserialize_conversion_ConversionRequest,
    responseSerialize: serialize_conversion_ConversionReply,
    responseDeserialize: deserialize_conversion_ConversionReply,
  },
};

exports.ConverterClient = grpc.makeGenericClientConstructor(ConverterService);
