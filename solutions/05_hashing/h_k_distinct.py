"""Reference solution · h-k-distinct · Longest Substring With At Most K Distinct Characters

Complexity: O(n) time

Approach: Sliding window + dict of counts (delete keys that hit zero).
"""


from collections import defaultdict

def longest_k_distinct(s, k):
    counts = defaultdict(int)
    left = best = 0
    for right, ch in enumerate(s):
        counts[ch] += 1
        while len(counts) > k:
            counts[s[left]] -= 1
            if counts[s[left]] == 0:
                del counts[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best
