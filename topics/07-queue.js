/* Topic 7 · Queue & deque. */
COURSE.topic({id:'queue',
goal:'Use queues for first-come-first-served processing, know why collections.deque beats list.pop(0), and use circular buffers and monotonic deques.',
learn:[
{title:'FIFO: first in, first out',short:'FIFO',mins:7,lead:'A queue adds at the rear and removes from the front, like a line at a shop.',does:['visualize','predict','choose'],blocks:[
 {t:'diagram',text:`
  dequeue ←  FRONT → [10][20][30][40] ← REAR  ← enqueue`,aria:'A queue with front on the left and rear on the right'},
 {t:'viz',fn:'queue',title:'Enqueue, dequeue, peek',intro:'Enqueue 50, then dequeue twice. Which values leave, and in what order?'},
 {t:'q',ids:['q-p4','q-m1','q-ch1','q-p8']}]},

{title:'Why list.pop(0) is a trap',short:'deque',mins:8,lead:'A list stores items side by side, so removing the first one shifts all the others. collections.deque is built for O(1) work at both ends.',does:['visualize','complexity','predict','debug'],blocks:[
 {t:'table',head:['Operation','list','deque'],rows:[['add at rear','<code>append</code> O(1)','<code>append</code> O(1)'],['remove from front','<code>pop(0)</code> <b>O(n)</b>','<code>popleft</code> O(1)'],['add at front','<code>insert(0, x)</code> <b>O(n)</b>','<code>appendleft</code> O(1)'],['index the middle','O(1)','<b>O(n)</b>']]},
 {t:'viz',fn:'queue',title:'Count the shifts',intro:'Switch to “list with pop(0)”, enqueue a few values, then dequeue them all. Watch the shift counter grow.'},
 {t:'q',ids:['q-p5','q-m2','q-c1','q-c2','q-c3']},
 {t:'q',ids:['q-p1','q-p2','q-p3','q-m5','q-ch2','q-ch3']},
 {t:'q',title:'Find the bug',ids:['q-d1']}]},

{title:'Queues in practice',short:'Uses',mins:8,lead:'Queues model anything processed in arrival order: requests, events within a time window, simulations, and breadth-first search.',does:['dry run','predict','complete','code'],blocks:[
 {t:'q',ids:['q-dr1','q-p6','q-m3']},
 {t:'q',ids:['q-b1','q-b2','q-d3','q-c5']},
 {t:'q',title:'Code it',ids:['q-recent-counter','q-josephus']}]},

{title:'Circular queue',short:'Circular',mins:8,lead:'A fixed-size array where the rear wraps around to index 0. Nothing ever shifts: only the head index and the count change.',does:['visualize','dry run','debug'],blocks:[
 {t:'viz',fn:'circular-queue',title:'Wrap around',intro:'Enqueue 4 values, dequeue 3, then enqueue 3 more: where does the rear go?'},
 {t:'q',ids:['q-p7','q-dr2','q-m4','q-d2']},
 {t:'q',title:'Build it',ids:['build-circular-queue']}]},

{title:'Monotonic deque: sliding window maximum',short:'Window max',mins:10,lead:'Keep a deque of indexes whose values decrease. The front is always the maximum of the current window.',does:['visualize','complexity','code'],blocks:[
 {t:'viz',fn:'window-max',title:'Step through it'},
 {t:'q',ids:['q-c4']},
 {t:'q',title:'Code it',ids:['q-first-negative','q-window-max']}]}],

challenge:[
 {t:'b2o',title:'Sliding Window Maximum: max of every window → monotonic deque',qid:'q-window-max',problem:'<p>Return the maximum of every window of size k.</p>',
  brute:{code:`def max_sliding_window(nums, k):
    return [max(nums[i:i + k]) for i in range(len(nums) - k + 1)]`,cx:'O(n · k)',cxOpts:['O(n)','O(n · k)','O(n log n)','O(k)'],why:'Each of about n windows scans k numbers.'},
  slow:{q:'In the window [1, 5, 2], can 1 ever be a maximum of a later window?',opts:['Yes, if the window is large','No: 5 is bigger and stays in the window at least as long as 1 does','Only at the end','Only if k = 1'],a:1,why:'Smaller values to the left of a bigger value are dead: they leave the window first.'},
  better:{q:'So keep only “alive” candidates, how?',opts:['A deque of indexes with decreasing values: pop smaller ones from the back, expired ones from the front','A sorted list of the window','A set','A stack only'],a:0,why:'The front is the max; the back is where new values push weaker ones out.'},
  optimal:{code:`from collections import deque

def max_sliding_window(nums, k):
    dq, out = deque(), []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out`,cx:'O(n)',cxOpts:['O(n)','O(n · k)','O(n log n)','O(k)'],why:'Each index enters and leaves the deque once.'},
  takeaway:'<p>Discard candidates that can never win. A deque lets you discard from both ends in O(1).</p>'}],

review:[
 {t:'flash',items:[['Queue order?','FIFO: first in, first out.'],['Python queue?','collections.deque: append + popleft.'],['Cost of list.pop(0)?','O(n): every element shifts.'],['deque weakness?','Indexing the middle is O(n).'],['Circular queue next slot?','(head + count) % k.'],['Window max trick?','Monotonic decreasing deque of indexes.']]}]
});
