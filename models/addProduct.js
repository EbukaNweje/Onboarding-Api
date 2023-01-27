const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  dec: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

}, {timestamps: true});

module.exports = product = mongoose.model('product', ProductSchema )

