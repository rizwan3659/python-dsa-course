"""Reference solution · ag-redundant · Redundant Connection

Complexity: O(E α(V))

Approach: Union-find; report the edge that closes a cycle.
"""


def find_redundant(edges):
    parent = list(range(len(edges) + 1))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return [u, v]
        parent[rv] = ru
