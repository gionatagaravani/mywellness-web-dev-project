(function() {
    document.addEventListener('DOMContentLoaded', () => {
        // Form inputs
        const profileForm = document.getElementById('profile-form');
        const usernameInput = document.getElementById('profile-username');
        const emailInput = document.getElementById('profile-email');
        const goalSelect = document.getElementById('profile-goal');
        const bioTextarea = document.getElementById('profile-bio');
        const avatarButtons = document.querySelectorAll('.avatar-option');
        const btnReset = document.getElementById('btn-reset');

        // Overview elements
        const summaryAvatar = document.getElementById('summary-avatar');
        const summaryUsername = document.getElementById('summary-username');
        const summaryEmail = document.getElementById('summary-email');
        const summaryGoal = document.getElementById('summary-goal');
        const summaryBio = document.getElementById('summary-bio');

        // Local state for selected avatar in form
        let selectedAvatar = '👤';

        // Load profile data from localStorage
        function loadProfile() {
            const savedUsername = localStorage.getItem('username') || 'Gionata';
            const savedEmail = localStorage.getItem('email') || 'gionata@example.com';
            const savedGoal = localStorage.getItem('fitnessGoal') || 'Stay Healthy';
            const savedBio = localStorage.getItem('bio') || 'Fitness enthusiast and spa lover.';
            const savedAvatar = localStorage.getItem('avatar') || '👤';

            // Prefill inputs
            if (usernameInput) usernameInput.value = savedUsername;
            if (emailInput) emailInput.value = savedEmail;
            if (goalSelect) goalSelect.value = savedGoal;
            if (bioTextarea) bioTextarea.value = savedBio;

            // Highlight saved avatar
            selectedAvatar = savedAvatar;
            avatarButtons.forEach(btn => {
                if (btn.getAttribute('data-avatar') === savedAvatar) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Update overview
            updateOverview(savedAvatar, savedUsername, savedEmail, savedGoal, savedBio);
        }

        // Helper to update the left overview card
        function updateOverview(avatar, username, email, goal, bio) {
            if (summaryAvatar) summaryAvatar.textContent = avatar;
            if (summaryUsername) summaryUsername.textContent = username;
            if (summaryEmail) summaryEmail.textContent = email;
            if (summaryGoal) summaryGoal.textContent = goal;
            if (summaryBio) summaryBio.textContent = bio || 'No bio provided.';
        }

        // Avatar selector click handlers
        avatarButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                avatarButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedAvatar = btn.getAttribute('data-avatar');

                // Live preview in overview card
                if (summaryAvatar) {
                    summaryAvatar.textContent = selectedAvatar;
                    // Mini bounce micro-animation
                    summaryAvatar.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        summaryAvatar.style.transform = 'none';
                    }, 200);
                }
            });
        });

        // Form submission
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const username = usernameInput ? usernameInput.value.trim() : '';
                const email = emailInput ? emailInput.value.trim() : '';
                const goal = goalSelect ? goalSelect.value : 'Stay Healthy';
                const bio = bioTextarea ? bioTextarea.value.trim() : '';

                // Save to localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem('fitnessGoal', goal);
                localStorage.setItem('bio', bio);
                localStorage.setItem('avatar', selectedAvatar);

                // Update Overview
                updateOverview(selectedAvatar, username, email, goal, bio);

                // Show success notification
                if (window.showToast) {
                    window.showToast('Profile updated successfully!', 'success');
                } else {
                    alert('Profile updated successfully!');
                }
            });
        }

        // Reset button handler
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                loadProfile();
                if (window.showToast) {
                    window.showToast('Changes discarded', 'info');
                }
            });
        }

        // Initial load
        loadProfile();
    });
})();
