"""tr-word-search · Word Search II
Topic 16: Trie · hard · Trie

Return all words from the list that can be traced on the letter grid by
moving up/down/left/right, using each cell at most once per word. Return
them sorted.

Examples:
    find_words([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"])  ->  ["eat", "oath"]
    find_words([["a", "b"], ["c", "d"]], ["abcb"])  ->  []
    find_words([["a"]], ["a"])  ->  ["a"]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ rows, cols ≤ 12
- 1 ≤ len(words) ≤ 3 × 10^4

Target complexity: Exponential in word length, pruned by the trie

Check your work:   python dsa.py test tr-word-search
Stuck?             python dsa.py hint tr-word-search
"""


def find_words(board, words):
    pass
