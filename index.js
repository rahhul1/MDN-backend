const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || "5000";
const Db = require("./db/db")
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Import Routes
const userRoutes = require("./routes/User_routes/varifyRoutes");
const customerinqueryRoutes = require("./routes/inquery_routes/queryroutes");
const productRoutes = require("./routes/product_routes/product_routes");
const orderRoutes = require("./routes/order_routes/order_routes")
app.use("/api/auth/varify", userRoutes);
app.use("/api/inquery", customerinqueryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);




app.listen(port, () => console.log(`Server is running on ${port}`));
