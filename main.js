
// function agregar_carrito(i){

//     let producto = i.target.parentNode.querySelector("h2").textContent;
//     let precio = parseFloat( i.target.parentNode.querySelector("span").textContent);
//     let img = i.target.parentNode.parentNode.querySelector("img").src;
//     console.log(precio)
// }

// let btn_comprar = document.querySelectorAll(".btn-primary");

// for (let btn of btn_comprar){
//     btn.addEventListener("click", agregar_carrito);
// }

let addtocart = document.querySelectorAll(".btn-primary");

addtocart.forEach(addtocartbtn =>{
    addtocartbtn.addEventListener("click",addtocartclick)
});

const shoppingCartContainer = document.querySelector("shoppingCartContainer");
console.log(shoppingCartContainer)

function addtocartclick (event) {
    const button = event.target;
    const item = button.closest(".card");
    const itemName = item.querySelector(".card-body h2").textContent;
    const itemPrice = parseFloat(item.querySelector(".precio").textContent); 
    const itemImg = item.querySelector(".card-img-top").src;
    console.log(itemName,itemPrice,itemImg)
    // addItemToCart(itemName,itemPrice,itemImg);
}

// function addItemToCart(itemName,itemPrice,itemImg){
//     const shoppingCartRow = document.createElement("div");
//     const shoppingCartContent = `
//     <div class="row shoppingCartItem">
//         <div class="col-6">
//             <div class="shopping-cart-item">
//                 <img src=${itemImg} alt="" class="shopping-cart-image">
//                 <h5 class="shopping-cart-item-title">${itemName}
//                 </h5>
//             </div>
//         </div>
//         <div class="col-2">
//             <div class="shopping-cart-price">
//                 <p class="item-price">${itemPrice}</p>
//             </div>
//         </div>
//         <div class="col-4">
//             <div class="shopping-cart-quantity">
//                 <input type="number" class="shopping-cart-quantity-input" value="1">
//                 <button class="btn btn-danger buttonDelete" type="button" id="delete">x</button>
//             </div>
//         </div>
//     </div>`;
//     shoppingCartRow.innerHTML = shoppingCartContent;
//     shoppingCartContainer.append(shoppingCartRow);
// }

