import { productModel } from "../../../databases/models/product.model.js";
import { userModel } from "../../../databases/models/user.model.js";

const addProduct = async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.json({ message: "User not found" });
  } else {
    await productModel.create(req.body);
    return res.json({ message: "Product added successfully" });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const specificProduct = await productModel.findById(id);
  if (!specificProduct) {
    return res.send("The Product with the given ID was not found.");
  } else {
    if (specificProduct.userId == req.body.userId) {
      await productModel.findByIdAndUpdate(id, req.body);
      return res.send("Updated Successfully");
    } else {
      return res.send("You are not authorized to perform this action.");
    }
  }
};
//delete product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const specificProduct = await productModel.findById(id);
  if (!specificProduct) {
    return res.send("The Product with the given ID was not found.");
  } else {
    if (specificProduct.userId == req.body.userId) {
      await productModel.findByIdAndDelete(id);
      return res.send("deleted Successfully");
    } else {
      return res.send("You are not authorized to perform this action.");
    }
  }
};

const getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.json({ products });
};

//get all products with their owner’s information
const getAllProductsWithOwnerInfo = async (req, res) => {
  let products = await productModel.find().populate("userId", "-password");
  res.json(products);
};

//sorting

const getSortedProducts = async (req, res) => {
  const sortedProducts = await productModel.find().sort({ createdAt: -1 });
  return res.json({message: "Product added successfully",sortedProducts});
};

export {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProductsWithOwnerInfo,
  getSortedProducts
};
