# Quizly Evening

Individuellt quizspel i **vanilla JavaScript** (Uppgift 1, JavaScript 1).

## Projektstruktur

```text
quizly-evening/
├── index.html
├── scripts/
│   ├── questions.js   ← frågedata (array med 8 objekt)
│   └── main.js        ← state, render(), händelser
├── styles/
│   └── style.css
└── README.md
```

## Live (Netlify)

Quizet är publicerat och kan testas direkt i webbläsaren:

**https://quizly-evening.netlify.app**

## Köra projektet lokalt

1. Öppna `index.html` i webbläsaren, **eller**
2. Använd Live Server / liknande (rekommenderas).

`questions.js` måste laddas **före** `main.js` (se `index.html`).

---

## Uppfyllnad av uppgiften (kort checklista)

### Godkänt (G)

| Krav | Hur det är löst |
|------|------------------|
| Minst 8 frågor i JS | `questions` i `scripts/questions.js` |
| Objekt: text, alternativ, rätt svar | `text`, `options`, `correctAnswer` |
| Svarsknappar med `createElement` | `createAnswerButton()` i `main.js` |
| Rätt/fel på sidan | Feedback-text + grön/röd på knappar |
| Räknar rätt svar | Variabeln `score` |
| Progression | `Question X of 8` i `renderQuestion()` |
| Slutresultat | `X of 8 correct` i `renderResult()` |
| `addEventListener` | Inga `onclick` i HTML |
| Funktionsindelning | t.ex. `render`, `renderQuestion`, `handleAnswer` |

### Väl godkänt (VG)

| Krav | Hur det är löst |
|------|------------------|
| State + `render()` | `currentView`, `currentQuestionIndex`, `score`, `hasAnswered`, … → `render()` |
| Skapar-funktion returnerar element | `createAnswerButton` returnerar knappen |
| `forEach` på svarsalternativ | `question.options.forEach` i `renderQuestion()` |

### VG-tillägg (alla 5)

1. **Grön markering + disabled** efter svar — `hasAnswered`, `btn--answer-correct` / `btn--answer-wrong`
2. **Spela igen** utan omladdning — `handlePlayAgain()` + `render()` (inte `location.reload()`)
3. **Namnformulär** — `trim()`, minst 2 tecken, fel på sidan, namn i resultat
4. **Felaktiga frågor** listade med rätt svar — `incorrectAnswers`
5. **localStorage** — senaste resultat på welcome (`Last result: …`)

*(Extra som inte krävs: welcome-skärm, slumpad frågeordning, knappen “Back to start”.)*

---

## Kodöversikt (för muntlig redovisning)

### Variabler (exempel)

- `currentView` — `"welcome"` | `"quiz"` | `"result"`
- `quizQuestions` — kopia av `questions`, blandad vid varje omgång
- `currentQuestionIndex`, `score`, `hasAnswered`, `selectedAnswer`
- `playerName`, `nameValidationError`, `incorrectAnswers`

### Viktiga funktioner

| Funktion | Roll |
|----------|------|
| `render()` | Tömmer `#app` och ritar rätt vy |
| `renderWelcome()` | Regler, namn, Start Game, ev. last result |
| `renderQuestion()` | Fråga, svarsknappar, feedback, Nästa |
| `renderResult()` | Poäng, felgranskning, Play again / Back to start |
| `handleAnswer()` | Uppdaterar state efter klick på svar |
| `handleNextQuestion()` | Nästa fråga eller resultat + spara i localStorage |
| `createAnswerButton()` | Skapar en svarsknapp och returnerar den |

### Följ ett klick (svar)

1. Användaren klickar på ett svar → lyssnare i `createAnswerButton`
2. `handleAnswer(answer)` körs
3. `selectedAnswer` och `hasAnswered` sätts; vid rätt ökas `score`, annars push till `incorrectAnswers`
4. `render()` anropas
5. `renderQuestion()` bygger om vyn: knappar disabled, rätt svar grönt, valt fel rött, texten “Correct!” / “Wrong!”

### Frågedata

- Originalet ligger i `questions.js` (statisk array, ingen `fetch`).
- Vid **Start Game** / **Play again** anropas `beginQuizRun()` som kopierar och blandar till `quizQuestions`.

---


