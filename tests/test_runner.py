"""Unit tests for the runner, progress tracking and CLI."""
import dataclasses

import pytest

from dsa_course import cli, progress as progress_mod
from dsa_course import catalog
from dsa_course.progress import Progress
from dsa_course.runner import explain, run_code

CATALOG = catalog.load_catalog()
FIND_MAX = CATALOG.find("arr-find-max")


def make(tests, visible=2, post=""):
    """An exercise with custom tests, based on a real one."""
    cases = tuple(catalog.TestCase(*t) for t in tests)
    return dataclasses.replace(FIND_MAX, tests=cases, visible=visible, post=post)


GOOD = "def find_max(nums):\n    best = nums[0]\n    for n in nums:\n        best = n if n > best else best\n    return best\n"


def test_correct_code_passes():
    result = run_code(FIND_MAX, GOOD)
    assert result.passed and result.score == (len(FIND_MAX.tests), len(FIND_MAX.tests))


def test_failures_are_reported_and_hidden_tests_flagged():
    ex = make([("f(1)", "1"), ("f(2)", "2"), ("f(3)", "3")], visible=2)
    result = run_code(ex, "def f(x):\n    return 1\n")
    assert result.status == "failed"
    assert [t.ok for t in result.tests] == [True, False, False]
    assert [t.hidden for t in result.tests] == [False, False, True]
    assert result.tests[1].got == "1"


def test_syntax_error_reports_line():
    result = run_code(FIND_MAX, "def find_max(nums):\n    return nums[0\n", filename="mine.py")
    assert result.status == "error"
    assert result.error["type"] == "SyntaxError" and result.error["line"] == 2


def test_runtime_error_inside_a_test():
    ex = make([("f([])", "None")], visible=1)
    result = run_code(ex, "def f(a):\n    return a[0]\n", filename="mine.py")
    t = result.tests[0]
    assert not t.ok and t.error["type"] == "IndexError" and t.error["line"] == 2
    assert "off-by-one" in explain(t)


def test_infinite_loop_times_out():
    result = run_code(FIND_MAX, "def find_max(nums):\n    while True:\n        pass\n", timeout=2)
    assert result.status == "timeout"


def test_printing_does_not_break_results():
    result = run_code(FIND_MAX, "print('debug')\n" + GOOD)
    assert result.passed and "debug" in result.output


@pytest.mark.parametrize("mode, code, expected", [
    ("unordered", "def f():\n    return [3, 1, 2]", "[1, 2, 3]"),
    ("groups", "def f():\n    return [['b', 'a'], ['c']]", "[['c'], ['a', 'b']]"),
    ("float", "def f():\n    return 0.1 + 0.2", "0.3"),
    ("check", "def f():\n    return 7", "lambda x: x % 7 == 0"),
])
def test_comparison_modes(mode, code, expected):
    assert run_code(make([("f()", expected, mode)], visible=1), code).passed


def test_tests_share_one_namespace_in_order():
    ex = make([("add(1)", "1"), ("add(2)", "3")], visible=2, post="")
    code = "total = 0\ndef add(x):\n    global total\n    total += x\n    return total\n"
    assert run_code(ex, code).passed


def test_explain_none_return():
    result = run_code(FIND_MAX, "def find_max(nums):\n    pass\n")
    assert "return" in explain(result.tests[0])


def test_progress_records_attempts_and_hints(tmp_path):
    p = Progress(tmp_path / "p.json")
    p.record_attempt("arr-find-max", False)
    p.record_attempt("arr-find-max", True)
    assert p.next_hint("arr-find-max", 2) == 1
    assert p.next_hint("arr-find-max", 2) == 2
    assert p.next_hint("arr-find-max", 2) == 2  # capped at the number of hints
    again = Progress(tmp_path / "p.json")
    e = again.get("arr-find-max")
    assert e["passed"] and e["attempts"] == 2 and e["passed_after"] == 2 and e["hints"] == 2
    assert again.status(FIND_MAX) == "passed"


def test_weak_topics_and_recommendations(tmp_path):
    p = Progress(tmp_path / "p.json")
    p.record_attempt("arr-find-max", False)
    weak = p.weak_topics(CATALOG)
    assert weak and weak[0]["topic"].id == "arrays"
    picks = p.recommend(CATALOG)
    assert picks[0].id == "arr-find-max"  # retry what is failing first
    assert all(e.topic == "arrays" for e in picks[1:])  # then stay in the current topic


def test_cli_hint_and_solution(tmp_path, monkeypatch, capsys):
    monkeypatch.setattr(progress_mod, "PROGRESS_FILE", tmp_path / "p.json")
    cli.main(["hint", "arr_find_max"])  # underscores work too
    assert "Hint 1/" in capsys.readouterr().out
    cli.main(["solution", "arr-find-max", "--yes"])
    assert "def find_max" in capsys.readouterr().out
    assert Progress(tmp_path / "p.json").get("arr-find-max")["solution_viewed"]


def test_cli_test_command_exit_code(tmp_path, monkeypatch, capsys):
    monkeypatch.setattr(progress_mod, "PROGRESS_FILE", tmp_path / "p.json")
    if FIND_MAX.state() != "untouched":
        pytest.skip("you have edited arr_find_max.py")
    with pytest.raises(SystemExit) as stop:
        cli.main(["test", "arr-find-max"])
    assert stop.value.code == 1
    out = capsys.readouterr().out
    assert "hidden test" in out and "--reveal" in out


def test_unknown_exercise_message():
    with pytest.raises(SystemExit, match="No exercise"):
        cli.main(["show", "no-such-thing"])
