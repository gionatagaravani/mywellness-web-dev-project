# My Wellness Website Project 🧘‍♂️💪

This is my Web Development university project. It is a web application called **My Wellness** where users can track their exercises and book spa treatments. The project uses HTML, CSS, and JavaScript. I used DOM manipulation to make the pages interactive, and Fetch API to get data from an external mock API.

---

## 🌟 Features
- 🔐 **Fake Login System**: Users need to login before using the dashboard. It checks the credentials and saves the login status in the browser using `localStorage`.
- 📊 **Dashboard**: Welcomes the user with their name and shows a moving banner with motivational quotes. It also shows the treatments they have booked.
- 🏋️‍♂️ **Workout List (CRUD)**:
  - Fetches a list of exercises from an external mock server: `https://my-json-server.typicode.com/gionatagaravani/mywellness-database/exercises`.
  - Users can add a new exercise, edit an existing one, or delete it from the list.
- 📅 **Book a Spa Treatment**: Users can click "Book Treatment" to open a modal where they can pick a date, time, and therapist. The booking then appears on the dashboard.
- 👤 **Edit Profile**: Users can pick an avatar, edit their display name, email, bio, and fitness goals. The changes show up immediately on the page.
- 🔔 **SweetAlert2**: I used this library to show nice success/error alerts and confirm boxes.

---

## 📁 File Structure
- 📄 `index.html`: The main dashboard page.
- 📄 `login.html`: The login page.
- 📄 `workout.html`: The workout routine list page.
- 📄 `workout-edit.html`: The page to add or edit an exercise.
- 📄 `booking.html`: The spa booking view page.
- 📄 `profile.html`: The user profile page.
- 📁 `css/style.css`: The stylesheet containing all styling rules and media queries.
- 📄 `js/auth.js`: Handles checking if user is logged in, logging in, and logging out.
- 📄 `js/script.js`: Holds simple dashboard functions like the marquee, booking loader, and mobile menu toggle.
- 📄 `js/workout.js`: Uses Fetch API to load exercises, retry if it fails, and handle deleting.
- 📄 `js/workout-edit.js`: Handles form inputs to create or update exercises.
- 📄 `js/booking.js`: Loads spa treatment options and handles booking modal.
- 📄 `js/profile.js`: Binds form inputs to profile card preview.

---

## 🎓 How I Met the Requirements
- 🏗️ **Semantic HTML**: I structured the files with `<header>`, `<nav>`, `<main>`, and `<form>` to keep the code clean.
- 📱 **Flexbox and Responsiveness**: I used CSS Flexbox for layouts, and media queries (`max-width: 768px` and `480px`) to make sure the pages look good on mobile phones and tablets.
- ⚡ **DOM Manipulation**: Every page has event listeners that add, remove, or modify elements on the fly.
- 📝 **Forms and Validation**: The forms use HTML5 validation rules like `required` to check inputs.
- 🌐 **Asynchronous Operations**: In `js/workout.js` and `js/workout-edit.js`, I used standard `fetch()` calls to talk to the server database.

---

## 🚀 How to Run It
You can run this project locally by extracting the `.zip` archive or cloning the repository directly from GitHub:

```bash
git clone https://github.com/gionatagaravani/mywellness-web-dev-project.git
cd mywellness-web-dev-project
```

Then, you can open and run it using one of these options:
1. 📄 Open the `login.html` file by double-clicking it to launch it directly in your web browser.
2. 💻 Or run it using a local server. If you use VS Code, open the project directory and click **Go Live** with the Live Server extension.

---
Created by Gionata Garavani.
