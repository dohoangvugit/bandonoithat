let quantity = 1;

function increment() {
  quantity++;
  document.getElementById("qty").innerText = quantity;
}

function decrement() {
  if (quantity === 1) return;
  quantity--;
  document.getElementById("qty").innerText = quantity;
}

function addToCart(product) {
  product.quantity = quantity;
  console.log("ADD TO CART:", product);
}
