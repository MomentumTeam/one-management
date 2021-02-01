require("dotenv").config({ path: "../one.env" });
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const authRoutes = require("./routes/authentication");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_HOST || "mongodb://localhost/one_management", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "passport",
    cookie: { maxAge: 7 * 24 * 60 * 60000 },
    resave: false,
    saveUninitialized: true,
  })
);

authRoutes(app);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is listening at http://localhost:${process.env.SERVER_PORT || 4000}`);
});
