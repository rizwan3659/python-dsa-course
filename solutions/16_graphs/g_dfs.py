"""Reference solution · g-dfs · DFS Order

Complexity: O(V + E)

Approach: Recursive DFS.
"""


def dfs_order(adj, start):
    order, seen = [], set()
    def dfs(u):
        seen.add(u)
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    dfs(start)
    return order
