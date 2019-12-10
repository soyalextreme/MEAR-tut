const express = require("express");
const app = express();
const morgan = require("morgan");

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

//?   Server listening
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
