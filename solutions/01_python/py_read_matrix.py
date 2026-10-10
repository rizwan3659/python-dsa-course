"""Reference solution · py-read-matrix · Read a Matrix from Text

Complexity: O(rows · cols)

Approach: Read the header, then parse exactly rows lines.

Common mistakes:
- split(" ") breaks on double spaces; split() with no argument does not.
- Forgetting to convert strings to int.

Follow-up challenge: Read the same format from real standard input with
sys.stdin.
"""


def read_matrix(text):
    lines = text.split("\n")
    rows, cols = map(int, lines[0].split())
    return [list(map(int, lines[1 + r].split()))[:cols] for r in range(rows)]
