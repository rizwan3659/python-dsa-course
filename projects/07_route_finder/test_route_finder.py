import pytest

ROADS = [("home", "park", 5), ("park", "school", 5), ("home", "mall", 2), ("mall", "school", 12),
         ("mall", "bank", 1), ("bank", "school", 4), ("lake", "cabin", 3)]


@pytest.fixture
def city(impl):
    return impl.RouteFinder(ROADS)


class TestMilestone1:
    def test_neighbours(self, city):
        assert city.neighbours("mall") == [("bank", 1), ("home", 2), ("school", 12)]
        assert city.neighbours("nowhere") == []

    def test_two_way(self, city):
        assert ("park", 5) in city.neighbours("school")


class TestMilestone2:
    def test_fastest(self, city):
        assert city.fastest("home", "school") == (7, ["home", "mall", "bank", "school"])

    def test_fastest_same_place(self, city):
        assert city.fastest("home", "home") == (0, ["home"])

    def test_unreachable(self, city):
        assert city.fastest("home", "cabin") is None
        assert city.fewest_roads("home", "cabin") == -1

    def test_fewest_roads_differs_from_fastest(self, city):
        assert city.fewest_roads("home", "school") == 2

    def test_large_grid_city(self, impl):
        n = 60
        roads = []
        for r in range(n):
            for c in range(n):
                if c + 1 < n:
                    roads.append((f"{r},{c}", f"{r},{c + 1}", 1 + (r * c) % 3))
                if r + 1 < n:
                    roads.append((f"{r},{c}", f"{r + 1},{c}", 1 + (r + c) % 3))
        finder = impl.RouteFinder(roads)
        minutes, path = finder.fastest("0,0", f"{n - 1},{n - 1}")
        assert path[0] == "0,0" and path[-1] == f"{n - 1},{n - 1}"
        assert minutes == sum(dict(finder.neighbours(a))[b] for a, b in zip(path, path[1:]))
        assert finder.fewest_roads("0,0", f"{n - 1},{n - 1}") == 2 * (n - 1)


class TestMilestone3:
    def test_close_and_reopen(self, city):
        city.close("bank", "mall")
        assert city.fastest("home", "school") == (10, ["home", "park", "school"])
        city.close("school", "park")
        assert city.fastest("home", "school")[0] == 14
        city.reopen("mall", "bank")
        assert city.fastest("home", "school")[0] == 7

    def test_closed_road_hidden_from_neighbours(self, city):
        city.close("home", "park")
        assert city.neighbours("home") == [("mall", 2)]

    def test_reachable(self, city):
        assert city.reachable("home", 3) == ["bank", "home", "mall"]
        assert city.reachable("home", 7) == ["bank", "home", "mall", "park", "school"]
        assert city.reachable("lake", 0) == ["lake"]
