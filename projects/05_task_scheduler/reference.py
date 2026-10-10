"""Project 5: Task Scheduler (reference implementation)."""
import heapq


class Scheduler:
    def __init__(self):
        self.priority: dict[str, int] = {}
        self.after: dict[str, tuple[str, ...]] = {}

    def add(self, name: str, priority: int, after=()) -> None:
        self.priority[name] = priority
        self.after[name] = tuple(after)

    def run_order(self) -> list[str]:
        indegree = {t: 0 for t in self.priority}
        unlocks: dict[str, list[str]] = {t: [] for t in self.priority}
        for task, deps in self.after.items():
            for dep in deps:
                if dep not in self.priority:
                    raise ValueError(f"{task} depends on unknown task {dep}")
                indegree[task] += 1
                unlocks[dep].append(task)
        ready = [(self.priority[t], t) for t, d in indegree.items() if d == 0]
        heapq.heapify(ready)
        order = []
        while ready:
            _, task = heapq.heappop(ready)          # best ready task
            order.append(task)
            for nxt in unlocks[task]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    heapq.heappush(ready, (self.priority[nxt], nxt))
        if len(order) != len(self.priority):        # some tasks never became ready
            raise ValueError("dependency cycle")
        return order

    def pop_next(self) -> str | None:
        if not self.priority:
            return None
        task = self.run_order()[0]
        del self.priority[task]
        del self.after[task]
        for name, deps in self.after.items():       # it is done: no longer a dependency
            self.after[name] = tuple(d for d in deps if d != task)
        return task

    def finish_time(self, durations: dict[str, int]) -> dict[str, int]:
        clock, done = 0, {}
        for task in self.run_order():
            clock += durations[task]
            done[task] = clock
        return done
