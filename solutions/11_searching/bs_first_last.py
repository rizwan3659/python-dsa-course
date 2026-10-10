"""Reference solution · bs-first-last · First and Last Position

Complexity: O(log n)

Approach: Two boundary searches.
"""


def search_range(nums, target):
    def bound(left):
        lo, hi, ans = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                ans = mid
                if left:
                    hi = mid - 1
                else:
                    lo = mid + 1
            elif nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return ans
    return [bound(True), bound(False)]
