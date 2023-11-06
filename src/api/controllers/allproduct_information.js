const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const ProductInformation = require("../../Model/products/product_information");
const Product = require("../../Model/products/products");
const AditionalProduct = require("../../Model/products/addtional_information");

const allproductinformation = async (req, res) => {
    const id = req.params.id;

     await Product.findById(id).then(async (result,  err) => {
         if (!err) {
            
             const productsdeatils = result
             
             await ProductInformation.findById(id).then(async (result,  err) => {
                 if (!err) {
                     const productInformation = result
                     await AditionalProduct.findById(id).then((result, err) => {
                         console.log("id",id,"result",result);
                         if (!err) {
                             const aditionalProduct = result
                             res.status(StatusCodes.OK).send({
                                 message: "Product fetch sucessfully",
                                 data: [  {
                                    productsdeatils:productsdeatils
                                 },
                                     {
                                    productInformation:productInformation
                                     },
                                     {
                                         aditionalProduct: aditionalProduct
                                     }
                                 ]
                                
                              });
                         } else {
                            res.json({
                                status: "Faild",
                                message: err.message,
                            })
                         }
                     })
                 } else {
                    res.json({
                        status: "Faild",
                        message: err.message,
                    })
                 }
             })
            
        } else {
            res.json({
                status: "Faild",
                message: err.message,
            })
        }
    })
}

module.exports = {
    allproductinformation,
  };

