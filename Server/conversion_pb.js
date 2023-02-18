// source: conversion.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.conversion.ConversionReply', null, global);
goog.exportSymbol('proto.conversion.ConversionReply.RequestOneofCase', null, global);
goog.exportSymbol('proto.conversion.ConversionRequest', null, global);
goog.exportSymbol('proto.conversion.ConversionRequest.RequestOneofCase', null, global);
goog.exportSymbol('proto.conversion.MetadataReply', null, global);
goog.exportSymbol('proto.conversion.MetadataRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.conversion.ConversionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.conversion.ConversionRequest.oneofGroups_);
};
goog.inherits(proto.conversion.ConversionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.conversion.ConversionRequest.displayName = 'proto.conversion.ConversionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.conversion.MetadataRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.conversion.MetadataRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.conversion.MetadataRequest.displayName = 'proto.conversion.MetadataRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.conversion.ConversionReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.conversion.ConversionReply.oneofGroups_);
};
goog.inherits(proto.conversion.ConversionReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.conversion.ConversionReply.displayName = 'proto.conversion.ConversionReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.conversion.MetadataReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.conversion.MetadataReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.conversion.MetadataReply.displayName = 'proto.conversion.MetadataReply';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.conversion.ConversionRequest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.conversion.ConversionRequest.RequestOneofCase = {
  REQUEST_ONEOF_NOT_SET: 0,
  META: 1,
  FILE: 2
};

/**
 * @return {proto.conversion.ConversionRequest.RequestOneofCase}
 */
proto.conversion.ConversionRequest.prototype.getRequestOneofCase = function() {
  return /** @type {proto.conversion.ConversionRequest.RequestOneofCase} */(jspb.Message.computeOneofCase(this, proto.conversion.ConversionRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.conversion.ConversionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.conversion.ConversionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.conversion.ConversionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.ConversionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    meta: (f = msg.getMeta()) && proto.conversion.MetadataRequest.toObject(includeInstance, f),
    file: msg.getFile_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.conversion.ConversionRequest}
 */
proto.conversion.ConversionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.conversion.ConversionRequest;
  return proto.conversion.ConversionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.conversion.ConversionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.conversion.ConversionRequest}
 */
proto.conversion.ConversionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.conversion.MetadataRequest;
      reader.readMessage(value,proto.conversion.MetadataRequest.deserializeBinaryFromReader);
      msg.setMeta(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFile(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.conversion.ConversionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.conversion.ConversionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.conversion.ConversionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.ConversionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMeta();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.conversion.MetadataRequest.serializeBinaryToWriter
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional MetadataRequest meta = 1;
 * @return {?proto.conversion.MetadataRequest}
 */
proto.conversion.ConversionRequest.prototype.getMeta = function() {
  return /** @type{?proto.conversion.MetadataRequest} */ (
    jspb.Message.getWrapperField(this, proto.conversion.MetadataRequest, 1));
};


/**
 * @param {?proto.conversion.MetadataRequest|undefined} value
 * @return {!proto.conversion.ConversionRequest} returns this
*/
proto.conversion.ConversionRequest.prototype.setMeta = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.conversion.ConversionRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.conversion.ConversionRequest} returns this
 */
proto.conversion.ConversionRequest.prototype.clearMeta = function() {
  return this.setMeta(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.conversion.ConversionRequest.prototype.hasMeta = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes file = 2;
 * @return {!(string|Uint8Array)}
 */
proto.conversion.ConversionRequest.prototype.getFile = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes file = 2;
 * This is a type-conversion wrapper around `getFile()`
 * @return {string}
 */
proto.conversion.ConversionRequest.prototype.getFile_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFile()));
};


/**
 * optional bytes file = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFile()`
 * @return {!Uint8Array}
 */
proto.conversion.ConversionRequest.prototype.getFile_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFile()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.conversion.ConversionRequest} returns this
 */
proto.conversion.ConversionRequest.prototype.setFile = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.conversion.ConversionRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.conversion.ConversionRequest} returns this
 */
proto.conversion.ConversionRequest.prototype.clearFile = function() {
  return jspb.Message.setOneofField(this, 2, proto.conversion.ConversionRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.conversion.ConversionRequest.prototype.hasFile = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.conversion.MetadataRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.conversion.MetadataRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.conversion.MetadataRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.MetadataRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fileTypeOrigin: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fileTypeTarget: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.conversion.MetadataRequest}
 */
proto.conversion.MetadataRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.conversion.MetadataRequest;
  return proto.conversion.MetadataRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.conversion.MetadataRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.conversion.MetadataRequest}
 */
