"""Runs an exercise's tests against a file in a separate Python process with a time limit."""
from __future__ import annotations

import json
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

from dsa_course.catalog import ROOT, Exercise, TestCase

SANDBOX = Path(__file__).resolve().parent / "_sandbox.py"
DEFAULT_TIMEOUT = 10.0
DEFAULT_MEMORY_MB = 512


@dataclass
class TestResult:
    number: int
    case: TestCase
    hidden: bool
    ok: bool
    got: str | None = None
    error: dict | None = None


@dataclass
class RunResult:
    status: str  # "passed", "failed", "error" (file did not load) or "timeout"
    tests: list[TestResult] = field(default_factory=list)
    error: dict | None = None
    output: str = ""

    @property
    def passed(self) -> bool:
        return self.status == "passed"

    @property
    def score(self) -> tuple[int, int]:
        return sum(t.ok for t in self.tests), len(self.tests)


def run_code(exercise: Exercise, code: str, filename: str = "<exercise>",
             timeout: float = DEFAULT_TIMEOUT, memory_mb: int = DEFAULT_MEMORY_MB) -> RunResult:
    job = {
        "root": str(ROOT), "filename": filename, "memory_mb": memory_mb,
        "prelude": "", "code": code, "post": exercise.post,
        "tests": [{"call": t.call, "expected": t.expected, "mode": t.mode} for t in exercise.tests],
    }
    try:
        proc = subprocess.run(
            [sys.executable, "-I", str(SANDBOX)], input=json.dumps(job).encode("utf-8"),
            capture_output=True, timeout=timeout,
        )
    except subprocess.TimeoutExpired:
        return RunResult("timeout", error={
            "type": "Timeout", "message": f"stopped after {timeout:g} seconds", "line": None})
    try:
        data = json.loads(proc.stdout.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        message = proc.stderr.decode("utf-8", "replace").strip().splitlines()[-1:] or ["no output"]
        return RunResult("error", error={
            "type": "Crash", "message": f"the test process crashed: {message[0]}", "line": None})
    if not data["loaded"]:
        return RunResult("error", error=data["error"], output=data["output"])
    tests = [
        TestResult(i + 1, case, i >= exercise.visible, row["ok"], row["got"], row["error"])
        for i, (case, row) in enumerate(zip(exercise.tests, data["tests"]))
    ]
    status = "passed" if all(t.ok for t in tests) else "failed"
    return RunResult(status, tests, output=data["output"])


def run_file(exercise: Exercise, path: Path | None = None, **kwargs) -> RunResult:
    """Check the student's exercise file (default) or any other file, e.g. the reference solution."""
    path = path or exercise.file
    return run_code(exercise, path.read_text(encoding="utf-8"), filename=str(path), **kwargs)


def explain(test: TestResult) -> str | None:
    """A beginner-friendly guess at what went wrong, or None."""
    err = test.error
    if err:
        kind = err["type"]
        if kind == "NameError":
            return "A name is not defined. Check spelling, and that the function or class has exactly the name the test calls."
        if kind == "RecursionError":
            return "The recursion never stops: is the base case missing, or does each call move closer to it?"
        if kind == "IndexError":
            return "An index is out of range: check loop bounds and empty inputs (an off-by-one error is the usual cause)."
        if kind == "KeyError":
            return "A dictionary key is missing: use .get(key, default) or check `key in d` first."
        if kind == "TypeError" and "NoneType" in err["message"]:
            return "Something is None where a value was expected: does every path through your function return a value?"
        if kind == "ZeroDivisionError":
            return "Division by zero: handle the empty or zero case before dividing."
        return None
    if test.got == "None":
        return "Your code returned None: did you forget a `return` statement (or leave `pass` in place)?"
    return None
