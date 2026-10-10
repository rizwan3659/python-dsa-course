"""Reference solution · rec-parens · Generate Parentheses

Complexity: O(Catalan(n)) results

Approach: Backtracking with counts of opened/closed brackets.
"""


def generate(n):
    result = []

    def backtrack(s, opened, closed):
        if len(s) == 2 * n:
            result.append(s)
            return
        if opened < n:
            backtrack(s + "(", opened + 1, closed)
        if closed < opened:
            backtrack(s + ")", opened, closed + 1)

    backtrack("", 0, 0)
    return sorted(result)
