"""Reference solution · h-concat-words · Substring with Concatenation of All Words

Complexity: O(L · n) time, O(k) space

Approach: L interleaved sliding windows over word-sized steps, with
Counters.

Common mistakes:
- Assuming words are distinct (duplicates must be matched the right number
  of times).
- Only checking alignment 0.

Follow-up challenge: What changes if the words can have different lengths?
"""


from collections import Counter


def find_substring(s, words):
    L, k = len(words[0]), len(words)
    need = Counter(words)
    result = []
    for offset in range(L):                       # one sliding window per alignment
        left, seen, count = offset, Counter(), 0
        for right in range(offset, len(s) - L + 1, L):
            w = s[right:right + L]
            if w not in need:                     # a foreign word: restart after it
                left, seen, count = right + L, Counter(), 0
                continue
            seen[w] += 1
            count += 1
            while seen[w] > need[w]:              # too many copies: shrink from the left
                seen[s[left:left + L]] -= 1
                left += L
                count -= 1
            if count == k:
                result.append(left)
    return sorted(result)
