"""Reference solution · g-all-paths · All Paths From Source to Target

Complexity: Exponential in the worst case (number of paths)

Approach: DFS backtracking over paths.

Common mistakes:
- Appending the path list itself instead of a copy.
- Adding a visited set (not needed in a DAG, and it would drop valid paths).

Follow-up challenge: Count the paths without listing them (DP on the DAG).
"""


def all_paths(graph):
    target, out, path = len(graph) - 1, [], [0]
    def dfs(u):
        if u == target:
            out.append(path[:])
            return
        for v in graph[u]:
            path.append(v)
            dfs(v)
            path.pop()
    dfs(0)
    return out
