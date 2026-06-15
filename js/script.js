(function () {

    // Initialize default bookings if they don't exist
    const bookingsInitialized = localStorage.getItem('bookings_initialized') === 'true';
    if (!bookingsInitialized) {
        const defaultBookings = [
            {
                id: 'pre-booked-swedish-massage',
                name: 'Swedish Massage',
                dateTimeStr: 'Friday, Jun 5, 2026 at 14:00',
                therapist: 'Sarah Connor',
                duration: '60 min',
                status: 'Confirmed'
            }
        ];
        localStorage.setItem('bookings', JSON.stringify(defaultBookings));
        localStorage.setItem('bookings_initialized', 'true');
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isIndexPage = window.location.pathname.toLowerCase().includes('index.html') || 
                        window.location.pathname.split('/').pop() === '';

    // Run DOM-dependent interactions once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        if (isLoggedIn && isIndexPage) {
            const username = localStorage.getItem('username');
            const dashboardTitle = document.querySelector('.dashboard-title');
            if (dashboardTitle) {
                dashboardTitle.textContent = `Good day, ${username}!`;
            }

            // Initialize motivational marquee
            const marqueeTrack = document.getElementById('motivation-marquee-track');
            if (marqueeTrack) {
                const marqueeQuotes = [
                    { text: "Every workout counts!", icon: "💪" },
                    { text: "Hydrate & keep moving!", icon: "💧" },
                    { text: "Progress, not perfection", icon: "🧗" },
                    { text: "Take a deep breath", icon: "🧘" },
                    { text: "Convince your mind", icon: "🧠" },
                    { text: "Recharge & rest today", icon: "🛌" },
                    { text: "Consistency is key!", icon: "🎯" },
                    { text: "Fuel with wholesome food", icon: "🍎" },
                    { text: "Every effort matters!", icon: "🌟" },
                    { text: "Stretch and relax", icon: "🤸" }
                ];

                const createGroup = () => {
                    const group = document.createElement('div');
                    group.className = 'marquee-group';
                    marqueeQuotes.forEach(q => {
                        const badge = document.createElement('div');
                        badge.className = 'motivation-badge';
                        badge.innerHTML = `
                            <span class="emoji">${q.icon}</span>
                            <span class="text">${q.text}</span>
                        `;
                        group.appendChild(badge);
                    });
                    return group;
                };

                // Add double set of groups for smooth infinite scrolling loop
                marqueeTrack.appendChild(createGroup());
                marqueeTrack.appendChild(createGroup());
            }

            // Render bookings dynamically
            const dashboardGrid = document.getElementById('dashboard-grid');
            if (dashboardGrid) {
                // Remove existing hardcoded booking cards (if any)
                const existingBookingCards = dashboardGrid.querySelectorAll('.booking-card');
                existingBookingCards.forEach(card => card.remove());

                const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                if (bookings.length === 0) {
                    const placeholder = document.createElement('div');
                    placeholder.id = 'no-bookings-msg';
                    placeholder.className = 'card';
                    placeholder.style.minWidth = '300px';
                    placeholder.innerHTML = `
                        <h3 class="card-title">My Bookings</h3>
                        <div class="card-body">
                            <p>No upcoming treatments scheduled.</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn-primary" onclick="location.href='booking.html'" style="width: 100%;">Book a Treatment</button>
                        </div>
                    `;
                    dashboardGrid.appendChild(placeholder);
                } else {
                    bookings.forEach(booking => {
                        const card = document.createElement('div');
                        card.className = 'card booking-card';
                        card.innerHTML = `
                            <h3 class="card-title">${booking.name}</h3>
                            <div class="card-body">
                                <div class="booking-details">
                                    <div class="booking-info-row">
                                        <span class="icon">📅</span>
                                        <span>${booking.dateTimeStr}</span>
                                    </div>
                                    <div class="booking-info-row">
                                        <span class="icon">👤</span>
                                        <span>Therapist: ${booking.therapist}</span>
                                    </div>
                                    <div class="booking-info-row">
                                        <span class="icon">⏱️</span>
                                        <span>Duration: ${booking.duration}</span>
                                    </div>
                                    <div class="booking-info-row">
                                        <span class="icon">🏷️</span>
                                        <span>Status: <span class="status-badge confirmed">${booking.status}</span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn-secondary" onclick="cancelBooking(this, '${booking.id}')">Cancel Booking</button>
                            </div>
                        `;
                        dashboardGrid.appendChild(card);
                    });
                }
            }
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.querySelector('.navbar');
        if (menuToggle && navbar) {
            menuToggle.addEventListener('click', () => {
                navbar.classList.toggle('active');
            });
        }
    });

    // Toast notifications
    window.showToast = (text, icon = 'success') => {
        return Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).fire({
            icon: icon,
            title: text
        });
    };

    window.cancelBooking = function (btnElement, bookingId) {
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
                    // Update localStorage
                    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                    if (bookingId) {
                        bookings = bookings.filter(b => b.id !== bookingId);
                    } else {
                        // Fallback: match by title
                        const title = card.querySelector('.card-title')?.textContent?.trim();
                        bookings = bookings.filter(b => b.name !== title);
                    }
                    localStorage.setItem('bookings', JSON.stringify(bookings));
                    card.remove();

                    // Show placeholder if no bookings remain
                    const dashboardGrid = document.getElementById('dashboard-grid');
                    if (dashboardGrid) {
                        const remainingBookingCards = dashboardGrid.querySelectorAll('.booking-card');
                        if (remainingBookingCards.length === 0) {
                            if (!document.getElementById('no-bookings-msg')) {
                                const placeholder = document.createElement('div');
                                placeholder.id = 'no-bookings-msg';
                                placeholder.className = 'card';
                                placeholder.style.minWidth = '300px';
                                placeholder.innerHTML = `
                                    <h3 class="card-title">My Bookings</h3>
                                    <div class="card-body">
                                        <p>No upcoming treatments scheduled.</p>
                                    </div>
                                    <div class="card-footer">
                                        <button class="btn-primary" onclick="location.href='booking.html'" style="width: 100%;">Book a Treatment</button>
                                    </div>
                                `;
                                dashboardGrid.appendChild(placeholder);
                            }
                        }
                    }
                }
                
                window.showToast("Booking cancelled successfully", "success");
            }
        });
    };

})()