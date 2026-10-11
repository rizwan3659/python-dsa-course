"""Reference solution · ag-kruskal · Kruskal's MST Weight

Complexity: O(E log E)

Approach: Kruskal's algorithm.

Common mistakes:
- Not sorting edges by weight.
- Adding an edge whose endpoints are already connected.

Follow-up challenge: Return the edges of the MST.
"""


def mst_weight(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total = used = 0
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[rv] = ru
            total += w
            used += 1
            if used == n - 1:
                break
    return total