proto.conversion.MetadataRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFileTypeOrigin(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFileTypeTarget(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.conversion.MetadataRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.conversion.MetadataRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.conversion.MetadataRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.MetadataRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFileTypeOrigin();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFileTypeTarget();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string file_type_origin = 1;
 * @return {string}
 */
proto.conversion.MetadataRequest.prototype.getFileTypeOrigin = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.conversion.MetadataRequest} returns this
 */
proto.conversion.MetadataRequest.prototype.setFileTypeOrigin = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string file_type_target = 2;
 * @return {string}
 */
proto.conversion.MetadataRequest.prototype.getFileTypeTarget = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.conversion.MetadataRequest} returns this
 */
proto.conversion.MetadataRequest.prototype.setFileTypeTarget = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.conversion.ConversionReply.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.conversion.ConversionReply.RequestOneofCase = {
  REQUEST_ONEOF_NOT_SET: 0,
  META: 1,
  FILE: 2
};

/**
 * @return {proto.conversion.ConversionReply.RequestOneofCase}
 */
proto.conversion.ConversionReply.prototype.getRequestOneofCase = function() {
  return /** @type {proto.conversion.ConversionReply.RequestOneofCase} */(jspb.Message.computeOneofCase(this, proto.conversion.ConversionReply.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.conversion.ConversionReply.prototype.toObject = function(opt_includeInstance) {
  return proto.conversion.ConversionReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.conversion.ConversionReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.ConversionReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    meta: (f = msg.getMeta()) && proto.conversion.MetadataReply.toObject(includeInstance, f),
    file: msg.getFile_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.conversion.ConversionReply}
 */
proto.conversion.ConversionReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.conversion.ConversionReply;
  return proto.conversion.ConversionReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.conversion.ConversionReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.conversion.ConversionReply}
 */
proto.conversion.ConversionReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.conversion.MetadataReply;
      reader.readMessage(value,proto.conversion.MetadataReply.deserializeBinaryFromReader);
      msg.setMeta(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFile(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.conversion.ConversionReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.conversion.ConversionReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.conversion.ConversionReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.ConversionReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMeta();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.conversion.MetadataReply.serializeBinaryToWriter
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional MetadataReply meta = 1;
 * @return {?proto.conversion.MetadataReply}
 */
proto.conversion.ConversionReply.prototype.getMeta = function() {
  return /** @type{?proto.conversion.MetadataReply} */ (
    jspb.Message.getWrapperField(this, proto.conversion.MetadataReply, 1));
};


/**
 * @param {?proto.conversion.MetadataReply|undefined} value
 * @return {!proto.conversion.ConversionReply} returns this
*/
proto.conversion.ConversionReply.prototype.setMeta = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.conversion.ConversionReply.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.conversion.ConversionReply} returns this
 */
proto.conversion.ConversionReply.prototype.clearMeta = function() {
  return this.setMeta(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.conversion.ConversionReply.prototype.hasMeta = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes file = 2;
 * @return {!(string|Uint8Array)}
 */
proto.conversion.ConversionReply.prototype.getFile = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes file = 2;
 * This is a type-conversion wrapper around `getFile()`
 * @return {string}
 */
proto.conversion.ConversionReply.prototype.getFile_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFile()));
};


/**
 * optional bytes file = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFile()`
 * @return {!Uint8Array}
 */
proto.conversion.ConversionReply.prototype.getFile_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFile()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.conversion.ConversionReply} returns this
 */
proto.conversion.ConversionReply.prototype.setFile = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.conversion.ConversionReply.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.conversion.ConversionReply} returns this
 */
proto.conversion.ConversionReply.prototype.clearFile = function() {
  return jspb.Message.setOneofField(this, 2, proto.conversion.ConversionReply.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.conversion.ConversionReply.prototype.hasFile = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.conversion.MetadataReply.prototype.toObject = function(opt_includeInstance) {
  return proto.conversion.MetadataReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.conversion.MetadataReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.MetadataReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    error: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.conversion.MetadataReply}
 */
proto.conversion.MetadataReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.conversion.MetadataReply;
  return proto.conversion.MetadataReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.conversion.MetadataReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.conversion.MetadataReply}
 */
proto.conversion.MetadataReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.conversion.MetadataReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.conversion.MetadataReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.conversion.MetadataReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.conversion.MetadataReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.conversion.MetadataReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.conversion.MetadataReply} returns this
 */
proto.conversion.MetadataReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string error = 2;
 * @return {string}
 */
proto.conversion.MetadataReply.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.conversion.MetadataReply} returns this
 */
proto.conversion.MetadataReply.prototype.setError = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.conversion);
