import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "./db/db.js";
import routes from "./routes/index.js";
import useJWTStategy from "./auth/jwtStrategy.js";
import useGoogleStrategy from "./auth/googleStrategy.js";
import useLocalStrategy from "./auth/localStrategy.js";

// Load confg
dotenv.config({ path: "./src/config/config.env" });

// DB connection
connectDB();

const app = express();

// Middlewares
var whitelist = [
  process.env.CLIENT_URL,
  process.env.SERVER_URL,
  "http://localhost:3000",
  "http://192.168.0.106:5000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === "development") {
  // create a write stream (in append mode)
  var accessLogStream = fs.createWriteStream(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "logs/access.log"),
    { flags: "a" }
  );

  app.use(
    morgan(
      function (tokens, req, res) {
        let data = [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms",
        ];
        if (req.user) {
          data = data.concat("User:", req.user?._id.toString());
        }
        if (req.body) {
          data = data.concat("Req body:", JSON.stringify(req.body));
        }
        return data.join(" ");
      },
      {
        stream: accessLogStream,
      }
    )
  );
}

// Passport config
app.use(passport.initialize());
useJWTStategy(passport);
useGoogleStrategy(passport);
useLocalStrategy(passport);

// Use Routes
app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
