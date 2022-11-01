const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{
    res.status(200).json({products,success:true})
  }).catch(err=>{res.status(500).json(err)})
}


exports.limitProducts = (req, res, next) => {
  let page = Number(req.query.page);
  let Limit = 2;
  
    Product.findAll({limit:2,offset:Limit*page})
      .then(products => {
        res.json({products , success:true})
      })
      .catch(err => {
        console.log(err);
      });
};
  