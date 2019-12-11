const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const { mongoose } = require("./database");

//?   Settings
app.set("port", process.env.PORT || 3050);

//?   Middlewares
app.use(morgan("dev"));
app.use(express.json());

//?   Routes
app.use("/api/tasks", require("./routes/task.routes"));
app.get("/login", (req, res) => {
  res.send("ingresar a la app");
});

//?   Static files
app.use(express.static(path.join(__dirname, "public")));

//?   Server listening
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
