/* Topic 11 · Searching. */
COURSE.topic({id:'searching',
goal:'Know when a linear scan is enough, write binary search without off-by-one bugs, and recognise its variations: first/last position, insert position, rotated arrays and searching on the answer.',
learn:[
{title:'Linear search',short:'Linear',mins:5,lead:'Check each element in turn. It works on any data, sorted or not, and costs O(n).',does:['visualize','complexity','choose','code'],blocks:[
 {t:'viz',fn:'linear-search',title:'Scan from the left'},
 {t:'q',ids:['bs-c2','bs-ch2']},
 {t:'q',title:'Code it',ids:['bs-linear']}]},

{title:'Binary search',short:'Binary search',mins:12,lead:'On sorted data, look at the middle: it tells you which half cannot contain the target. Throw that half away and repeat. A million items take about 20 steps.',does:['visualize','play','dry run','complete','debug','code'],blocks:[
 {t:'diagram',text:`
  [2][5][8][12][16][23][38][56][72][91]      target = 23
   ↑               ↑                  ↑
  low             mid               high      16 < 23 → low = mid + 1
                      [23][38][56][72][91]
                       ↑    ↑          ↑
                      low  mid        high    56 > 23 → high = mid - 1`,aria:'Binary search halving the range'},
 {t:'viz',fn:'binary-search',title:'Watch it, then drive it',intro:'Step through “Find target”. Then press <b>🎮 You decide</b> and make every move yourself.'},
 {t:'q',ids:['bs-m1','bs-p2','bs-p3','bs-c1','bs-m2']},
 {t:'q',ids:['bs-b1','bs-d1','bs-d2']},
 {t:'q',title:'Code it',ids:['bs-search']}]},

{title:'Boundaries: first, last and insert position',short:'Boundaries',mins:10,lead:'Many questions are not “is it there?” but “where does it start?” or “where would it go?”. Keep searching after a match, or use a half-open range [low, high).',does:['visualize','predict','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'binary-search',title:'Try the other modes',intro:'Switch to “First occurrence” and “Insert position”. Use a list with repeated values, like 1 3 3 3 5.'},
 {t:'q',ids:['bs-m3','bs-p4','bs-p1','bs-p5','bs-dr1','bs-b2','bs-d3','bs-c5']},
 {t:'q',title:'Code it',ids:['bs-insert','bs-first-last','bs-count']}]},

{title:'Binary search on the answer',short:'On the answer',mins:10,lead:'If “does value x work?” is No, No, …, No, Yes, Yes, …, binary search can find the first Yes, even when there is no array at all.',does:['predict','dry run','complete','code'],blocks:[
 {t:'callout',html:'<b>Signal:</b> “minimum speed / capacity / time such that …”, “maximum value such that …”, and a check that is easy for a given guess.'},
 {t:'q',ids:['bs-m4','bs-p6','bs-dr2','bs-b3','bs-c4']},
 {t:'q',title:'Code it',ids:['bs-sqrt','bs-first-bad','bs-koko']}]},

{title:'Rotated and 2D searches',short:'Variations',mins:10,lead:'Binary search still works when the data is only “partly” sorted, as long as each step can rule out half.',does:['choose','code'],blocks:[
 {t:'q',ids:['bs-ch1','bs-c3','bs-d4']},
 {t:'q',title:'Code it',ids:['bs-rotated','bs-rotated-min','bs-peak','bs-matrix']}]}],

challenge:[
 {t:'b2o',title:'Koko Eating Bananas: try every speed → binary search on the answer',qid:'bs-koko',problem:'<p>Find the minimum eating speed k that finishes all piles within h hours.</p>',
  brute:{code:`def min_eating_speed(piles, h):
    k = 1
    while sum((p + k - 1) // k for p in piles) > h:
        k += 1
    return k`,cx:'O(n · M)',cxOpts:['O(n)','O(n log M)','O(n · M)','O(M)'],why:'Up to M = max(piles) speeds, each checked in O(n). With piles of a billion bananas, hopeless.'},
  slow:{q:'What do we know about speeds once one speed works?',opts:['Nothing','Every faster speed also works: the answers form No … No, Yes … Yes','Only even speeds work','Slower speeds also work'],a:1,why:'A monotonic yes/no condition over a sorted range of candidates.'},
  better:{q:'Which technique finds the first Yes in a sorted No/Yes sequence?',opts:['Two pointers','Binary search over k','A heap','Sorting the piles'],a:1,why:'log M checks instead of M.'},
  optimal:{code:`def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        k = (lo + hi) // 2
        if sum((p + k - 1) // k for p in piles) <= h:
            hi = k
        else:
            lo = k + 1
    return lo`,cx:'O(n log M)',cxOpts:['O(n)','O(n log M)','O(n · M)','O(M)'],why:'About 30 checks for M up to a billion.'},
  takeaway:'<p>Binary search is not just for arrays: search any range of candidate answers with a monotonic check.</p>'}],

review:[
 {t:'flash',items:[['Binary search requirement?','Sorted data or a monotonic yes/no condition.'],['Inclusive bounds loop?','while low <= high, then low = mid + 1 / high = mid − 1.'],['Half-open [low, high) loop?','while low < high, high = mid.'],['First occurrence?','On a match, record it and continue left.'],['bisect_left?','First index with a[i] ≥ x (lower bound).'],['Search on the answer?','Guess, check feasibility in O(n), halve the range.'],['Rotated array?','One half around mid is always sorted.']]}]
});
