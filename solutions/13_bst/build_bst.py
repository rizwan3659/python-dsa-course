"""Reference solution · build-bst · Build a Binary Search Tree

Complexity: O(h) per operation: O(log n) balanced, O(n) worst case

Approach: Each operation follows one root-to-leaf path, guided by
comparisons.
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
        def go(node):
            if node is None:
                return Node(x)
            if x < node.val:
                node.left = go(node.left)
            elif x > node.val:
                node.right = go(node.right)
            return node
        self.root = go(self.root)

    def contains(self, x):
        node = self.root
        while node:
            if x == node.val:
                return True
            node = node.left if x < node.val else node.right
        return False

    def inorder(self):
        out = []
        def go(node):
            if node:
                go(node.left)
                out.append(node.val)
                go(node.right)
        go(self.root)
        return out

    def minimum(self):
        node = self.root
        while node and node.left:
            node = node.left
        return node.val if node else None

    def maximum(self):
        node = self.root
        while node and node.right:
            node = node.right
        return node.val if node else None

    def delete(self, x):
        def go(node, x):
            if node is None:
                return None
            if x < node.val:
                node.left = go(node.left, x)
            elif x > node.val:
                node.right = go(node.right, x)
            else:
                if node.left is None:
                    return node.right
                if node.right is None:
                    return node.left
                succ = node.right               # two children: use the in-order successor
                while succ.left:
                    succ = succ.left
                node.val = succ.val
                node.right = go(node.right, succ.val)
            return node
        self.root = go(self.root, x)

    def height(self):
        def h(node):
            return 0 if node is None else 1 + max(h(node.left), h(node.right))
        return h(self.root)
