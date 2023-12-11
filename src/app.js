import "dotenv/config";
import express from "express";

import allRoutes from "../src/routes/index.js";
import sequelize, { connectDb } from "../src/db/config.js";
import Session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import dbInit from "../src/db/init.js";
const app = express();
app.use(express.json());
connectDb();
const sequelizeStore = new SequelizeStore(Session.Store);
const mySequelizeStore = new sequelizeStore({
  db: sequelize,
});

app.use(
  Session({
    secret: process.env.JWT_SECRET,
    store: mySequelizeStore,
    saveUninitialized: false,
    resave: false,
    proxy: false,
  })
);
mySequelizeStore.sync();
dbInit()
  .then(() => console.log("db synced"))
  .catch((err) => console.log("db not synced", err));

app.use(express.json());

app.use("/", allRoutes);
app.listen("3300", (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("server is listening at http://localhost:3300");
  }
});
