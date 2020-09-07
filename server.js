const express = require("express");
const app = express();
const path = require("path");

const callWeather = require("./routes/callWeather");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/weather", (req, res) => {
  const location = req.query.q;
  if (!location) {
    res.send("you need to put a location");
  } else {
    callWeather(location, (err, temperature) => {
      if (!err) {
        res.send({
          location: location,
          temperature: temperature,
        });
      }
    });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
