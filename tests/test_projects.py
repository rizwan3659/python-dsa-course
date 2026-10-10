"""Maintainer checks for projects/: every reference implementation passes its tests, every starter does not."""
import os
import subprocess
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
PROJECTS = sorted(p for p in (ROOT / "projects").iterdir() if p.is_dir() and (p / "reference.py").exists())


def run_pytest(project: Path, impl: str) -> subprocess.CompletedProcess:
    env = dict(os.environ, DSA_PROJECT_IMPL=impl)
    return subprocess.run([sys.executable, "-m", "pytest", "-q", "-p", "no:cacheprovider", str(project)],
                          cwd=ROOT, env=env, capture_output=True, text=True, timeout=300)


def test_there_are_ten_projects():
    assert len(PROJECTS) == 10


@pytest.mark.parametrize("project", PROJECTS, ids=lambda p: p.name)
def test_project_is_complete(project):
    for name in ("README.md", "starter.py", "reference.py"):
        assert (project / name).exists(), name
    assert list(project.glob("test_*.py")), "no tests"
    readme = (project / "README.md").read_text(encoding="utf-8")
    for section in ("## Requirements", "## Milestones", "## Extensions"):
        assert section in readme


@pytest.mark.parametrize("project", PROJECTS, ids=lambda p: p.name)
def test_reference_passes(project):
    result = run_pytest(project, "reference")
    assert result.returncode == 0, result.stdout[-2000:]


@pytest.mark.parametrize("project", PROJECTS, ids=lambda p: p.name)
def test_starter_does_not_pass(project):
    if (project / "starter.py").read_text(encoding="utf-8").count("TODO") == 0:
        pytest.skip("starter has been completed")
    assert run_pytest(project, "starter").returncode != 0
