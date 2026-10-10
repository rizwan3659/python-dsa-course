/* Topic 12 · Trees. Most questions use the 'tree' prelude: TreeNode, build_tree(level_order_list), tree_to_list(root). */
(function(){
const H='<p class="small muted"><code>build_tree([1, 2, 3, 4, 5])</code> builds the tree level by level (None = no child):</p><pre>    1\n   / \\\n  2   3\n / \\\n4   5</pre>';
const T='tree';
COURSE.qs('trees',[
{id:'t-p1',type:'predict',d:1,p:'tree',prelude:T,title:'Preorder',q:'What does this print?'+H,code:`def pre(node, out):
    if node:
        out.append(node.val)
        pre(node.left, out)
        pre(node.right, out)
    return out

print(pre(build_tree([1, 2, 3, 4, 5]), []))`,a:'[1, 2, 4, 5, 3]',why:'Root, then the whole left subtree, then the right subtree.'},
{id:'t-p2',type:'predict',d:1,p:'tree',prelude:T,title:'Inorder',q:'What does this print?'+H,code:`def ino(node, out):
    if node:
        ino(node.left, out)
        out.append(node.val)
        ino(node.right, out)
    return out

print(ino(build_tree([1, 2, 3, 4, 5]), []))`,a:'[4, 2, 5, 1, 3]',why:'Left subtree, root, right subtree.'},
{id:'t-p3',type:'predict',d:1,p:'tree',prelude:T,title:'Postorder',q:'What does this print?'+H,code:`def post(node, out):
    if node:
        post(node.left, out)
        post(node.right, out)
        out.append(node.val)
    return out

print(post(build_tree([1, 2, 3, 4, 5]), []))`,a:'[4, 5, 2, 3, 1]',why:'Children before the parent: the root comes last.'},
{id:'t-p4',type:'predict',d:1,p:'bfs',prelude:T,title:'Level order',q:'What does this print?'+H,code:`root = build_tree([1, 2, 3, 4, 5])
queue, out = deque([root]), []
while queue:
    node = queue.popleft()
    out.append(node.val)
    for child in (node.left, node.right):
        if child:
            queue.append(child)
print(out)`,a:'[1, 2, 3, 4, 5]',why:'A queue visits nodes level by level, left to right.'},
{id:'t-p5',type:'predict',d:1,p:'tree',prelude:T,title:'Height',q:'What does this print?'+H,code:`def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

print(height(build_tree([3, 9, 20, None, None, 15, 7])))`,a:'3',why:'3 → 20 → 15 is the longest root-to-leaf path: 3 levels.'},
{id:'t-p6',type:'predict',d:1,p:'tree',prelude:T,title:'Count the leaves',q:'What does this print?'+H,code:`def leaves(node):
    if node is None:
        return 0
    if node.left is None and node.right is None:
        return 1
    return leaves(node.left) + leaves(node.right)

print(leaves(build_tree([1, 2, 3, 4])))`,a:'2',why:'4 (child of 2) and 3 have no children.'},
{id:'t-p7',type:'predict',d:1,p:'tree',prelude:T,title:'Sum of a tree',q:'What does this print?'+H,code:`def total(node):
    if node is None:
        return 0
    return node.val + total(node.left) + total(node.right)

print(total(build_tree([1, 2, 3, 4, 5])))`,a:'15',why:'Every tree recursion has the same shape: handle None, combine the node with its two subtree answers.'},
{id:'t-p8',type:'predict',d:2,p:'tree',prelude:T,title:'Mirror image',q:'What does this print?'+H,code:`def invert(node):
    if node:
        node.left, node.right = invert(node.right), invert(node.left)
    return node

print(tree_to_list(invert(build_tree([1, 2, 3, 4, 5]))))`,a:'[1, 3, 2, None, None, 5, 4]',why:'Every node swaps its children. In level order, 3 now comes before 2, and 2’s children are reversed.'},
{id:'t-p9',type:'predict',d:2,p:'tree',prelude:T,title:'Depth of a value',q:'What does this print?'+H,code:`def depth_of(node, target, d=0):
    if node is None:
        return -1
    if node.val == target:
        return d
    left = depth_of(node.left, target, d + 1)
    return left if left != -1 else depth_of(node.right, target, d + 1)

print(depth_of(build_tree([1, 2, 3, 4, 5]), 5))`,a:'2',why:'Depth counts edges from the root: 1 → 2 → 5.'},
{id:'t-c1',type:'complexity',d:1,p:'tree',title:'Any traversal',code:`def visit_all(node):
    if node is None:
        return
    print(node.val)
    visit_all(node.left)
    visit_all(node.right)`,a:'O(n)',why:'Each node is visited exactly once.'},
{id:'t-c2',type:'complexity',d:2,p:'tree',title:'Recursion stack on a balanced tree',q:'Extra <b>space</b> (call stack) for a DFS on a <b>balanced</b> tree of n nodes?',code:`def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))`,a:'O(log n)',why:'The stack is as deep as the tree is tall: log n for a balanced tree, but n for a tree shaped like a line.'},
{id:'t-c3',type:'complexity',d:2,p:'bfs',title:'Queue size in BFS',q:'Extra <b>space</b> for level-order traversal of a complete tree with n nodes?',code:`queue = deque([root])
while queue:
    node = queue.popleft()
    if node.left: queue.append(node.left)
    if node.right: queue.append(node.right)`,a:'O(n)',why:'The last level of a complete tree holds about n/2 nodes, and they are all in the queue at once.'},
{id:'t-c4',type:'complexity',d:3,p:'tree',title:'Height called from every node',q:'Checking “balanced” by calling height() at every node. Worst case on a line-shaped tree?',code:`def is_balanced(node):
    if node is None:
        return True
    if abs(height(node.left) - height(node.right)) > 1:
        return False
    return is_balanced(node.left) and is_balanced(node.right)`,a:'O(n²)',why:'height() is O(size of subtree) and is called for every node. Return height and balance together in one pass for O(n).'},
{id:'t-m1',type:'mcq',d:1,p:'tree',title:'Leaf',q:'A leaf is a node that…',opts:['Is the root','Has no children','Has exactly one child','Has no parent'],a:1,why:'Leaves are the ends of the branches.'},
{id:'t-m2',type:'mcq',d:1,p:'tree',title:'Depth vs height',q:'Which is correct?',opts:['Depth is measured from the node down; height from the root','Depth = edges from the root down to the node; height = levels from the node down to its deepest leaf','They are the same','Depth only applies to leaves'],a:1,why:'Depth looks up toward the root, height looks down toward the leaves.'},
{id:'t-m3',type:'mcq',d:2,p:'tree',title:'How many nodes fit?',q:'A binary tree with h levels holds at most…',opts:['h nodes','2h nodes','2ʰ − 1 nodes','h² nodes'],a:2,why:'1 + 2 + 4 + … + 2ʰ⁻¹ = 2ʰ − 1. So a tree with n nodes needs at least about log₂ n levels.'},
{id:'t-m4',type:'mcq',d:1,p:'tree',title:'Edges in a tree',q:'A tree with n nodes has how many edges?',opts:['n','n − 1','2n','n / 2'],a:1,why:'Every node except the root has exactly one edge up to its parent.'},
{id:'t-m5',type:'mcq',d:2,p:'tree',title:'Which order?',q:'To delete a whole tree safely (children before their parent), which traversal visits nodes in the right order?',opts:['Preorder','Inorder','Postorder','Level order'],a:2,why:'Postorder finishes both subtrees before the node. Preorder suits copying a tree; inorder gives sorted order for a BST.'},
{id:'t-m6',type:'mcq',d:1,p:'bfs',title:'Level by level',q:'To print a tree one level at a time, use…',opts:['A stack (DFS)','A queue (BFS)','Sorting','A hash map'],a:1,why:'Nodes discovered first are processed first, so a whole level finishes before the next starts.'},
{id:'t-ch1',type:'choose',d:1,p:'tree',title:'Folders and files',q:'Which structure naturally models folders that contain files and other folders?',opts:['A list','A tree','A queue','A set'],a:1,why:'Each folder has one parent and any number of children: a tree.'},
{id:'t-ch2',type:'choose',d:2,p:'bfs',title:'Closest leaf to the root',q:'You need the shallowest leaf (smallest depth). Which traversal stops earliest?',opts:['Preorder DFS','Postorder DFS','Level order BFS','Inorder'],a:2,why:'BFS reaches depth 1, then 2, …: the first leaf it meets is the shallowest, so it can stop immediately.'},
{id:'t-dr1',type:'dryrun',d:2,p:'bfs',prelude:T,title:'Level order with a queue',code:`root = build_tree([1, 2, 3, 4, 5])
queue = deque([root])
order = []
while queue:
    node = queue.popleft()
    order.append(node.val)
    if node.left:
        queue.append(node.left)
    if node.right:
        queue.append(node.right)`,cols:['order','[n.val for n in queue]'],rows:[['[1]','[2, 3]'],['[1, 2]','[3, 4, 5]'],['[1, 2, 3]','[4, 5]'],['[1, 2, 3, 4]','[5]'],['[1, 2, 3, 4, 5]','[]']],why:'Children join the back of the queue, so a level is finished before the next one starts.'},
{id:'t-dr2',type:'dryrun',d:2,p:'dfs',prelude:T,title:'Iterative preorder with a stack',code:`root = build_tree([1, 2, 3, 4, 5])
stack = [root]
order = []
while stack:
    node = stack.pop()
    order.append(node.val)
    if node.right:
        stack.append(node.right)
    if node.left:
        stack.append(node.left)`,cols:['order','[n.val for n in stack]'],rows:[['[1]','[3, 2]'],['[1, 2]','[3, 5, 4]'],['[1, 2, 4]','[3, 5]'],['[1, 2, 4, 5]','[3]'],['[1, 2, 4, 5, 3]','[]']],why:'Push right first so that left is popped first: that gives preorder.'},
{id:'t-b1',type:'blanks',d:1,p:'tree',prelude:T,title:'Complete max_depth',code:`def max_depth(root):
    if ______:
        return 0
    return 1 + ______`,blanks:[['root is None','not root','root == None'],['max(max_depth(root.left), max_depth(root.right))']],tests:[['max_depth(build_tree([3, 9, 20, None, None, 15, 7]))','3'],['max_depth(build_tree([]))','0'],['max_depth(build_tree([1, None, 2]))','2']],why:'An empty tree has depth 0; otherwise one more than the deeper subtree.'},
{id:'t-b2',type:'blanks',d:1,p:'tree',prelude:T,title:'Complete inorder',code:`def inorder(root):
    if root is None:
        return []
    return ______ + [root.val] + ______`,blanks:[['inorder(root.left)'],['inorder(root.right)']],tests:[['inorder(build_tree([1, 2, 3, 4, 5]))','[4, 2, 5, 1, 3]'],['inorder(build_tree([]))','[]']],why:'Left, root, right.'},
{id:'t-b3',type:'blanks',d:2,p:'bfs',prelude:T,title:'Complete level order (by levels)',code:`def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(______):
            node = queue.popleft()
            level.append(node.val)
            for child in (node.left, node.right):
                if child:
                    ______
        result.append(level)
    return result`,blanks:[['len(queue)'],['queue.append(child)']],tests:[['level_order(build_tree([3, 9, 20, None, None, 15, 7]))','[[3], [9, 20], [15, 7]]'],['level_order(build_tree([]))','[]']],why:'At the start of each round the queue holds exactly one level: process len(queue) nodes.'},
{id:'t-b4',type:'blanks',d:1,p:'tree',prelude:T,title:'Complete invert_tree',code:`def invert_tree(root):
    if root is None:
        return None
    root.left, root.right = ______, ______
    return root`,blanks:[['invert_tree(root.right)'],['invert_tree(root.left)']],tests:[['tree_to_list(invert_tree(build_tree([4, 2, 7, 1, 3, 6, 9])))','[4, 7, 2, 9, 6, 3, 1]']],why:'Invert both subtrees and swap them.'},
{id:'t-d1',type:'debug',d:1,p:'tree',prelude:T,title:'Crash at the bottom',code:`def max_depth(root):
    return 1 + max(max_depth(root.left), max_depth(root.right))`,opts:['max should be min','There is no base case: when root is None, root.left raises AttributeError','It should add 2','It needs a queue'],a:1,why:'Every tree recursion must handle None first.',fix:`def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,tests:[['max_depth(build_tree([1, 2]))','2']]},
{id:'t-d2',type:'debug',d:1,p:'tree',prelude:T,title:'Counting nodes, minus some',code:`def count(root):
    if root is None:
        return 0
    return count(root.left) + count(root.right)`,opts:['The base case should return 1','It never counts the node itself: add 1','It counts nodes twice','It should use BFS'],a:1,why:'It always returns 0.',fix:`def count(root):
    if root is None:
        return 0
    return 1 + count(root.left) + count(root.right)`,tests:[['count(build_tree([1, 2, 3]))','3'],['count(build_tree([]))','0']]},
{id:'t-d3',type:'debug',d:1,p:'bfs',prelude:T,title:'Level order out of order',code:`def level_order(root):
    out, todo = [], [root]
    while todo:
        node = todo.pop()
        out.append(node.val)
        if node.left:
            todo.append(node.left)
        if node.right:
            todo.append(node.right)
    return out`,opts:['It skips the root','list.pop() takes the NEWEST item (a stack), so it explores depth-first instead of level by level','left and right are swapped','It should use recursion'],a:1,why:'Use a deque and popleft() for first-in, first-out.',fix:`def level_order(root):
    out, todo = [], deque([root])
    while todo:
        node = todo.popleft()
        out.append(node.val)
        if node.left:
            todo.append(node.left)
        if node.right:
            todo.append(node.right)
    return out`,tests:[['level_order(build_tree([1, 2, 3, 4, 5]))','[1, 2, 3, 4, 5]']]},
{id:'t-d4',type:'debug',d:2,p:'tree',prelude:T,title:'Path sum that is not a path',code:`def has_path_sum(root, target):
    if root is None:
        return target == 0
    target -= root.val
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)`,opts:['It subtracts in the wrong order','It checks the sum at None, so it accepts a path that stops at a node which still has a child (not a leaf)','or should be and','target should be global'],a:1,why:'For tree [1, 2] and target 1 it returns True via 1’s missing right child, but the only root-to-leaf path is 1 → 2. Check at leaves.',fix:`def has_path_sum(root, target):
    if root is None:
        return False
    target -= root.val
    if root.left is None and root.right is None:
        return target == 0
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)`,tests:[['has_path_sum(build_tree([1, 2]), 1)','False'],['has_path_sum(build_tree([1, 2]), 3)','True'],['has_path_sum(build_tree([]), 0)','False']]},

/* ---------- code ---------- */
{id:'t-preorder',type:'code',d:1,p:'dfs',prelude:T,title:'Preorder Traversal',prompt:'<p>Return the preorder traversal (root, left, right) as a list.</p>',starter:`def preorder(root):
    pass`,solution:`def preorder(root):
    if root is None:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)`,tests:[['preorder(build_tree([1, None, 2, 3]))','[1, 2, 3]'],['preorder(build_tree([1, 2, 3, 4, 5]))','[1, 2, 4, 5, 3]'],['preorder(build_tree([]))','[]']],hints:['Handle None, then combine: node, left result, right result.'],approach:'Recursive DFS (or an explicit stack).',cx:'O(n)'},
{id:'t-inorder',type:'code',d:1,p:'dfs',prelude:T,title:'Inorder Traversal',prompt:'<p>Return the inorder traversal (left, root, right). Bonus: do it without recursion, using a stack.</p>',starter:`def inorder(root):
    pass`,solution:`def inorder(root):
    out, stack, node = [], [], root
    while stack or node:
        while node:                  # go as far left as possible
            stack.append(node)
            node = node.left
        node = stack.pop()
        out.append(node.val)
        node = node.right
    return out`,tests:[['inorder(build_tree([1, None, 2, 3]))','[1, 3, 2]'],['inorder(build_tree([1, 2, 3, 4, 5]))','[4, 2, 5, 1, 3]'],['inorder(build_tree([]))','[]']],hints:['Recursive version: left list + [val] + right list.','Iterative: push nodes while going left; pop one, visit it, then go to its right child.'],approach:'Recursion, or a stack simulating it.',cx:'O(n)'},
{id:'t-postorder',type:'code',d:1,p:'dfs',prelude:T,title:'Postorder Traversal',prompt:'<p>Return the postorder traversal (left, right, root).</p>',starter:`def postorder(root):
    pass`,solution:`def postorder(root):
    if root is None:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]`,tests:[['postorder(build_tree([1, None, 2, 3]))','[3, 2, 1]'],['postorder(build_tree([1, 2, 3, 4, 5]))','[4, 5, 2, 3, 1]'],['postorder(build_tree([]))','[]']],hints:['Same shape as preorder, with the node last.'],approach:'Recursive DFS.',cx:'O(n)'},
{id:'t-level-order',type:'code',d:2,p:'bfs',prelude:T,title:'Level Order Traversal',prompt:'<p>Return the values level by level, as a list of lists.</p><p><code>[3, 9, 20, None, None, 15, 7]</code> → <code>[[3], [9, 20], [15, 7]]</code></p>',starter:`def level_order(root):
    pass`,solution:`def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,tests:[['level_order(build_tree([3, 9, 20, None, None, 15, 7]))','[[3], [9, 20], [15, 7]]'],['level_order(build_tree([1]))','[[1]]'],['level_order(build_tree([]))','[]']],hints:['BFS with a queue (deque is available).','Process exactly len(queue) nodes per round: that is one level.'],approach:'BFS, one level per round.',cx:'O(n)'},
{id:'t-max-depth',type:'code',d:1,p:'tree',prelude:T,title:'Maximum Depth',prompt:'<p>Return the number of nodes on the longest root-to-leaf path.</p>',starter:`def max_depth(root):
    pass`,solution:`def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,tests:[['max_depth(build_tree([3, 9, 20, None, None, 15, 7]))','3'],['max_depth(build_tree([1, None, 2]))','2'],['max_depth(build_tree([]))','0']],hints:['An empty tree has depth 0.'],approach:'1 + the deeper subtree.',cx:'O(n)'},
{id:'t-min-depth',type:'code',d:1,p:'bfs',prelude:T,title:'Minimum Depth',prompt:'<p>Return the number of nodes on the shortest path from the root to a <b>leaf</b>.</p>',starter:`def min_depth(root):
    pass`,solution:`def min_depth(root):
    if not root:
        return 0
    queue = deque([(root, 1)])
    while queue:
        node, d = queue.popleft()
        if not node.left and not node.right:
            return d                      # first leaf found by BFS is the shallowest
        for child in (node.left, node.right):
            if child:
                queue.append((child, d + 1))`,tests:[['min_depth(build_tree([3, 9, 20, None, None, 15, 7]))','2'],['min_depth(build_tree([2, None, 3, None, 4, None, 5, None, 6]))','5'],['min_depth(build_tree([]))','0']],hints:['Careful: a node with one child is not a leaf, so min(left, right) of a missing side is wrong.','BFS can stop at the first leaf it sees.'],approach:'BFS to the first leaf.',cx:'O(n)'},
{id:'t-count',type:'code',d:1,p:'tree',prelude:T,title:'Count Nodes',prompt:'<p>Return the number of nodes in the tree.</p>',starter:`def count_nodes(root):
    pass`,solution:`def count_nodes(root):
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)`,tests:[['count_nodes(build_tree([1, 2, 3, 4, 5, 6]))','6'],['count_nodes(build_tree([]))','0']],hints:['1 for this node plus the counts of both subtrees.'],approach:'Tree recursion.',cx:'O(n)'},
{id:'t-leaves',type:'code',d:1,p:'tree',prelude:T,title:'Sum of Leaves',prompt:'<p>Return the sum of the values of all leaves.</p>',starter:`def leaf_sum(root):
    pass`,solution:`def leaf_sum(root):
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return root.val
    return leaf_sum(root.left) + leaf_sum(root.right)`,tests:[['leaf_sum(build_tree([1, 2, 3, 4, 5]))','12'],['leaf_sum(build_tree([7]))','7'],['leaf_sum(build_tree([]))','0']],hints:['Two base cases: None (0) and a leaf (its value).'],approach:'Recursion with a leaf check.',cx:'O(n)'},
{id:'t-invert',type:'code',d:1,p:'tree',prelude:T,title:'Invert Binary Tree',prompt:'<p>Mirror the tree (swap every left and right child) and return its root.</p>',starter:`def invert_tree(root):
    pass`,solution:`def invert_tree(root):
    if root:
        root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,tests:[['tree_to_list(invert_tree(build_tree([4, 2, 7, 1, 3, 6, 9])))','[4, 7, 2, 9, 6, 3, 1]'],['tree_to_list(invert_tree(build_tree([2, 1, 3])))','[2, 3, 1]'],['tree_to_list(invert_tree(build_tree([])))','[]']],hints:['Invert each subtree, then swap them.'],approach:'Recursive swap.',cx:'O(n)'},
{id:'t-same',type:'code',d:1,p:'tree',prelude:T,title:'Same Tree',prompt:'<p>Return True if two trees have the same shape and values.</p>',starter:`def is_same(p, q):
    pass`,solution:`def is_same(p, q):
    if p is None or q is None:
        return p is q
    return p.val == q.val and is_same(p.left, q.left) and is_same(p.right, q.right)`,tests:[['is_same(build_tree([1, 2, 3]), build_tree([1, 2, 3]))','True'],['is_same(build_tree([1, 2]), build_tree([1, None, 2]))','False'],['is_same(build_tree([]), build_tree([]))','True']],hints:['Both None → True; exactly one None → False.'],approach:'Compare roots, then both pairs of subtrees.',cx:'O(n)'},
{id:'t-symmetric',type:'code',d:1,p:'tree',prelude:T,title:'Symmetric Tree',prompt:'<p>Return True if the tree is a mirror of itself.</p>',starter:`def is_symmetric(root):
    pass`,solution:`def is_symmetric(root):
    def mirror(a, b):
        if a is None or b is None:
            return a is b
        return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)
    return mirror(root, root)`,tests:[['is_symmetric(build_tree([1, 2, 2, 3, 4, 4, 3]))','True'],['is_symmetric(build_tree([1, 2, 2, None, 3, None, 3]))','False'],['is_symmetric(build_tree([]))','True']],hints:['Compare two trees that should be mirror images: left with right, outer with outer, inner with inner.'],approach:'Mirror comparison helper.',cx:'O(n)'},
{id:'t-path-sum',type:'code',d:1,p:'dfs',prelude:T,title:'Path Sum',prompt:'<p>Return True if some root-to-<b>leaf</b> path adds up to target.</p>',starter:`def has_path_sum(root, target):
    pass`,solution:`def has_path_sum(root, target):
    if root is None:
        return False
    target -= root.val
    if root.left is None and root.right is None:
        return target == 0
    return has_path_sum(root.left, target) or has_path_sum(root.right, target)`,tests:[['has_path_sum(build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1]), 22)','True'],['has_path_sum(build_tree([1, 2, 3]), 5)','False'],['has_path_sum(build_tree([1, 2]), 1)','False'],['has_path_sum(build_tree([]), 0)','False']],hints:['Subtract the node’s value and pass the remainder down.','Only check the remainder at a leaf.'],approach:'DFS carrying the remaining sum.',cx:'O(n)'},
{id:'t-paths',type:'code',d:2,p:'backtracking',prelude:T,title:'All Root-to-Leaf Paths',prompt:'<p>Return every root-to-leaf path as a string like <code>"1->2->5"</code>, left to right.</p>',starter:`def binary_tree_paths(root):
    pass`,solution:`def binary_tree_paths(root):
    out = []
    def dfs(node, path):
        if node is None:
            return
        path = path + [str(node.val)]
        if node.left is None and node.right is None:
            out.append("->".join(path))
        dfs(node.left, path)
        dfs(node.right, path)
    dfs(root, [])
    return out`,tests:[['binary_tree_paths(build_tree([1, 2, 3, None, 5]))','["1->2->5", "1->3"]'],['binary_tree_paths(build_tree([1]))','["1"]'],['binary_tree_paths(build_tree([]))','[]']],hints:['Carry the path so far down the recursion; record it at leaves.'],approach:'DFS with the current path.',cx:'O(n · h)'},
{id:'t-avg-levels',type:'code',d:1,p:'bfs',prelude:T,title:'Average of Levels',prompt:'<p>Return the average value of each level, top to bottom.</p>',starter:`def average_of_levels(root):
    pass`,solution:`def average_of_levels(root):
    out, queue = [], deque([root]) if root else deque()
    while queue:
        size, total = len(queue), 0
        for _ in range(size):
            node = queue.popleft()
            total += node.val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        out.append(total / size)
    return out`,tests:[['average_of_levels(build_tree([3, 9, 20, None, None, 15, 7]))','[3.0, 14.5, 11.0]'],['average_of_levels(build_tree([]))','[]']],hints:['Level-order BFS, summing each level.'],approach:'BFS by levels.',cx:'O(n)'},
{id:'t-diameter',type:'code',d:2,p:'tree',prelude:T,title:'Diameter of a Binary Tree',prompt:'<p>Return the number of <b>edges</b> on the longest path between any two nodes (it need not pass through the root).</p>',starter:`def diameter(root):
    pass`,solution:`def diameter(root):
    best = 0
    def height(node):
        nonlocal best
        if node is None:
            return 0
        left, right = height(node.left), height(node.right)
        best = max(best, left + right)      # longest path bending at this node
        return 1 + max(left, right)
    height(root)
    return best`,tests:[['diameter(build_tree([1, 2, 3, 4, 5]))','3'],['diameter(build_tree([1, 2]))','1'],['diameter(build_tree([]))','0'],['diameter(build_tree([1, 2, None, 3, 4, 5, None, None, 6]))','4']],hints:['The longest path bends at some node: left height + right height.','Compute heights bottom-up and update a best value as you go: one pass.'],approach:'Postorder heights + a running maximum.',cx:'O(n)'},
{id:'t-balanced',type:'code',d:2,p:'tree',prelude:T,title:'Balanced Binary Tree',prompt:'<p>A tree is height-balanced if, at every node, the subtree heights differ by at most 1. Check it in O(n).</p>',starter:`def is_balanced(root):
    pass`,solution:`def is_balanced(root):
    def check(node):                     # height, or -1 if unbalanced
        if node is None:
            return 0
        left = check(node.left)
        if left == -1:
            return -1
        right = check(node.right)
        if right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return check(root) != -1`,tests:[['is_balanced(build_tree([3, 9, 20, None, None, 15, 7]))','True'],['is_balanced(build_tree([1, 2, 2, 3, 3, None, None, 4, 4]))','False'],['is_balanced(build_tree([]))','True'],['is_balanced(build_tree([1, None, 2, None, 3]))','False']],hints:['Calling height() at every node is O(n²).','Return the height and the verdict together; use −1 to mean “not balanced”.'],approach:'One postorder pass returning height or −1.',cx:'O(n)'},
{id:'t-right-view',type:'code',d:2,p:'bfs',prelude:T,title:'Right Side View',prompt:'<p>Return the values you would see standing on the right of the tree, top to bottom.</p>',starter:`def right_side_view(root):
    pass`,solution:`def right_side_view(root):
    out, queue = [], deque([root]) if root else deque()
    while queue:
        for i in range(len(queue)):
            node = queue.popleft()
            if i == 0:
                out.append(node.val)          # we enqueue right child first
            if node.right:
                queue.append(node.right)
            if node.left:
                queue.append(node.left)
    return out`,tests:[['right_side_view(build_tree([1, 2, 3, None, 5, None, 4]))','[1, 3, 4]'],['right_side_view(build_tree([1, 2, 3, 4]))','[1, 3, 4]'],['right_side_view(build_tree([]))','[]']],hints:['The visible node of each level is its rightmost node.','BFS by levels; take the last node of each level (or the first, if you enqueue right before left).'],approach:'BFS by levels.',cx:'O(n)'},
{id:'t-zigzag',type:'code',d:2,p:'bfs',prelude:T,title:'Zigzag Level Order',prompt:'<p>Level order, but alternate direction each level: left→right, then right→left, …</p>',starter:`def zigzag(root):
    pass`,solution:`def zigzag(root):
    out, queue, left_to_right = [], deque([root]) if root else deque(), True
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        out.append(level if left_to_right else level[::-1])
        left_to_right = not left_to_right
    return out`,tests:[['zigzag(build_tree([3, 9, 20, None, None, 15, 7]))','[[3], [20, 9], [15, 7]]'],['zigzag(build_tree([1, 2, 3, 4, 5, 6, 7]))','[[1], [3, 2], [4, 5, 6, 7]]'],['zigzag(build_tree([]))','[]']],hints:['Normal level order, then reverse every other level.'],approach:'BFS by levels + a direction flag.',cx:'O(n)'},
{id:'t-subtree',type:'code',d:2,p:'tree',prelude:T,title:'Subtree of Another Tree',prompt:'<p>Return True if <code>sub</code> appears in <code>root</code> as a node together with all its descendants.</p>',starter:`def is_subtree(root, sub):
    pass`,solution:`def is_subtree(root, sub):
    def same(a, b):
        if a is None or b is None:
            return a is b
        return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)
    if root is None:
        return sub is None
    return same(root, sub) or is_subtree(root.left, sub) or is_subtree(root.right, sub)`,tests:[['is_subtree(build_tree([3, 4, 5, 1, 2]), build_tree([4, 1, 2]))','True'],['is_subtree(build_tree([3, 4, 5, 1, 2, None, None, None, None, 0]), build_tree([4, 1, 2]))','False'],['is_subtree(build_tree([1, 1]), build_tree([1]))','True']],hints:['At every node of root, ask: is the tree starting here the same as sub?'],approach:'Same-tree check at every node.',cx:'O(n · m)'},
{id:'t-lca',type:'code',d:2,p:'tree',prelude:T,title:'Lowest Common Ancestor',prompt:'<p>Values are distinct. Return the value of the lowest node that has both p and q as descendants (a node counts as its own descendant).</p>',starter:`def lca(root, p, q):
    pass`,solution:`def lca(root, p, q):
    def go(node):
        if node is None or node.val in (p, q):
            return node
        left, right = go(node.left), go(node.right)
        if left and right:
            return node              # p and q are on different sides
        return left or right
    return go(root).val`,tests:[['lca(build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]), 5, 1)','3'],['lca(build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]), 5, 4)','5'],['lca(build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4]), 6, 4)','5'],['lca(build_tree([1, 2]), 1, 2)','1']],hints:['Let each subtree report whether it contains p or q.','If p is found in the left subtree and q in the right, the current node is the answer.'],approach:'Postorder: return the found node upward; the first node with hits on both sides is the LCA.',cx:'O(n)'},
{id:'t-max-path',type:'code',d:3,p:'tree',prelude:T,title:'Maximum Path Sum',prompt:'<p>A path is any sequence of connected nodes (it does not need to pass through the root). Return the maximum sum of a non-empty path.</p>',starter:`def max_path_sum(root):
    pass`,solution:`def max_path_sum(root):
    best = float("-inf")
    def gain(node):                      # best downward path starting at node
        nonlocal best
        if node is None:
            return 0
        left = max(gain(node.left), 0)   # ignore negative branches
        right = max(gain(node.right), 0)
        best = max(best, node.val + left + right)
        return node.val + max(left, right)
    gain(root)
    return best`,tests:[['max_path_sum(build_tree([1, 2, 3]))','6'],['max_path_sum(build_tree([-10, 9, 20, None, None, 15, 7]))','42'],['max_path_sum(build_tree([-3]))','-3'],['max_path_sum(build_tree([2, -1]))','2']],hints:['Like the diameter: the best path bends at some node, using its best left and right downward branches.','A branch with a negative sum is better left out: max(gain, 0).'],approach:'Postorder gains + global best.',cx:'O(n)'},
{id:'t-build',type:'code',d:3,p:'divide-conquer',prelude:T,title:'Build Tree From Preorder and Inorder',prompt:'<p>Values are distinct. Rebuild the tree from its preorder and inorder traversals.</p>',starter:`def build_from(preorder, inorder):
    pass`,solution:`def build_from(preorder, inorder):
    pos = {v: i for i, v in enumerate(inorder)}
    it = iter(preorder)
    def make(lo, hi):                    # build from inorder[lo..hi]
        if lo > hi:
            return None
        val = next(it)                   # preorder gives roots in order
        node = TreeNode(val)
        node.left = make(lo, pos[val] - 1)
        node.right = make(pos[val] + 1, hi)
        return node
    return make(0, len(inorder) - 1)`,tests:[['tree_to_list(build_from([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))','[3, 9, 20, None, None, 15, 7]'],['tree_to_list(build_from([1, 2], [2, 1]))','[1, 2]'],['tree_to_list(build_from([], []))','[]']],hints:['The first preorder value is the root. Find it in inorder: everything left of it is the left subtree.','A dict from value to inorder index makes each split O(1).'],approach:'Recursive split using preorder roots and inorder positions.',cx:'O(n)'},
{id:'t-serialize',type:'code',d:3,p:'design',prelude:T,title:'Serialize and Deserialize',prompt:'<p>Write <code>serialize(root)</code> → string and <code>deserialize(s)</code> → tree, so that deserialize(serialize(t)) rebuilds t exactly.</p>',starter:`def serialize(root):
    pass

def deserialize(s):
    pass`,solution:`def serialize(root):
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
    return go()`,post:`def _round(vals):
    return tree_to_list(deserialize(serialize(build_tree(vals))))`,tests:[['_round([1, 2, 3, None, None, 4, 5])','[1, 2, 3, None, None, 4, 5]'],['_round([])','[]'],['_round([-1, 0, None, 7])','[-1, 0, None, 7]'],['isinstance(serialize(build_tree([1])), str)','True']],hints:['Preorder alone is ambiguous… unless you also record where the None children are.','Write "#" for None; deserialize by reading values in the same preorder.'],approach:'Preorder with null markers.',cx:'O(n)'}
]);
})();
