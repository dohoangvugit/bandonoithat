$(document).ready(function () {
    $('#usersTable').DataTable({
        pageLength: 10,
    });

    $(document).on('change', '.changeRole', function () {
        const userId = $(this).data('id');
        const role = $(this).val();

        if (!role) return;

        fetch(`/admin/users/${userId}/change-role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert('Cập nhật vai trò thành công!');
                    location.reload();
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Lỗi cập nhật vai trò');
            });
    });

    $(document).on('click', '.btnDelete', function () {
        const userId = $(this).data('id');

        if (!confirm('Xóa người dùng này?')) return;

        fetch(`/admin/users/${userId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert('Xóa người dùng thành công!');
                    $(`#user-${userId}`).remove();
                } else {
                    alert(data.error || 'Lỗi xóa người dùng');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Lỗi xóa người dùng');
            });
    });
});
