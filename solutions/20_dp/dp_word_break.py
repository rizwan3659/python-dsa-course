"""Reference solution · dp-word-break · Word Break

Complexity: O(n · L) slice checks where L is the longest word length

Approach: 1D DP over prefix lengths with a set for O(1) word lookups.

Common mistakes:
- A greedy "take the longest word first" (fails on "cars" with ca, rs, car).
- Plain recursion without memoization: exponential on "aaaa…b".

Follow-up challenge: Return all possible sentences (memoize lists of splits
per start index).
"""


def word_break(s, words):
    vocab = set(words)
    longest = max(map(len, vocab), default=0)
    ok = [True] + [False] * len(s)         # ok[i]: s[:i] can be split
    for i in range(1, len(s) + 1):
        for j in range(max(0, i - longest), i):
            if ok[j] and s[j:i] in vocab:
                ok[i] = True
                break
    return ok[len(s)]
