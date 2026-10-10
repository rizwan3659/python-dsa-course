"""Reference solution · t-serialize · Serialize and Deserialize

Complexity: O(n)

Approach: Preorder with null markers.
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def serialize(root):
    out = []
    def go(node):                        # preorder with markers for None
        if node is None:
            out.append("#")
            return
        out.append(str(node.val))
        go(node.left)
        go(node.right)
    go(root)
    return ",".join(out)

def deserialize(s):
    vals = iter(s.split(","))
    def go():
        v = next(vals)
        if v == "#":
            return None
        node = TreeNode(int(v))
        node.left = go()
        node.right = go()
        return node
    return go()
