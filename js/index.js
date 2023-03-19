

function updateShoppingCartIcon() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartIcon = document.querySelector(".shoppingCartIcon");
  
    // Obtener el número total de elementos en el carrito
    let totalItems = cart.reduce((total, item) => total + Number(item.quantity), 0);
    // Actualizar el contenido del icono del carrito
    if(totalItems==0) {
      cartIcon.innerHTML = `
      <img src="img/carrito.png"  alt="">
  `;
    }

    else{
      cartIcon.innerHTML = `
      <img src="img/carrito.png"  alt="">
      <span class="shoppingCartItemCount">${totalItems}</span>
  `;
    }

    

}

updateShoppingCartIcon();

const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

function getQuote(){
  fetch("https://quotable.io/random")
  .then(res => res.json())
  .then(data =>{
    quote.innerHTML = `"<strong>${data.content}</strong>"`;
    author.innerHTML = `"${data.author}"`;
  })
}

document.addEventListener('DOMContentLoaded', getQuote);
