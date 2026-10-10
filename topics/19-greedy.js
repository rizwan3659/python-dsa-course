/* Topic 19 · Greedy Algorithms. */
COURSE.topic({id:'greedy',
goal:'Recognise when making the locally best choice is globally optimal, justify it with an exchange argument, and fall back to DP when greedy fails.',
learn:[
{title:'The greedy idea',short:'Idea',mins:10,lead:'A greedy algorithm builds the answer one step at a time, always taking the choice that looks best right now, and never goes back. It is fast and simple, and sometimes wrong.',does:['predict','concept'],blocks:[
 {t:'grid',cols:2,items:[
  {title:'Works: making change with 1, 5, 10, 25',body:'Take the largest coin that fits, repeat. 63 = 25 + 25 + 10 + 1 + 1 + 1. Optimal.'},
  {title:'Fails: coins 1, 3, 4 and amount 6',body:'Greedy: 4 + 1 + 1 (3 coins). Best: 3 + 3 (2 coins). One counterexample is enough to reject greedy.'}]},
 {t:'q',ids:['gr-p1','gr-m1','gr-m4','gr-ch1','gr-ch2']},
 {t:'callout',html:'<b>Workflow:</b> state the greedy rule → hunt for a counterexample on small inputs (or stress-test against brute force) → if none, argue why it is optimal → code it, usually as "sort, then one pass".'},
 {t:'q',title:'Code it',ids:['gr-make-change']}]},

{title:'Interval scheduling',short:'Intervals',mins:14,lead:'Fit the most non-overlapping activities into one room. The winning rule is not "shortest first" or "earliest start", but "earliest end".',does:['visualize','dry run','complete','code'],blocks:[
 {t:'viz',fn:'activity',title:'Earliest finish first',intro:'Step through the default example, then try “One long interval” to see why sorting by start time fails.'},
 {t:'q',ids:['gr-p2','gr-m2','gr-m3','gr-ch3','gr-dr1','gr-b1','gr-d1']},
 {t:'q',title:'Code it',ids:['gr-activity','gr-min-arrows','pt-non-overlap']},
 {t:'teacher',items:['Ask the class for three greedy rules (shortest, earliest start, fewest conflicts) and find a counterexample for each together before showing earliest-end. Then do the exchange argument on the board.']}]},

{title:'Merging and resources',short:'Resources',mins:12,lead:'Many interval questions are about overlap: merge overlapping blocks, or count how many things happen at once. Sort by start, or sweep through the events in time order.',does:['visualize','concept','code'],blocks:[
 {t:'viz',fn:'intervals',title:'Merge intervals'},
 {t:'q',ids:['gr-m5']},
 {t:'q',title:'Code it',ids:['pt-merge-intervals','gr-platforms','hp-meeting-rooms']}]},

{title:'Sort, then decide',short:'Exchange',mins:14,lead:'Most greedy algorithms are "sort by the right key, then one pass". The hard part is the key, and the exchange argument that proves it: swapping two neighbours out of greedy order never helps.',does:['predict','complete','debug','code'],blocks:[
 {t:'table',head:['Problem','Sort by','Why'],rows:[['Activity selection','end time','finishing early leaves the most room'],['Fractional knapsack','value / weight, descending','every unit of capacity gets the best value'],['Two city scheduling','cost A − cost B','the biggest savings go to A'],['Largest number','a + b vs b + a','the better of two neighbours goes first'],['Boats','weight (two pointers)','the heaviest person must go; pair with the lightest']]},
 {t:'q',ids:['gr-p3','gr-p4','gr-m6','gr-c1','gr-c3','gr-b2','gr-d2']},
 {t:'q',title:'Code it',ids:['gr-fractional','gr-two-city','gr-truck-units','gr-boats','gr-largest-number','pt-assign-cookies','hp-ropes']}]},

{title:'Reach, change and two passes',short:'Scans',mins:14,lead:'Some greedy algorithms are a single scan that keeps the best situation so far: the furthest reachable index, the change in your till, or a requirement checked from both sides.',does:['visualize','dry run','debug','code'],blocks:[
 {t:'viz',fn:'greedy-reach',title:'Furthest reach'},
 {t:'q',ids:['gr-p5','gr-c2','gr-dr2','gr-d3']},
 {t:'q',title:'Code it',ids:['pt-jump-game','gr-lemonade','pt-gas-station','pt-partition-labels','gr-job-sequencing','gr-candy','gr-min-refuel']}]}],

challenge:[
 {t:'b2o',title:'Maximum activities: try every subset → earliest end first',qid:'gr-activity',problem:'<p>Choose the largest set of non-overlapping activities.</p>',
  brute:{code:`from itertools import combinations

def max_activities(intervals):
    for k in range(len(intervals), 0, -1):
        for group in combinations(sorted(intervals), k):
            if all(group[i][1] <= group[i + 1][0] for i in range(k - 1)):
                return k
    return 0`,cx:'O(2ⁿ)',why:'In the worst case it checks every subset of the n activities.'},
  slow:{q:'What does the brute force never use?',opts:['That one well-chosen first activity can always start an optimal plan','The length of the list','Python tuples','Recursion'],a:0,why:'It explores every combination instead of committing to a choice that is provably safe.'},
  better:{q:'Which activity is always safe to take first?',opts:['The one that ends earliest','The shortest one','The one that starts earliest','The one with the fewest overlaps'],a:0,why:'Exchange argument: it can replace the first activity of any optimal plan.'},
  optimal:{code:`def max_activities(intervals):
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda x: x[1]):
        if start >= last_end:
            count += 1
            last_end = end
    return count`,cx:'O(n log n)',why:'One sort and one pass.'},
  takeaway:'<p>Greedy replaces "try everything" with one provably safe choice per step. Always back the choice with an argument or a stress test.</p>'}],

review:[
 {t:'flash',items:[['Greedy needs…','Greedy-choice property + optimal substructure.'],['Prove greedy with…','An exchange argument (or at least stress tests).'],['Max non-overlapping intervals: sort by?','End time.'],['Merge intervals: sort by?','Start time.'],['Coins [1, 3, 4], amount 6?','Greedy gives 3 coins, optimal is 2: use DP.'],['Fractional vs 0/1 knapsack?','Fractional: greedy by ratio. 0/1: DP.'],['Typical greedy cost?','O(n log n): sort + one pass.']]},
 {t:'quiz',topic:'greedy',n:8,title:'Topic quiz'},
 {t:'task',title:'Homework',items:['For gr-boats and gr-two-city, write a brute force for n ≤ 8 and stress-test your greedy against it.','Find a counterexample for "sort by shortest duration" in activity selection.']}]
});
