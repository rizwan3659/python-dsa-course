"""Reference solution · st-char-replace · Longest Repeating Character Replacement

Complexity: O(n)

Approach: Sliding window with letter counts.

Common mistakes:
- Recomputing the max count from scratch each step (fine for 26 letters, but
  understand why).
- Shrinking the window to empty instead of by one.

Follow-up challenge: Return the window boundaries too.
"""


from collections import defaultdict

def character_replacement(s, k):
    counts = defaultdict(int)
    left = best = top = 0
    for right, ch in enumerate(s):
        counts[ch] += 1
        top = max(top, counts[ch])           # most frequent letter in the window
        while (right - left + 1) - top > k:  # too many letters to replace
            counts[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best
