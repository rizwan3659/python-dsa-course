"""Reference solution · g-word-ladder · Word Ladder

Complexity: O(N · L · 26)

Approach: BFS over implicit word graph.
"""


from collections import deque

def ladder_length(begin, end, word_list):
    words = set(word_list)
    if end not in words:
        return 0
    queue, seen = deque([(begin, 1)]), {begin}
    while queue:
        word, steps = queue.popleft()
        if word == end:
            return steps
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + ch + word[i + 1:]
                if nxt in words and nxt not in seen:
                    seen.add(nxt)
                    queue.append((nxt, steps + 1))
    return 0
