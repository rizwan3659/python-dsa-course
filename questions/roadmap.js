/* Top 100 interview roadmap: 100 problems from the bank, grouped by pattern, each tagged with a track.
   Shown on the Interview page and exported to docs/interview/top-100.md by tools/export-docs.mjs. */
COURSE.ROADMAP={
tracks:[
 {k:'b',name:'Beginner',desc:'Finish topics 1–12 first. Classic easy problems that every interviewer expects you to solve quickly.'},
 {k:'i',name:'Intermediate',desc:'The core of phone screens and most onsite rounds: one clear pattern per problem.'},
 {k:'a',name:'Advanced',desc:'Hard problems that combine patterns. Aim here once the intermediate track feels routine.'}],
groups:[
 {name:'Arrays and hashing',items:[['arr-two-sum','b'],['h-anagram','b'],['arr-stock','b'],['arr-majority','b'],['h-group-anagrams','i'],['h-top-k','i'],['arr-product-except','i'],['h-longest-consecutive','i'],['arr-subarray-sum-k','i'],['arr-first-missing','a']]},
 {name:'Two pointers',items:[['st-palindrome','b'],['arr-merge-sorted','b'],['arr-pair-sorted','i'],['arr-container','i'],['arr-three-sum','i'],['arr-trap','a']]},
 {name:'Sliding window',items:[['arr-max-sum-k','b'],['st-longest-unique','i'],['st-char-replace','i'],['h-find-anagrams','i'],['arr-min-len','i'],['st-min-window','a']]},
 {name:'Stack and queue',items:[['s-valid-parens','b'],['s-backspace','b'],['q-recent-counter','b'],['s-min-stack','i'],['s-daily-temps','i'],['s-decode','i'],['s-histogram','a'],['q-window-max','a']]},
 {name:'Binary search',items:[['bs-search','b'],['bs-insert','b'],['bs-first-bad','b'],['bs-first-last','i'],['bs-rotated','i'],['bs-koko','i'],['bs-median-two','a'],['bs-split-array','a']]},
 {name:'Linked lists',items:[['ll-reverse','b'],['ll-merge','b'],['ll-has-cycle','b'],['ll-remove-nth','i'],['ll-reorder','i'],['ll-add-two','i'],['ll-reverse-k','a']]},
 {name:'Trees and BSTs',items:[['t-max-depth','b'],['t-invert','b'],['t-same','b'],['t-level-order','i'],['t-diameter','i'],['t-lca','i'],['t-right-view','i'],['bst-validate','i'],['bst-kth','i'],['t-max-path','a'],['t-serialize','a']]},
 {name:'Heaps',items:[['hp-kth-largest','i'],['hp-k-closest','i'],['hp-meeting-rooms','i'],['hp-merge-k','a'],['hp-median','a']]},
 {name:'Tries',items:[['build-trie','i'],['tr-word-search','a']]},
 {name:'Backtracking',items:[['rec-subsets','i'],['rec-permutations','i'],['rec-combination-sum','i'],['rec-parens','i'],['rec-word-search','i'],['rec-n-queens','a']]},
 {name:'Graphs',items:[['g-flood-fill','b'],['g-islands','i'],['g-rotting','i'],['ag-can-finish','i'],['ag-course-order','i'],['ag-provinces','i'],['ag-network-delay','i'],['g-word-ladder','a'],['ag-alien','a']]},
 {name:'Greedy and intervals',items:[['pt-merge-intervals','i'],['pt-insert-interval','i'],['pt-non-overlap','i'],['pt-jump-game','i'],['pt-gas-station','i'],['gr-candy','a']]},
 {name:'Dynamic programming',items:[['rec-climb','b'],['dp-min-cost-stairs','b'],['dp-house-robber','i'],['dp-coin-change','i'],['dp-decode-ways','i'],['dp-grid-obstacles','i'],['dp-lcs','i'],['dp-word-break','i'],['dp-lis','i'],['dp-partition','i'],['dp-edit-distance','a']]},
 {name:'Bits and design',items:[['bit-single','b'],['bit-missing','b'],['bit-counting-bits','i'],['build-lru','a'],['rq-count-smaller','a']]}],
plan:[
 ['Week 1','Arrays and hashing, two pointers (beginner + intermediate)'],
 ['Week 2','Sliding window, stack and queue'],
 ['Week 3','Binary search, linked lists'],
 ['Week 4','Trees and BSTs'],
 ['Week 5','Heaps, tries, backtracking'],
 ['Week 6','Graphs'],
 ['Week 7','Greedy, intervals, dynamic programming'],
 ['Week 8','Bits and design; then the advanced track and timed mock interviews']]};
