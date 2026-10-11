"""Reference solution · arr-product-except · Product of Array Except Self

Complexity: O(n) time, O(1) extra space (besides the output)

Approach: Prefix products from the left, suffix products from the right.

Common mistakes:
- Dividing the total product by nums[i] (breaks with zeros).
- Using two extra lists when the output list can hold the prefix products.

Follow-up challenge: Use O(1) extra space besides the output.
"""


def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    left = 1
    for i in range(n):            # product of everything to the left
        out[i] = left
        left *= nums[i]
    right = 1
    for i in range(n - 1, -1, -1):  # times everything to the right
        out[i] *= right
        right *= nums[i]
    return out
