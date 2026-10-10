"""g-judge · Find the Town Judge
Topic 16: Graphs · easy · DFS

People 1..n; `trust[i] = [a, b]` means a trusts b. The judge trusts nobody
and is trusted by everyone else. Return the judge, or -1.

Examples:
    find_judge(2, [[1, 2]])  ->  2
    find_judge(3, [[1, 3], [2, 3]])  ->  3
    find_judge(3, [[1, 3], [2, 3], [3, 1]])  ->  -1

(1 more hidden test run when you check your work.)

Target complexity: O(n + E)

Check your work:   python dsa.py test g-judge
Stuck?             python dsa.py hint g-judge
"""


def find_judge(n, trust):
    pass
