"""Reference solution · s-histogram · Largest Rectangle in Histogram

Complexity: O(n) time

Approach: Monotonic increasing stack; compute each bar’s area when it is
popped.
"""


def largest_rectangle(heights):
    stack = []                      # indexes with increasing heights
    best = 0
    for i, h in enumerate(heights + [0]):     # the 0 flushes the stack at the end
        start = i
        while stack and heights[stack[-1]] >= h:
            j = stack.pop()
            left = stack[-1] + 1 if stack else 0
            best = max(best, heights[j] * (i - left))
        stack.append(i)
    return best
