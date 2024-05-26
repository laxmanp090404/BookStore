const Cart = require('../Models/Cart.model');
const Book = require("../Models/Book.model");
const mongoose = require("mongoose")


exports.addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.user._id; 

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const bookObjectId =new mongoose.Types.ObjectId(bookId); 

    let item = cart.items.find(item => item.bookId.equals(bookObjectId));

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ bookId: bookObjectId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getCartItems = async (req, res) => {
  const userId = req.user._id; 

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    const cartItemsWithDetails = await Promise.all(cart.items.map(async (item) => {
      const book = await Book.findById(item.bookId);
      return { ...item.toObject(), book };
    }));
    const totalQuantity = cartItemsWithDetails.reduce((total, item) => total + item.quantity, 0);
    res.status(200).json({ items: cartItemsWithDetails ,totalQuantity:totalQuantity});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty already", empty: true });
    }

    const result = await Cart.findByIdAndDelete(cart._id);

    if (result) {
      return res.status(200).json({ message: "Cart cleared successfully", cleared: true });
    } else {
      return res.status(400).json({ message: "Failed to clear cart. Please try again" });
    }
  } catch (error) {
    console.error('Server error at clearing cart', error);
    return res.status(500).json({ error: 'Server error at clearing cart' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

    if (itemIndex === -1) {
      return res.status(400).json({ message: 'Item not found in cart' });
    }

    // Reduce the quantity by 1
    cart.items[itemIndex].quantity -= 1;

    // Remove the item if the quantity is 0
    if (cart.items[itemIndex].quantity === 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item updated successfully', cart });
  } catch (error) {
    console.error('Server error at remove item from cart', error);
    return res.status(500).json({ error: 'Server error at remove item from cart' });
  }
};
