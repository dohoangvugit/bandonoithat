let quantity = 1;
let cart = [];

function increment() {
    quantity++;
    document.getElementById('qty').innerText = quantity;
}

function decrement() {
    if (quantity === 1) return;
    quantity--;
    document.getElementById('qty').innerText = quantity;
}

function addToCart(product) {
    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0) {
        cart[index].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    console.log('Cart:', cart);

    // SHOW TOAST
    const toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
}
