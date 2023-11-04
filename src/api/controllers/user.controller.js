const { StatusCodes } = require("http-status-codes");
const User = require("../model/user.model");

const allUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const removeUser = await User.findByIdAndDelete(req.params.id);
    res.json(removeUser);
  } catch (error) {
    res.json({ message: error });
  }
};

const updateUser = async (req,res)=>{
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
  allUsers,
  updateUser,
  deleteUser
};
