"""Project 6: Maze Solver (reference implementation)."""
from collections import deque

Cell = tuple[int, int]
MOVES = ((-1, 0), (1, 0), (0, -1), (0, 1))   # up, down, left, right


class Maze:
    def __init__(self, text: str):
        self.grid = [list(line) for line in text.strip("\n").splitlines()]
        self.start = self._find("S")
        self.exit = self._find("E")

    def _find(self, ch: str) -> Cell:
        for r, row in enumerate(self.grid):
            for c, value in enumerate(row):
                if value == ch:
                    return (r, c)
        raise ValueError(f"maze has no {ch}")

    # ---- Milestone 1 ----
    def neighbours(self, cell: Cell) -> list[Cell]:
        r, c = cell
        out = []
        for dr, dc in MOVES:
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(self.grid) and 0 <= nc < len(self.grid[nr]) and self.grid[nr][nc] != "#":
                out.append((nr, nc))
        return out

    # ---- Milestone 2 ----
    def _bfs(self) -> dict[Cell, Cell | None]:
        parent: dict[Cell, Cell | None] = {self.start: None}
        queue = deque([self.start])
        while queue:
            cell = queue.popleft()
            for nxt in self.neighbours(cell):
                if nxt not in parent:           # first visit = shortest distance
                    parent[nxt] = cell
                    queue.append(nxt)
        return parent

    def shortest_path(self) -> list[Cell] | None:
        parent = self._bfs()
        if self.exit not in parent:
            return None
        path, cell = [], self.exit
        while cell is not None:                 # walk back along the parents
            path.append(cell)
            cell = parent[cell]
        return path[::-1]

    def shortest_distance(self) -> int:
        path = self.shortest_path()
        return len(path) - 1 if path else -1

    def reachable(self) -> int:
        return len(self._bfs())

    # ---- Milestone 3 ----
    def dfs_path(self) -> list[Cell] | None:
        parent: dict[Cell, Cell | None] = {self.start: None}
        stack = [self.start]                  # explicit stack: no recursion limit
        while stack:
            cell = stack.pop()
            if cell == self.exit:
                path = []
                while cell is not None:       # rebuild from parents, not by copying paths
                    path.append(cell)
                    cell = parent[cell]
                return path[::-1]
            # push in reverse so that "up" is explored first
            for nxt in reversed(self.neighbours(cell)):
                if nxt not in parent:
                    parent[nxt] = cell
                    stack.append(nxt)
        return None

    def render(self, path: list[Cell] | None) -> str:
        grid = [row[:] for row in self.grid]
        for r, c in path or []:
            if grid[r][c] == ".":
                grid[r][c] = "*"
        return "\n".join("".join(row) for row in grid)
