"""Reference solution · st-longest-unique · Longest Substring Without Repeating Characters

Complexity: O(n)

Approach: Sliding window + last-seen index dict.

Common mistakes:
- Moving the left edge backwards when an old repeat is found (use max).
- Restarting the scan after every repeat: O(n²).

Follow-up challenge: Return the substring itself, not just its length.
"""


def length_of_longest_substring(s):
    last = {}                      # char -> last index seen
    left = best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1    # jump past the previous copy
        last[ch] = right
        best = max(best, right - left + 1)
    return best
