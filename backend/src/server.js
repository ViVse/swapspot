import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import useJWTStategy from "./config/passport/jwtStrategy.js";
import useGoogleStrategy from "./config/passport/googleStrategy.js";
import useLocalStrategy from "./config/passport/localStrategy.js";

// Load confg
dotenv.config({ path: "./src/config/config.env" });

// DB connection
connectDB();

const app = express();

// Middlewares
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
