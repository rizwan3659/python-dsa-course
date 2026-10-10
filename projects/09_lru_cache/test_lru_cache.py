import inspect
import time


class TestMilestone1:
    def test_basic(self, impl):
        c = impl.LRUCache(2)
        c.put(1, "a")
        c.put(2, "b")
        assert c.get(1) == "a"
        c.put(3, "c")                 # evicts 2 (1 was used more recently)
        assert c.get(2) is None
        assert (c.get(1), c.get(3)) == ("a", "c")
        assert len(c) == 2

    def test_update_refreshes(self, impl):
        c = impl.LRUCache(2)
        c.put("x", 1)
        c.put("y", 2)
        c.put("x", 10)                # update makes x most recent
        c.put("z", 3)                 # evicts y
        assert "y" not in c
        assert c.get("x") == 10

    def test_contains_is_not_a_use(self, impl):
        c = impl.LRUCache(2)
        c.put(1, 1)
        c.put(2, 2)
        assert 1 in c
        c.put(3, 3)                   # 1 is still least recent
        assert 1 not in c

    def test_capacity_zero(self, impl):
        c = impl.LRUCache(0)
        c.put(1, 1)
        assert c.get(1) is None and len(c) == 0

    def test_no_ordereddict(self, impl):
        source = inspect.getsource(impl)
        assert "OrderedDict" not in source and "lru_cache" not in source


class TestMilestone2:
    def test_keys_order(self, impl):
        c = impl.LRUCache(3)
        for k in "abc":
            c.put(k, 0)
        c.get("a")
        assert c.keys() == ["a", "c", "b"]

    def test_constant_time(self, impl):
        c = impl.LRUCache(50000)
        start = time.perf_counter()
        for i in range(200000):
            c.put(i, i)
            c.get(i - 1000)
        assert time.perf_counter() - start < 3.0
        assert len(c) == 50000


class TestMilestone3:
    def test_stats(self, impl):
        c = impl.LRUCache(1)
        c.put(1, 1)
        c.get(1)
        c.get(2)
        c.put(2, 2)
        assert c.stats() == {"hits": 1, "misses": 1, "evictions": 1}

    def test_resize(self, impl):
        c = impl.LRUCache(4)
        for k in range(4):
            c.put(k, k)
        c.get(0)
        c.resize(2)
        assert c.keys() == [0, 3]
        assert c.stats()["evictions"] == 2
        c.resize(5)
        c.put(9, 9)
        assert len(c) == 3
