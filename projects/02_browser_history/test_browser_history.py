import pytest


@pytest.fixture
def browser(impl):
    b = impl.BrowserHistory("home")
    for url in ("a", "b", "c"):
        b.visit(url)
    return b


class TestMilestone1:
    def test_visit_and_current(self, browser):
        assert browser.current() == "c"

    def test_back_and_forward(self, browser):
        assert browser.back(1) == "b"
        assert browser.back(1) == "a"
        assert browser.forward(1) == "b"

    def test_back_stops_at_home(self, browser):
        assert browser.back(100) == "home"

    def test_forward_stops_at_newest(self, browser):
        browser.back(2)
        assert browser.forward(10) == "c"

    def test_visit_clears_forward(self, browser):
        browser.back(2)
        browser.visit("x")
        assert browser.forward(5) == "x"
        assert browser.back(1) == "a"


class TestMilestone2:
    def test_buttons(self, impl):
        b = impl.BrowserHistory("home")
        assert (b.can_back(), b.can_forward()) == (False, False)
        b.visit("a")
        assert (b.can_back(), b.can_forward()) == (True, False)
        b.back(1)
        assert (b.can_back(), b.can_forward()) == (False, True)

    def test_history_ignores_navigation(self, browser):
        browser.back(2)
        browser.visit("b")
        assert browser.history(3) == ["b", "c", "b"]
        assert browser.history(0) == []
        assert browser.history(99)[-1] == "home"

    def test_many_steps_fast(self, impl):
        b = impl.BrowserHistory("home")
        for i in range(100000):
            b.visit(str(i))
        assert b.back(99999) == "0"
        assert b.forward(50000) == "50000"


class TestMilestone3:
    def test_open_and_close(self, impl):
        t = impl.Tabs()
        ids = [t.open(u) for u in ("a", "b", "c")]
        assert ids == [0, 1, 2]
        assert t.close(1) is True
        assert t.close(1) is False
        assert t.open_tabs() == ["a", "c"]

    def test_reopen_is_lifo_and_keeps_id(self, impl):
        t = impl.Tabs()
        for u in ("a", "b", "c"):
            t.open(u)
        t.close(0)
        t.close(2)
        assert t.reopen() == "c"
        assert t.reopen() == "a"
        assert t.reopen() is None
        assert t.open_tabs() == ["a", "b", "c"]
        assert t.open("d") == 3
