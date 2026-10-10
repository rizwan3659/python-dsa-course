import pytest

MAZE = """
#########
#S..#...#
#.#.#.#.#
#.#...#E#
#########
"""

BLOCKED = """
#####
#S#E#
#####
"""


def is_valid_path(maze, path):
    return (path[0] == maze.start and path[-1] == maze.exit
            and all(b in maze.neighbours(a) for a, b in zip(path, path[1:])))


class TestMilestone1:
    def test_parse(self, impl):
        m = impl.Maze(MAZE)
        assert (m.start, m.exit) == ((1, 1), (3, 7))

    def test_missing_exit(self, impl):
        with pytest.raises(ValueError):
            impl.Maze("#S.#")

    def test_neighbours_order_and_walls(self, impl):
        m = impl.Maze(MAZE)
        assert m.neighbours((1, 1)) == [(2, 1), (1, 2)]
        assert m.neighbours((1, 3)) == [(2, 3), (1, 2)]


class TestMilestone2:
    def test_shortest_distance(self, impl):
        assert impl.Maze(MAZE).shortest_distance() == 12

    def test_shortest_path_is_valid(self, impl):
        m = impl.Maze(MAZE)
        path = m.shortest_path()
        assert len(path) == 13 and is_valid_path(m, path)

    def test_no_path(self, impl):
        m = impl.Maze(BLOCKED)
        assert m.shortest_path() is None
        assert m.shortest_distance() == -1
        assert m.reachable() == 1

    def test_reachable(self, impl):
        assert impl.Maze(MAZE).reachable() == 15

    def test_big_open_grid(self, impl):
        n = 300
        rows = ["S" + "." * (n - 1)] + ["." * n] * (n - 2) + ["." * (n - 1) + "E"]
        assert impl.Maze("\n".join(rows)).shortest_distance() == 2 * (n - 1)


class TestMilestone3:
    def test_dfs_path_valid(self, impl):
        m = impl.Maze(MAZE)
        path = m.dfs_path()
        assert is_valid_path(m, path)

    def test_dfs_on_big_grid_no_recursion_error(self, impl):
        n = 300
        rows = ["S" + "." * (n - 1)] + ["." * n] * (n - 2) + ["." * (n - 1) + "E"]
        m = impl.Maze("\n".join(rows))
        assert is_valid_path(m, m.dfs_path())

    def test_dfs_none(self, impl):
        assert impl.Maze(BLOCKED).dfs_path() is None

    def test_render(self, impl):
        m = impl.Maze(MAZE)
        out = m.render(m.shortest_path())
        assert out.count("*") == 11
        assert out.splitlines()[1].startswith("#S")
        assert m.render(None) == MAZE.strip("\n")
