/* Topic 13 · Trees. */
COURSE.topic({id:'trees',
goal:'Read and describe trees (root, parent, child, leaf, depth, height, subtree), traverse them four ways, and write recursive tree functions with confidence.',
learn:[
{title:'Tree vocabulary',short:'Anatomy',mins:8,lead:'A tree is a hierarchy: one root, and every other node has exactly one parent. In a binary tree, each node has at most two children: left and right.',does:['visualize','concept','choose'],blocks:[
 {t:'diagram',text:`
            8          ← root (depth 0)
          /   \\
         4     12      ← depth 1
        / \\   /  \\
       2   6 10   14   ← leaves (no children), depth 2

  height of the tree = 3 levels      subtree of 4 = {4, 2, 6}`,aria:'A binary tree of seven nodes with labels for root, depth and leaves'},
 {t:'viz',fn:'tree-anatomy',title:'Click to explore',intro:'Click each node and read its role. Then press “Click every leaf”.'},
 {t:'q',ids:['t-m1','t-m2','t-m4','t-m3','t-ch1']}]},

{title:'Trees in Python',short:'TreeNode',mins:6,lead:'A tree node is a tiny class with a value and two child pointers. In exercises, build_tree(level_order_list) builds one for you.',does:['predict'],blocks:[
 {t:'code',title:'Nodes and the helper',prelude:'tree',code:`root = TreeNode(8, TreeNode(4), TreeNode(12))
print(root.val, root.left.val, root.right.val)

t = build_tree([1, 2, 3, None, 5])   # None = missing child
#      1
#     / \\
#    2   3
#     \\
#      5
print(t.left.right.val)              # 5
print(tree_to_list(t))`},
 {t:'q',ids:['t-p7','t-p9']}]},

{title:'Depth-first traversals',short:'DFS',mins:12,lead:'Preorder, inorder and postorder all go deep first. The only difference is when the node itself is visited: before, between or after its subtrees.',does:['visualize','predict','dry run','complete','code'],blocks:[
 {t:'table',head:['Traversal','Order','Typical use'],rows:[['Preorder','node, left, right','copy / serialize a tree'],['Inorder','left, node, right','sorted order of a BST'],['Postorder','left, right, node','delete a tree, compute sizes and heights bottom-up']]},
 {t:'viz',fn:'tree-traversal',title:'Watch the order',intro:'Before each Next, say which node comes next. Compare the three DFS orders on the same tree.'},
 {t:'q',ids:['t-p1','t-p2','t-p3','t-m5']},
 {t:'q',ids:['t-dr2','t-b2']},
 {t:'q',title:'Code it',ids:['t-preorder','t-inorder','t-postorder']}]},

{title:'Breadth-first: level order',short:'BFS',mins:10,lead:'A queue visits the tree level by level. Process len(queue) nodes per round to handle one whole level at a time.',does:['visualize','predict','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'tree-traversal',title:'Level order',arg:{mode:'level'}},
 {t:'q',ids:['t-p4','t-dr1','t-m6','t-c3','t-ch2']},
 {t:'q',ids:['t-b3','t-d3']},
 {t:'q',title:'Code it',ids:['t-level-order','t-avg-levels','t-right-view']}]},

{title:'Thinking recursively about trees',short:'Tree recursion',mins:12,lead:'Almost every tree problem has the same shape: handle None, ask both subtrees for their answer, combine with the current node.',does:['predict','complete','debug','complexity','code'],blocks:[
 {t:'code',title:'The template',run:false,code:`def solve(node):
    if node is None:
        return BASE_ANSWER          # e.g. 0, True, []
    left = solve(node.left)         # trust the recursion
    right = solve(node.right)
    return combine(node.val, left, right)`},
 {t:'q',ids:['t-p5','t-p6','t-p8','t-c1','t-c2']},
 {t:'q',ids:['t-b1','t-b4','t-d1','t-d2','t-d4']},
 {t:'q',title:'Code it',ids:['t-max-depth','t-invert','t-same','t-path-sum']}]},

{title:'Bottom-up tricks: height, diameter, balance',short:'Bottom-up',mins:10,lead:'Some answers need information from both subtrees at once. Compute it on the way back up (postorder), and keep a global best when the answer can bend at any node.',does:['complexity','code'],blocks:[
 {t:'q',ids:['t-c4']},
 {t:'q',title:'Code it',ids:['t-diameter','t-balanced','t-lca']}]}],

challenge:[
 {t:'b2o',title:'Balanced Tree: height at every node → one bottom-up pass',qid:'t-balanced',problem:'<p>A tree is balanced if, at every node, the left and right heights differ by at most 1.</p>',
  brute:{code:`def height(node):
    return 0 if node is None else 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    if node is None:
        return True
    if abs(height(node.left) - height(node.right)) > 1:
        return False
    return is_balanced(node.left) and is_balanced(node.right)`,cx:'O(n²)',why:'On a line-shaped tree, height() walks almost the whole tree for every node.'},
  slow:{q:'Which work is repeated?',opts:['Heights of the same subtrees are recomputed by every ancestor','The base case','Checking abs() > 1','Nothing'],a:0,why:'height(node.left.left) is recomputed for node.left and again for node.'},
  better:{q:'How do we compute each height once?',opts:['Sort the nodes','A postorder pass that returns the height and the verdict together','Use BFS','Memoize with a list'],a:1,why:'Children report their height upward; the parent checks the difference immediately.'},
  optimal:{code:`def is_balanced(root):
    def check(node):              # height, or -1 if unbalanced
        if node is None:
            return 0
        l = check(node.left)
        r = check(node.right)
        if l == -1 or r == -1 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)
    return check(root) != -1`,cx:'O(n)',why:'Each node is visited once.'},
  takeaway:'<p>When a parent needs facts about its subtrees, return those facts from the recursion instead of recomputing them.</p>'}],

review:[
 {t:'flash',items:[['Leaf?','A node with no children.'],['Depth vs height?','Depth: edges from the root. Height: levels down to the deepest leaf.'],['Edges in a tree of n nodes?','n − 1.'],['Preorder / inorder / postorder?','NLR / LNR / LRN.'],['Level order uses…','A queue (BFS).'],['Tree recursion template?','None → base; solve left and right; combine.'],['Diameter trick?','left height + right height at each node, keep the max.']]}]
});
