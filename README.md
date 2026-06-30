# TaskNext — Task Manager Web App

A clean, responsive task manager built with vanilla **HTML**, **CSS**, and **JavaScript** as part of Minor Project 2. TaskNext lets you add, complete, filter, and delete daily tasks — all updated dynamically in the DOM with no page reloads, and persisted locally so your list survives a refresh.

## Live Demo

[Live Project URL](#) https://tasknext-lime.vercel.app/

## Features

- **Add tasks** — via button click or Enter key
- **Mark as completed** — animated checkbox with strikethrough effect
- **Delete tasks** — smooth slide-out animation on removal
- **Filter views** — All / Active / Completed
- **Task summary** — live count of remaining vs. completed tasks
- **Clear completed** — bulk-remove finished tasks in one click
- **Persistent storage** — tasks are saved to `localStorage`, so they remain after closing the browser
- **Fully responsive** — works smoothly on mobile and desktop
- **Empty-state handling** — friendly messaging when there's nothing to show

## File Structure

```
task-manager/
├── index.html     # Page structure and markup
├── style.css       # All styling 
└── script.js       # All logic and DOM manipulation 
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5      | Semantic page structure |
| CSS3       | Styling, layout, animations, responsiveness |
| JavaScript (ES6+) | DOM Manipulation, State Management, localStorage |

No frameworks, build tools, or external dependencies are used (aside from the Google Fonts `Inter` typeface).

## How It Works

1. Type a task into the input field and press **Enter** or click **Add**.
2. Click the circular checkbox next to a task to mark it complete — its text gets a strikethrough and the entry dims.
3. Use the **All / Active / Completed** filter buttons to view subsets of your task list.
4. Hover over a task and click the trash icon to delete it.
5. Click **Clear completed** to remove all finished tasks at once.
6. Your tasks are automatically saved to the browser's `localStorage`, so they'll still be there the next time you open the app.

## Running Locally

This project is built using HTML, CSS, and JavaScript. Simply clone the repository and open index.html in your browser to run it locally.

```bash
git clone https://github.com/irisrann10/TaskNext-MinorProject2.git
cd TaskNext-MinorProject2
```

Then simply open `index.html` in your browser, or serve it locally:

```bash
# Python
python3 -m http.server 8000

# Node (with npx)
npx serve
```

## Deployment

This project is hosted using **Vercel**:

### Live Demo

https://tasknext-lime.vercel.app/

## Author

**Girish Ranjan**
KIIT Computer Science Engineering Student

## License

This project was created for academic submission purposes (Minor Project 2).
