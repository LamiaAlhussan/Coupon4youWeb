const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    img: {
      type: String,
      required: true,
    },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  promocode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

let Coupon = mongoose.model("Coupon", couponSchema, "coupons");

module.exports = Coupon;
