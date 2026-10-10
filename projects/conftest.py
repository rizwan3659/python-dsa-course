"""Shared pytest setup for the mini-projects.

Every project folder has starter.py (yours) and reference.py (a model answer). Tests use the `impl`
fixture, which loads starter.py by default. Maintainers check the reference instead with:

    DSA_PROJECT_IMPL=reference python -m pytest projects
"""
import importlib.util
import os
from pathlib import Path

import pytest


@pytest.fixture
def impl(request):
    which = "reference" if os.environ.get("DSA_PROJECT_IMPL") == "reference" else "starter"
    path = Path(request.path).parent / f"{which}.py"
    spec = importlib.util.spec_from_file_location(f"{path.parent.name}_{which}", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module
