const mongoose = require("mongoose");
const productinformationSchema = new mongoose.Schema({
  product_id: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },

  manufacturer: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  model_name: {
    type: String,
    require: true,
  },
  model_year: {
    type: Number,
    require: true,
  },
  Includes_Rechargeable_battery: {
    type: String,
    require: true,
  },
  voltage: {
    type: String,
    require: true,
  },
  wattage: {
    type: String,
    require: true,
  },
  power_source: {
    type: String,
    require: true,
  },
  country_of_origin: {
    type: String,
    require: true,
  },
  item_weight: {
    type: String,
    require: true,
  },
});
const Productinformation = mongoose.model(
  "ProductInformation",
  productinformationSchema
);

module.exports = Productinformation;
