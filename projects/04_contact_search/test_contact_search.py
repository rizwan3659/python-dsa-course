import pytest


@pytest.fixture
def book(impl):
    b = impl.ContactBook()
    for name, phone in [("Anna", "555-0101"), ("Andrew", "555-0199"), ("Andy", "555-7000"),
                        ("Bob", "555-0200"), ("ann", "555-0300")]:
        b.add(name, phone)
    return b


class TestMilestone1:
    def test_phone_case_insensitive(self, book):
        assert book.phone("ANNA") == "555-0101"
        assert book.phone("zed") is None

    def test_count_prefix(self, book):
        assert book.count_prefix("an") == 4
        assert book.count_prefix("AND") == 2
        assert book.count_prefix("ann") == 2
        assert book.count_prefix("x") == 0
        assert book.count_prefix("") == 5

    def test_update_does_not_double_count(self, book):
        book.add("bob", "999")
        assert book.phone("Bob") == "999"
        assert book.count_prefix("b") == 1


class TestMilestone2:
    def test_search_alphabetical(self, book):
        assert book.search("an") == ["andrew", "andy", "ann", "anna"]

    def test_search_limit(self, book):
        assert book.search("an", limit=2) == ["andrew", "andy"]
        assert book.search("", limit=1) == ["andrew"]

    def test_search_no_match(self, book):
        assert book.search("zz") == []

    def test_many_contacts(self, impl):
        b = impl.ContactBook()
        for i in range(20000):
            b.add(f"user{i:05d}", str(i))
        assert b.count_prefix("user1") == 10000
        assert b.search("user19", limit=3) == ["user19000", "user19001", "user19002"]


class TestMilestone3:
    def test_delete(self, book):
        assert book.delete("ann") is True
        assert book.delete("ann") is False
        assert book.phone("anna") == "555-0101"
        assert book.count_prefix("ann") == 1
        assert book.search("an") == ["andrew", "andy", "anna"]

    def test_delete_whole_branch(self, book):
        book.delete("bob")
        assert book.count_prefix("b") == 0
        assert book.search("b") == []

    def test_search_number(self, book):
        assert book.search_number("01") == ["andrew", "anna"]
        assert book.search_number("7000") == ["andy"]
        assert book.search_number("42") == []
