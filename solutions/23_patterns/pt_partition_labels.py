"""Reference solution · pt-partition-labels · Partition Labels

Complexity: O(n)

Approach: Greedy extension, like merging intervals.
"""


def partition_labels(s):
    last = {ch: i for i, ch in enumerate(s)}
    sizes, start, end = [], 0, 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])     # this part must reach ch's last occurrence
        if i == end:
            sizes.append(end - start + 1)
            start = i + 1
    return sizes
