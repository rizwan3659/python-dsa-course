import pytest


@pytest.fixture
def board(impl):
    b = impl.Leaderboard()
    for name, score in [("ana", 70), ("ben", 85), ("cy", 85), ("ana", 90), ("dee", 60), ("ben", 40)]:
        b.add_score(name, score)
    return b


class TestMilestone1:
    def test_best_keeps_maximum(self, board):
        assert board.best("ana") == 90
        assert board.best("ben") == 85

    def test_unknown_student(self, board):
        assert board.best("zed") is None

    def test_remove(self, board):
        assert board.remove("dee") is True
        assert board.best("dee") is None
        assert board.remove("dee") is False

    def test_negative_scores(self, impl):
        b = impl.Leaderboard()
        b.add_score("x", -5)
        b.add_score("x", -9)
        assert b.best("x") == -5


class TestMilestone2:
    def test_top_order_and_ties(self, board):
        assert board.top(3) == [("ana", 90), ("ben", 85), ("cy", 85)]

    def test_top_more_than_available(self, board):
        assert len(board.top(10)) == 4
        assert board.top(0) == []

    def test_rank(self, board):
        assert [board.rank(n) for n in ("ana", "ben", "cy", "dee")] == [1, 2, 3, 4]
        assert board.rank("zed") is None

    def test_rank_after_remove(self, board):
        board.remove("ana")
        assert board.rank("ben") == 1

    def test_many_students(self, impl):
        b = impl.Leaderboard()
        for i in range(5000):
            b.add_score(f"s{i:04d}", i % 100)
        assert b.top(2) == [("s0099", 99), ("s0199", 99)]


class TestMilestone3:
    def test_average_uses_all_scores(self, board):
        assert board.average("ana") == 80
        assert board.average("zed") is None

    def test_most_improved(self, board):
        # ana: 70 -> 90 (+20), ben: 85 -> 40 (-45)
        assert board.most_improved() == "ana"

    def test_most_improved_none(self, impl):
        b = impl.Leaderboard()
        b.add_score("solo", 10)
        assert b.most_improved() is None

    def test_most_improved_tie_alphabetical(self, impl):
        b = impl.Leaderboard()
        for name in ("zoe", "amy"):
            b.add_score(name, 1)
            b.add_score(name, 6)
        assert b.most_improved() == "amy"
