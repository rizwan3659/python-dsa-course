"""Reference solution · s-daily-temps · Daily Temperatures

Complexity: O(n) time

Approach: Monotonic stack of indexes; answer = distance when popped.
"""


def daily_temperatures(temps):
    answer = [0] * len(temps)
    stack = []                      # indexes of days still waiting
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer
