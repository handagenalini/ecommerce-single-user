window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("http://localhost:3000/order")
      .then((response) => {
        console.log(response.data)
        let content = "";
        let parentDiv = document.getElementById("orderItems");
        let childDiv = document.createElement("div");
        for (let i = 0; i < response.data.data.length; i++) {
          let orderId = response.data.data[i].Orders.id;
          let productName;
          let productPrice;
          let products = response.data.data[i].Products;
          for (let j = 0; j < products.length; j++) {
            productName = response.data.data[i].Products[j].title;
            productPrice = response.data.data[i].Products[j].price;
            content = `<div class='orderTable'>
            
                   <div class="orderId"><span class='orderElement'>${orderId}</span></div>
                   <div class="orderName"><span class='orderElement'>${productName}</span></div>
                   <div class="orderPrice"><span class='orderElement'>${productPrice}</span></div>
                   </div>`;
   
             childDiv.innerHTML += content;
             parentDiv.append(childDiv);
           }
         }
       })
       .catch(err=>console.log(err))
   });