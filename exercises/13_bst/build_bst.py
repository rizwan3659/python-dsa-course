"""build-bst · Build a Binary Search Tree
Topic 13: Binary Search Trees · medium · Design / Build · build

Implement a BST of distinct numbers. Smaller values go left, larger values
go right.

Requirements:
- `insert(x)` (ignore duplicates)
- `contains(x)` → bool
- `inorder()` → sorted list
- `minimum()`, `maximum()` → value or None
- `delete(x)` handles leaves, one child and two children
- `height()`: number of levels (empty = 0)

Examples:
    insert (with a duplicate), search, min, max, height
    delete a leaf, a node with two children, a node with one child
    empty tree

(1 more hidden test run when you check your work.)

Target complexity: O(h) per operation: O(log n) balanced, O(n) worst case

Check your work:   python dsa.py test build-bst
Stuck?             python dsa.py hint build-bst
"""


class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, x):
        pass

    def contains(self, x):
        pass

    def inorder(self):
        pass

    def minimum(self):
        pass

    def maximum(self):
        pass

    def delete(self, x):
        pass

    def height(self):
        pass
