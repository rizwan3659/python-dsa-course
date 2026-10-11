"""tr-replace · Replace Words
Topic 16: Trie · medium · Trie

Replace every word in the sentence by its shortest root from `roots` (if any
root is a prefix of it).

`(["cat", "bat", "rat"], "the cattle was rattled by the battery")` → `"the
cat was rat by the bat"`

Examples:
    replace_words(["cat", "bat", "rat"], "the cattle was rattled by the battery")  ->  "the cat was rat by the bat"
    replace_words(["a", "b", "c"], "aadsfasf absbs bbab cadsfafs")  ->  "a a b c"
    replace_words([], "hello world")  ->  "hello world"

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ len(roots) ≤ 1000
- sentence ≤ 10^6 characters

Target complexity: O(total characters)

Check your work:   python dsa.py test tr-replace
Stuck?             python dsa.py hint tr-replace
"""


def replace_words(roots, sentence):
    pass
