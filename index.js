require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || "5000";
require("./src/db/database");
const app = express();
const routes = require("./src/api/routes");

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.listen(port, () => console.log(`Server is running on ${port}`));
