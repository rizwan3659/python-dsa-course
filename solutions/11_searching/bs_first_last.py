"""Reference solution · bs-first-last · First and Last Position

Complexity: O(log n)

Approach: Two boundary searches.

Common mistakes:
- Finding one position and walking left and right: O(n) for many duplicates.
- Stopping at the first match.

Follow-up challenge: Return the number of distinct values in the sorted list
in O(d log n).
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
