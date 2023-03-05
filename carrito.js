const shoppingCartContainer = document.querySelector(".shoppingCartContainer");

const cartItems = JSON.parse(localStorage.getItem("cartItems"));
addItemToCart(cartItems);

function addItemToCart(cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
        const itemName = cartItems[i].name;
        const itemPrice = cartItems[i].price;
        const itemImg = cartItems[i].image;
        const itemQuantity = cartItems[i].quantity;
    
        const productTitle = shoppingCartContainer.getElementsByClassName("shopping-cart-item-title");
        let itemExists = false;
    
        for (let j = 0; j < productTitle.length; j++) {
          if (productTitle[j].innerText === itemName) {
            let productQuantity = productTitle[j].parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
            productQuantity.value = itemQuantity;
            itemExists = true;
            break;
          }
        }

    if(!itemExists){
      const shoppingCartRow = document.createElement("div");
      const shoppingCartContent = `
      <div class="row shoppingCartItem">
        <div class="col-6 shopping-cart-item">
          <img src=${itemImg} alt="" class="shopping-cart-image">
          <h5 class="shopping-cart-item-title">${itemName}</h5>
        </div>
        <div class="col-2 shopping-cart-price">
          <p class="item-price shoppingCartItemPrice">$${itemPrice}</p>
        </div>
        <div class="col-4 shopping-cart-quantity">
          <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value=${itemQuantity}>
          <button class="btn btn-danger buttonDelete" type="button" id="delete">x</button>
        </div>
      </div>`;
      shoppingCartRow.innerHTML = shoppingCartContent;
      shoppingCartContainer.append(shoppingCartRow);
      shoppingCartRow.querySelector(".buttonDelete").addEventListener("click",removeShoppingCartItem);
      shoppingCartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change",quantityChanged);
    }
  }
  updateShoppingCartTotal();
}


function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    const shoppingCartItem = buttonClicked.closest(".shoppingCartItem");
    const shoppingCartItemTitle = shoppingCartItem.querySelector(".shopping-cart-item-title").innerText;

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems = cartItems.filter(item => item.name !== shoppingCartItemTitle);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    shoppingCartItem.remove();
    updateShoppingCartTotal();
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

function quantityChanged(event){
    const input = event.target;
    if (input.value <= 0){
        input.value = 1;
    }

    const shoppingCartItem = input.closest(".shoppingCartItem");
    const shoppingCartItemTitle = shoppingCartItem.querySelector(".shopping-cart-item-title").innerText;
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const index = cartItems.findIndex(item => item.name === shoppingCartItemTitle);
    cartItems[index].quantity = input.value;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateShoppingCartTotal();
}


