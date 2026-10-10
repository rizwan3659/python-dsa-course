"""Reference solution · dp-lis-fast · LIS in O(n log n)

Complexity: O(n log n) time, O(n) space

Approach: Patience sorting: maintain the sorted tails list with binary
search.

Common mistakes:
- bisect_right, which allows equal values (non-strict increase).
- Thinking tails is itself an increasing subsequence of the input (it is
  not).

Follow-up challenge: Recover an actual longest subsequence, not only its
length.
"""


from bisect import bisect_left


def lis_fast(nums):
    tails = []                 # tails[k] = smallest tail of an increasing run of length k + 1
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)    # x extends the longest run
        else:
            tails[i] = x       # x is a smaller tail for runs of length i + 1
    return len(tails)
