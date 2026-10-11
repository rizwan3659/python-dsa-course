"""Reference solution · g-dfs · DFS Order

Complexity: O(V + E)

Approach: Recursive DFS.

Common mistakes:
- Forgetting the visited set, which loops forever on cycles.
- Using a stack and getting a different neighbour order than the recursive
  version.

Follow-up challenge: Write it with an explicit stack and the same visiting
order.
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
