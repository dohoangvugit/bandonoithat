let quantity = 1;

function increment() {
    quantity++;
    document.getElementById('qty').innerText = quantity;
}

function decrement() {
    if (quantity > 1) quantity--;
    document.getElementById('qty').innerText = quantity;
}

async function addToCart(productId) {
    console.log("PRODUCT ID FRONT:", productId);

    const res = await fetch('/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            productId: productId,
            quantity: quantity
        })
    });

    const data = await res.json();
    console.log("SERVER:", data);

    if (res.status === 401) {
        alert('Bạn cần đăng nhập!');
        window.location.href = '/?auth=login';
        return;
    }

    const toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
}
