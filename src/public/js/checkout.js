document.addEventListener('DOMContentLoaded', () => {
  const payBtn = document.getElementById('pay-momo-btn');
  const qrContainer = document.getElementById('qr-code-container');
  const qrImg = document.getElementById('qr-code');

  if (!payBtn) return;

  payBtn.addEventListener('click', async () => {
    payBtn.disabled = true;
    payBtn.innerText = 'Đang tạo payment...';

    try {
      const res = await fetch('/checkout/momo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Lỗi tạo payment');

      // Hiển thị QR
      const qrPayload = data.qrPayload;

      // Giả sử backend trả về link QR (nếu dùng sandbox hoặc thật, backend cần generate QR từ Momo API)
      // Tạm thời backend trả qrPayload.orderId và qrPayload.totalAmount
      const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=MomoPayment:OrderID=${qrPayload.orderId}&amount=${qrPayload.totalAmount}`;
      qrImg.src = qrUrl;
      qrContainer.style.display = 'block';

      payBtn.innerText = 'Quét QR để thanh toán';
    } catch (err) {
      console.error(err);
      alert('Lỗi tạo payment: ' + err.message);
      payBtn.disabled = false;
      payBtn.innerText = 'Thanh toán bằng Momo';
    }
  });
});
