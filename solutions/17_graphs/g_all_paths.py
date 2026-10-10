"""Reference solution · g-all-paths · All Paths From Source to Target

Complexity: Exponential in the worst case (number of paths)

Approach: DFS backtracking over paths.
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
