require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
var http = require("http").Server(app);
const cookieParser = require("cookie-parser");

//handel post req
app.use(bodyParser.json());

app.use(cors());

//Database Connection
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(process.env.database, options);
mongo.then(
  () => {
    console.log("Database Connected...");
  },
  (error) => {
    console.log(error, "error");
  }
);

//Routes
app.use("/", require("./routes/unauthenticated.js")); //routes which does't require token authentication
app.use(
  "/api",
  (req, res, next) => {
    next();
  },
  passport.authenticate("jwt", { session: false }),
  require("./routes/authenticated.js")
);
app.get("*", (req, res) => res.status(404).send({ error: "page not found" }));

require("./config/passport")(passport);

//Port
app.listen(3000, () => {
  console.log("sever listening on port:3000");
});
