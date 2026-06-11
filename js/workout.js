(function() {
    const API_URL = 'https://my-json-server.typicode.com/gionatagaravani/mywellness-database/exercises';
    let exercises = [];

    document.addEventListener('DOMContentLoaded', () => {
        const exercisesContainer = document.getElementById('exercises-container');

        // Initialize App
        init();

        function init() {
            const loadedBefore = localStorage.getItem('exercises_loaded') === 'true';
            if (loadedBefore) {
                try {
                    exercises = JSON.parse(localStorage.getItem('exercises')) || [];
                    renderExercises();
                } catch (e) {
                    console.error('Error parsing exercises from localStorage:', e);
                    fetchExercises();
                }
            } else {
                fetchExercises();
            }
        }

        // Fetch from the API
        function fetchExercises() {
            if (exercisesContainer) {
                exercisesContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #555;">Loading exercises from server...</p>';
            }

            fetch(API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server returned status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        exercises = data;
                        localStorage.setItem('exercises', JSON.stringify(exercises));
                        localStorage.setItem('exercises_loaded', 'true');
                        renderExercises();
                        if (window.showToast) {
                            window.showToast('Exercises loaded successfully!', 'success');
                        }
                    } else {
                        throw new Error('Response data is not an array.');
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    if (exercisesContainer) {
                        exercisesContainer.innerHTML = `
                            <div style="grid-column: 1 / -1; text-align: center; background-color: #f8d7da; color: #721c24; padding: 1.5rem; border-radius: 8px; border: 1px solid #f5c6cb;">
                                <h4 style="margin-bottom: 0.5rem; font-weight: 600;">Failed to Load Exercises</h4>
                                <p style="font-size: 0.95rem; margin-bottom: 1rem;">Could not connect to the workout database server (${error.message}).</p>
                                <button id="btn-retry-fetch" class="btn-primary" style="padding: 0.4rem 1rem;">Retry Fetch</button>
                            </div>
                        `;
                        const btnRetry = document.getElementById('btn-retry-fetch');
                        if (btnRetry) {
                            btnRetry.addEventListener('click', fetchExercises);
                        }
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Database Connection Error',
                        text: 'Could not fetch exercises from the server. Please check your internet connection and try again.',
                        confirmButtonColor: '#3085d6'
                    });
                });
        }

        // Render exercise list
        function renderExercises() {
            if (!exercisesContainer) return;

            if (exercises.length === 0) {
                exercisesContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; background-color: white; padding: 3rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 1.2rem; color: #555; margin-bottom: 0;">No exercises found in your routine.</p>
                    </div>
                `;
                return;
            }

            exercisesContainer.innerHTML = '';

            exercises.forEach(exercise => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.minWidth = '320px';

                const diffBadgeClass = 'status-badge ' + (exercise.difficulty.toLowerCase() === 'beginner' ? 'confirmed' : 'pending');

                card.innerHTML = `
                    <h3 class="card-title">${exercise.name}</h3>
                    <div class="card-body">
                        <div class="booking-details">
                            <div class="booking-info-row">
                                <span class="icon">🏷️</span>
                                <span><strong>Category:</strong> ${exercise.category}</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">💪</span>
                                <span><strong>Target:</strong> ${exercise.targetMuscleGroup}</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">📈</span>
                                <span><strong>Difficulty:</strong> <span class="${diffBadgeClass}">${exercise.difficulty}</span></span>
                            </div>
                            <div class="booking-info-row" style="align-items: flex-start; margin-top: 0.25rem;">
                                <span class="icon">📝</span>
                                <span style="font-style: italic; color: #555; line-height: 1.4; font-size: 0.9rem;">${exercise.description || 'No description provided.'}</span>
                            </div>
                            <div class="booking-info-row" style="margin-top: 0.5rem; border-top: 1px dashed #eee; padding-top: 0.5rem;">
                                <span class="icon">🔢</span>
                                <span><strong>Routine:</strong> ${parseInt(exercise.defaultSets) || 0} Sets x ${parseInt(exercise.defaultReps) || 0} Reps</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">⏱️</span>
                                <span><strong>Duration:</strong> ${parseInt(exercise.durationMinutes) || 0} min</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">🔥</span>
                                <span><strong>Est. Calories:</strong> ${parseInt(exercise.caloriesBurnedEstimate) || 0} kcal</span>
                            </div>
                            <div class="booking-info-row">
                                <span class="icon">⚡</span>
                                <span><strong>Intensity:</strong> ${exercise.intensity || 'Medium'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer" style="display: flex; gap: 0.75rem; padding-top: 1.25rem;">
                        <button class="btn-primary btn-edit" style="flex: 1; padding: 0.5rem 1rem;">Edit</button>
                        <button class="btn-secondary btn-delete" style="flex: 1; padding: 0.5rem 1rem;">Delete</button>
                    </div>
                `;

                card.querySelector('.btn-edit').addEventListener('click', () => {
                    window.location.href = `workout-edit.html?id=${exercise.id}`;
                });
                card.querySelector('.btn-delete').addEventListener('click', () => confirmDeleteExercise(exercise.id));

                exercisesContainer.appendChild(card);
            });
        }

        // Delete Exercise (CRUD - Delete)
        function confirmDeleteExercise(id) {
            Swal.fire({
                title: 'Delete Exercise?',
                text: 'Are you sure you want to remove this exercise from your list?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteExercise(id);
                }
            });
        }

        function deleteExercise(id) {
            // Send request to API to mock real DELETE operation, then update local state
            fetch(`${API_URL}/${id}`, { method: 'DELETE' })
                .then(() => {
                    exercises = exercises.filter(ex => ex.id !== id);
                    localStorage.setItem('exercises', JSON.stringify(exercises));
                    renderExercises();
                    if (window.showToast) {
                        window.showToast('Exercise deleted successfully!', 'success');
                    }
                })
                .catch(err => {
                    console.error('Error deleting exercise:', err);
                    // Update state anyway as API is mock
                    exercises = exercises.filter(ex => ex.id !== id);
                    localStorage.setItem('exercises', JSON.stringify(exercises));
                    renderExercises();
                    if (window.showToast) {
                        window.showToast('Exercise deleted locally!', 'info');
                    }
                });
        }
    });
})();
