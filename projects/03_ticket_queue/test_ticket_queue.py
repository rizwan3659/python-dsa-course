import time


class TestMilestone1:
    def test_fifo(self, impl):
        q = impl.TicketQueue()
        assert q.open("ann", "login") == 1
        assert q.open("bob", "refund") == 2
        assert len(q) == 2
        assert q.peek()["customer"] == "ann"
        assert q.next() == {"id": 1, "customer": "ann", "issue": "login", "vip": False}
        assert q.next()["id"] == 2
        assert q.next() is None
        assert len(q) == 0

    def test_empty_peek(self, impl):
        assert impl.TicketQueue().peek() is None

    def test_large_queue_is_fast(self, impl):
        q = impl.TicketQueue()
        for i in range(100000):
            q.open(f"c{i}", "x")
        start = time.perf_counter()
        for _ in range(100000):
            q.next()
        assert time.perf_counter() - start < 2.0


class TestMilestone2:
    def test_vip_first_in_order(self, impl):
        q = impl.TicketQueue()
        q.open("a", "x")
        q.open("v1", "x", vip=True)
        q.open("b", "x")
        q.open("v2", "x", vip=True)
        assert [q.next()["customer"] for _ in range(4)] == ["v1", "v2", "a", "b"]

    def test_vip_arriving_later_still_first(self, impl):
        q = impl.TicketQueue()
        q.open("a", "x")
        assert q.next()["customer"] == "a"
        q.open("b", "x")
        q.open("v", "x", vip=True)
        assert q.peek()["vip"] is True


class TestMilestone3:
    def test_cancel(self, impl):
        q = impl.TicketQueue()
        ids = [q.open(c, "x") for c in "abc"]
        assert q.cancel(ids[0]) is True
        assert q.cancel(ids[0]) is False
        assert len(q) == 2
        assert q.next()["customer"] == "b"

    def test_cancel_served_ticket(self, impl):
        q = impl.TicketQueue()
        t = q.open("a", "x")
        q.next()
        assert q.cancel(t) is False

    def test_position(self, impl):
        q = impl.TicketQueue()
        a = q.open("a", "x")
        b = q.open("b", "x")
        v = q.open("v", "x", vip=True)
        assert (q.position(v), q.position(a), q.position(b)) == (0, 1, 2)
        q.cancel(a)
        assert q.position(b) == 1
        assert q.position(a) is None

    def test_waiting_for(self, impl):
        q = impl.TicketQueue()
        q.open("ann", "a")
        q.open("bob", "b")
        q.open("ann", "c", vip=True)
        assert q.waiting_for("ann") == [1, 3]
        q.next()
        assert q.waiting_for("ann") == [1]
        assert q.waiting_for("zed") == []
