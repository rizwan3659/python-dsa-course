"""Reference solution · h-contiguous · Contiguous Array (equal 0s and 1s)

Complexity: O(n) time

Approach: Prefix balance + dict of first occurrence.

Common mistakes:
- Updating the first-seen index of a balance, which shortens answers.
- Forgetting that balance 0 is "seen" at index −1.

Follow-up challenge: Same question for a string of letters: equal vowels and
consonants.
"""


def find_max_length(nums):
    first = {0: -1}          # running balance -> first index it appeared
    balance = best = 0
    for i, x in enumerate(nums):
        balance += 1 if x == 1 else -1
        if balance in first:
            best = max(best, i - first[balance])
        else:
            first[balance] = i
    return best
