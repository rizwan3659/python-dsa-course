"""Project 7: Route Finder. See README.md."""
import heapq  # noqa: F401
from collections import deque  # noqa: F401


class RouteFinder:
    def __init__(self, roads):
        pass  # TODO: adjacency list {place: {neighbour: minutes}}

    # ---- Milestone 1 ----
    def neighbours(self, place):
        pass  # TODO

    # ---- Milestone 2 ----
    def fastest(self, src, dst):
        pass  # TODO: Dijkstra + parents

    def fewest_roads(self, src, dst):
        pass  # TODO: BFS

    # ---- Milestone 3 ----
    def close(self, a, b):
        pass  # TODO

    def reopen(self, a, b):
        pass  # TODO

    def reachable(self, src, max_minutes):
        pass  # TODO
