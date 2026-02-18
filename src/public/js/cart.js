function updateSubtotal(productId) {
  const price = parseInt(document.getElementById(`price-${productId}`).innerText)
  const qty = parseInt(document.getElementById(`qty-${productId}`).innerText)
  const subtotal = price * qty

  document.getElementById(`subtotal-${productId}`).innerText = subtotal
}

function calcTotal() {
  let total = 0
  document.querySelectorAll('[id^="subtotal-"]').forEach(el => {
    total += parseInt(el.innerText)
  })
  document.getElementById('totalPrice').innerText = total
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[id^="qty-"]').forEach(el => {
    const id = el.id.split('-')[1]
    updateSubtotal(id)
  })
  calcTotal()
})

async function increment(productId) {
  const qtyEl = document.getElementById(`qty-${productId}`)
  let qty = parseInt(qtyEl.innerText) + 1
  qtyEl.innerText = qty

  updateSubtotal(productId)
  calcTotal()

  await fetch('/cart/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId, quantity: qty })
  })
}

async function decrement(productId) {
  const qtyEl = document.getElementById(`qty-${productId}`)
  let qty = parseInt(qtyEl.innerText)
  if (qty <= 1) return

  qty--
  qtyEl.innerText = qty

  updateSubtotal(productId)
  calcTotal()

  await fetch('/cart/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId, quantity: qty })
  })
}

async function removeFromCart(productId) {
  if (!confirm('Xóa sản phẩm khỏi giỏ hàng?')) return

  await fetch('/cart/remove', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId })
  })

  document.getElementById(`row-${productId}`).remove()
  calcTotal()
}
