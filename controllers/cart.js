const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getCart = (req, res, next) => {
    req.user
      .getCart()
      .then(cart => {
        console.log("-----cart get entered")
        return cart
          .getProducts()
          .then(products=>{
            res.send(products)
          })
          .catch()
      })
      .catch(err => res.status(200).json(err));
  };
  

  
exports.postCart = (req, res, next) => {
    const prodId = req.body.id;
    console.log("------",prodId)
    let fetchedCart;
    console.log("-----cart post entered",fetchedCart)
        
    let newQuantity = 1;
    req.user
      .getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {
        let product;
        if (products.length > 0) {
          product = products[0];
        }
  
        if (product) {
          const oldQuantity = product.cartItem.quantity;
          newQuantity = oldQuantity + 1;
          return product;
        }
        return Product.findByPk(prodId);
      })
      .then(product => {
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity }
        });
      }).then(res.status(200).json({success:true,message:"Succesfully added the product"}))
      .catch(err => res.status(500).json(err));
  };


  
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .getCart()
      .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {
        const product = products[0];
        console.log(product)
        return product.cartItem.destroy();
      })
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };
  