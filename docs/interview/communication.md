# Communicating a solution

Interviewers grade your thinking, not just the final code. A correct solution delivered in silence often scores lower than a slightly slower one explained clearly. Use these six steps (the UMPIRE method from Topic 1).

## 1. Understand (2–4 minutes)

- Restate the problem in your own words.
- Ask about input size, types, empty input, duplicates, negatives, and what to return when there is no answer.
- Work through the given example by hand, then invent one edge case.

> "So I get a list of integers, possibly negative, possibly empty, and I return the length of the longest run of consecutive values. For an empty list that's 0. Can values repeat?"

## 2. Match (1–2 minutes)

Name candidate patterns and why.

> "Consecutive values, not positions, so sorting would work in O(n log n). A set might let me do it in O(n) by only starting a count at the beginning of a run."

## 3. Plan (2–5 minutes)

- Give the brute force and its complexity first, even if you will not code it.
- Then the better idea, step by step, before writing code.
- State the target complexity and get a nod from the interviewer.

> "Brute force: for each number, count upwards with list lookups, O(n²). Better: put everything in a set; for each x where x − 1 is not in the set, walk up. Each number is visited at most twice, so O(n) time, O(n) space. Shall I code that?"

## 4. Implement (10–20 minutes)

- Use clear names (`left`, `window_sum`, `seen`), not `a`, `b`, `c`.
- Narrate briefly while you type: what each block is for, not every keystroke.
- If you hit a detail you are unsure about, say so and choose: "I'll assume the input fits in memory."
- Write helper functions for separate steps; it keeps the main logic readable.

## 5. Review (3–5 minutes)

- Trace your code on the example, line by line, with the actual variable values.
- Then on the edge cases: empty, one element, all equal, the largest values.
- Fix bugs calmly and say what was wrong.

## 6. Evaluate (1–2 minutes)

- State time and space complexity and *why*.
- Mention trade-offs and what you would do with more time ("for streaming input I'd use…").

## Phrases that help

| Situation | Say |
|---|---|
| Stuck | "Let me try a smaller example to see the structure." |
| Unsure about a requirement | "Should I handle X, or can I assume Y?" |
| Changing approach | "This is getting complicated; let me step back. The real issue is…" |
| Hint received | "That helps: so the set lets me check membership in O(1), which means…" |
| Finished early | "Let me test a few edge cases… I could also reduce the space by…" |

## What interviewers commonly write down

- Did they clarify before coding?
- Did they consider a brute force and analyse it?
- Was the final complexity correct and justified?
- Was the code readable and mostly correct the first time?
- Did they test it themselves, including edge cases?
- How did they respond to hints?
