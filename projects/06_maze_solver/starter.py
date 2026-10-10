"""Project 6: Maze Solver. See README.md."""
from collections import deque  # noqa: F401  (you will want this)


class Maze:
    def __init__(self, text):
        self.grid = [list(line) for line in text.strip("\n").splitlines()]
        self.start = None  # TODO: find S
        self.exit = None   # TODO: find E (raise ValueError if missing)

    # ---- Milestone 1 ----
    def neighbours(self, cell):
        pass  # TODO: up, down, left, right; open cells only

    # ---- Milestone 2 ----
    def shortest_path(self):
        pass  # TODO: BFS with parents

    def shortest_distance(self):
        pass  # TODO

    def reachable(self):
        pass  # TODO

    # ---- Milestone 3 ----
    def dfs_path(self):
        pass  # TODO: iterative DFS

    def render(self, path):
        pass  # TODO
