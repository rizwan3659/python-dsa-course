"""Reference solution · st-min-window · Minimum Window Substring

Complexity: O(len(s) + len(t))

Approach: Variable sliding window with a need-counter.

Common mistakes:
- Ignoring duplicate letters in t ("aa" needs two a’s).
- Re-counting the window from scratch at every step.

Follow-up challenge: Return the number of distinct minimum windows.
"""


from collections import Counter

def min_window(s, t):
    need = Counter(t)
    missing = len(t)                 # characters still needed
    left = 0
    best = (float("inf"), 0, 0)
    for right, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        while missing == 0:          # window is valid: try to shrink it
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right + 1)
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    return s[best[1]:best[2]] if best[0] != float("inf") else ""
