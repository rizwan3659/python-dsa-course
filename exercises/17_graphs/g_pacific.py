"""g-pacific · Pacific Atlantic Water Flow
Topic 17: Graphs · hard · DFS

Water flows to a neighbour with height ≤ the current cell. The Pacific
touches the top and left edges, the Atlantic the bottom and right. Return
all cells (sorted [r, c] pairs) that can reach both oceans.

Examples:
    pacific_atlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])  ->  [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
    pacific_atlantic([[1]])  ->  [[0, 0]]
    pacific_atlantic([[2, 1], [1, 2]])  ->  [[0, 0], [0, 1], [1, 0], [1, 1]]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ rows, cols ≤ 200

Target complexity: O(rows × cols)

Check your work:   python dsa.py test g-pacific
Stuck?             python dsa.py hint g-pacific
"""


def pacific_atlantic(heights):
    pass
