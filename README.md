# Quizly Evening

A vanilla JavaScript quiz game for the JavaScript 1 course.

## Project structure

```text
quizly-evening/
├── index.html
├── scripts/
│   ├── questions.js   ← quiz question data (array)
│   └── main.js        ← app logic, render, event handlers
├── styles/
│   └── style.css
└── README.md
```

## How to run

Open `index.html` in a browser, or use a local live server (recommended).

## Scripts load order

`questions.js` must load **before** `main.js` so the `questions` array exists when the app starts.
