import * as fs from "fs";
import path from "path";
import { ConverterClient } from "../proto/conversion_grpc_pb";

class GprcServices {
  // ************************************************************ GRPC ***********************************

  PROTO_PATH = path.resolve(__dirname, "../", "proto/conversion.proto");

  grpc = require("@grpc/grpc-js");
  protoLoader = require("@grpc/proto-loader");

  packageDefinition = this.protoLoader.loadSync(this.PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  protoDescriptor = this.grpc.loadPackageDefinition(this.packageDefinition);
  Converter = this.protoDescriptor.conversion.Converter;

  grpcClient: ConverterClient = new this.Converter(
    "localhost:50051",
    this.grpc.credentials.createInsecure()
  );
  channel = this.grpcClient.getChannel();

  // ***********************************************************************************************

  convertImages(
    sourcePath: string,
    destinationPath: string,
    sourceType: string,
    destinationType: string
  ) {
    return new Promise((resolve, reject) => {
      try {
        const remoteConverter = this.grpcClient.fileConvert();

        let bytes = fs.readFileSync(sourcePath);

        // grpc just accept Uint8Array
        let arrayBuffer = new Uint8Array(bytes.buffer);

        // ************ I don't know why this dows not work **************

        // let conr = new ConversionRequest();
        // conr.setFile(arrayBuffer);

        // let metaR = new MetadataRequest();
        // metaR = metaR.setFileTypeOrigin("jpg");
        // metaR = metaR.setFileTypeTarget("gif");
        // conr.setMeta(metaR);
        // remoteConverter.write(conr, (e: any, res: any) => {
        //   console.log(e, res);
        // });

        //// ************* This Works **********

        let rc = remoteConverter as any;
        rc.write(
          {
            meta: {
              file_type_origin: sourceType,
              file_type_target: destinationType,
            },
          },
          (err: any, response: any) => {
            console.log(err, response);
          }
        );

        rc.write(
          {
            file: arrayBuffer,
          },
          (err: any, response: any) => {
            console.log(err, response);
          }
        );

        var stream = fs.createWriteStream(destinationPath);

        remoteConverter.end().on("data", function (data) {
          if (data.request_oneof === "meta") {
            console.log(data.meta);
          } else if (data.request_oneof === "file") {
            stream.write(data.file);
          } else {
            console.log(data);
          }
        });

        remoteConverter.end().on("end", function (data: any) {
          stream.end();
          resolve(data);
        });
      } catch (error) {
        reject();
      }
    });
  }
}

export default GprcServices;
