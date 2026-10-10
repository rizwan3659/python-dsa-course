"""Reference solution · bit-max-xor · Maximum XOR of Two Numbers

Complexity: O(31 · n) time, O(n) space

Approach: Greedy bit by bit with a set of prefixes (or a bitwise trie).

Common mistakes:
- Trying every pair: O(n²) is too slow for 2 × 10⁵.
- Building the answer from the lowest bit, where greedy choices are not
  safe.

Follow-up challenge: Answer many queries "max x ^ nums[i] for a given x"
with a binary trie.
"""


def max_xor(nums):
    best = 0
    for bit in range(30, -1, -1):
        best <<= 1
        candidate = best | 1                   # can this bit of the answer be 1?
        prefixes = {x >> bit for x in nums}
        # a ^ b == candidate  <=>  a ^ candidate == b
        if any(p ^ candidate in prefixes for p in prefixes):
            best = candidate
    return best
