import Users from "../models/user.js";
import mongoose from "mongoose";



export async function addtocart(req, res, next) {

  try {

// console.log( req.body.userID,req.body.productID)

    const user = await Users.findOne({_id: req.body.userID});
    const productID = mongoose.Types.ObjectId(req.body.productID);
    const userID = req.body.userID;
    
    // console.log(user.cart)
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    const existingCartItem = user.cart.find(item => item.productID.equals(productID));
    // console.log("exsist",existingCartItem)
    if (existingCartItem) {
      await Users.updateOne(
        {_id: req.body.userID, "cart.productID": productID},
        {$inc: {"cart.$.quantity": 1}}
      );
      const data = await Users.findOne({_id: userID}).populate('cart.productID');


      res.status(200).send({ message: "Get cart", data: data });
    } else {
      await Users.updateOne(
        {_id: req.body.userID},
        {$addToSet: {cart: {productID:productID , quantity: 1}}}
      );
      const data = await Users.findOne({_id: userID}).populate('cart.productID');
      res.status(200).send({ message: "Get cart", data: data });
    }
  } catch (error) {
    console.error("Error adding food to cart: ", error);
  }
}

export async function getcart(req, res, next) {
  try {
    console.log("came to get cart items")
    const userID = req.body.userID;
    const data = await Users.findOne({_id: userID}).populate('cart.productID');

    if (data) {
      res.status(200).send({ message: "Get cart", data: data });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting cart: ", error);
    res.status(500).send({ message: "Server error" });
  }
}

export async function decreaseCartItem(req, res, next) {
  try {
    const user = await Users.findOne({ _id: req.body.userID });
    const productID = mongoose.Types.ObjectId(req.body.productID);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    const existingCartItem = user.cart.find((item) =>
      item.productID.equals(productID)
    );

    if (!existingCartItem) {
      res.status(404).send("Item not found in cart.");
      return;
    }

    if (existingCartItem.quantity === 1) {
      // If the item quantity is 1, remove it from the cart
      await Users.updateOne(
        { _id: req.body.userID },
        {
          $pull: {
            cart: { productID: productID },
          },
        }
      );
      res.status(200).send("Item removed from cart.");
    } else {
      // If the item quantity is greater than 1, decrement the quantity by 1
      await Users.updateOne(
        { _id: req.body.userID, "cart.productID": productID },
        { $inc: { "cart.$.quantity": -1 } }
      );
      res.status(200).send("Cart item quantity decreased.");
    }
  } catch (error) {
    console.error("Error decreasing cart item quantity: ", error);
  }
}
