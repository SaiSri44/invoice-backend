/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


//Dependencies Imported :
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");



//Importing Config File :
var config = require("./config/config.json");



//MongoDb Connection :
mongoose.connect(config.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},function(err, conn){
    if(err){
        console.log("mongodb connection error", err);
    }
    if(!err && conn){
        console.log("mongodb connection stablished");
    }
});



//Routes Imported :
var adminRouter = require("./routes/admin");
var clientRouter = require("./routes/client");


//Express Application :
var app = express();



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



//API Routes :
app.use("/admin", adminRouter);
app.use("/client", clientRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});



module.exports = app;