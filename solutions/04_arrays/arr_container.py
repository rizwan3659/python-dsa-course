"""Reference solution · arr-container · Container With Most Water

Complexity: O(n) time, O(1) space

Approach: Two pointers from both ends; always move the shorter wall.
"""


def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        best = max(best, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best
