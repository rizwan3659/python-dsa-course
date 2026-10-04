# Python DSA Course

An interactive data structures and algorithms course in Python: 3 sessions of 2 hours each, with 11 coding exercises you write and test right in the browser.

**Open the course:** https://rizwan3659.github.io/python-dsa-course/

No install and no build step. Exercises run real Python in the browser using [Pyodide](https://pyodide.org). The first run downloads about 10 MB, which is then cached.

## How each session runs

- a **class clock** that shows which module should be on screen
- short **lessons** with runnable examples and quick quizzes
- a **visual lab** you can step through
- **coding exercises**: write a function, press **Check**, and see which tests pass (with hints and model solutions)
- a **review**: flashcards, exit quiz and homework
- **teacher notes** at the end of each module

Progress, code and quiz answers are saved in each student's own browser (localStorage).

## Sessions

| # | Session | Goal |
|---|---|---|
| 1 | [Python for DSA and how to solve problems](https://rizwan3659.github.io/python-dsa-course/#s01) | Get fluent with the Python tools every algorithm uses, and learn a repeatable way to attack a new problem. |
| 2 | [Big-O: measuring how code scales](https://rizwan3659.github.io/python-dsa-course/#s02) | Predict how running time and memory grow with input size, and know the cost of everyday Python operations. |
| 3 | [Recursion](https://rizwan3659.github.io/python-dsa-course/#s03) | Understand how a function that calls itself works, write recursive solutions with clear base cases, and speed them up with memoization. |

## Run it locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. The Python runner needs an internet connection the first time, to download Pyodide.

## Project structure

| Path | What it is |
|---|---|
| `index.html` | Page shell and styles |
| `engine.js` | Renders sessions and the interactive blocks; runs Python in a Web Worker so an infinite loop can be stopped |
| `sessions/sNN.js` | One file per session: modules, exercises (starter code, tests, solution) and labs |

To add a session, add `sessions/sNN.js` and a matching `<script>` tag in `index.html`. Module durations in a session add up to 120 minutes.
