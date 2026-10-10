"""g-word-ladder · Word Ladder
Topic 17: Graphs · hard · BFS

Change one letter at a time; every intermediate word must be in `word_list`.
Return the number of words in the shortest sequence from begin to end (0 if
impossible).

Examples:
    ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])  ->  5
    ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"])  ->  0
    ladder_length("a", "c", ["a", "b", "c"])  ->  2

Target complexity: O(N · L · 26)

Check your work:   python dsa.py test g-word-ladder
Stuck?             python dsa.py hint g-word-ladder
"""


def ladder_length(begin, end, word_list):
    pass
