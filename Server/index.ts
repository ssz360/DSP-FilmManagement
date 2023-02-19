import { ConverterClient } from "./proto/conversion_grpc_pb";
import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import AuthService from "./services/auth.service";
import UserApi from "./api/user.api";
import FilmApi from "./api/film.api";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../REST APIs Design/openApi.json";

import ReviewApi from "./api/review.api";
import InvitationApi from "./api/invitation.api";
import path from "path";
import GprcApi from "./api/gprc.api";
import WebsocketService from "./services/websocket.service";
import { MosquitoService } from "./services/mosquito.service";
import { ValidationError, Validator } from "express-json-validator-middleware";

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
// *************************************************************** validator ********************************

const validator = new Validator({
  verbose: true,
  schemas: [
    require("./json_schemas/date.schema.json"),
    require("./json_schemas/filmModel.schema.json"),
    require("./json_schemas/invitationModel.schema.json"),
    require("./json_schemas/mediaModel.schema.json"),
    require("./json_schemas/mqttFilmActiveModel.schema.json"),
    require("./json_schemas/mqttReviewModel.schema.json"),
    require("./json_schemas/reviewModel.schema.json"),
    require("./json_schemas/userModel.schema.json"),
    require("./json_schemas/websocketMessageModel.schema.json"),
  ],
});

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
const userApis = new UserApi(app, authSrv, websocketSrv, validator);
const filmApis = new FilmApi(app, websocketSrv, mosquitoSrv, validator);
const reviewApis = new ReviewApi(app, mosquitoSrv, validator);
const invitationsApis = new InvitationApi(app, validator);
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

app.use((error: any, request: any, response: any, next: any) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors);
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
