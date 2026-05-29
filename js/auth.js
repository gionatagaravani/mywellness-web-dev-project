(function() {

    // Check authentication state immediately to prevent "flash of unauthenticated content"
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoginPage = window.location.pathname.toLowerCase().includes('login.html');

    if (!isLoggedIn && !isLoginPage) {
        window.location.href = 'login.html';
        return; // Stop further execution
    } else if (isLoggedIn && isLoginPage) {
        window.location.href = 'index.html';
        return; // Stop further execution
    }

    // Run DOM-dependent interactions once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Handle login form submission
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const usernameInput = document.getElementById('username');
                const username = usernameInput ? usernameInput.value.trim() : '';

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                showToast('Signed in successfully', 'success').then(() => {
                    window.location.href = 'index.html';
                }); 
            });
        }

        // Handle logout buttons
        const logoutButtons = document.querySelectorAll('.btn-logout');
        logoutButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                showToast('Signed out successfully', 'info').then(() => {
                    window.location.href = 'login.html';
                });
            });
        });
    });
})();
