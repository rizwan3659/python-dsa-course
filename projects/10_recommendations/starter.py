"""Project 10: Simple Recommendation Engine. See README.md."""
from collections import deque  # noqa: F401


class SocialGraph:
    def __init__(self):
        pass  # TODO: adjacency sets for friends, sets of liked items

    # ---- Milestone 1 ----
    def add_friendship(self, a, b):
        pass  # TODO

    def like(self, user, item):
        pass  # TODO

    def friends(self, user):
        pass  # TODO

    def degrees(self, a, b):
        pass  # TODO: BFS

    # ---- Milestone 2 ----
    def people_you_may_know(self, user, k=3):
        pass  # TODO

    def recommend_items(self, user, k=3):
        pass  # TODO

    # ---- Milestone 3 ----
    def similar_users(self, user, k=3):
        pass  # TODO
