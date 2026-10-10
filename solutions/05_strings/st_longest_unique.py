"""Reference solution · st-longest-unique · Longest Substring Without Repeating Characters

Complexity: O(n)

Approach: Sliding window + last-seen index dict.
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
