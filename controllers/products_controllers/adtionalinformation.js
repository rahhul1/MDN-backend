const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const AditionalProduct = require("../../Model/products/addtional_information");

const addtionalinformations = async (req, res) => {
    try {
      const {
        product_id,
        asin,
        customer_reviews,
        packer,
        importer,
        net_quantity,
      } = req.body;
      if (
        !product_id ||
        !asin ||
        !customer_reviews ||
        !packer ||
        !importer ||
        !net_quantity
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Please Provide Required Information",
        });
      }
  
      const informationdata = {
        product_id,
        asin,
        packer,
        importer,
        net_quantity,
      };

        
        AditionalProduct.create(informationdata).then((result, err) => {
          if (!err) {
            res.status(StatusCodes.OK).json({
              message: "Addtional information sucessfully",
              user: informationdata,
            });
          } else {
            res.json({
              status: "Faild",
              message: err.message,
            });
          }
        });
      
  
    } catch (err) {
      console.log(err);
      res.json({
        status: "Faild",
        message: err.message,
      });
    }
  };

  const deatilsaddtionproduct = async (req, res) => {
    try {
      const deatils = await AditionalProduct.find();
      res.json(deatils);
    } catch (err) {
      res.json({ message: err });
    }
  };
  const getbyidadtionproduct = async (req, res) => {
    const id = req.params.id;
    try {
      await AditionalProduct.findById(id).then((result, err) => {
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
  const deletebyidaddtionproduct = async (req, res) => {
    const id = req.params.id;
    try {
      await AditionalProduct.deleteOne({ _id: id }).then((result, err) => {
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
  const updateaddtionnproduct = async (req,res)=>{
    try {
      const productId = req.params.id;
      const updateData = req.body;
  
      // Find the product by ID and update it
      const updatedProduct = await AditionalProduct.findByIdAndUpdate(productId, updateData, {
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
    addtionalinformations,
    deatilsaddtionproduct,
    getbyidadtionproduct,
    deletebyidaddtionproduct,
    updateaddtionnproduct
  };