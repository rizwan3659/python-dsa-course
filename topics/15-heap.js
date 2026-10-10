/* Topic 15 · Heap / priority queue. */
COURSE.topic({id:'heap',
goal:'Understand min- and max-heaps as complete trees stored in lists, use heapq fluently, and solve top-K, merging and scheduling problems.',
learn:[
{title:'What a heap is',short:'Heap property',mins:8,lead:'A heap is a complete binary tree where every parent is ≤ its children (min-heap) or ≥ them (max-heap). So the smallest (or largest) value is always at the root.',does:['visualize','concept','predict'],blocks:[
 {t:'diagram',text:`
          2                index:  0  1  2  3  4
         / \\               list:  [2, 5, 4, 9, 7]
        5   4
       / \\                 children of i: 2i + 1, 2i + 2
      9   7                parent of i:   (i - 1) // 2`,aria:'A min-heap as a tree and as a list'},
 {t:'viz',fn:'heap',title:'Tree and list, side by side'},
 {t:'q',ids:['hp-m1','hp-m2','hp-p7','hp-p6']}]},

{title:'Push and pop: bubble up, bubble down',short:'Push + pop',mins:10,lead:'Push appends at the end and bubbles up while smaller than its parent. Pop takes the root, moves the last item to the top and bubbles it down. Both are O(log n).',does:['visualize','dry run','complete','debug'],blocks:[
 {t:'viz',fn:'heap',title:'Push 1, then pop twice',intro:'Before each swap, predict whether it will happen.'},
 {t:'q',ids:['hp-dr1','hp-dr2','hp-c1','hp-c2','hp-c5']},
 {t:'q',ids:['hp-b2','hp-d2']},
 {t:'q',title:'Build it',ids:['build-heap']}]},

{title:'heapq in Python',short:'heapq',mins:9,lead:'Python’s heapq module turns a plain list into a min-heap. For a max-heap, push negated values; for priorities, push tuples.',does:['predict','complete','debug'],blocks:[
 {t:'code',title:'The essentials',code:`import heapq

h = []
for x in [5, 1, 8, 3]:
    heapq.heappush(h, x)        # O(log n)
print(h[0])                     # smallest, O(1)
print(heapq.heappop(h))         # 1

nums = [9, 4, 7]
heapq.heapify(nums)             # O(n), in place
print(heapq.nsmallest(2, [5, 2, 8, 1]), heapq.nlargest(2, [5, 2, 8, 1]))

maxh = [-x for x in [3, 9, 4]]  # max-heap trick
heapq.heapify(maxh)
print(-maxh[0])`},
 {t:'q',ids:['hp-p1','hp-p2','hp-p3','hp-p4','hp-p5','hp-p8','hp-m3','hp-c3']},
 {t:'q',ids:['hp-b3','hp-d1','hp-d3']}]},

{title:'Top-K problems',short:'Top K',mins:10,lead:'To keep the k largest of many values, keep a MIN-heap of size k: its root is the weakest of the current top k, ready to be evicted.',does:['complete','complexity','choose','code'],blocks:[
 {t:'q',ids:['hp-b1','hp-c4','hp-ch2','hp-ch1','hp-m4']},
 {t:'q',title:'Code it',ids:['hp-kth-largest','hp-last-stone','hp-k-closest','hp-top-words']}]},

{title:'Merging and scheduling',short:'Merging',mins:10,lead:'Heaps shine whenever you repeatedly need “the smallest of several fronts”: merging sorted lists, picking the next meeting room, or greedy choices.',does:['choose','code'],blocks:[
 {t:'q',ids:['hp-ch3']},
 {t:'q',title:'Code it',ids:['hp-ropes','hp-meeting-rooms','hp-merge-k','hp-median']}]}],

challenge:[
 {t:'b2o',title:'Kth Largest: sort → heap of size k',qid:'hp-kth-largest',problem:'<p>Return the k-th largest element of a list of n numbers (k is small, n is huge).</p>',
  brute:{code:`def find_kth_largest(nums, k):
    return sorted(nums, reverse=True)[k - 1]`,cx:'O(n log n)',cxOpts:['O(n)','O(n log k)','O(n log n)','O(n²)'],why:'Sorts everything, although we only care about k values.'},
  slow:{q:'What does sorting do that we do not need?',opts:['It orders ALL n values, when only the top k matter','It uses too little memory','Nothing','It is unstable'],a:0,why:'The relative order of the n − k smaller values is wasted work.'},
  better:{q:'Which structure keeps just the top k cheaply?',opts:['A min-heap of size k','A max-heap of all n','A queue','A stack'],a:0,why:'Push each value; if the heap grows past k, pop its minimum. The root is then the k-th largest.'},
  optimal:{code:`import heapq

def find_kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    return h[0]`,cx:'O(n log k)',cxOpts:['O(n)','O(n log k)','O(n log n)','O(n²)'],why:'Each step costs log k; memory is O(k).'},
  takeaway:'<p>For “top k”, maintain a heap of size k instead of sorting everything.</p>'}],

review:[
 {t:'flash',items:[['Heap property (min)?','Every parent ≤ its children.'],['Children of i?','2i + 1 and 2i + 2.'],['push / pop cost?','O(log n).'],['heapify cost?','O(n).'],['Max-heap with heapq?','Push negatives.'],['Top k largest?','Min-heap of size k.'],['Ties with uncomparable items?','(priority, counter, item).']]}]
});
