const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/coupon4you", { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db successfully...");
  }
});
