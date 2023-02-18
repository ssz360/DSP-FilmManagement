// package: conversion
// file: proto/conversion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ConversionRequest extends jspb.Message { 

    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): MetadataRequest | undefined;
    setMeta(value?: MetadataRequest): ConversionRequest;

    hasFile(): boolean;
    clearFile(): void;
    getFile(): Uint8Array | string;
    getFile_asU8(): Uint8Array;
    getFile_asB64(): string;
    setFile(value: Uint8Array | string): ConversionRequest;

    getRequestOneofCase(): ConversionRequest.RequestOneofCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConversionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ConversionRequest): ConversionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConversionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConversionRequest;
    static deserializeBinaryFromReader(message: ConversionRequest, reader: jspb.BinaryReader): ConversionRequest;
}

export namespace ConversionRequest {
    export type AsObject = {
        meta?: MetadataRequest.AsObject,
        file: Uint8Array | string,
    }

    export enum RequestOneofCase {
        REQUEST_ONEOF_NOT_SET = 0,
        META = 1,
        FILE = 2,
    }

}

export class MetadataRequest extends jspb.Message { 
    getFileTypeOrigin(): string;
    setFileTypeOrigin(value: string): MetadataRequest;
    getFileTypeTarget(): string;
    setFileTypeTarget(value: string): MetadataRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MetadataRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MetadataRequest): MetadataRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MetadataRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MetadataRequest;
    static deserializeBinaryFromReader(message: MetadataRequest, reader: jspb.BinaryReader): MetadataRequest;
}

export namespace MetadataRequest {
    export type AsObject = {
        fileTypeOrigin: string,
        fileTypeTarget: string,
    }
}

export class ConversionReply extends jspb.Message { 

    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): MetadataReply | undefined;
    setMeta(value?: MetadataReply): ConversionReply;

    hasFile(): boolean;
    clearFile(): void;
    getFile(): Uint8Array | string;
    getFile_asU8(): Uint8Array;
    getFile_asB64(): string;
    setFile(value: Uint8Array | string): ConversionReply;

    getRequestOneofCase(): ConversionReply.RequestOneofCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConversionReply.AsObject;
    static toObject(includeInstance: boolean, msg: ConversionReply): ConversionReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConversionReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConversionReply;
    static deserializeBinaryFromReader(message: ConversionReply, reader: jspb.BinaryReader): ConversionReply;
}

export namespace ConversionReply {
    export type AsObject = {
        meta?: MetadataReply.AsObject,
        file: Uint8Array | string,
    }

    export enum RequestOneofCase {
        REQUEST_ONEOF_NOT_SET = 0,
        META = 1,
        FILE = 2,
    }

}

export class MetadataReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): MetadataReply;
    getError(): string;
    setError(value: string): MetadataReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MetadataReply.AsObject;
    static toObject(includeInstance: boolean, msg: MetadataReply): MetadataReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MetadataReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MetadataReply;
    static deserializeBinaryFromReader(message: MetadataReply, reader: jspb.BinaryReader): MetadataReply;
}

export namespace MetadataReply {
    export type AsObject = {
        success: boolean,
        error: string,
    }
}
