(function () {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isIndexPage = window.location.pathname.toLowerCase().includes('index.html');

    if (isLoggedIn && isIndexPage) {
        const dashboardTitle = document.querySelector('.dashboard-title');
        dashboardTitle.textContent = `Good day, ${localStorage.getItem('username')}!`;
    }

    // Toast notifications
    window.showToast = (text, icon = 'success') => {
        return Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        }).fire({
            icon: icon,
            title: text
        });
    };
    
    // window.showConfirmDialog = (text, icon = 'warning') => {
    //     return Swal.fire({
    //         title: text,
    //         icon: icon,
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Your file has been deleted.",
    //                 icon: "success"
    //             });
    //         }
    //     });
    // }



})()