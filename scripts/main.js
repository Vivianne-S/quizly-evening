const app = document.getElementById("app");

// Question data is loaded from questions.js (must run before this file in index.html)

/** @type {"welcome" | "quiz" | "result"} */
let currentView = "welcome";

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
let selectedAnswer = "";
let playerName = "";
let nameValidationError = "";
let pendingPlayerName = "";

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

  const form = document.createElement("form");
  form.className = "welcome-form";
  form.addEventListener("submit", handleWelcomeSubmit);

  const nameLabel = document.createElement("label");
  nameLabel.className = "welcome-form__label";
  nameLabel.htmlFor = "player-name";
  nameLabel.textContent = "Player name";

  const nameHint = document.createElement("p");
  nameHint.className = "welcome-form__hint";
  nameHint.textContent = "At least 2 characters to start the quiz";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "player-name";
  nameInput.name = "playerName";
  nameInput.className = "welcome-form__input";
  nameInput.placeholder = "Enter your name";
  nameInput.value = pendingPlayerName;
  nameInput.autocomplete = "name";
  nameInput.required = true;
  nameInput.maxLength = 32;

  const nameError = document.createElement("p");
  nameError.className = "welcome-form__error";
  nameError.setAttribute("role", "alert");
  if (nameValidationError) {
    nameError.textContent = nameValidationError;
  } else {
    nameError.hidden = true;
  }

  const nameCard = document.createElement("div");
  nameCard.className = "welcome-form__card";
  nameCard.append(nameLabel, nameHint, nameInput, nameError);

  const startButton = document.createElement("button");
  startButton.type = "submit";
  startButton.className = "btn btn--primary";
  startButton.textContent = "Start Game";

  form.append(nameCard, startButton);

  section.append(title, intro, rulesGrid, form);
  return section;
}

function createAnswerButton(answer, question) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn--answer";
  button.textContent = answer;

  if (hasAnswered) {
    button.disabled = true;
    if (answer === question.correctAnswer) {
      button.classList.add("btn--answer-correct");
    } else if (answer === selectedAnswer) {
      button.classList.add("btn--answer-wrong");
    }
  } else {
    button.addEventListener("click", () => handleAnswer(answer));
  }

  return button;
}

function renderQuestion() {
  const section = document.createElement("section");
  section.className = "view view--quiz";

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const header = document.createElement("header");
  header.className = "quiz-header";

  const brand = document.createElement("p");
  brand.className = "quiz-brand";
  brand.textContent = "Quizly Evening";

  const progress = document.createElement("p");
  progress.className = "quiz-progress";
  progress.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

  header.append(brand, progress);

  const questionText = document.createElement("h2");
  questionText.className = "quiz-question-text";
  questionText.textContent = question.text;

  const answers = document.createElement("div");
  answers.className = "answers answers--grid";

  question.options.forEach((option) => {
    const answerButton = createAnswerButton(option, question);
    answers.appendChild(answerButton);
  });

  section.append(header, questionText, answers);

  if (hasAnswered) {
    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";
    const isCorrect = selectedAnswer === question.correctAnswer;
    feedback.textContent = isCorrect ? "Correct!" : "Wrong!";
    feedback.classList.add(isCorrect ? "quiz-feedback--correct" : "quiz-feedback--wrong");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "btn btn--primary btn--next";
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    nextButton.textContent = isLastQuestion ? "See results" : "Next question";
    nextButton.addEventListener("click", handleNextQuestion);

    section.append(feedback, nextButton);
  }

  return section;
}

function renderResult() {
  const section = document.createElement("section");
  section.className = "view view--quiz view--result";

  const heading = document.createElement("h2");
  heading.className = "quiz-question-text";
  heading.textContent = "Quiz complete!";

  const playerGreeting = document.createElement("p");
  playerGreeting.className = "quiz-result-player";
  playerGreeting.textContent = `Well done, ${playerName}!`;

  const result = document.createElement("p");
  result.className = "quiz-result-score";
  result.textContent = `${score} of ${questions.length} correct`;

  const playAgain = document.createElement("button");
  playAgain.type = "button";
  playAgain.className = "btn btn--primary";
  playAgain.textContent = "Play again";
  playAgain.addEventListener("click", handlePlayAgain);

  section.append(heading, playerGreeting, result, playAgain);
  return section;
}

function handleAnswer(answer) {
  const question = questions[currentQuestionIndex];
  selectedAnswer = answer;
  hasAnswered = true;

  if (answer === question.correctAnswer) {
    score += 1;
  }

  render();
}

function handleNextQuestion() {
  hasAnswered = false;
  selectedAnswer = "";

  if (currentQuestionIndex === questions.length - 1) {
    currentView = "result";
    render();
    return;
  }

  currentQuestionIndex += 1;
  render();
}

function handlePlayAgain() {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;
  selectedAnswer = "";
  currentView = "quiz";
  render();
}

function render() {
  app.replaceChildren();

  if (currentView === "welcome") {
    app.appendChild(renderWelcome());
  } else if (currentView === "quiz") {
    app.appendChild(renderQuestion());
  } else if (currentView === "result") {
    app.appendChild(renderResult());
  }
}

function handleWelcomeSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const nameInput = form.querySelector("#player-name");
  const trimmedName = nameInput.value.trim();

  if (trimmedName.length < 2) {
    pendingPlayerName = nameInput.value;
    nameValidationError = "Please enter at least 2 characters.";
    render();
    return;
  }

  playerName = trimmedName;
  pendingPlayerName = "";
  nameValidationError = "";

  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;
  selectedAnswer = "";
  currentView = "quiz";
  render();
}

render();
