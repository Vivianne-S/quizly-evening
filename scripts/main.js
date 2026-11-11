const app = document.getElementById("app");

const questions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    text: "Which planet is the largest in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    text: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    text: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
  },
  {
    text: "Who wrote the Harry Potter book series?",
    options: [
      "J.R.R. Tolkien",
      "J.K. Rowling",
      "C.S. Lewis",
      "Roald Dahl",
    ],
    correctAnswer: "J.K. Rowling",
  },
  {
    text: "What is the smallest country in the world by area?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    correctAnswer: "Vatican City",
  },
  {
    text: "Which ocean is the deepest?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
];

/** @type {"welcome" | "quiz"} */
let currentView = "welcome";

function renderWelcome() {
  const section = document.createElement("section");
  section.className = "view view--welcome";

  const title = document.createElement("h1");
  title.textContent = "Welcome to Quizly Evening!";

  const intro = document.createElement("p");
  intro.className = "welcome-intro";
  intro.textContent =
    "Put your knowledge to the test and see how high you can score! — When you're ready, press start below.";

  const rulesGrid = document.createElement("div");
  rulesGrid.className = "rules-grid";

  const rulesData = [
    { value: "8", label: "Questions", detail: "One at a time" },
    { value: "4", label: "Answer options", detail: "Only one is correct" },
    { value: "1", label: "Point each", detail: "Per correct answer" },
    { value: "★", label: "Final score", detail: "Shown when you finish" },
  ];

  rulesData.forEach(({ value, label, detail }) => {
    const card = document.createElement("article");
    card.className = "rule-card";

    const valueEl = document.createElement("p");
    valueEl.className = "rule-card__value";
    valueEl.textContent = value;

    const labelEl = document.createElement("h2");
    labelEl.className = "rule-card__label";
    labelEl.textContent = label;

    const detailEl = document.createElement("p");
    detailEl.className = "rule-card__detail";
    detailEl.textContent = detail;

    card.append(valueEl, labelEl, detailEl);
    rulesGrid.appendChild(card);
  });

  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.className = "btn btn--primary";
  startButton.textContent = "Start Game";

  startButton.addEventListener("click", handleStartGame);

  section.append(title, intro, rulesGrid, startButton);
  return section;
}

function renderQuizPlaceholder() {
  const section = document.createElement("section");
  section.className = "view view--quiz";

  const heading = document.createElement("h1");
  heading.textContent = "Quiz";

  const placeholder = document.createElement("p");
  placeholder.className = "quiz-placeholder";
  placeholder.textContent = "Questions will appear here soon.";

  section.append(heading, placeholder);
  return section;
}

function render() {
  app.replaceChildren();

  if (currentView === "welcome") {
    app.appendChild(renderWelcome());
  } else if (currentView === "quiz") {
    app.appendChild(renderQuizPlaceholder());
  }
}

function handleStartGame() {
  currentView = "quiz";
  render();
}

render();
