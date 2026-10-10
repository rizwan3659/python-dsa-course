"""Reference solution · rec-letter-combos · Phone Letter Combinations

Complexity: O(4ⁿ · n)

Approach: Backtracking over digit positions.
"""


def letter_combinations(digits):
    keys = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
    if not digits:
        return []
    result = []

    def backtrack(i, path):
        if i == len(digits):
            result.append(path)
            return
        for ch in keys[digits[i]]:
            backtrack(i + 1, path + ch)

    backtrack(0, "")
    return result
