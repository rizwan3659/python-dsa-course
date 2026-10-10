"""Reference solution · arr-move-zeroes · Move Zeroes

Complexity: O(n) time, O(1) space

Approach: Write pointer + swap: non-zeros move forward in order, zeros drift
back.
"""


def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1
