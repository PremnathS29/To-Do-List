To-Do List
A modern, feature-rich To-Do List application built with vanilla HTML, CSS, and JavaScript. It features a sleek "Emerald Midnight" dark mode aesthetic with deep forest greens and striking neon emerald accents.

✨ Features
Advanced Task Management: Add tasks with custom titles, due dates, and priority levels (High 🔥, Medium 🟡, Low 🟢).

Data Persistence: Automatically saves your tasks to the browser's Local Storage so you never lose your data when refreshing or closing the tab.

Filtering & Sorting: * Filter tasks by status (All, Incomplete, Completed).

Sort tasks dynamically by Due Date or Priority.

Inline Editing: Edit task titles, dates, and priorities directly within the list without opening separate modals.

Bulk Actions: Instantly mark all tasks as complete or clear out all completed tasks with a single click.

Desktop Notifications: Automatically schedules and sends browser notifications to remind you of tasks due within the next 14 days.

Responsive Design: Fully responsive layout that adapts seamlessly to desktop, tablet, and mobile screens.

📂 File Structure
The project is lightweight and requires zero external libraries or dependencies. It consists of three files:

index.html - The structural markup of the application.

style.css - The styles, animations, and Emerald Midnight theme setup.

script.js - The logic for task handling, local storage, and desktop notifications.

🚀 How to Run
Download or clone the repository to your local machine.

Ensure all three files (index.html, style.css, script.js) are in the same folder.

Double-click index.html to open it in your default web browser.

Note on Notifications: When you first open the app, your browser will ask for permission to send notifications. You must click Allow for the due date reminders to work.

🛠️ Built With
HTML5: Semantic structure and accessible forms.

CSS3: Flexbox, CSS Grid (implied by flex structures), modern pseudo-classes, and smooth transitions.

Vanilla JavaScript (ES6+): Array manipulation, DOM generation, Local Storage API, and the Notification API.

💡 Usage Tips
Priorities: Tasks sorted by priority will list High first, then Medium, then Low.

Editing: Clicking the pencil icon (✏️) replaces the task view with an inline form. Click "Save" to apply changes or "Cancel" to revert.

Reminders: Notifications are scheduled for 9:00 AM on the day the task is due.