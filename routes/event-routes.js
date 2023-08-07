const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const Admin = require("../models/Admin");
const { event } = require("jquery");
const { check, validationResult } = require("express-validator/check");
const passport = require("passport");
var isAdmin = false
const multer = require('multer')
const path = require('path')
// pic 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname) 
    }
  })
  
var upload = multer({ storage: storage})




isAuthenticated = (req,res,next)=>{
    if (req.isAuthenticated()){
        isAdmin=true
        return next()}
    res.redirect('/coupon4you')
}




router.get("/", (req, res) => {
    const searchTerm = req.query.search; 
  
    const searchCriteria = searchTerm
      ? { name: { $regex: new RegExp(searchTerm, "i") } }
      : {}; 
  
    Coupon.find(searchCriteria, (err, coupons) => {
      if (err) {
        console.log(err);
        res.redirect("/coupon4you");
        return;
      }
  
      let chunk = [];
      let chunkSize = 3;
      for (let i = 0; i < coupons.length; i += chunkSize) {
        chunk.push(coupons.slice(i, chunkSize + i));
      }
  
      res.render("event/index", {
        chunk: chunk,
        success: req.flash("success"),
        admin: isAdmin,
        searchTerm: searchTerm, 
      });
    });
  });


  





router.get("/admin", (req, res) => {
  res.render("event/login",{error: req.flash("error")});
});

router.post(
    "/admin",
    passport.authenticate("local.login", {
      successRedirect: "/coupon4you/services",
      failureRedirect: "/coupon4you/admin",
      failureFlash: true,
    })
  );

router.get("/services",isAuthenticated, (req, res) => {
  res.render("event/services" ,{success: req.flash('success')});
});

router.get("/AddAdmin",isAuthenticated,(req, res) => {
  res.render("event/addAdmin", { 
    error: req.flash("error")
 });
});



router.post(
  "/AddAdmin",
  passport.authenticate("local.addadmin", {
    successRedirect: "/coupon4you/services",
    failureRedirect: "/coupon4you/AddAdmin",
    failureFlash: true,
  })
);



router.get("/Edit/:id",isAuthenticated,(req, res) => {
  const couponId = req.params.id;
  Coupon.findById(couponId, (err, coupon) => {
    if (err) {
      console.log(err);
      res.redirect("/coupon4you"); // Redirect to the main coupon page if the coupon is not found or there is an error
    } else {
      res.render("event/edit", {
        coupon: coupon,
        success: req.flash("success"),
      });
    }
  });
});

router.post("/update",isAuthenticated,upload.single('picture'),(req, res) => {

   let newFields;
if (req.file.originalname){
  newFields = {
    img: req.file.originalname,
    name: req.body.name,
    description: req.body.description,
    promocode: req.body.code,
    date: req.body.date,
  };
}else{
    newFields = {
        name: req.body.name,
        description: req.body.description,
        promocode: req.body.code,
        date: req.body.date,
      };
}

  //build the query
  let query = { _id: req.body.id };

  // update

  Coupon.updateOne(query, newFields, (err) => {
    if (!err) {
      req.flash("success", "the coupon was updated successfully");
      res.redirect("/coupon4you");
    } else {
      console.log(err);
    }
  });
});

router.get("/create", isAuthenticated,(req, res) => {
  res.render("event/create");
});

router.post("/create",isAuthenticated,upload.single('picture'),(req, res) => {
  console.log(req.body)
  console.log(req.body.picture)
  console.log()

  let newCoupon = new Coupon({
    img:req.file.originalname,
    name: req.body.name,
    description: req.body.description,
    promocode: req.body.code,
    date: req.body.date,
    created_at: Date.now(),
  });

  console.log(newCoupon)


  newCoupon.save((err) => {
    if (!err) {
      req.flash("success", "New coupon added!");
      res.redirect("/coupon4you"); // To do add flash success message
    } else {
      console.log(err);
    }
  });
});

// deleting a coupon

router.delete("/delete/:id", isAuthenticated,(req, res) => {
  let query = { _id: req.params.id };

  Coupon.deleteOne(query, (err) => {
    if (!err) {
      res.status(200).json("deleted");
    } else {
      res.status(404).json("There was an error, try again");
    }
  });
});

// logout

router.get("/signout", (req, res) => {
    req.logout(function(err) {
        if (err) {
          console.error(err);
        }})
  res.redirect('/coupon4you')
  isAdmin=false
});

module.exports = router;
