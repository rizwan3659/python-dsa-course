"""tr-concatenated · Concatenated Words
Topic 16: Trie · hard · Trie

Return, in alphabetical order, every word in the list that can be written as
a concatenation of at least two shorter words from the same list (words may
repeat).

Examples:
    concatenated_words(["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"])  ->  ["catsdogcats", "dogcatsdog", "ratcatdogcat"]
    concatenated_words(["cat", "dog", "catdog"])  ->  ["catdog"]
    concatenated_words([])  ->  []

(3 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ len(words) ≤ 10^4
- 1 ≤ len(words[i]) ≤ 30, words are distinct

Before this: dp-word-break, build-trie

Target complexity: O(n · L²) time where L is the maximum word length

Check your work:   python dsa.py test tr-concatenated
Stuck?             python dsa.py hint tr-concatenated
"""


def concatenated_words(words):
    # your code here
    pass
