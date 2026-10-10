"""Reference solution · s-stock-span · Stock Span

Complexity: O(n) time

Approach: Monotonic stack: pop all ≤ prices; the remaining top is the
previous greater day.
"""


def stock_span(prices):
    spans = []
    stack = []                      # indexes with decreasing prices
    for i, p in enumerate(prices):
        while stack and prices[stack[-1]] <= p:
            stack.pop()
        spans.append(i + 1 if not stack else i - stack[-1])
        stack.append(i)
    return spans
