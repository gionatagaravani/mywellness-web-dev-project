(function() {
    const API_URL = 'https://my-json-server.typicode.com/gionatagaravani/mywellness-database/exercises';
    let exercises = [];
    let isEditMode = false;
    let exerciseIdToEdit = null;

    document.addEventListener('DOMContentLoaded', () => {
        const pageTitle = document.getElementById('page-title');
        const formCardTitle = document.getElementById('form-card-title');
        const form = document.getElementById('exercise-form');
        const btnCancel = document.getElementById('btn-cancel');

        // Inputs
        const nameInput = document.getElementById('exercise-name');
        const categorySelect = document.getElementById('exercise-category');
        const difficultySelect = document.getElementById('exercise-difficulty');
        const muscleInput = document.getElementById('exercise-muscle');
        const descTextarea = document.getElementById('exercise-desc');
        const setsInput = document.getElementById('exercise-sets');
        const repsInput = document.getElementById('exercise-reps');
        const durationInput = document.getElementById('exercise-duration');
        const caloriesInput = document.getElementById('exercise-calories');
        const intensitySelect = document.getElementById('exercise-intensity');

        // Retrieve current exercises list from localStorage
        try {
            exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        } catch (e) {
            console.error('Error reading exercises from localStorage', e);
            exercises = [];
        }

        // Check query parameters to determine mode (Edit vs Add)
        const urlParams = new URLSearchParams(window.location.search);
        const queryId = urlParams.get('id');

        if (queryId) {
            exerciseIdToEdit = queryId;
            // Support matching both numbers (API mock IDs) and strings (local generated IDs)
            const foundExercise = exercises.find(ex => String(ex.id) === String(queryId));
            
            if (foundExercise) {
                isEditMode = true;
                
                // Update header and page title
                if (pageTitle) pageTitle.textContent = 'Edit Exercise';
                if (formCardTitle) formCardTitle.textContent = `Modify ${foundExercise.name}`;

                // Populate form fields
                if (nameInput) nameInput.value = foundExercise.name || '';
                if (categorySelect) categorySelect.value = foundExercise.category || 'Strength';
                if (difficultySelect) difficultySelect.value = foundExercise.difficulty || 'Beginner';
                if (muscleInput) muscleInput.value = foundExercise.targetMuscleGroup || '';
                if (descTextarea) descTextarea.value = foundExercise.description || '';
                if (setsInput) setsInput.value = foundExercise.defaultSets || 3;
                if (repsInput) repsInput.value = foundExercise.defaultReps || 12;
                if (durationInput) durationInput.value = foundExercise.durationMinutes || 10;
                if (caloriesInput) caloriesInput.value = foundExercise.caloriesBurnedEstimate || 80;
                if (intensitySelect) intensitySelect.value = foundExercise.intensity || 'Medium';
            } else {
                console.warn(`Exercise ID ${queryId} not found. Defaulting to Create Mode.`);
            }
        }

        // Handle Cancel Button Click
        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                window.location.href = 'workout.html';
            });
        }

        // Handle Form Submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const exerciseData = {
                    name: nameInput ? nameInput.value.trim() : '',
                    category: categorySelect ? categorySelect.value : 'Strength',
                    difficulty: difficultySelect ? difficultySelect.value : 'Beginner',
                    targetMuscleGroup: muscleInput && muscleInput.value.trim() ? muscleInput.value.trim() : 'N/A',
                    description: descTextarea ? descTextarea.value.trim() : '',
                    defaultSets: setsInput ? parseInt(setsInput.value, 10) || 0 : 0,
                    defaultReps: repsInput ? parseInt(repsInput.value, 10) || 0 : 0,
                    durationMinutes: durationInput ? parseInt(durationInput.value, 10) || 0 : 0,
                    caloriesBurnedEstimate: caloriesInput ? parseInt(caloriesInput.value, 10) || 0 : 0,
                    intensity: intensitySelect ? intensitySelect.value : 'Medium'
                };

                if (!exerciseData.name) {
                    Swal.fire('Validation Error', 'Exercise Name is required', 'error');
                    return;
                }

                if (isEditMode) {
                    // Update Exercise
                    const targetId = isNaN(Number(exerciseIdToEdit)) ? exerciseIdToEdit : Number(exerciseIdToEdit);
                    const index = exercises.findIndex(ex => String(ex.id) === String(targetId));

                    if (index !== -1) {
                        const updatedExercise = { ...exerciseData, id: targetId };
                        exercises[index] = updatedExercise;
                        
                        // Simulate API PUT request (mock server)
                        const isServerId = typeof targetId === 'number' && targetId < 1000;
                        const putPromise = isServerId
                            ? fetch(`${API_URL}/${targetId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(updatedExercise)
                              })
                            : Promise.resolve();

                        putPromise
                            .then(() => {
                                localStorage.setItem('exercises', JSON.stringify(exercises));
                                if (window.showToast) {
                                    window.showToast('Exercise updated successfully!', 'success').then(() => {
                                        window.location.href = 'workout.html';
                                    });
                                } else {
                                    alert('Exercise updated successfully!');
                                    window.location.href = 'workout.html';
                                }
                            })
                            .catch(err => {
                                console.error('Error putting exercise:', err);
                                // Fallback to saving local changes anyway
                                localStorage.setItem('exercises', JSON.stringify(exercises));
                                window.location.href = 'workout.html';
                            });
                    } else {
                        Swal.fire('Error', 'Could not locate the exercise to save changes.', 'error');
                    }
                } else {
                    // Create Exercise
                    const newId = Date.now();
                    const newExercise = { ...exerciseData, id: newId };
                    
                    // Simulate API POST request
                    fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newExercise)
                    })
                    .then(() => {
                        exercises.push(newExercise);
                        localStorage.setItem('exercises', JSON.stringify(exercises));
                        
                        // Set the loaded flag to true in case it wasn't already set
                        localStorage.setItem('exercises_loaded', 'true');

                        if (window.showToast) {
                            window.showToast('Exercise added successfully!', 'success').then(() => {
                                window.location.href = 'workout.html';
                            });
                        } else {
                            alert('Exercise added successfully!');
                            window.location.href = 'workout.html';
                        }
                    })
                    .catch(err => {
                        console.error('Error posting exercise:', err);
                        // Save locally anyway
                        exercises.push(newExercise);
                        localStorage.setItem('exercises', JSON.stringify(exercises));
                        localStorage.setItem('exercises_loaded', 'true');
                        window.location.href = 'workout.html';
                    });
                }
            });
        }
    });
})();
