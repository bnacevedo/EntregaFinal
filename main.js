
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

const shoppingCartContainer = document.querySelector(".shoppingCartContainer");

function addtocartclick (event) {
    const button = event.target;
    const item = button.closest(".card");
    const itemName = item.querySelector(".card-body h2").textContent;
    const itemPrice = item.querySelector(".precio").textContent; 
    const itemImg = item.querySelector(".card-img-top").src;
    addItemToCart(itemName,itemPrice,itemImg);
}

function addItemToCart(itemName,itemPrice,itemImg){
    const productTitle = shoppingCartContainer.getElementsByClassName("shopping-cart-item-title")
    for(let i = 0; i < productTitle.length; i++){
        if(productTitle[i].innerText === itemName){
            let productQuantity = productTitle[i].parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
            console.log(productQuantity);
            productQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }
    const shoppingCartRow = document.createElement("div");
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6 shopping-cart-item">
            <img src=${itemImg} alt="" class="shopping-cart-image">
            <h5 class="shopping-cart-item-title">${itemName}
            </h5>
        </div>
        <div class="col-2 shopping-cart-price">
            <p class="item-price shoppingCartItemPrice">$${itemPrice}</p>
        </div>
        <div class="col-4 shopping-cart-quantity">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
            <button class="btn btn-danger buttonDelete" type="button" id="delete">x</button>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartContainer.append(shoppingCartRow);
    shoppingCartRow.querySelector(".buttonDelete").addEventListener("click",removeShoppingCartItem);
    shoppingCartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change",quantityChanged);
    updateShoppingCartTotal()
}

function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector(".shoppingCartTotal");
    const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement  = shoppingCartItem.querySelector(".shoppingCartItemPrice");
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace("$",""));
    
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(".shoppingCartItemQuantity");
        shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `
    $${total}`
}

function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    buttonClicked.closest(".shoppingCartItem").remove();
    updateShoppingCartTotal();
}

function quantityChanged(event){
    const input = event.target;
    if (input.value <= 0){
        input.value = 1;
    }
    updateShoppingCartTotal();
}
