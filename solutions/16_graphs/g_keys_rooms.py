"""Reference solution · g-keys-rooms · Keys and Rooms

Complexity: O(V + E)

Approach: Reachability with DFS.
"""


def can_visit_all(rooms):
    seen, stack = {0}, [0]
    while stack:
        for key in rooms[stack.pop()]:
            if key not in seen:
                seen.add(key)
                stack.append(key)
    return len(seen) == len(rooms)
