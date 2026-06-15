(function () {
    // List of 10 Mocked Wellness & Spa Treatments
    const treatments = [
        {
            id: 'swedish-massage',
            name: 'Swedish Massage',
            category: 'Massage',
            therapist: 'Sarah Connor',
            duration: 60,
            price: 85,
            description: 'A gentle full-body massage that promotes relaxation and improves blood flow.',
            pressure: 'Light to Medium',
            benefits: 'Relaxation & Stress Relief'
        },
        {
            id: 'deep-tissue-massage',
            name: 'Deep Tissue Massage',
            category: 'Massage',
            therapist: 'Marcus Aurelius',
            duration: 75,
            price: 110,
            description: 'Targets deep layers of muscle and connective tissue to relieve chronic tension.',
            pressure: 'Firm to Deep',
            benefits: 'Pain Relief & Muscle Recovery'
        },
        {
            id: 'hot-stone-therapy',
            name: 'Hot Stone Therapy',
            category: 'Spa Treatment',
            therapist: 'Selene Dion',
            duration: 90,
            price: 130,
            description: 'Uses heated basalt stones placed on key points of the body to melt away tension.',
            pressure: 'Medium',
            benefits: 'Deep Heat Therapy & Circulation'
        },
        {
            id: 'aromatherapy-massage',
            name: 'Aromatherapy Massage',
            category: 'Massage',
            therapist: 'Diana Prince',
            duration: 60,
            price: 95,
            description: 'Combines light, soothing massage strokes with high-quality essential oils to enhance mood.',
            pressure: 'Light',
            benefits: 'Calmness & Aromatherapeutic Lift'
        },
        {
            id: 'reflexology',
            name: 'Reflexology',
            category: 'Therapy',
            therapist: 'Bruce Wayne',
            duration: 45,
            price: 70,
            description: 'Focuses on applying pressure to reflex zones on the feet and hands corresponding to organs.',
            pressure: 'Medium',
            benefits: 'Balance & Systemic Recovery'
        },
        {
            id: 'shiatsu-massage',
            name: 'Shiatsu Massage',
            category: 'Eastern Therapy',
            therapist: 'Kenji Sato',
            duration: 60,
            price: 100,
            description: 'Traditional Japanese bodywork utilizing finger and palm pressure to improve energy flow (Qi).',
            pressure: 'Firm',
            benefits: 'Qi Flow & Stiffness Relief'
        },
        {
            id: 'acupuncture',
            name: 'Acupuncture Session',
            category: 'Therapy',
            therapist: 'Dr. Lin Alvarez',
            duration: 60,
            price: 120,
            description: 'Insertion of thin needles into strategic points to balance the body\'s natural energy pathways.',
            pressure: 'Minimal',
            benefits: 'Holistic Healing & Pain Management'
        },
        {
            id: 'chiropractic',
            name: 'Chiropractic Adjustment',
            category: 'Therapy',
            therapist: 'Dr. Charles Xavier',
            duration: 30,
            price: 90,
            description: 'Spinal manipulation to improve spinal alignment, joint mobility, and reduce pain.',
            pressure: 'Firm',
            benefits: 'Spinal Alignment & Joint Flex'
        },
        {
            id: 'facial-rejuvenation',
            name: 'Facial Rejuvenation',
            category: 'Skin Care',
            therapist: 'Cleopatra Selene',
            duration: 60,
            price: 105,
            description: 'Deep-cleansing facial treatment including exfoliation and massage for glowing skin.',
            pressure: 'Light',
            benefits: 'Skin Health & Radiant Glow'
        },
        {
            id: 'detox-body-wrap',
            name: 'Detoxifying Body Wrap',
            category: 'Body Care',
            therapist: 'Arthur Curry',
            duration: 75,
            price: 115,
            description: 'Warm mud or seaweed application wrapped to sweat out impurities and nourish skin.',
            pressure: 'None',
            benefits: 'Detoxification & Skin Hydration'
        },
        {
            id: 'thai-massage',
            name: 'Thai Massage',
            category: 'Eastern Therapy',
            therapist: 'Kenji Sato',
            duration: 90,
            price: 125,
            description: 'Uses passive stretching and gentle pressure along energy lines to increase flexibility and energy.',
            pressure: 'Firm',
            benefits: 'Flexibility & Energy Balance'
        },
        {
            id: 'aromatherapy-facial',
            name: 'Aromatherapy Facial',
            category: 'Skin Care',
            therapist: 'Cleopatra Selene',
            duration: 45,
            price: 80,
            description: 'A soothing facial treatment incorporating aromatic essential oils to calm skin and mind.',
            pressure: 'Light',
            benefits: 'Skin Nourishment & Relaxation'
        }
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('treatments-container');
        if (!container) return;

        renderTreatments();

        function renderTreatments() {
            container.innerHTML = '';
            
            treatments.forEach(treatment => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.minWidth = '320px';

                const badgeClass = 'status-badge ' + (
                    treatment.pressure.toLowerCase().includes('light') ? 'confirmed' : 'pending'
                );

                card.innerHTML = `
                    <h3 class="card-title">${treatment.name}</h3>
                    <div class="card-body">
                        <div class="booking-details">
                            <div class="booking-info-row">
                                <span class="icon">🏷️</span>
                                <span><strong>Category:</strong> ${treatment.category}</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">👤</span>
                                <span><strong>Default Therapist:</strong> ${treatment.therapist}</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">⏱️</span>
                                <span><strong>Duration:</strong> ${treatment.duration} min</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">💰</span>
                                <span><strong>Price:</strong> $${treatment.price}</span>
                            </div>
                            <div class="booking-info-row" style="align-items: flex-start; margin-top: 0.25rem;">
                                <span class="icon">📝</span>
                                <span style="font-style: italic; color: #555; line-height: 1.4; font-size: 0.9rem;">${treatment.description}</span>
                            </div>
                            <div class="booking-info-row" style="margin-top: 0.5rem; border-top: 1px dashed #eee; padding-top: 0.5rem;">
                                <span class="icon">🎯</span>
                                <span><strong>Benefits:</strong> ${treatment.benefits}</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">⚡</span>
                                <span><strong>Pressure:</strong> <span class="${badgeClass}">${treatment.pressure}</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer" style="display: flex; gap: 0.75rem; padding-top: 1.25rem;">
                        <button class="btn-primary btn-book" style="flex: 1; padding: 0.5rem 1rem;">Book Treatment</button>
                    </div>
                `;

                card.querySelector('.btn-book').addEventListener('click', () => openBookingModal(treatment));
                container.appendChild(card);
            });
        }

        function openBookingModal(treatment) {
            const today = new Date().toISOString().split('T')[0];

            Swal.fire({
                title: `Book ${treatment.name}`,
                html: `
                    <div style="text-align: left; display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem 0;">
                        <div>
                            <label for="swal-date" style="display: block; margin-bottom: 0.4rem; font-weight: 600; color: #333; font-size: 0.95rem;">Select Date</label>
                            <input id="swal-date" type="date" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box;" min="${today}" value="${today}">
                        </div>
                        <div>
                            <label for="swal-time" style="display: block; margin-bottom: 0.4rem; font-weight: 600; color: #333; font-size: 0.95rem;">Select Time</label>
                            <input id="swal-time" type="time" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box;" value="10:00">
                        </div>
                        <div>
                            <label for="swal-therapist" style="display: block; margin-bottom: 0.4rem; font-weight: 600; color: #333; font-size: 0.95rem;">Select Therapist</label>
                            <select id="swal-therapist" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box; background-color: white;">
                                <option value="Sarah Connor" ${treatment.therapist === 'Sarah Connor' ? 'selected' : ''}>Sarah Connor</option>
                                <option value="Marcus Aurelius" ${treatment.therapist === 'Marcus Aurelius' ? 'selected' : ''}>Marcus Aurelius</option>
                                <option value="Selene Dion" ${treatment.therapist === 'Selene Dion' ? 'selected' : ''}>Selene Dion</option>
                                <option value="Diana Prince" ${treatment.therapist === 'Diana Prince' ? 'selected' : ''}>Diana Prince</option>
                                <option value="Bruce Wayne" ${treatment.therapist === 'Bruce Wayne' ? 'selected' : ''}>Bruce Wayne</option>
                                <option value="Kenji Sato" ${treatment.therapist === 'Kenji Sato' ? 'selected' : ''}>Kenji Sato</option>
                                <option value="Dr. Lin Alvarez" ${treatment.therapist === 'Dr. Lin Alvarez' ? 'selected' : ''}>Dr. Lin Alvarez</option>
                                <option value="Dr. Charles Xavier" ${treatment.therapist === 'Dr. Charles Xavier' ? 'selected' : ''}>Dr. Charles Xavier</option>
                                <option value="Cleopatra Selene" ${treatment.therapist === 'Cleopatra Selene' ? 'selected' : ''}>Cleopatra Selene</option>
                                <option value="Arthur Curry" ${treatment.therapist === 'Arthur Curry' ? 'selected' : ''}>Arthur Curry</option>
                            </select>
                        </div>
                    </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Confirm Booking',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#1e90ff',
                cancelButtonColor: '#6c757d',
                preConfirm: () => {
                    const date = document.getElementById('swal-date').value;
                    const time = document.getElementById('swal-time').value;
                    const therapist = document.getElementById('swal-therapist').value;
                    if (!date || !time) {
                        Swal.showValidationMessage('Please select both a date and time');
                        return false;
                    }
                    return { date, time, therapist };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { date, time, therapist } = result.value;
                    const formattedDateTime = formatBookingDate(date, time);

                    const newBooking = {
                        id: 'booking-' + Date.now(),
                        name: treatment.name,
                        dateTimeStr: formattedDateTime,
                        therapist: therapist,
                        duration: `${treatment.duration} min`,
                        status: 'Confirmed'
                    };

                    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                    bookings.push(newBooking);
                    localStorage.setItem('bookings', JSON.stringify(bookings));

                    Swal.fire({
                        title: 'Success!',
                        text: `${treatment.name} has been booked successfully for ${formattedDateTime}.`,
                        icon: 'success',
                        confirmButtonColor: '#1e90ff'
                    }).then(() => {
                        window.location.href = 'index.html';
                    });
                }
            });
        }

        function formatBookingDate(dateStr, timeStr) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                
                const date = new Date(year, month, day);
                const dayName = days[date.getDay()];
                const monthName = months[date.getMonth()];
                
                return `${dayName}, ${monthName} ${day}, ${year} at ${timeStr}`;
            }
            return `${dateStr} at ${timeStr}`;
        }
    });
})();
