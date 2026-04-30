$(document).ready(function () {
    $('#productsTable').DataTable({
        pageLength: 7,
    });

    $(document).on('click', '.btnDelete', function () {
        const id = $(this).data('id');

        if (!confirm('Xóa sản phẩm này?')) return;

        $.ajax({
            url: `/admin/products/${id}`,
            method: 'DELETE',
            success() {
                location.reload();
            },
        });
    });
});
