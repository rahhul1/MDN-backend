const { StatusCodes } = require("http-status-codes");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Verification = require("../model/verification.model");


const logIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User Not found.", user: null, token: null });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.hash_password
    );

    if (!passwordIsValid) {
      res.status(StatusCodes.BAD_REQUEST).json({
        token: null,
        message: "Invalid Password!",
      });
    }
    if (user) {
      if (passwordIsValid) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "60000",
        });
        console.log("===>>>>token", token);

        const { _id, firstName, lastName, email, fullName } = user;
        const message = "Wellcome, " + fullName;
        const createdAt = Date.now();
        const expairedAt = Date.now() + 60000;
        res.status(StatusCodes.OK).json({
          user: {
            _id,
            firstName,
            lastName,
            email,
            fullName,
            token,
            message,
            createdAt,
            expairedAt,
          },
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Something went wrong!",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, contactNumber } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !contactNumber
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    }

    const hash_password = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      userName,
      email,
      hash_password,
      contactNumber,
    };
    // console.log("userData0001", userData)
    const user = await User.findOne({ email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      User.create(userData).then((result, err) => {
        if (!err) {
          console.log("new userdata create ==>>", result);
          sendMail(result, res);
        } else {
          res.json({
            status: "Faild",
            message: err.message,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "Faild",
      message: err.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed.");
    } else {
      const UserOtpVarificationRecords = await UserOtpVarification.find({
        userId,
      });
      if (UserOtpVarificationRecords <= 0) {
        throw new Error(
          "Account Record doesn't exist, or has been verify already. Please signup or login."
        );
      } else {
        const { expiresAt } = UserOtpVarificationRecords[0];
        // const hasotp = UserOtpVarificationRecords[0].otp;
        const refOTP = UserOtpVarificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          await UserOtpVarification.deleteMany({ userId });
          throw new Error("Code has expaied. Please Request Again.");
        } else {
          const validOTP = otp === refOTP;

          if (!validOTP) {
            throw new Error("invalid code passed. Check your inbox.");
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOtpVarification.deleteMany({ userId });
          }
          res.json({
            status: "Verified",
            message: "User email verified Successfully",
          });
        }
      }
    }
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty User Details are not Allowed.");
    } else {
      await UserOtpVarification.deleteMany({ userId });
      sendMail({ _id: userId, email }, res);
    }
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message,
    });
  }
};

const changePassword = async (req,res)=>{
  const { id } = req.params;
  const { oldPassword, newPassword  } = req.body;
  try {
    

    const user = await User.findById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }

    // Check if the provided old password matches the current password
    if (!user.comparePassword(oldPassword)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Incorrect old password",
      });
    }

    // Hash and update the new password
    user.hash_password = user.hashPassword(newPassword);

    // Save the updated user
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }

}

const forgotPassword = async (req,res)=>{
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Find the product by ID and update it
    const updateduser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated product
    });

    if (!updateduser) {
      res.json({
        status: "Faild",
        message: "user info is not found ",
      });
    }else{
      res.status(StatusCodes.OK).json({
        message: "User Information updated successfully",
        user: updateduser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  logIn,
  register,
  verifyOTP,
  resendOTP,
  changePassword,
  forgotPassword
};
