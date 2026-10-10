"""Reference solution · h-max-points · Max Points on a Line

Complexity: O(n² log C) time, O(n) space

Approach: For each anchor point, count reduced slope vectors in a dict.

Common mistakes:
- Using float slopes (precision errors, and vertical lines divide by zero).
- Not normalising the sign, so (1, 2) and (−1, −2) count as different lines.

Follow-up challenge: How would you handle duplicate points?
"""


from math import gcd


def max_points(points):
    best = 1
    for i, (x1, y1) in enumerate(points):
        slopes = {}
        for x2, y2 in points[i + 1:]:
            dx, dy = x2 - x1, y2 - y1
            g = gcd(dx, dy)
            dx, dy = dx // g, dy // g
            if dx < 0 or (dx == 0 and dy < 0):    # one canonical direction per line
                dx, dy = -dx, -dy
            slopes[(dx, dy)] = slopes.get((dx, dy), 0) + 1
        if slopes:
            best = max(best, 1 + max(slopes.values()))
    return best
