/* Topic 14 · Binary search trees. */
COURSE.topic({id:'bst',
goal:'Use the BST property to search, insert and delete in O(h), validate a BST correctly, and know why balance matters.',
learn:[
{title:'The BST property',short:'Property',mins:8,lead:'For every node, everything in its left subtree is smaller and everything in its right subtree is larger. That one rule turns every search into a single path from the root.',does:['concept','predict','debug'],blocks:[
 {t:'diagram',text:`
            8
          /   \\
         4     12          all of {2, 4, 6} < 8 < all of {10, 12, 14}
        / \\   /  \\
       2   6 10   14       inorder: 2 4 6 8 10 12 14 (sorted!)`,aria:'A binary search tree with its inorder sequence'},
 {t:'q',ids:['bst-m1','bst-m2','bst-p1','bst-p4']},
 {t:'q',title:'Find the bug',ids:['bst-d1']}]},

{title:'Search and insert',short:'Search + insert',mins:10,lead:'Compare with the current node, go left or right, repeat. Insert walks the same path and attaches a new leaf where the search fell off the tree.',does:['visualize','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'bst',title:'Try it',intro:'Insert 7, 5 and 13, predicting where each lands. Then search for 6 and for 9.'},
 {t:'q',ids:['bst-p3','bst-dr1','bst-dr2','bst-c1']},
 {t:'q',ids:['bst-b1','bst-b2','bst-d2','bst-d3']},
 {t:'q',title:'Code it',ids:['bst-search','bst-insert','bst-min-max']}]},

{title:'Delete',short:'Delete',mins:10,lead:'Leaf: remove it. One child: let the child take its place. Two children: copy in the in-order successor, then delete the successor.',does:['visualize','concept','code'],blocks:[
 {t:'viz',fn:'bst',title:'Delete each kind of node',intro:'Delete 2 (leaf), then 12 (two children), then 4. Watch where the successor comes from.'},
 {t:'q',ids:['bst-m3','bst-p5']},
 {t:'q',title:'Code it',ids:['bst-delete','bst-successor']}]},

{title:'Balance and shape',short:'Balance',mins:7,lead:'All BST operations cost O(h). A random insertion order keeps h near log n; sorted insertions make a line with h = n.',does:['visualize','predict','complexity','choose'],blocks:[
 {t:'viz',fn:'bst',title:'Build a bad tree',intro:'Press Reset, delete everything, then insert 1, 2, 3, 4, 5 in that order.'},
 {t:'q',ids:['bst-p2','bst-c2','bst-c3','bst-m4']},
 {t:'q',title:'Code it',ids:['bst-sorted-to-bst']}]},

{title:'Using sorted order',short:'Ordered queries',mins:10,lead:'Inorder = sorted. Validation, k-th smallest, range sums and two-sum all exploit it.',does:['complete','choose','code'],blocks:[
 {t:'q',ids:['bst-b3','bst-c4','bst-m5','bst-ch1','bst-ch2']},
 {t:'q',title:'Code it',ids:['bst-validate','bst-kth','bst-range-sum','bst-lca']}]},

{title:'Build a BST from scratch',short:'Build it',mins:15,lead:'Insert, search, inorder, min, max, delete and height in one class.',does:['code'],blocks:[
 {t:'q',title:'Build it',ids:['build-bst']}]}],

challenge:[
 {t:'b2o',title:'Kth Smallest: sort everything → stop early in inorder',qid:'bst-kth',problem:'<p>Return the k-th smallest value in a BST.</p>',
  brute:{code:`def kth_smallest(root, k):
    vals = []
    def collect(n):
        if n:
            vals.append(n.val)
            collect(n.left)
            collect(n.right)
    collect(root)
    return sorted(vals)[k - 1]`,cx:'O(n log n)',why:'Visits every node, then sorts.'},
  slow:{q:'What does this ignore?',opts:['That the BST is already sorted by inorder traversal, and that we only need the first k values','The value of k','The root','Recursion depth'],a:0,why:'Sorting is wasted work, and so is visiting nodes after the k-th.'},
  better:{q:'Which approach uses the BST property?',opts:['Level order','Inorder traversal that stops after k visits','Postorder','Heap of all values'],a:1,why:'Inorder yields values in ascending order.'},
  optimal:{code:`def kth_smallest(root, k):
    stack, node = [], root
    while True:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right`,cx:'O(n)',why:'Worst case still O(n), but typically O(h + k): it stops early and never sorts.'},
  takeaway:'<p>Structure is information: a BST is already sorted, so do not sort it again.</p>'}],

review:[
 {t:'flash',items:[['BST property?','Left subtree < node < right subtree, for every node.'],['Search cost?','O(h): log n balanced, n worst.'],['Delete with two children?','Copy the in-order successor, then delete it.'],['Validate correctly?','Pass (low, high) bounds down.'],['Sorted order?','Inorder traversal.'],['Why balanced trees?','Guarantee h = O(log n).']]}]
});
