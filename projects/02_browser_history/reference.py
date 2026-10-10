"""Project 2: Browser History (reference implementation)."""


class BrowserHistory:
    def __init__(self, homepage: str):
        self.back_stack: list[str] = [homepage]   # top = current page
        self.forward_stack: list[str] = []
        self.visits: list[str] = [homepage]

    # ---- Milestone 1 ----
    def current(self) -> str:
        return self.back_stack[-1]

    def visit(self, url: str) -> None:
        self.back_stack.append(url)
        self.forward_stack.clear()                # a new branch: the old future is gone
        self.visits.append(url)

    def back(self, steps: int) -> str:
        while steps > 0 and len(self.back_stack) > 1:
            self.forward_stack.append(self.back_stack.pop())
            steps -= 1
        return self.current()

    def forward(self, steps: int) -> str:
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.forward_stack.pop())
            steps -= 1
        return self.current()

    # ---- Milestone 2 ----
    def can_back(self) -> bool:
        return len(self.back_stack) > 1

    def can_forward(self) -> bool:
        return bool(self.forward_stack)

    def history(self, limit: int) -> list[str]:
        return self.visits[::-1][:limit] if limit > 0 else []


# ---- Milestone 3 ----
class Tabs:
    def __init__(self):
        self.tabs: dict[int, str] = {}
        self.closed: list[tuple[int, str]] = []   # stack of (id, url)
        self.next_id = 0

    def open(self, url: str) -> int:
        tab_id = self.next_id
        self.next_id += 1
        self.tabs[tab_id] = url
        return tab_id

    def close(self, tab_id: int) -> bool:
        if tab_id not in self.tabs:
            return False
        self.closed.append((tab_id, self.tabs.pop(tab_id)))
        return True

    def reopen(self) -> str | None:
        if not self.closed:
            return None
        tab_id, url = self.closed.pop()
        self.tabs[tab_id] = url
        return url

    def open_tabs(self) -> list[str]:
        return [self.tabs[i] for i in sorted(self.tabs)]
