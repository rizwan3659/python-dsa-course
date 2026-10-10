"""Reference solution · gr-job-sequencing · Job Sequencing with Deadlines

Complexity: O(n²) time in the worst case, O(n) space

Approach: Sort by profit descending; place each job in the latest free slot
≤ its deadline.

Common mistakes:
- Putting a job in the earliest free slot, which blocks urgent jobs.
- Sorting by deadline instead of profit.

Follow-up challenge: Speed up "latest free slot" with a union-find over
slots to get about O(n log n).
"""


def max_profit(jobs):
    if not jobs:
        return 0
    last = min(len(jobs), max(d for d, _ in jobs))
    used = [False] * (last + 1)
    total = 0
    for deadline, profit in sorted(jobs, key=lambda j: -j[1]):   # most profitable first
        for t in range(min(deadline, last), 0, -1):             # latest free slot
            if not used[t]:
                used[t] = True
                total += profit
                break
    return total
