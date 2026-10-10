/* Topic 13 · Binary search trees. */
(function(){
const T='tree';
const INS=`def insert(root, v):
    if root is None:
        return TreeNode(v)
    if v < root.val:
        root.left = insert(root.left, v)
    else:
        root.right = insert(root.right, v)
    return root
`;
const CHECK=`def _inorder(n):
    return _inorder(n.left) + [n.val] + _inorder(n.right) if n else []
def _valid(n, lo=float("-inf"), hi=float("inf")):
    return n is None or (lo < n.val < hi and _valid(n.left, lo, n.val) and _valid(n.right, n.val, hi))
def _height(n):
    return 1 + max(_height(n.left), _height(n.right)) if n else 0
`;
COURSE.qs('bst',[
{id:'bst-p1',type:'predict',d:1,p:'bst',prelude:T,title:'Insert, then inorder',code:INS+`
def inorder(n):
    return inorder(n.left) + [n.val] + inorder(n.right) if n else []

root = None
for v in [5, 3, 8, 1, 4]:
    root = insert(root, v)
print(inorder(root))`,a:'[1, 3, 4, 5, 8]',why:'Inorder traversal of any BST is sorted, whatever the insertion order.'},
{id:'bst-p2',type:'predict',d:2,p:'bst',prelude:T,title:'Inserting sorted data',code:INS+`
root = None
for v in [1, 2, 3]:
    root = insert(root, v)
print(tree_to_list(root))`,a:'[1, None, 2, None, 3]',why:'Each value is bigger than all previous ones, so it always goes right: the tree degenerates into a line (height n).'},
{id:'bst-p3',type:'predict',d:1,p:'bst',prelude:T,title:'The search path',code:`root = build_tree([8, 4, 12, 2, 6, 10, 14])
path, node = [], root
while node:
    path.append(node.val)
    if node.val == 6:
        break
    node = node.left if 6 < node.val else node.right
print(path)`,a:'[8, 4, 6]',why:'6 < 8 → left to 4; 6 > 4 → right to 6. Only one path is visited.'},
{id:'bst-p4',type:'predict',d:1,p:'bst',prelude:T,title:'Smallest value',code:`node = build_tree([8, 4, 12, 2, 6, 10, 14])
while node.left:
    node = node.left
print(node.val)`,a:'2',why:'The minimum of a BST is its leftmost node.'},
{id:'bst-p5',type:'predict',d:2,p:'bst',prelude:T,title:'In-order successor',code:`def successor(root, x):
    best = None
    while root:
        if root.val > x:
            best = root.val
            root = root.left
        else:
            root = root.right
    return best

print(successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 6))`,a:'8',why:'The next larger value. Going left keeps the best candidate; going right skips values ≤ 6.'},
{id:'bst-c1',type:'complexity',d:1,p:'bst',title:'Search in a balanced BST',code:`while node and node.val != target:
    node = node.left if target < node.val else node.right`,a:'O(log n)',why:'Each step goes down one level; a balanced tree has about log n levels.'},
{id:'bst-c2',type:'complexity',d:2,p:'bst',title:'Search in a skewed BST',q:'Same search, but the tree was built by inserting 1, 2, 3, …, n in order. Worst case?',code:`while node and node.val != target:
    node = node.left if target < node.val else node.right`,a:'O(n)',why:'The tree is a line of height n. Self-balancing trees (AVL, red-black) keep the height O(log n).'},
{id:'bst-c3',type:'complexity',d:2,p:'bst',title:'Building from sorted input',q:'Inserting n already-sorted values one by one into a plain BST. Total time?',code:`root = None
for v in sorted_values:
    root = insert(root, v)`,a:'O(n²)',why:'Each insert walks the whole growing line: 1 + 2 + … + n.'},
{id:'bst-c4',type:'complexity',d:1,p:'bst',title:'Sorted output',code:`def inorder(node, out):
    if node:
        inorder(node.left, out)
        out.append(node.val)
        inorder(node.right, out)`,a:'O(n)',why:'Each node once; the BST is already “sorted” by its shape.'},
{id:'bst-m1',type:'mcq',d:1,p:'bst',title:'The BST property',q:'In a BST, which must be true for EVERY node?',opts:['Its left child is smaller and its right child is larger','Every value in its left subtree is smaller and every value in its right subtree is larger','It has two children','The tree is balanced'],a:1,why:'Checking only direct children is a classic bug: a deeper node can still violate the property.'},
{id:'bst-m2',type:'mcq',d:1,p:'bst',title:'Sorted for free',q:'Which traversal of a BST visits the values in ascending order?',opts:['Preorder','Inorder','Postorder','Level order'],a:1,why:'Left subtree (smaller), node, right subtree (larger).'},
{id:'bst-m3',type:'mcq',d:2,p:'bst',title:'Deleting a node with two children',q:'How do you delete a node that has two children?',opts:['Delete both subtrees too','Replace its value with its in-order successor (smallest in the right subtree), then delete that successor','Move the left child up and drop the right subtree','It cannot be deleted'],a:1,why:'The successor has at most one child, so removing it is easy, and the order is preserved.'},
{id:'bst-m4',type:'mcq',d:2,p:'bst',title:'Why balanced trees?',q:'Why do libraries use self-balancing BSTs (AVL, red-black)?',opts:['They use less memory','They guarantee O(log n) height no matter the insertion order','They are easier to write','They allow duplicates'],a:1,why:'A plain BST can degenerate into a linked list.'},
{id:'bst-m5',type:'mcq',d:2,p:'bst',title:'BST vs hash table',q:'What can a BST do that a hash table (dict) cannot do efficiently?',opts:['Exact lookups','Ordered queries: min, max, next larger key, all keys in a range, sorted iteration','Insert keys','Store values'],a:1,why:'A dict has O(1) exact lookups but no order between keys.'},
{id:'bst-ch1',type:'choose',d:2,p:'bst',title:'Leaderboard',q:'Scores are inserted and removed all day, and you often need “all players with scores between 50 and 70”.',opts:['dict','Balanced BST (sorted structure)','Queue','Stack'],a:1,why:'Range queries need order.'},
{id:'bst-ch2',type:'choose',d:1,p:'hashing',title:'Exact lookups only',q:'You only ever ask “is this username taken?”.',opts:['Balanced BST','Set / dict','Sorted list with insert','Heap'],a:1,why:'O(1) average beats O(log n) when order does not matter.'},
{id:'bst-dr1',type:'dryrun',d:1,p:'bst',prelude:T,title:'Searching for 6',code:`root = build_tree([8, 4, 12, 2, 6, 10, 14])
target = 6
node = root
while node and node.val != target:
    if target < node.val:
        node = node.left
    else:
        node = node.right`,cols:['node.val'],rows:[['4'],['6']],why:'Two moves: left (6 < 8), then right (6 > 4).'},
{id:'bst-dr2',type:'dryrun',d:1,p:'bst',prelude:T,title:'Walking to the minimum',code:`node = build_tree([8, 4, 12, 2, 6, 10, 14])
while node.left:
    node = node.left`,cols:['node.val'],rows:[['4'],['2']],why:'Keep going left until there is no left child.'},
{id:'bst-b1',type:'blanks',d:1,p:'bst',prelude:T,title:'Complete search',code:`def search(root, target):
    if root is None or root.val == target:
        return root
    if target < root.val:
        return search(______, target)
    return search(______, target)`,blanks:[['root.left'],['root.right']],tests:[['search(build_tree([4, 2, 7, 1, 3]), 2).val','2'],['search(build_tree([4, 2, 7, 1, 3]), 5)','None']],why:'Smaller targets can only be on the left.'},
{id:'bst-b2',type:'blanks',d:1,p:'bst',prelude:T,title:'Complete insert',code:`def insert(root, v):
    if root is None:
        return ______
    if v < root.val:
        root.left = ______
    else:
        root.right = insert(root.right, v)
    return root`,blanks:[['TreeNode(v)'],['insert(root.left, v)']],tests:[['tree_to_list(insert(build_tree([4, 2, 7]), 5))','[4, 2, 7, None, None, 5]'],['tree_to_list(insert(None, 1))','[1]']],why:'Returning the subtree root lets the parent re-attach it (a new leaf the first time).'},
{id:'bst-b3',type:'blanks',d:2,p:'bst',prelude:T,title:'Complete is_valid_bst',code:`def is_valid_bst(root, lo=float("-inf"), hi=float("inf")):
    if root is None:
        return True
    if not (______):
        return False
    return is_valid_bst(root.left, lo, ______) and is_valid_bst(root.right, ______, hi)`,blanks:[['lo < root.val < hi'],['root.val'],['root.val']],tests:[['is_valid_bst(build_tree([2, 1, 3]))','True'],['is_valid_bst(build_tree([5, 4, 6, None, None, 3, 7]))','False']],why:'Each node must lie inside the range allowed by ALL its ancestors.'},
{id:'bst-d1',type:'debug',d:2,p:'bst',prelude:T,title:'Only checking the children',code:`def is_valid_bst(root):
    if root is None:
        return True
    if root.left and root.left.val >= root.val:
        return False
    if root.right and root.right.val <= root.val:
        return False
    return is_valid_bst(root.left) and is_valid_bst(root.right)`,opts:['It allows duplicates','It only compares each node with its direct children, so [5, 4, 6, None, None, 3, 7] passes although 3 sits in 5’s right subtree','It should use BFS','The base case is wrong'],a:1,why:'Pass the allowed (low, high) range down the recursion.',fix:`def is_valid_bst(root, lo=float("-inf"), hi=float("inf")):
    if root is None:
        return True
    if not (lo < root.val < hi):
        return False
    return is_valid_bst(root.left, lo, root.val) and is_valid_bst(root.right, root.val, hi)`,tests:[['is_valid_bst(build_tree([5, 4, 6, None, None, 3, 7]))','False'],['is_valid_bst(build_tree([2, 1, 3]))','True']]},
{id:'bst-d2',type:'debug',d:1,p:'bst',prelude:T,title:'The new node vanishes',code:`def insert(root, v):
    if root is None:
        return TreeNode(v)
    if v < root.val:
        insert(root.left, v)
    else:
        insert(root.right, v)
    return root`,opts:['The comparison is reversed','The returned subtree is never attached: write root.left = insert(root.left, v)','TreeNode needs two arguments','It should return None'],a:1,why:'When root.left is None, insert returns a new node… which nobody stores.',fix:`def insert(root, v):
    if root is None:
        return TreeNode(v)
    if v < root.val:
        root.left = insert(root.left, v)
    else:
        root.right = insert(root.right, v)
    return root`,tests:[['tree_to_list(insert(build_tree([4]), 2))','[4, 2]']]},
{id:'bst-d3',type:'debug',d:1,p:'bst',prelude:T,title:'Searching the wrong way',code:`def contains(root, target):
    while root:
        if root.val == target:
            return True
        root = root.right if target < root.val else root.left
    return False`,opts:['The loop should be recursive','Directions are swapped: smaller targets are in the LEFT subtree','It should return root','== should be <='],a:1,why:'contains(build_tree([4, 2, 7]), 2) returns False.',fix:`def contains(root, target):
    while root:
        if root.val == target:
            return True
        root = root.left if target < root.val else root.right
    return False`,tests:[['contains(build_tree([4, 2, 7]), 2)','True'],['contains(build_tree([4, 2, 7]), 7)','True']]},
{id:'bst-search',type:'code',d:1,p:'bst',prelude:T,title:'Search in a BST',prompt:'<p>Return the node with value target (or None). Use the BST property: O(h).</p>',starter:`def search_bst(root, target):
    pass`,solution:`def search_bst(root, target):
    while root and root.val != target:
        root = root.left if target < root.val else root.right
    return root`,tests:[['tree_to_list(search_bst(build_tree([4, 2, 7, 1, 3]), 2))','[2, 1, 3]'],['search_bst(build_tree([4, 2, 7, 1, 3]), 5)','None']],hints:['Compare with the current node and go left or right.'],approach:'Walk one path.',cx:'O(h)'},
{id:'bst-insert',type:'code',d:1,p:'bst',prelude:T,title:'Insert into a BST',prompt:'<p>Insert value v (not already present) and return the root.</p>',starter:`def insert_bst(root, v):
    pass`,solution:`def insert_bst(root, v):
    if root is None:
        return TreeNode(v)
    if v < root.val:
        root.left = insert_bst(root.left, v)
    else:
        root.right = insert_bst(root.right, v)
    return root`,tests:[['tree_to_list(insert_bst(build_tree([4, 2, 7, 1, 3]), 5))','[4, 2, 7, 1, 3, 5]'],['tree_to_list(insert_bst(None, 3))','[3]']],hints:['Walk down to the empty spot where v belongs.'],approach:'Recursive insert returning the subtree root.',cx:'O(h)'},
{id:'bst-validate',type:'code',d:2,p:'bst',prelude:T,title:'Validate a BST',prompt:'<p>Return True if the tree is a valid BST (strictly smaller left, strictly larger right, for all descendants).</p>',starter:`def is_valid_bst(root):
    pass`,solution:`def is_valid_bst(root):
    def ok(node, lo, hi):
        if node is None:
            return True
        if not (lo < node.val < hi):
            return False
        return ok(node.left, lo, node.val) and ok(node.right, node.val, hi)
    return ok(root, float("-inf"), float("inf"))`,tests:[['is_valid_bst(build_tree([2, 1, 3]))','True'],['is_valid_bst(build_tree([5, 1, 4, None, None, 3, 6]))','False'],['is_valid_bst(build_tree([5, 4, 6, None, None, 3, 7]))','False'],['is_valid_bst(build_tree([]))','True'],['is_valid_bst(build_tree([1, 1]))','False']],hints:['Checking only children is not enough.','Pass down the allowed range (low, high); or check that the inorder traversal is strictly increasing.'],approach:'Range checking DFS.',cx:'O(n)'},
{id:'bst-min-max',type:'code',d:1,p:'bst',prelude:T,title:'Minimum and Maximum',prompt:'<p>Return <code>(min, max)</code> of a non-empty BST in O(h).</p>',starter:`def min_max(root):
    pass`,solution:`def min_max(root):
    lo = hi = root
    while lo.left:
        lo = lo.left
    while hi.right:
        hi = hi.right
    return (lo.val, hi.val)`,tests:[['min_max(build_tree([8, 4, 12, 2, 6, 10, 14]))','(2, 14)'],['min_max(build_tree([5]))','(5, 5)']],hints:['Leftmost and rightmost nodes.'],approach:'Walk left; walk right.',cx:'O(h)'},
{id:'bst-range-sum',type:'code',d:1,p:'bst',prelude:T,title:'Range Sum of a BST',prompt:'<p>Return the sum of values in [low, high]. Skip subtrees that cannot contain such values.</p>',starter:`def range_sum(root, low, high):
    pass`,solution:`def range_sum(root, low, high):
    if root is None:
        return 0
    if root.val < low:
        return range_sum(root.right, low, high)    # whole left side is too small
    if root.val > high:
        return range_sum(root.left, low, high)
    return root.val + range_sum(root.left, low, high) + range_sum(root.right, low, high)`,tests:[['range_sum(build_tree([10, 5, 15, 3, 7, None, 18]), 7, 15)','32'],['range_sum(build_tree([10, 5, 15, 3, 7, 13, 18, 1, None, 6]), 6, 10)','23'],['range_sum(build_tree([]), 1, 2)','0']],hints:['If root.val < low, nothing on its left can be in range.'],approach:'DFS with pruning.',cx:'O(n) worst, often much less'},
{id:'bst-kth',type:'code',d:2,p:'bst',prelude:T,title:'Kth Smallest in a BST',prompt:'<p>Return the k-th smallest value (1-based).</p>',starter:`def kth_smallest(root, k):
    pass`,solution:`def kth_smallest(root, k):
    stack, node = [], root
    while True:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right`,tests:[['kth_smallest(build_tree([3, 1, 4, None, 2]), 1)','1'],['kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 3)','3'],['kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 6)','6']],hints:['Inorder visits values in ascending order.','Stop as soon as you have visited k nodes (iterative inorder makes stopping easy).'],approach:'Inorder traversal, stop at the k-th visit.',cx:'O(h + k)'},
{id:'bst-lca',type:'code',d:2,p:'bst',prelude:T,title:'Lowest Common Ancestor in a BST',prompt:'<p>Return the value of the lowest common ancestor of values p and q, using the BST property (no need to search both subtrees).</p>',starter:`def lca_bst(root, p, q):
    pass`,solution:`def lca_bst(root, p, q):
    node = root
    while node:
        if p < node.val and q < node.val:
            node = node.left
        elif p > node.val and q > node.val:
            node = node.right
        else:
            return node.val          # p and q split here (or one of them is here)`,tests:[['lca_bst(build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]), 2, 8)','6'],['lca_bst(build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]), 2, 4)','2'],['lca_bst(build_tree([2, 1]), 2, 1)','2']],hints:['If both values are smaller than the node, the answer is in the left subtree.','The first node where they split (or that equals one of them) is the answer.'],approach:'Walk down until p and q are on different sides.',cx:'O(h)'},
{id:'bst-closest',type:'code',d:1,p:'bst',prelude:T,title:'Closest Value',prompt:'<p>Return the value in the BST closest to a float target (the smaller one on a tie).</p>',starter:`def closest_value(root, target):
    pass`,solution:`def closest_value(root, target):
    best = root.val
    while root:
        if abs(root.val - target) < abs(best - target) or (abs(root.val - target) == abs(best - target) and root.val < best):
            best = root.val
        root = root.left if target < root.val else root.right
    return best`,tests:[['closest_value(build_tree([4, 2, 5, 1, 3]), 3.714286)','4'],['closest_value(build_tree([1]), 4.4)','1'],['closest_value(build_tree([4, 2, 5, 1, 3]), 3.5)','3']],hints:['The closest value lies on the search path for target.'],approach:'Walk the search path, tracking the best.',cx:'O(h)'},
{id:'bst-sorted-to-bst',type:'code',d:2,p:'divide-conquer',prelude:T,post:CHECK,title:'Sorted List to Balanced BST',prompt:'<p>Build a height-balanced BST from a sorted list of distinct numbers.</p>',starter:`def sorted_to_bst(nums):
    pass`,solution:`def sorted_to_bst(nums):
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node = TreeNode(nums[mid])       # the middle becomes the root
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node
    return build(0, len(nums) - 1)`,tests:[['_inorder(sorted_to_bst([-10, -3, 0, 5, 9]))','[-10, -3, 0, 5, 9]','','inorder is the input'],['_height(sorted_to_bst(list(range(1000))))','10','','1,000 values → height 10'],['_valid(sorted_to_bst(list(range(50))))','True','','valid BST'],['sorted_to_bst([])','None']],hints:['Which value should be the root so both sides have the same size?','The middle element, then recurse on each half.'],approach:'Divide and conquer on the middle element.',cx:'O(n)'},
{id:'bst-delete',type:'code',d:2,p:'bst',prelude:T,post:CHECK,title:'Delete Node in a BST',prompt:'<p>Delete the node with value key (if present) and return the root. The result must still be a valid BST.</p>',starter:`def delete_node(root, key):
    pass`,solution:`def delete_node(root, key):
    if root is None:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        succ = root.right
        while succ.left:
            succ = succ.left
        root.val = succ.val
        root.right = delete_node(root.right, succ.val)
    return root`,tests:[['_inorder(delete_node(build_tree([5, 3, 6, 2, 4, None, 7]), 3))','[2, 4, 5, 6, 7]','','delete a node with two children'],['_valid(delete_node(build_tree([5, 3, 6, 2, 4, None, 7]), 5))','True','','delete the root'],['_inorder(delete_node(build_tree([5, 3, 6, 2, 4, None, 7]), 0))','[2, 3, 4, 5, 6, 7]','','key not present'],['delete_node(build_tree([1]), 1)','None','','delete the only node']],hints:['Find the node first, like a search.','Three cases: leaf, one child (return the child), two children (copy the successor, then delete it from the right subtree).'],approach:'Recursive delete with the in-order successor.',cx:'O(h)'},
{id:'bst-two-sum',type:'code',d:2,p:'two-pointers',prelude:T,title:'Two Sum in a BST',prompt:'<p>Return True if two different nodes sum to k.</p>',starter:`def find_target(root, k):
    pass`,solution:`def find_target(root, k):
    vals = []
    def inorder(n):
        if n:
            inorder(n.left)
            vals.append(n.val)
            inorder(n.right)
    inorder(root)                       # sorted values
    i, j = 0, len(vals) - 1
    while i < j:
        s = vals[i] + vals[j]
        if s == k:
            return True
        if s < k:
            i += 1
        else:
            j -= 1
    return False`,tests:[['find_target(build_tree([5, 3, 6, 2, 4, None, 7]), 9)','True'],['find_target(build_tree([5, 3, 6, 2, 4, None, 7]), 28)','False'],['find_target(build_tree([1]), 2)','False']],hints:['Inorder gives a sorted list.','Then it is pair-sum on a sorted array: two pointers (or a set while traversing).'],approach:'Inorder + two pointers.',cx:'O(n)'},
{id:'bst-successor',type:'code',d:2,p:'bst',prelude:T,title:'Inorder Successor',prompt:'<p>Return the smallest value strictly greater than x, or None, in O(h).</p>',starter:`def successor(root, x):
    pass`,solution:`def successor(root, x):
    best = None
    while root:
        if root.val > x:
            best = root.val      # candidate; a smaller one may be on the left
            root = root.left
        else:
            root = root.right
    return best`,tests:[['successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 6)','8'],['successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 8)','10'],['successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 14)','None'],['successor(build_tree([8, 4, 12, 2, 6, 10, 14]), 5)','6']],hints:['Every time you go left, the current node is a candidate.'],approach:'Search path, remembering the last “went left” node.',cx:'O(h)'}
]);
})();
