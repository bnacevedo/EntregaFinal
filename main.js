let addtocart = document.querySelectorAll(".btn-primary");

addtocart.forEach(addtocartbtn =>{
    addtocartbtn.addEventListener("click",addtocartclick)
});


function addtocartclick (event) {
    const button = event.target;
    const item = button.closest(".card");
    const itemName = item.querySelector(".card-body h2").textContent;
    const itemPrice = item.querySelector(".precio").textContent; 
    const itemImg = item.querySelector(".card-img-top").src;
    addItemToCart(itemName,itemPrice,itemImg);
}

function addItemToCart(itemName, itemPrice, itemImg) {
    // Comprobar si ya hay elementos en el carrito almacenados en la memoria local
    let cartItems = localStorage.getItem("cartItems");
    cartItems = cartItems ? JSON.parse(cartItems) : [];
  
    // Comprobar si el elemento ya está en el carrito
    let existingItem = cartItems.find((item) => item.name === itemName);
  
    if (existingItem) {
      // Si el elemento ya está en el carrito, aumentar la cantidad
      existingItem.quantity++;
    } else {
      // Si el elemento no está en el carrito, añadirlo
      cartItems.push({
        name: itemName,
        price: itemPrice,
        image: itemImg,
        quantity: 1,
      });
    }
  
    // Guardar los elementos del carrito en la memoria local
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    // Mostrar una notificación de que el elemento se ha añadido al carrito
    $(".toast").toast("show");
  }
  
  
