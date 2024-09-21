const express = require('express');
const { resolve } = require('path');
let cors=require('cors');

const app = express();
const port = 3010;
app.use(cors())

app.use(express.static('static'));
let taxRate=5;
let discountPercentage=10;
let loyaltyRate=2;
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/cart-total',(res,req)=>{
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let cartTotal=parseFloat(req.query.cartTotal);
  let result=(newItemPrice*cartTotal).toString();
  res.send(result);
})
app.get("/membership-discount",(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let isMember=req.query.isMember==="true";
  if(isMember){
    cartTotal=cartTotal-((discountPercentage/100)*cartTotal);
  }
  cartTotal=cartTotal.toString();
  res.send(cartTotal);
})
app.get("/calculate-tax",(req,res)=>{
  let cartTotal=req.query.cartTotal;
  cartTotal=((taxRate/100)*cartTotal).toString();
  res.send(cartTotal);
})
app.get('/estimate-delivery',(req,res)=>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  let days;
  if(shippingMethod=="standard"){
     days=(distance/50).toString();
  }else if(shippingMethod=="express"){
     days=(distance/100).toString();
  }
  res.send(days);
})

app.get('/shipping-cost',(req,res)=>{
  let weight=parseFloat(req.query.weight)
  let distance=parseFloat(req.query.distance)
  let shipcost=(weight*distance*0.1).toString();
  res.send(shipcost)
})
app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount=parseFloat(req.query.purchaseAmount)
  let loyalpoints=(purchaseAmount*2).toString();
  res.send(loyalpoints);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
