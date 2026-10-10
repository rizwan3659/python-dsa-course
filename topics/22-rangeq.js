/* Topic 22 · Range Queries. */
COURSE.topic({id:'rangeq',
goal:'Answer many range questions quickly: prefix sums for static data, difference arrays for batches of range updates, Fenwick trees for sums with updates, and segment trees for any associative operation.',
learn:[
{title:'The range query problem',short:'Problem',mins:10,lead:'"What is the sum (or minimum) of positions l to r?" asked thousands of times. The right structure depends on whether the data changes, and how.',does:['concept','choose','code'],blocks:[
 {t:'table',head:['Situation','Tool','Build','Update','Query'],rows:[['No changes, sums','Prefix sums','O(n)','O(n) rebuild','O(1)'],['Many range adds, then read once','Difference array','O(n)','O(1)','O(n) once at the end'],['Point updates + range sums','Fenwick tree','O(n log n)','O(log n)','O(log n)'],['Point updates + range min/max/gcd…','Segment tree','O(n)','O(log n)','O(log n)']]},
 {t:'q',ids:['rq-c2','rq-m1','rq-ch1','rq-ch2','rq-ch3','rq-d3']},
 {t:'q',title:'Code it',ids:['rq-static-sum','rq-region-sum']}]},

{title:'Difference arrays',short:'Difference',mins:12,lead:'A difference array stores how much each value changes from the previous one. Adding v to a whole range changes only two of those differences.',does:['visualize','predict','dry run','debug','code'],blocks:[
 {t:'viz',fn:'diff-array',title:'Two cells per update'},
 {t:'q',ids:['rq-p1','rq-m2','rq-dr1','rq-b2','rq-d2']},
 {t:'q',title:'Code it',ids:['rq-range-add','rq-flight-bookings','rq-car-pooling']},
 {t:'teacher',items:['Connect to prefix sums explicitly: the difference array is the "inverse" of a prefix sum. Prefix(diff(a)) = a. Ask students to prove it on a 4-element example.']}]},

{title:'Fenwick trees',short:'Fenwick',mins:16,lead:'A Fenwick (binary indexed) tree stores partial sums whose lengths are powers of two, decided by the lowest set bit of the index. Prefix sums and updates both touch only O(log n) cells.',does:['visualize','predict','complete','debug','code'],blocks:[
 {t:'viz',fn:'fenwick',title:'Walking the bits',intro:'Query prefix(11), then switch to add(i, delta) with i = 3 and watch the climb.'},
 {t:'q',ids:['rq-p2','rq-p3','rq-p4','rq-m5','rq-c1','rq-dr2','rq-b1','rq-d1']},
 {t:'q',title:'Code it',ids:['rq-fenwick','rq-num-array','rq-count-smaller']}]},

{title:'Segment trees',short:'Segment tree',mins:16,lead:'A segment tree is a binary tree over the array: each node stores the answer for its range. A query combines O(log n) nodes, so any associative operation works, including min and max.',does:['visualize','concept','code'],blocks:[
 {t:'viz',fn:'segtree',title:'Inside, outside, split'},
 {t:'q',ids:['rq-m3','rq-m4']},
 {t:'code',title:'Iterative sum segment tree (size 2n)',code:`class SumTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.t = [0] * self.n + list(nums)          # leaves at n..2n-1
        for i in range(self.n - 1, 0, -1):
            self.t[i] = self.t[2 * i] + self.t[2 * i + 1]

    def update(self, i, value):
        i += self.n
        self.t[i] = value
        while i > 1:
            i //= 2
            self.t[i] = self.t[2 * i] + self.t[2 * i + 1]

    def query(self, l, r):                          # inclusive l..r
        total, l, r = 0, l + self.n, r + self.n + 1
        while l < r:
            if l & 1:
                total += self.t[l]
                l += 1
            if r & 1:
                r -= 1
                total += self.t[r]
            l //= 2
            r //= 2
        return total

st = SumTree([5, 8, 6, 3, 2, 7, 2, 6])
print(st.query(2, 6))
st.update(3, 10)
print(st.query(2, 6))`},
 {t:'q',title:'Code it',ids:['rq-segtree-min']},
 {t:'teacher',items:['Draw the tree for 8 values on the board. Shade the nodes a query uses and ask: what is the most nodes a query can use per level? (Two.) That gives O(log n).']}]}],

challenge:[
 {t:'b2o',title:'Range sums with updates: re-sum → Fenwick tree',qid:'rq-num-array',problem:'<p>Support update(i, value) and sum_range(l, r), mixed together, many times.</p>',
  brute:{code:`class NumArray:
    def __init__(self, nums):
        self.nums = list(nums)

    def update(self, i, value):
        self.nums[i] = value

    def sum_range(self, l, r):
        return sum(self.nums[l:r + 1])`,cx:'O(n)',why:'Each query sums up to n values.'},
  slow:{q:'Why can’t plain prefix sums fix this?',opts:['One update changes every later prefix: O(n) per update instead of per query','Prefix sums are always wrong','They use too much memory','They cannot handle negatives'],a:0,why:'Prefix sums move the cost from queries to updates.'},
  better:{q:'What balances the cost of both operations?',opts:['A tree of partial sums (Fenwick or segment tree): O(log n) each','Sorting','A heap','A hash map'],a:0,why:'Each value is stored in O(log n) partial sums, and each prefix is made of O(log n) of them.'},
  optimal:{code:`def update(self, i, value):
    delta, self.nums[i] = value - self.nums[i], value
    i += 1
    while i < len(self.tree):
        self.tree[i] += delta
        i += i & -i`,cx:'O(log n)',why:'Both update and sum_range touch O(log n) tree cells.'},
  takeaway:'<p>When data changes, find a structure where each change and each question touches only a logarithmic number of stored pieces.</p>'}],

review:[
 {t:'flash',items:[['Static range sums?','Prefix sums: O(1) per query.'],['Range adds then one read?','Difference array: O(1) per update.'],['i & −i in a Fenwick tree?','The length of the range tree[i] covers.'],['Fenwick query / update loops?','i −= i & −i down; i += i & −i up.'],['Why 1-based Fenwick?','0 & −0 = 0: the loop would not move.'],['Range min with updates?','Segment tree (min has no inverse).'],['Segment tree query cost?','O(log n): at most two nodes per level.']]},
 {t:'quiz',topic:'rangeq',n:8,title:'Topic quiz'},
 {t:'task',title:'Homework',items:['Write a stress test that compares your Fenwick tree with a plain list on 10,000 random operations.','Change rq-segtree-min into a segment tree for range gcd.']}]
});
