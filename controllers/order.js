const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");

exports.postOrder =  async (req,res,next)=>{
    let order = await req.user.createOrder() 
    
    let myOrders = []
    req.user.getCart()
    .then(cart=>{
        console.log('Inside CartItems',cart)
        cart.getProducts()
        .then(async(products)=>{
            console.log('Cart Products',products)
            for(let i=0;i<products.length;i++) {
                // console.log('prodycts',products[i])
               let order_items =   await order.addProduct(products[i] , { 
                    through : {quantity : products[i].cartItem.quantity} })
                    myOrders.push(order_items)
                        console.log(myOrders)
                   }
                   CartItem.destroy({where:{cartId : cart.id}})
                   .then(response=>console.log(response))
                   res.status(200).json({data: myOrders , success : true})
                 })
        .catch(err=>console.log(err))
    })
    .catch((err)=>{
         res.status(500).json(err)
    })
 }


 exports.getOrder = (req,res,next)=>{
    let Orders=[]
    
    let userId = req.user.id
    Order.findAll({where:{userId:userId}})
    .then(async(orders)=>{
        for(let i=0;i<orders.length;i++) {
          let productsarr = []
          let orderobj = {'Orders': orders[i]}
         let OrderItems = await OrderItem.findAll({where:{orderId : orders[i].id}})
         for(let j=0;j<OrderItems.length;j++) {
            let product = await Product.findByPk(OrderItems[j].productId)
            productsarr.push(product)
         }
            orderobj["Products"] = productsarr
            Orders.push(orderobj)
        }
        res.status(200).json({data:Orders, success: true})
    })
   
   
}