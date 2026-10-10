"""Reads dsa_course/data/exercises.json: the topics and exercises of the local practice track."""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = Path(__file__).resolve().parent / "data" / "exercises.json"


@dataclass(frozen=True)
class TestCase:
    call: str
    expected: str
    mode: str = ""
    label: str = ""

    def describe(self) -> str:
        return self.label or f"{self.call}  ->  {self.expected}"


@dataclass(frozen=True)
class Topic:
    id: str
    n: int
    title: str
    dir: str


@dataclass(frozen=True)
class Exercise:
    id: str
    module: str
    topic: str
    title: str
    difficulty: str
    pattern: str
    kind: str
    prompt: str
    hints: tuple[str, ...]
    cx: str
    prelude: str
    post: str
    tests: tuple[TestCase, ...]
    visible: int
    path: str
    solution_path: str
    starter_sha256: str
    constraints: tuple[str, ...] = ()
    prereq: tuple[str, ...] = ()
    mistakes: tuple[str, ...] = ()
    followup: str = ""

    @property
    def file(self) -> Path:
        return ROOT / self.path

    @property
    def solution_file(self) -> Path:
        return ROOT / self.solution_path

    def state(self) -> str:
        """'missing', 'untouched' (still the starter) or 'edited'."""
        if not self.file.exists():
            return "missing"
        return "untouched" if file_sha256(self.file) == self.starter_sha256 else "edited"


@dataclass(frozen=True)
class Catalog:
    topics: tuple[Topic, ...]
    exercises: tuple[Exercise, ...]
    preludes: dict[str, str]

    def find(self, exercise_id: str) -> Exercise | None:
        key = exercise_id.strip().replace("_", "-").lower()
        return next((e for e in self.exercises if e.id == key), None)

    def in_topic(self, topic_id: str) -> list[Exercise]:
        return [e for e in self.exercises if e.topic == topic_id]

    def topic(self, topic_id: str) -> Topic | None:
        return next((t for t in self.topics if t.id == topic_id), None)


def file_sha256(path: Path) -> str:
    """Hash with Windows line endings normalised, so a git autocrlf checkout still counts as untouched."""
    text = path.read_bytes().replace(b"\r\n", b"\n")
    return hashlib.sha256(text).hexdigest()


@lru_cache(maxsize=1)
def load_catalog() -> Catalog:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    topics = tuple(Topic(t["id"], t["n"], t["title"], t["dir"]) for t in data["topics"])
    exercises = tuple(
        Exercise(
            id=e["id"], module=e["module"], topic=e["topic"], title=e["title"],
            difficulty=e["difficulty"], pattern=e["pattern"], kind=e["kind"], prompt=e["prompt"],
            hints=tuple(e["hints"]), cx=e["cx"], prelude=e["prelude"], post=e["post"],
            tests=tuple(TestCase(**t) for t in e["tests"]), visible=e["visible"],
            path=e["path"], solution_path=e["solution_path"], starter_sha256=e["starter_sha256"],
            constraints=tuple(e.get("constraints", ())), prereq=tuple(e.get("prereq", ())),
            mistakes=tuple(e.get("mistakes", ())), followup=e.get("followup", ""),
        )
        for e in data["exercises"]
    )
    return Catalog(topics, exercises, data["preludes"])
