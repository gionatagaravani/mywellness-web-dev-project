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

                Swal.fire({
                    title: 'Sign out?',
                    text: 'Are you sure you want to sign out of your account?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#8b0000',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, sign out',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('username');
                        localStorage.removeItem('email');
                        localStorage.removeItem('fitnessGoal');
                        localStorage.removeItem('bio');
                        localStorage.removeItem('avatar');
                        localStorage.removeItem('exercises');
                        localStorage.removeItem('exercises_loaded');
                        localStorage.removeItem('bookings');
                        localStorage.removeItem('bookings_initialized');
                        showToast('Signed out successfully', 'info').then(() => {
                            window.location.href = 'login.html';
                        });
                    }
                });
            });
        });
    });
})();
