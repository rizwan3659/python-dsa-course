"""Reference solution · h-find-anagrams · Find All Anagrams in a String

Complexity: O(n) time (26-letter counters)

Approach: Fixed sliding window with a Counter compared against Counter(p).
"""


from collections import Counter

def find_anagrams(s, p):
    k = len(p)
    need = Counter(p)
    window = Counter(s[:k])
    out = [0] if window == need and len(s) >= k else []
    for right in range(k, len(s)):
        window[s[right]] += 1
        left_ch = s[right - k]
        window[left_ch] -= 1
        if window[left_ch] == 0:
            del window[left_ch]
        if window == need:
            out.append(right - k + 1)
    return out
