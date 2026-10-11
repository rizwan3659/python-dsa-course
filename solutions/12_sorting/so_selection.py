"""Reference solution · so-selection · Selection Sort

Complexity: O(n²)

Approach: Select the minimum each pass.

Common mistakes:
- Swapping on every smaller element instead of once per pass.
- Searching for the minimum from index 0 every time.

Follow-up challenge: Is selection sort stable? Find an example.
"""


def selection_sort(a):
    for i in range(len(a)):
        m = i
        for j in range(i + 1, len(a)):
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]
    return a
