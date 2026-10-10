import pytest


@pytest.fixture
def engine(impl):
    e = impl.Autocomplete()
    for phrase, n in [("python", 50), ("pytest", 20), ("python list", 30), ("pyramid", 20),
                      ("java", 40), ("Python dict", 10)]:
        e.insert(phrase, n)
    return e


class TestMilestone1:
    def test_frequency(self, engine):
        assert engine.frequency("python") == 50
        assert engine.frequency("PYTHON DICT") == 10
        assert engine.frequency("pyth") == 0
        assert engine.frequency("ruby") == 0

    def test_insert_accumulates(self, engine):
        engine.insert("java", 2)
        assert engine.frequency("java") == 42


class TestMilestone2:
    def test_suggest_by_frequency_then_alpha(self, engine):
        assert engine.suggest("py") == ["python", "python list", "pyramid"]
        assert engine.suggest("py", k=5) == ["python", "python list", "pyramid", "pytest", "python dict"]

    def test_suggest_with_space(self, engine):
        assert engine.suggest("python ") == ["python list", "python dict"]

    def test_suggest_none(self, engine):
        assert engine.suggest("ru") == []

    def test_many_phrases(self, impl):
        e = impl.Autocomplete()
        for i in range(20000):
            e.insert(f"item {i}", i % 100)
        assert e.suggest("item 1", k=2) == ["item 10099", "item 10199"]


class TestMilestone3:
    def test_record_changes_ranking(self, engine):
        for _ in range(31):
            engine.record("pyramid")
        assert engine.suggest("py", k=2) == ["pyramid", "python"]

    def test_typing(self, engine):
        assert engine.typing("pyr") == [["python", "python list", "pyramid"],
                                         ["python", "python list", "pyramid"],
                                         ["pyramid"]]
        assert engine.typing("jx") == [["java"], []]

    def test_remove(self, engine):
        assert engine.remove("python") is True
        assert engine.remove("python") is False
        assert engine.suggest("pyt", k=2) == ["python list", "pytest"]
        assert engine.frequency("python list") == 30
