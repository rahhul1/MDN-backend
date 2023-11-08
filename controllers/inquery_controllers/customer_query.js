const { StatusCodes } = require("http-status-codes");

require("dotenv").config();
const customerquery = require("../../Model/customer_query/customer_query");
const replaycustomer = require("../../Model/customer_query/replay_customer_query");

const custmoerquerys = async (req, res) => {
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

const getquery_all = async (req, res) => {
  try {
    const allquery = await customerquery.find();
    res.json(allquery);
  } catch (err) {
    res.json({ message: err });
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
  { _id, email, contactNumber, fullName, comment, status },
  res
) => {
  console.log("res ssend main", email, _id, contactNumber, fullName, comment);
  try {
    const mailOptions = {
      from: "sonia.hammes92@ethereal.email",
      to: "sonia.hammes92@ethereal.email",
      subject: "Customer inquery",
      html: `<p style='font-size:1rem'>Hear is your customer inquriy information <b>${fullName}</b></br> <b>${contactNumber}</b></br> <b>${comment}</b></br> Customer deatils.</p>`,
    };
    // // const hash_otp = bcrypt.hash(refOTP, 8);

    const mailInfo = await transporter.sendMail(mailOptions);
    res.json({
      message: "Your request is our company it's will back soon",
      data: {
        userId: _id,
        fullName: fullName,
        email: email,
        contactNumber: contactNumber,
        comment: comment,
      },
    });
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
};

//replay customer

const replaycustomers = async (req, res) => {
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

const replaysend = async ({ _id, email, replay }, res) => {
  console.log("res ssend main", email, _id, replay);
  try {
    const mailOptions = {
      from: "sonia.hammes92@ethereal.email",
      to: email,
      subject: "Your query answer",
      html: `<p style='font-size:1rem'>Dear customer <b>${replay}</b></br> Customer deatils.</p>`,
    };
    const mailInfo = await transporter.sendMail(mailOptions);
    res.json({
      message: "Sent the customer Inbox",
      data: {
        deatils: replay,
      },
    });
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = { custmoerquerys, getquery_all, replaycustomers };
