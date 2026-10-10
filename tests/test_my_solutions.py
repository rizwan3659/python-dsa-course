"""Checks YOUR work: every exercise file you have edited must pass its tests. Untouched ones are skipped.

    pytest tests/test_my_solutions.py              all your edited exercises
    pytest tests/test_my_solutions.py -k arrays    one topic
    python dsa.py test arr-find-max                one exercise, with hints and friendlier output
"""
import pytest

from dsa_course.catalog import load_catalog
from dsa_course.runner import run_file


@pytest.mark.parametrize("ex", load_catalog().exercises, ids=lambda e: f"{e.topic}:{e.id}")
def test_my_solution(ex):
    if ex.state() != "edited":
        pytest.skip("not started")
    result = run_file(ex)
    if result.error:
        err = result.error
        pytest.fail(f"{ex.path} could not run: {err['type']} (line {err.get('line')}): {err['message']}")
    failed = [t for t in result.tests if not t.ok]
    lines = [f"test {t.number}: {t.case.describe()}  got {t.got if not t.error else t.error['type']}"
             for t in failed if not t.hidden]
    hidden = sum(t.hidden for t in failed)
    if hidden:
        lines.append(f"{hidden} hidden test(s) failed: python dsa.py test {ex.id} --reveal")
    assert not failed, "\n".join(lines)
