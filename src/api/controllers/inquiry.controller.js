const { StatusCodes } = require("http-status-codes");
const Inquiry = require("../model/inquiry.model");
const InquiryReplay = require("../model/inquiry.replay.model");

const createInquiry = async (req, res) => {
  try {
    const { fullName, email, contactNumber, comment } = req.body;
    if (!fullName || !email || !contactNumber || !comment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    }
    const status = "Pending";
    const queryData = {
      fullName,
      email,
      contactNumber,
      comment,
      status,
    };

    customerquery.create(queryData).then((result, err) => {
      if (!err) {
        sendMail(result, res);
        console.log("new queryData create ==>>", result);
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

const allInquiries = async (req, res) => {
  try {
    const allquery = await customerquery.find();
    res.json(allquery);
  } catch (err) {
    res.json({ message: err });
  }
};

const inquiryReplay = async (req, res) => {
  try {
    const { customerId, replay, email } = req.body;

    console.log("replaycustomerRecords", customerId, replay);
    if (!customerId || !replay || !email) {
      throw Error("Empty  details are not allowed.");
    } else {
      const replaycustomerRecords = await customerquery.find({
        customerId,
      });
      if (replaycustomerRecords[0] <= 0) {
        throw new Error(
          "Account Record doesn't exist, or has been verify already. Please signup or login."
        );
      } else {
        await customerquery.updateOne(
          { _id: customerId },
          { status: "Compalate" }
        );
      }
      replaycustomer.create(req.body).then((result, err) => {
        if (!err) {
          replaysend(result, res);
          console.log("new queryData create ==>>", result);
        } else {
          res.json({
            status: "Faild",
            message: err.message,
          });
        }
      });
    }
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  allInquiries,
  createInquiry,
  inquiryReplay,
};
