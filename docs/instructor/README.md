# Teaching with Python DSA Lab

The course supports self-paced learners and instructor-led classes with the same material. This folder is for instructors.

- [Guides by topic](topics.md): one page per topic with objectives, duration, prerequisites, a lesson plan, live-coding demos, questions to ask, classroom and pair-programming exercises, homework and solutions. They are generated from the course data, so they always match what students see.
- This page: how to run sessions, and the grading rubrics.

## Setting up a class

1. Students open https://rizwan3659.github.io/python-dsa-course/ (no install) **or** clone the repository for the local track (`python dsa.py`).
2. Progress lives in each student's browser (Progress → Export) or in `.dsa_progress.json` locally. Ask for an export or for `python dsa.py progress` output when you want to see it.
3. For assignments, give exercise ids (for example `dp-coin-change`). Students run `python dsa.py test dp-coin-change` and submit their file from `exercises/`.

## A 90-minute session

| Minutes | Activity | Course feature |
|---|---|---|
| 0–10 | Warm-up: 5 questions from last session | Topic Review tab → quiz, or the Revision page projected |
| 10–40 | Teach 2–3 lessons: explain briefly, then the class answers the inline questions together | Learn tab |
| 40–50 | Live coding: one "Code it" problem, thinking aloud, deliberately making and fixing one bug | Lesson code blocks, b2o walkthroughs |
| 50–75 | Pair programming on a medium problem | Guide's "Pair programming" list |
| 75–85 | Debrief: two pairs present their approach and complexity | — |
| 85–90 | Exit ticket: one predict-the-output and one complexity question | Topic quiz |

Keep explanation to about 30% of the time; the rest is students doing.

## Running pair programming

- **Driver** types; **navigator** reads the problem, proposes tests and spots bugs. Swap every 10 minutes.
- Before coding, each pair writes three comments: the pattern, the brute force and its complexity, and the target complexity.
- Circulate and ask: "What is your loop invariant?", "Which edge case have you not tested?", "What is the complexity, and why?"

## Questioning techniques

- **Predict first:** before stepping a visualizer or running code, everyone writes a prediction. Then run it.
- **Cold-call with wait time:** ask, wait 5 seconds, then pick a student; follow with "Who has a different answer?"
- **Wrong answers are data:** put a wrong prediction on the board and trace why it is wrong.

## Differentiation

| Students who are… | Give them |
|---|---|
| struggling | the "Complete the code" and dry-run questions first; hints level 1 and 2 only; easy problems |
| on track | the lesson's "Code it" problems and the pair-programming tasks |
| ahead | the hard problems, the follow-up challenge under each solution, and the mini-projects' extensions |

## Grading rubrics

### Coding exercise (10 points)

| Criterion | Points | Full marks when |
|---|---|---|
| Correctness | 5 | `python dsa.py test <id>` passes, including hidden tests (partial: 1 point per 20% of tests) |
| Complexity | 2 | meets the target complexity stated in the exercise, and the student can explain why |
| Code quality | 2 | clear names, no dead code, PEP 8, small helper functions where useful |
| Edge cases | 1 | the student lists the edge cases they considered (a comment is enough) |

Deduct up to 3 points for solutions that used "Show solution" without a written explanation of the approach in the student's own words.

### Mini-project (100 points)

| Criterion | Points |
|---|---|
| Milestone 1 tests | 20 |
| Milestone 2 tests | 20 |
| Milestone 3 tests | 20 |
| Data-structure choice and complexity, explained in a comment at the top of `starter.py` | 20 |
| Code clarity and structure | 10 |
| One extension implemented with its own tests | 10 |

### Quizzes

The Review-tab quizzes are self-checking. For a graded quiz, project a 10-question quiz and have students write answers on paper; 1 point each, with no partial credit for predict-the-output questions.

### Mock interviews

Use the rubric in [docs/interview/mock-interviews.md](../interview/mock-interviews.md#rubric-score-each-14).

## Where the solutions are

- Coding exercises: `solutions/NN_topic/<id>.py`, also behind "Show solution" in the browser after a confirmation click.
- Projects: `projects/NN_name/reference.py`.
- Predict, concept, dry-run and complete-the-code answers: shown in the browser after answering, and in `questions/NN-topic.js` (fields `a`, `rows`, `blanks`).
