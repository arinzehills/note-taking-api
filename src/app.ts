import express, { Application, Request, Response } from "express";
// const express = require("express");
const authRoutes=require("./routes/auth.route")
const noteRoutes=require("./routes/note.route")
const app = express();
const errorHandler = require("./middlewares/errorHandler");

require('./services/firebaseservice')
app.use(express.json());
// routes
app.use("/api", authRoutes);
app.use("/api", noteRoutes);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World! Here");
  });

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port:: http://localhost:${PORT}/`);
});

module.exports = app;