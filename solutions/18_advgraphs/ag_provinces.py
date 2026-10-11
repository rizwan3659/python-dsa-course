"""Reference solution · ag-provinces · Number of Provinces

Complexity: O(n² α(n))

Approach: Union-find over the matrix (DFS also works).

Common mistakes:
- Counting connections instead of groups.
- Reading only the upper triangle without symmetry.

Follow-up challenge: The matrix is huge but sparse: what representation
would you use?
"""


def find_circle_num(is_connected):
    n = len(is_connected)
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    groups = n
    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j]:
                ri, rj = find(i), find(j)
                if ri != rj:
                    parent[rj] = ri
                    groups -= 1
    return groups
