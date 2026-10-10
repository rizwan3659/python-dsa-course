import pytest


@pytest.fixture
def g(impl):
    s = impl.SocialGraph()
    for a, b in [("ann", "bob"), ("ann", "cat"), ("bob", "dan"), ("cat", "dan"),
                 ("cat", "eve"), ("dan", "fay"), ("gus", "hal")]:
        s.add_friendship(a, b)
    for user, items in {"ann": ["chess", "jazz"], "bob": ["chess", "go", "tea"], "cat": ["go", "tea"],
                        "dan": ["jazz", "go"], "eve": ["tea"], "gus": ["chess", "jazz"]}.items():
        for item in items:
            s.like(user, item)
    return s


class TestMilestone1:
    def test_friends(self, g):
        assert g.friends("cat") == ["ann", "dan", "eve"]
        assert g.friends("nobody") == []

    def test_self_and_duplicate_friendship(self, impl):
        s = impl.SocialGraph()
        s.add_friendship("a", "a")
        s.add_friendship("a", "b")
        s.add_friendship("b", "a")
        assert s.friends("a") == ["b"]

    def test_degrees(self, g):
        assert g.degrees("ann", "ann") == 0
        assert g.degrees("ann", "bob") == 1
        assert g.degrees("ann", "dan") == 2
        assert g.degrees("ann", "fay") == 3
        assert g.degrees("ann", "gus") == -1


class TestMilestone2:
    def test_people_you_may_know(self, g):
        # dan: mutual bob and cat (2); eve: mutual cat (1)
        assert g.people_you_may_know("ann") == ["dan", "eve"]
        assert g.people_you_may_know("ann", k=1) == ["dan"]
        assert g.people_you_may_know("fay") == ["bob", "cat"]
        assert g.people_you_may_know("nobody") == []

    def test_recommend_items(self, g):
        # ann's friends bob and cat both like go and tea
        assert g.recommend_items("ann") == ["go", "tea"]
        assert g.recommend_items("eve") == ["go"]
        assert g.recommend_items("hal") == ["chess", "jazz"]

    def test_large_graph(self, impl):
        s = impl.SocialGraph()
        for i in range(3000):
            s.add_friendship("hub", f"u{i}")
            s.add_friendship(f"u{i}", f"v{i % 50}")
        assert s.people_you_may_know("hub", k=2) == ["v0", "v1"]
        assert s.degrees(f"u0", f"u2999") == 2


class TestMilestone3:
    def test_similar_users(self, g):
        # ann {chess, jazz}: gus 2/2 = 1.0, dan 1/3, bob 1/4
        assert g.similar_users("ann") == ["gus", "dan", "bob"]
        assert g.similar_users("eve", k=5) == ["cat", "bob"]
        assert g.similar_users("fay") == []
