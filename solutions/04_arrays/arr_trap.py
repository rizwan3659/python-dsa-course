"""Reference solution · arr-trap · Trapping Rain Water

Complexity: O(n) time, O(1) space

Approach: Two pointers with running left_max and right_max; the smaller side
is always safe to settle.

Common mistakes:
- Using only the left maximum or only the right maximum.
- O(n²) by scanning both sides for every bar.

Follow-up challenge: Solve it with a monotonic stack and compare with the
two-pointer version.
"""


def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water
