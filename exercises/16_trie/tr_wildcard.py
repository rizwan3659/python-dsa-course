"""tr-wildcard · Word Dictionary With Wildcards
Topic 16: Trie · medium · Trie

Class `WordDictionary`: `add_word(w)`, and `search(w)` where `.` matches any
one letter.

Examples:
    _t()  ->  [False, True, True, True, False, False]
    (lambda d: (d.add_word("bad"), d.add_word("dad"), d.search("pad"), d.search(".ad"), d.search("b.."), d.search("..."), d.search("b"), d.search("....")))(WordDictionary())[2:]  ->  (False, True, True, True, False, False)
    (lambda d: (d.add_word("a"), d.search("."), d.search("a"), d.search("aa")))(WordDictionary())[1:]  ->  (True, True, False)

(1 more hidden test run when you check your work.)

Constraints:
- up to 10^4 calls
- words up to 25 letters, at most 2 dots per search

Target complexity: O(L) without dots; worse with many dots

Check your work:   python dsa.py test tr-wildcard
Stuck?             python dsa.py hint tr-wildcard
"""


class WordDictionary:
    def __init__(self):
        pass

    def add_word(self, word):
        pass

    def search(self, word):
        pass
