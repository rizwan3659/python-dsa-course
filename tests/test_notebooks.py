"""Every generated notebook is valid JSON in nbformat 4 and all its code cells run in order (no Jupyter needed)."""
import contextlib
import io
import json
import os
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
NOTEBOOKS = sorted((ROOT / "notebooks").glob("*.ipynb"))


def test_one_notebook_per_topic():
    data = json.loads((ROOT / "dsa_course" / "data" / "exercises.json").read_text(encoding="utf-8"))
    assert [p.stem for p in NOTEBOOKS] == [t["dir"] for t in data["topics"]]


@pytest.mark.parametrize("path", NOTEBOOKS, ids=lambda p: p.stem)
def test_notebook_runs(path, monkeypatch):
    nb = json.loads(path.read_text(encoding="utf-8"))
    assert nb["nbformat"] == 4
    monkeypatch.chdir(ROOT / "notebooks")
    namespace = {"__name__": "__main__"}
    for i, cell in enumerate(nb["cells"]):
        assert cell["cell_type"] in ("markdown", "code")
        if cell["cell_type"] != "code":
            continue
        source = "".join(cell["source"])
        with contextlib.redirect_stdout(io.StringIO()):
            try:
                exec(compile(source, f"{path.name}[cell {i}]", "exec"), namespace)
            except Exception as exc:  # noqa: BLE001
                pytest.fail(f"cell {i} raised {type(exc).__name__}: {exc}\n{source}")
    assert os.getcwd() == str(ROOT)  # the setup cell moved to the repository root
