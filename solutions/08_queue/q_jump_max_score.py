"""Reference solution · q-jump-max-score · Jump Game VI (maximum score)

Complexity: O(n) time, O(n) space

Approach: DP whose transition is a sliding-window maximum, maintained with a
monotonic deque.

Common mistakes:
- A greedy "always jump to the largest number in reach" (fails on mixed
  signs).
- O(n · k) DP that times out for k = 10⁵.
- Popping from the front with the wrong boundary (i − k is still allowed).

Follow-up challenge: Return the indexes on one best path.
"""


from collections import deque


def max_score(nums, k):
    best = [0] * len(nums)            # best[i] = maximum score of a path ending at i
    best[0] = nums[0]
    window = deque([0])               # indexes, best values decreasing from front to back
    for i in range(1, len(nums)):
        if window[0] < i - k:
            window.popleft()          # too far back to jump from
        best[i] = nums[i] + best[window[0]]
        while window and best[window[-1]] <= best[i]:
            window.pop()              # never better than i again
        window.append(i)
    return best[-1]
