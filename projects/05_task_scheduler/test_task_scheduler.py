import pytest


class TestMilestone1:
    def test_priority_order(self, impl):
        s = impl.Scheduler()
        for name, p in [("lint", 3), ("build", 1), ("deploy", 5), ("test", 2)]:
            s.add(name, p)
        assert s.run_order() == ["build", "test", "lint", "deploy"]

    def test_ties_by_name(self, impl):
        s = impl.Scheduler()
        for name in ("c", "a", "b"):
            s.add(name, 1)
        assert s.run_order() == ["a", "b", "c"]

    def test_pop_next(self, impl):
        s = impl.Scheduler()
        s.add("x", 2)
        s.add("y", 1)
        assert [s.pop_next(), s.pop_next(), s.pop_next()] == ["y", "x", None]

    def test_empty(self, impl):
        assert impl.Scheduler().run_order() == []


class TestMilestone2:
    def test_dependencies_beat_priority(self, impl):
        s = impl.Scheduler()
        s.add("deploy", 0, after=["test"])
        s.add("test", 5, after=["build"])
        s.add("build", 9)
        s.add("docs", 1)
        assert s.run_order() == ["docs", "build", "test", "deploy"]

    def test_unlocked_task_competes_by_priority(self, impl):
        s = impl.Scheduler()
        s.add("a", 5)
        s.add("b", 1, after=["a"])
        s.add("c", 3)
        assert s.run_order() == ["c", "a", "b"]

    def test_pop_next_respects_dependencies(self, impl):
        s = impl.Scheduler()
        s.add("compile", 2)
        s.add("ship", 1, after=["compile"])
        assert s.pop_next() == "compile"
        assert s.pop_next() == "ship"

    def test_large(self, impl):
        s = impl.Scheduler()
        for i in range(5000):
            s.add(f"t{i:04d}", i % 7, after=[f"t{i - 1:04d}"] if i % 2 else [])
        order = s.run_order()
        assert len(order) == 5000
        assert order.index("t0001") > order.index("t0000")


class TestMilestone3:
    def test_cycle(self, impl):
        s = impl.Scheduler()
        s.add("a", 1, after=["b"])
        s.add("b", 1, after=["a"])
        s.add("c", 1)
        with pytest.raises(ValueError):
            s.run_order()

    def test_unknown_dependency(self, impl):
        s = impl.Scheduler()
        s.add("a", 1, after=["ghost"])
        with pytest.raises(ValueError):
            s.run_order()

    def test_finish_time(self, impl):
        s = impl.Scheduler()
        s.add("build", 1)
        s.add("test", 2, after=["build"])
        s.add("docs", 3)
        assert s.finish_time({"build": 10, "test": 5, "docs": 2}) == {"build": 10, "test": 15, "docs": 17}
