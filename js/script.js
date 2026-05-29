(function () {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isIndexPage = window.location.pathname.toLowerCase().includes('index.html');

    if (isLoggedIn && isIndexPage) {
        const username = localStorage.getItem('username') || 'Gionata';
        const dashboardTitle = document.querySelector('.dashboard-title');
        if (dashboardTitle) {
            dashboardTitle.textContent = `Good day, ${username}!`;
        }
    }

    // Toast notifications
    window.showToast = (text, icon = 'success') => {
        return Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).fire({
            icon: icon,
            title: text
        });
    };

    window.cancelBooking = function (btnElement) {
        Swal.fire({
            title: "Cancel this booking?",
            text: "Are you sure you want to cancel this treatment? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, cancel booking",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                // Find and remove the card associated with this button
                const card = btnElement.closest('.card');
                if (card) {
                    card.remove();
                }
                
                window.showToast("Booking cancelled successfully", "success");
            }
        });
    };

})()