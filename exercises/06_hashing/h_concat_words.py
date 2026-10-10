"""h-concat-words · Substring with Concatenation of All Words
Topic 6: Hash Tables · hard · Sliding Window

All strings in `words` have the same length. Return every start index in `s`
of a substring that is a concatenation of all the words, each used exactly
once, in any order. Return the indexes in increasing order.

Examples:
    find_substring("barfoothefoobarman", ["foo", "bar"])  ->  [0, 9]
    find_substring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"])  ->  []
    find_substring("barfoofoobarthefoobarman", ["bar", "foo", "the"])  ->  [6, 9, 12]

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(s) ≤ 10^4
- 1 ≤ len(words) ≤ 5000, 1 ≤ len(words[i]) ≤ 30

Before this: h-find-anagrams

Target complexity: O(L · n) time, O(k) space

Check your work:   python dsa.py test h-concat-words
Stuck?             python dsa.py hint h-concat-words
"""


def find_substring(s, words):
    # your code here
    pass
