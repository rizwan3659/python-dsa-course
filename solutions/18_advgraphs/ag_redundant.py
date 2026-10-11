"""Reference solution · ag-redundant · Redundant Connection

Complexity: O(E α(V))

Approach: Union-find; report the edge that closes a cycle.

Common mistakes:
- Returning the first edge that closes a cycle instead of the one found last
  in input order.
- Union-find with 0-based arrays for 1-based nodes.

Follow-up challenge: The graph is directed (Redundant Connection II).
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
