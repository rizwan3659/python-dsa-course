"""Project 8: Autocomplete Engine (reference implementation)."""
import heapq


class Node:
    def __init__(self):
        self.children: dict[str, "Node"] = {}
        self.count = 0      # searches for the phrase that ends here


class Autocomplete:
    def __init__(self):
        self.root = Node()

    def _walk(self, text: str, start: Node | None = None) -> Node | None:
        node = start or self.root
        for ch in text:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    # ---- Milestone 1 ----
    def insert(self, phrase: str, count: int = 1) -> None:
        node = self.root
        for ch in phrase.lower():
            node = node.children.setdefault(ch, Node())
        node.count += count

    def frequency(self, phrase: str) -> int:
        node = self._walk(phrase.lower())
        return node.count if node else 0

    # ---- Milestone 2 ----
    def _phrases_below(self, node: Node, prefix: str):
        stack = [(node, prefix)]
        while stack:
            current, text = stack.pop()
            if current.count:
                yield current.count, text
            for ch, child in current.children.items():
                stack.append((child, text + ch))

    def _top(self, node: Node | None, prefix: str, k: int) -> list[str]:
        if node is None:
            return []
        best = heapq.nsmallest(k, self._phrases_below(node, prefix), key=lambda item: (-item[0], item[1]))
        return [text for _, text in best]

    def suggest(self, prefix: str, k: int = 3) -> list[str]:
        prefix = prefix.lower()
        return self._top(self._walk(prefix), prefix, k)

    # ---- Milestone 3 ----
    def record(self, phrase: str) -> None:
        self.insert(phrase, 1)

    def typing(self, chars: str) -> list[list[str]]:
        results, node, typed = [], self.root, ""
        for ch in chars.lower():
            typed += ch
            node = node.children.get(ch) if node else None   # one step down per keystroke
            results.append(self._top(node, typed, 3))
        return results

    def remove(self, phrase: str) -> bool:
        node = self._walk(phrase.lower())
        if node is None or node.count == 0:
            return False
        node.count = 0
        return True
