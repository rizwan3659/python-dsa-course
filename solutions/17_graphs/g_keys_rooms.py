"""Reference solution · g-keys-rooms · Keys and Rooms

Complexity: O(V + E)

Approach: Reachability with DFS.

Common mistakes:
- Visiting rooms only in index order.
- Not marking rooms as visited (loops on keys to visited rooms).

Follow-up challenge: Return the minimum number of rooms you must enter to
collect all keys.
"""


def can_visit_all(rooms):
    seen, stack = {0}, [0]
    while stack:
        for key in rooms[stack.pop()]:
            if key not in seen:
                seen.add(key)
                stack.append(key)
    return len(seen) == len(rooms)
