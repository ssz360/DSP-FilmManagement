// package: conversion
// file: proto/conversion.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as proto_conversion_pb from "../proto/conversion_pb";

interface IConverterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    fileConvert: IConverterService_IfileConvert;
}

interface IConverterService_IfileConvert extends grpc.MethodDefinition<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply> {
    path: "/conversion.Converter/fileConvert";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<proto_conversion_pb.ConversionRequest>;
    requestDeserialize: grpc.deserialize<proto_conversion_pb.ConversionRequest>;
    responseSerialize: grpc.serialize<proto_conversion_pb.ConversionReply>;
    responseDeserialize: grpc.deserialize<proto_conversion_pb.ConversionReply>;
}

export const ConverterService: IConverterService;

export interface IConverterServer extends grpc.UntypedServiceImplementation {
    fileConvert: grpc.handleBidiStreamingCall<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply>;
}

export interface IConverterClient {
    fileConvert(): grpc.ClientDuplexStream<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply>;
    fileConvert(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply>;
    fileConvert(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply>;
}

export class ConverterClient extends grpc.Client implements IConverterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public fileConvert(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply>;
    public fileConvert(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<proto_conversion_pb.ConversionRequest, proto_conversion_pb.ConversionReply>;
}
