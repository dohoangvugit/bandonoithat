$(document).ready(function () {
    $('#ordersTable').DataTable({
        pageLength: 10,
    });

    $(document).on('change', '.updateStatus', function () {
        const orderId = $(this).data('id');
        const status = $(this).val();

        if (!status) return;

        fetch(`/admin/orders/${orderId}/update-status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert('Cập nhật trạng thái thành công!');
                    location.reload();
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Lỗi cập nhật trạng thái');
            });
    });
});