"""Local progress: which exercises you passed, attempts, hints used. Stored in .dsa_progress.json."""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from dsa_course.catalog import ROOT, Catalog, Exercise

PROGRESS_FILE = ROOT / ".dsa_progress.json"


class Progress:
    def __init__(self, path: Path | None = None):
        self.path = path or PROGRESS_FILE
        try:
            self.data: dict = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            self.data = {}
        self.data.setdefault("exercises", {})

    def entry(self, exercise_id: str) -> dict:
        return self.data["exercises"].setdefault(
            exercise_id, {"passed": False, "attempts": 0, "hints": 0, "solution_viewed": False})

    def get(self, exercise_id: str) -> dict | None:
        return self.data["exercises"].get(exercise_id)

    def save(self) -> None:
        self.path.write_text(json.dumps(self.data, indent=1, sort_keys=True) + "\n", encoding="utf-8")

    def record_attempt(self, exercise_id: str, passed: bool) -> None:
        e = self.entry(exercise_id)
        e["attempts"] += 1
        e["last"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
        if passed and not e["passed"]:
            e["passed"] = True
            e["passed_after"] = e["attempts"]
        self.save()

    def next_hint(self, exercise_id: str, available: int) -> int:
        """Reveal one more hint level; returns how many are revealed now."""
        e = self.entry(exercise_id)
        e["hints"] = min(e["hints"] + 1, available)
        self.save()
        return e["hints"]

    def mark_solution_viewed(self, exercise_id: str) -> None:
        self.entry(exercise_id)["solution_viewed"] = True
        self.save()

    def status(self, exercise: Exercise) -> str:
        """'passed', 'failing' (tried, not passed), 'started' (file edited) or 'new'."""
        e = self.get(exercise.id)
        if e and e["passed"]:
            return "passed"
        if e and e["attempts"]:
            return "failing"
        return "started" if exercise.state() == "edited" else "new"

    def topic_summary(self, catalog: Catalog) -> list[dict]:
        rows = []
        for topic in catalog.topics:
            items = catalog.in_topic(topic.id)
            entries = [self.get(e.id) or {} for e in items]
            passed = sum(bool(x.get("passed")) for x in entries)
            failing = sum(bool(x.get("attempts")) and not x.get("passed") for x in entries)
            # "struggled": still failing, or needed the solution / the last hints to get there
            struggled = sum(bool(x.get("attempts")) and (not x.get("passed") or x.get("solution_viewed")
                                                         or x.get("hints", 0) >= 2) for x in entries)
            rows.append({"topic": topic, "total": len(items), "passed": passed,
                         "failing": failing, "struggled": struggled})
        return rows

    def weak_topics(self, catalog: Catalog) -> list[dict]:
        """Topics where you struggled with at least as many exercises as you solved cleanly, worst first."""
        weak = [r for r in self.topic_summary(catalog)
                if r["struggled"] and r["struggled"] >= r["passed"] - (r["struggled"] - r["failing"])]
        return sorted(weak, key=lambda r: -r["struggled"])

    def recommend(self, catalog: Catalog, limit: int = 3) -> list[Exercise]:
        """Unfinished exercises: retry failing ones first, then the easiest new ones in course order."""
        order = {"easy": 0, "medium": 1, "hard": 2}
        failing = [e for e in catalog.exercises if self.status(e) == "failing"]
        started_topics = [t.id for t in catalog.topics
                          if any(self.get(e.id) for e in catalog.in_topic(t.id))]
        current = next((t for t in started_topics
                        if any(self.status(e) != "passed" for e in catalog.in_topic(t))), None)
        pool = [e for e in catalog.exercises if self.status(e) in ("new", "started")]
        pool.sort(key=lambda e: (e.topic != current, [t.id for t in catalog.topics].index(e.topic),
                                 order[e.difficulty]))
        return (failing + pool)[:limit]
