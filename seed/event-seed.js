const db = require('../config/database')
const Coupon = require('../models/Coupon')

let newCoupons = [
    new Coupon({
    name:'noon',
    description:'45% noon discount all devices',
    promocode:"45N",
    date:Date.now(),
    created_at:Date.now()
}),
new Coupon({
    name:'noon',
    description:'45% noon discount all devices',
    promocode:"45N",
    date:Date.now(),
    created_at:Date.now()
}),
new Coupon({
    name:'noon',
    description:'45% noon discount all devices',
    promocode:"45N",
    date:Date.now(),
    created_at:Date.now()
}),
new Coupon({
    name:'noon',
    description:'45% noon discount all devices',
    promocode:"45N",
    date:Date.now(),
    created_at:Date.now()
}),
new Coupon({
    name:'noon',
    description:'45% noon discount all devices',
    promocode:"45N",
    date:Date.now(),
    created_at:Date.now()
}),
]

newCoupons.forEach((coupon)=>{
    coupon.save((err)=>{
 if(!err){
    console.log('recored added')
 }  else{
    console.log(err)
 } 
})
})

// newCoupon.save((err)=>{
//  if(!err){
//     console.log('recored added')
//  }  else{
//     console.log(err)
//  } 
// })
