"""Project 10: Simple Recommendation Engine (reference implementation)."""
from collections import deque


class SocialGraph:
    def __init__(self):
        self.adj: dict[str, set[str]] = {}
        self.likes: dict[str, set[str]] = {}

    # ---- Milestone 1 ----
    def add_friendship(self, a: str, b: str) -> None:
        if a == b:
            return
        self.adj.setdefault(a, set()).add(b)
        self.adj.setdefault(b, set()).add(a)

    def like(self, user: str, item: str) -> None:
        self.likes.setdefault(user, set()).add(item)

    def friends(self, user: str) -> list[str]:
        return sorted(self.adj.get(user, ()))

    def degrees(self, a: str, b: str) -> int:
        if a == b:
            return 0
        seen, queue = {a}, deque([(a, 0)])
        while queue:
            user, d = queue.popleft()
            for f in self.adj.get(user, ()):
                if f == b:
                    return d + 1
                if f not in seen:
                    seen.add(f)
                    queue.append((f, d + 1))
        return -1

    @staticmethod
    def _rank(scores: dict[str, float], k: int) -> list[str]:
        ordered = sorted(scores.items(), key=lambda item: (-item[1], item[0]))
        return [name for name, _ in ordered[:k]]

    # ---- Milestone 2 ----
    def people_you_may_know(self, user: str, k: int = 3) -> list[str]:
        mine = self.adj.get(user, set())
        mutual: dict[str, int] = {}
        for friend in mine:                       # two steps out from the user
            for candidate in self.adj[friend]:
                if candidate != user and candidate not in mine:
                    mutual[candidate] = mutual.get(candidate, 0) + 1
        return self._rank(mutual, k)

    def recommend_items(self, user: str, k: int = 3) -> list[str]:
        liked = self.likes.get(user, set())
        score: dict[str, int] = {}
        for friend in self.adj.get(user, ()):
            for item in self.likes.get(friend, ()):
                if item not in liked:
                    score[item] = score.get(item, 0) + 1
        return self._rank(score, k)

    # ---- Milestone 3 ----
    def similar_users(self, user: str, k: int = 3) -> list[str]:
        mine = self.likes.get(user, set())
        sims = {}
        for other, theirs in self.likes.items():
            if other == user:
                continue
            shared = len(mine & theirs)
            if shared:
                sims[other] = shared / len(mine | theirs)
        return self._rank(sims, k)
