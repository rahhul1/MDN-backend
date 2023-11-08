const { StatusCodes } = require("http-status-codes");

require("dotenv").config();

const Order = require("../../Model/order/order")
const Product = require("../../Model/products/products")
const User = require("../../Model/usermodel/UserAuth")

const ordercreate = async (req, res) => {
    try {
      const {
        user_id,
        product_id,
        houseNo,
        streetName,
        nearlocation,
        pincode,
        state,
        city,
        country,
        netQuantity
      } = req.body;
      if (
        !houseNo ||
        !streetName ||
        !nearlocation ||
        !pincode ||
        !state ||
        !city ||
        !country||
        !netQuantity
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Please Provide Required Information",
        });
      }

      const productDetails = await Product.findById(product_id);
      const userDetails = await User.findById(user_id);
      console.log("userDetails",userDetails);
    if (!productDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found",
      });
    
    }

    if(!userDetails)  {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User is not found",
          });
    }
  
      const orderdata = {
        user_id,
        product_id,
        order_status:"Pending",
        houseNo,
        streetName,
        nearlocation,
        pincode,
        state,
        city,
        country,
        netQuantity,
        productDetails:productDetails,
        userDetails:userDetails
      };

      console.log("orderdata",orderdata);
        
      Order.create(orderdata).then((result, err) => {
          if (!err) {
              sendMail(result, res);
            res.status(StatusCodes.OK).json({
              message: "order sucessfully",
              user: orderdata,
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


const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "collin.kuhn@ethereal.email",
    pass: "FJpftVMTgZcQq83318",
  },
});

const sendMail = async (
    { productDetails, orderNo, netQuantity,userDetails
     },
    res
  ) => {

    try {
      const mailOptions = {
        from: "sonia.hammes92@ethereal.email",
        to: userDetails.email,
        subject: "Thanks for order our site",
        html: `<p style='font-size:1rem'>here is your order deatils <b>${productDetails.name}</b></br> and your Order No is <b>${orderNo}</b></br> <b>${netQuantity}</b></br> </p>`,
      };
      // // const hash_otp = bcrypt.hash(refOTP, 8);
  
      const mailInfo = await transporter.sendMail(mailOptions);
    
    } catch (err) {
      res.json({
        status: "Failed",
        message: err.message,
      });
    }
};

  module.exports = {
    ordercreate
  };