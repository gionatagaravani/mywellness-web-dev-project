(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isIndexPage = window.location.pathname.toLowerCase().includes('index.html');

    if (isLoggedIn && isIndexPage) {
        const dashboardTitle = document.querySelector('.dashboard-title');
        dashboardTitle.textContent = `Good day, ${localStorage.getItem('username')}!`;
    }
})()