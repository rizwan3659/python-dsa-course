"""Reference solution · ag-cycle-undirected · Cycle in an Undirected Graph

Complexity: O(E α(V))

Approach: Union-find.
"""


def has_cycle_undirected(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return True           # already connected: this edge closes a loop
        parent[rv] = ru
    return False
