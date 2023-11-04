const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const ProductInformation = require("../../Model/products/product_information");

const productsinformation = async (req, res) => {
  try {
    const {
      product_id,
      brand,
      manufacturer,
      model,
      model_name,
      model_year,
      Includes_Rechargeable_battery,
      voltage,
      wattage,
      power_source,
      country_of_origin,
      item_weight,
    } = req.body;
    if (
      !product_id ||
      !brand ||
      !manufacturer ||
      !model ||
      !model_name ||
      !model_year ||
      !Includes_Rechargeable_battery ||
      !voltage ||
      !wattage ||
      !power_source ||
      !country_of_origin ||
      !item_weight
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    }

    const informationdata = {
      product_id,
      brand,
      manufacturer,
      model,
      model_name,
      model_year,
      Includes_Rechargeable_battery,
      voltage,
      wattage,
      power_source,
      country_of_origin,
      item_weight,
    };

    console.log("req.body.model", req.body.model);

    ProductInformation.find().then((results, err) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: "Failed",
          message: err.message,
        });
      }

      const modelExists = results.some(
        (result) => result.model === req.body.model
      );

      if (modelExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Model already exists",
        });
      }

      // Create the new ProductInformation
      ProductInformation.create(informationdata).then((result, err) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "Failed",
            message: err.message,
          });
        }

        res.status(StatusCodes.OK).json({
          message: "Product Information created successfully",
          user: informationdata,
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Faild",
      message: err.message,
    });
  }
};

const deatilsinfoproduct = async (req, res) => {
  try {
    const deatils = await ProductInformation.find();
    res.json(deatils);
  } catch (err) {
    res.json({ message: err });
  }
};
const getbyidinfoproduct = async (req, res) => {
  const id = req.params.id;
  try {
    await ProductInformation.findById(id).then((result, err) => {
      if (!err) {
        res.status(StatusCodes.OK).send({
          message: "Product fetch sucessfully",
          user: result,
        });
      } else {
        res.json({
          status: "Faild",
          message: err.message,
        });
      }
    });
  } catch (error) {
    res.json({
      status: "Faild",
      message: error.message,
    });
  }
};
const deletebyidInfoproduct = async (req, res) => {
  const id = req.params.id;
  try {
    await ProductInformation.deleteOne({ _id: id }).then((result, err) => {
      if (!err) {
        res.status(StatusCodes.OK).send({
          message: "Product delete sucessfully",
          user: result,
        });
      } else {
        res.json({
          status: "Faild",
          message: err.message,
        });
      }
    });
  } catch (error) {
    res.json({
      status: "Faild",
      message: error.message,
    });
  }
};
const updateinformationproduct = async (req,res)=>{
  try {
    const productId = req.params.id;
    const updateData = req.body;

    // Find the product by ID and update it
    const updatedProduct = await ProductInformation.findByIdAndUpdate(productId, updateData, {
      new: true, // Return the updated product
    });

    if (!updatedProduct) {
      res.json({
        status: "Faild",
        message: "Product info is not found ",
      });
    }else{
      res.status(StatusCodes.OK).json({
        message: "Product Information updated successfully",
        user: updatedProduct,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = {
  productsinformation,
  deletebyidInfoproduct,
  getbyidinfoproduct,
  deatilsinfoproduct,
  updateinformationproduct
};
