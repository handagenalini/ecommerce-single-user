let c = 0;
let cc = 1;
let pag = document.getElementById('pagination');

window.addEventListener('DOMContentLoaded',()=>{
    
    axios.get(`http://localhost:3000/pagination?page=0`)
    .then(result=>{
        console.log(result.data.products)
        const div=document.getElementById('newdiv')
        let cont="";
        for(let i=0;i<result.data.products.length;i++)
        {
            let prodId=result.data.products[i].id
            let title=result.data.products[i].title;
            let price=result.data.products[i].price;
            let image=result.data.products[i].imageUrl
            cont+=`
            <div class="row1">
              <div class="albums">
                <h3 class="title">${title}</h3>
                <img
                  class="images"
                  src="${image}"
                  alt="Album 1"
                />
                <div class="price">
                  <h4 class="amount">${price}</h4>
                  <button class="addcart" onclick="addToCart(${prodId})">Add to Cart</button>
                  </div>
                </div>
              </div>`
          }
              div.innerHTML=cont
          //console.log(cont," this is cont")
      })
      .catch(err=>{console.log(err)})
      pagination()
  })
  function pagination(e) {
    axios.get("http://localhost:3000/products")
    .then((productInfo)=>{
      console.log(productInfo,"product info---")
      let number_of_pages;
      if(productInfo.data.products.length % 2 == 0) {
         number_of_pages = Math.trunc(((productInfo.data.products.length))/2)
      } else {
         number_of_pages = Math.trunc(((productInfo.data.products.length))/2)+1
      }
     
      for (let i = 0; i < number_of_pages; i++) {
        pag.innerHTML += `<button
        class="pagebtn" id="?page=${c++}">${cc++}</button> `;
      }
    })
    .catch(err=> console.log(err))
  }
  pag.addEventListener('click', (e)=>{
    let id = e.target.id;
    console.log(id)
    axios.get(`http://localhost:3000/pagination${id}`)
    .then(productInfo=>{
      let products = productInfo.data.products;
       let childHTML="";
        let parent = document.getElementById("newdiv");
         console.log(products,"parent-----",parent)
        products.forEach((product) => {
           childHTML += ` <div class="row1">
           <div class="albums">
             <h3 class="title">${product.title}</h3>
             <img
               class="images"
               src="${product.imageUrl}"
               alt="Album 1"
             />
             <div class="price">
               <h4 class="amount">${product.price}</h4>
               <button class="addcart" onclick="addToCart(${product.prodId})">Add to Cart</button>
             </div>
           </div>
         </div>`;
        });
        parent.innerHTML = childHTML;
    })
    .catch(err=> console.log(err))
  })
  function addToCart(prodId) {
    
    //let itemTobeAdded = button.parentElement.parentElement
    
    let title = document.getElementsByClassName('title')[0].innerText
    let image = document.getElementsByClassName('images')[0].src
    let price = document.getElementsByClassName('amount')[0].innerText
    //let prodId=document.getElementsByClassName('id')[0].innerText
    console.log(title,image,price,"-------")
    axios.post(`http://localhost:3000/cart`,{id:prodId})
    .then(response=>{
if(response.status===200){
            addingItem(title,image,price)
        }
    })
    .catch(err=>console.log(err))
   
   
}
function addingItem(title,image,price) {
    let cartRow = document.createElement('div')
    cartRow.classList='cart-row'
    let cartItems = document.getElementsByClassName('cart-items')[0]

    let content =  ` <div class="cart-item cart-column">
    <img class="cart-item-image" src=${image} width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
cartRow.innerHTML = content
cartItems.append(cartRow)
alert('Product Successfully Added')
}



let open = document.getElementsByClassName("seecart");
const close = document.getElementById("cl");
const container = document.getElementById("container");

for(let i=0;i<open.length;i++) {
    let btn=open[i]
    btn.addEventListener("click", showcart)
    
}
function showcart() {
    let data,cont;
    
    container.classList.add("active");
    axios.get(`http://localhost:3000/cart`)
    .then(response=>{
        data=response.data
        console.log(data);
        for(let i=0;i<data.length;i++){
            let title=data[i].title;
            let price=data[i].price;
            let image=data[i].imageUrl
            console.log("title--",title)
            cont+=`<div class="cart-row">
            <div class="cart-item cart-column">
            <img
                class="cart-item-image"
                src=${image}
                width="100"
                height="100"
              />
              <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1" />
              <button class="btn btn-danger" type="button">REMOVE</button>
              </div>
              -- </div>`
        }
        document.getElementById('ddiv').innerHTML=cont
    })
    .catch(err=>console.log(err))
    }
    
    close.addEventListener("click", () => {
        container.classList.remove("active");
    });
    
    let orderbtn=document.getElementById('orderbtn')
    orderbtn.addEventListener('click',()=>{
      console.log("axios entering")
      axios.post('http://localhost:3000/order',{cartId:1})
    .then(response=>{
      let orderId=response.data.data[0][0].orderId
      alert(`Your Order has been placed with order Id $
      {orderId}`)})
      .catch(err=>console.log(err))
    })

