"""Project 1: Student Leaderboard (reference implementation)."""


class Leaderboard:
    def __init__(self):
        self.history: dict[str, list[int]] = {}   # every score, in order
        self.best_score: dict[str, int] = {}      # best score, kept up to date

    # ---- Milestone 1 ----
    def add_score(self, name: str, score: int) -> None:
        self.history.setdefault(name, []).append(score)
        if name not in self.best_score or score > self.best_score[name]:
            self.best_score[name] = score

    def best(self, name: str) -> int | None:
        return self.best_score.get(name)

    def remove(self, name: str) -> bool:
        if name not in self.best_score:
            return False
        del self.best_score[name]
        del self.history[name]
        return True

    # ---- Milestone 2 ----
    def _ordered(self) -> list[tuple[str, int]]:
        # highest score first; equal scores alphabetically by name
        return sorted(self.best_score.items(), key=lambda item: (-item[1], item[0]))

    def top(self, k: int) -> list[tuple[str, int]]:
        return self._ordered()[:k]

    def rank(self, name: str) -> int | None:
        for position, (other, _) in enumerate(self._ordered(), start=1):
            if other == name:
                return position
        return None

    # ---- Milestone 3 ----
    def average(self, name: str) -> float | None:
        scores = self.history.get(name)
        return sum(scores) / len(scores) if scores else None

    def most_improved(self) -> str | None:
        best_name, best_gain = None, None
        for name in sorted(self.history):
            scores = self.history[name]
            if len(scores) < 2:
                continue
            gain = scores[-1] - scores[0]
            if best_gain is None or gain > best_gain:
                best_name, best_gain = name, gain
        return best_name
