import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .skip(ITEM_PER_PAGE * (page - 1))
      .limit(ITEM_PER_PAGE);
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  // console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .skip(ITEM_PER_PAGE * (page - 1))
      .limit(ITEM_PER_PAGE);
    return { count, products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};
