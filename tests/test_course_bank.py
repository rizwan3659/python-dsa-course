"""Maintainer checks: every exercise in the generated track is well formed and its reference solution passes."""
import pytest

from dsa_course.catalog import load_catalog
from dsa_course.runner import RunResult, run_file

CATALOG = load_catalog()
EXERCISES = CATALOG.exercises


def report(result: RunResult) -> str:
    if result.error:
        return f"{result.status}: {result.error}"
    return "; ".join(f"test {t.number} {t.case.call} got {t.got} error {t.error}" for t in result.tests if not t.ok)


def test_ids_and_paths_are_unique():
    assert len({e.id for e in EXERCISES}) == len(EXERCISES)
    assert len({e.path for e in EXERCISES}) == len(EXERCISES)


@pytest.mark.parametrize("ex", EXERCISES, ids=lambda e: f"{e.topic}:{e.id}")
def test_exercise_is_well_formed(ex):
    assert ex.tests, "needs at least one test"
    assert 1 <= ex.visible <= len(ex.tests)
    assert ex.difficulty in ("easy", "medium", "hard")
    assert ex.file.exists() and ex.solution_file.exists()
    assert CATALOG.topic(ex.topic) is not None


@pytest.mark.parametrize("ex", EXERCISES, ids=lambda e: f"{e.topic}:{e.id}")
def test_reference_solution_passes(ex):
    result = run_file(ex, ex.solution_file)
    assert result.passed, report(result)


@pytest.mark.parametrize("ex", [e for e in EXERCISES if e.kind != "optimize"], ids=lambda e: f"{e.topic}:{e.id}")
def test_untouched_starter_does_not_pass(ex):
    # optimize exercises start from a slow solution that is correct, so they are excluded
    if ex.state() != "untouched":
        pytest.skip("you have edited this exercise")
    assert not run_file(ex).passed, "the starter code already passes every test"
