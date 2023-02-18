import { ConverterClient } from "./proto/conversion_grpc_pb";
import {
  ConversionReply,
  ConversionRequest,
  MetadataRequest,
} from "./proto/conversion_pb";
import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import AuthService from "./services/auth.service";
import UserApi from "./api/user.api";
import FilmApi from "./api/film.api";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../REST APIs Design/openApi.json";

import * as fs from "fs";
import ReviewApi from "./api/review.api";
import InvitationApi from "./api/invitation.api";
import path from "path";
import GprcApi from "./api/gprc.api";
import { WebSocketServer, WebSocket } from "ws";
import WebsocketService from "./services/websocket.service";
import { MosquitoService } from "./services/mosquito.service";

// ************************************************************ GRPC ***********************************

var PROTO_PATH = __dirname + "/proto/conversion.proto";

var grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var Converter = protoDescriptor.conversion.Converter;

const grpcClient: ConverterClient = new Converter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const channel = grpcClient.getChannel();

// ************************************************************ Websocket ***********************************

const websocketSrv = new WebsocketService();

// ************************************************************** mosquito *********************************
const mosquitoSrv = new MosquitoService();
// ***********************************************************************************************

const app = express();
const port = 3001;

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(
  session({
    secret: "e5cd051bf11699ed58cffe96e1b73ca5",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.use("/images", express.static(path.join(__dirname, "images")));

// ****************** declare services *****************
const authSrv = new AuthService();
const userApis = new UserApi(app, authSrv, websocketSrv);
const filmApis = new FilmApi(app, websocketSrv, mosquitoSrv);
const reviewApis = new ReviewApi(app, mosquitoSrv);
const invitationsApis = new InvitationApi(app);
const gprcApis = new GprcApi(app);
// ****************** init services ********************
authSrv.init();
userApis.init();
filmApis.init();
reviewApis.init();
invitationsApis.init();
gprcApis.init();
// *****************************************************

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
