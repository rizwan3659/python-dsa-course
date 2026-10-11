"""Reference solution · arr-move-zeroes · Move Zeroes

Complexity: O(n) time, O(1) space

Approach: Write pointer + swap: non-zeros move forward in order, zeros drift
back.

Common mistakes:
- Removing zeros with remove() and appending them: O(n²).
- Changing the order of the non-zero numbers.

Follow-up challenge: Minimise the number of writes to the list.
"""


def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1
