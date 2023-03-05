updateShoppingCartIcon();
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
      $('.toast').toast('show');
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
    updateShoppingCartIcon();

}

function updateShoppingCartIcon() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartIcon = document.querySelector(".shoppingCartIcon");
  
    // Obtener el número total de elementos en el carrito
    let totalItems = cart.reduce((total, item) => total + Number(item.quantity), 0);

    // Actualizar el contenido del icono del carrito
    cartIcon.innerHTML = `
        <img src="../img/carrito.png"  alt="">
        <span class="shoppingCartItemCount">${totalItems}</span>
    `;
}
  
