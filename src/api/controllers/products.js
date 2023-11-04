const Product = require("../../Model/products/products");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../uploads"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  },
});

const createproducts = async (req, res) => {
  try {
    const { name, price, images } = req.body;
    const imageUrls = req.files.map((file) => "/uploads/" + file.filename);

    const saveproduct = new Product({
      name,
      price,
      images: imageUrls,
    });
  
    Product.create(saveproduct).then((result, err) => {
      if (!err) {
        res.status(StatusCodes.OK).json({
          message: "Product create sucessfully",
          user: saveproduct,
        });
      } else {
        res.json({
          status: "Faild",
          message: err.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create product" });
  }
};
const deatilsproduct = async (req, res) => {
  try {
    const deatils = await Product.find();
    res.json(deatils);
  } catch (err) {
    res.json({ message: err });
  }
};
const getbyidproduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findById(id).then((result, err) => {
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
const deletebyidproduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.deleteOne({ _id: id }).then((result, err) => {
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

const updatedeatils =async (req, res) => {
    try {
      const productId = req.params.id;

      const { name, price } = req.body;
      const existingProduct = await Product.findByIdAndUpdate(productId);

      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      existingProduct.name = name;
      existingProduct.price = price;
      const updatedProduct = await existingProduct.save();

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
const updatebyimage =  async (req, res) => {
  try {
    const productId = req.params.id;
    const imageIndex = req.params.imageIndex;
    const { filename } = req.file;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (imageIndex < 0 || imageIndex >= product.images.length) {
      return res.status(400).json({ error: "Invalid image index" });
    }

    product.images[imageIndex] = `/uploads/${filename}`;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}  

const deletebyimage =  async (req, res) => {
  try {
    const productId = req.params.id;
    const imageIndex = req.params.imageIndex;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (imageIndex < 0 || imageIndex >= product.images.length) {
      return res.status(400).json({ error: "Invalid image index" });
    }

    product.images.splice(imageIndex, 1);

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}


module.exports = {
  createproducts,
  deatilsproduct,
  getbyidproduct,
  deletebyidproduct,
  updatedeatils,
  updatebyimage,deletebyimage
};
