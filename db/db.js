const mongoose = require("mongoose");

const url = process.env.CONNECT_DB;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conncetion successfull :)"))
  .catch((e) => console.log("==error==", e));