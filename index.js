require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbconnection = require("./dbconnection/dbconnection");
const PORT = process.env.PORT || 5001;
const allRouteRouter = require("./routes/allRoutes");

const app = express();

// Add body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

//database connection
dbconnection();

//import all routes
allRouteRouter.routes(app);

app.listen(PORT, function (err) {
  if (err) throw err;
  console.log(`...Server listening on port ${PORT}...`);

});

