"""Project 7: Route Finder (reference implementation)."""
import heapq
from collections import deque


class RouteFinder:
    def __init__(self, roads):
        self.graph: dict[str, dict[str, int]] = {}
        for a, b, minutes in roads:
            self.graph.setdefault(a, {})[b] = minutes
            self.graph.setdefault(b, {})[a] = minutes
        self.closed: set[frozenset] = set()

    def _open_edges(self, place):
        for nxt, minutes in self.graph.get(place, {}).items():
            if frozenset((place, nxt)) not in self.closed:
                yield nxt, minutes

    # ---- Milestone 1 ----
    def neighbours(self, place: str) -> list[tuple[str, int]]:
        return sorted(self._open_edges(place))

    # ---- Milestone 2 ----
    def _dijkstra(self, src: str):
        dist = {src: 0}
        parent = {src: None}
        heap = [(0, src)]
        while heap:
            d, place = heapq.heappop(heap)
            if d > dist[place]:
                continue                       # stale entry: a shorter one was already used
            for nxt, minutes in self._open_edges(place):
                nd = d + minutes
                if nd < dist.get(nxt, float("inf")):
                    dist[nxt] = nd
                    parent[nxt] = place
                    heapq.heappush(heap, (nd, nxt))
        return dist, parent

    def fastest(self, src: str, dst: str):
        if src not in self.graph or dst not in self.graph:
            return (0, [src]) if src == dst else None
        dist, parent = self._dijkstra(src)
        if dst not in dist:
            return None
        path, place = [], dst
        while place is not None:
            path.append(place)
            place = parent[place]
        return dist[dst], path[::-1]

    def fewest_roads(self, src: str, dst: str) -> int:
        if src == dst:
            return 0
        seen, queue = {src}, deque([(src, 0)])
        while queue:
            place, roads = queue.popleft()
            for nxt, _ in self._open_edges(place):
                if nxt == dst:
                    return roads + 1
                if nxt not in seen:
                    seen.add(nxt)
                    queue.append((nxt, roads + 1))
        return -1

    # ---- Milestone 3 ----
    def close(self, a: str, b: str) -> None:
        self.closed.add(frozenset((a, b)))

    def reopen(self, a: str, b: str) -> None:
        self.closed.discard(frozenset((a, b)))

    def reachable(self, src: str, max_minutes: int) -> list[str]:
        dist, _ = self._dijkstra(src)
        return sorted(p for p, d in dist.items() if d <= max_minutes)
