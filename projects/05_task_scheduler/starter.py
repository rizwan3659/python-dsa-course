"""Project 5: Task Scheduler. See README.md."""
import heapq  # noqa: F401  (you will want this)


class Scheduler:
    def __init__(self):
        pass  # TODO: priorities and dependency lists per task

    def add(self, name, priority, after=()):
        pass  # TODO

    def run_order(self):
        pass  # TODO: Kahn's algorithm with a heap; ValueError on a cycle

    def pop_next(self):
        pass  # TODO

    def finish_time(self, durations):
        pass  # TODO
