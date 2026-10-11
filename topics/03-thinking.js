/* Topic 3 · Algorithmic Thinking — understand, decompose, brute force first, reason about cases, use math, test. */
COURSE.topic({id:'thinking',
goal:'Turn a problem statement into a plan: understand it, break it into steps, write a correct brute force, reason about best/average/worst cases, use basic math, and test your own code.',
learn:[
{title:'Understand before you code',short:'Understand',mins:8,lead:'Most wrong answers in interviews come from solving a slightly different problem. Spend the first minutes making the problem precise.',does:['concept','choose'],blocks:[
 {t:'grid',items:[
  {title:'Restate it',body:'Say the problem in your own words. What goes in, what comes out, of which type?'},
  {title:'Examples',body:'Work one normal example by hand. Then invent your own, including weird ones.'},
  {title:'Edge cases',body:'Empty input, one element, all equal, negatives, duplicates, huge values. Ask what should happen.'}]},
 {t:'table',head:['If n can be up to…','Aim for','Typical idea'],rows:[['10–20','O(2ⁿ) or O(n!)','try every subset / order'],['100–500','O(n³)','three nested loops'],['1,000–5,000','O(n²)','all pairs'],['10⁵–10⁶','O(n log n) or O(n)','sort, hash map, two pointers'],['10⁹ or more','O(log n) or O(1)','binary search, a formula']],note:'Constraints are a hint: they tell you how fast the solution has to be. Python manages roughly 10⁷ simple steps per second.'},
 {t:'q',ids:['th-m4','th-ch1','th-ch2']},
 {t:'teacher',items:['Give a vague task ("find the middle of a list") and let students ask questions before revealing details: even or odd length? empty list? Reward good questions, not fast answers.']}]},

{title:'Decompose and write pseudocode',short:'Decompose',mins:12,lead:'A hard problem is usually several easy problems in a row. Write the steps in plain words first; turning good pseudocode into Python is the easy part.',does:['predict','dry run','complete','code'],blocks:[
 {t:'diagram',text:`
  "most common word"          pseudocode                    Python
  ───────────────────         ────────────────────────      ──────────────────────────
  1. normalise the text   →   lower-case, drop punctuation  text = clean(text.lower())
  2. split into words     →   split on spaces               words = text.split()
  3. count each word      →   for each word: count += 1     counts[w] = counts.get(w, 0) + 1
  4. pick the biggest     →   keep the best so far          max(counts, key=counts.get)`,aria:'A problem broken into four steps, each written as pseudocode and then Python'},
 {t:'q',ids:['th-m5']},
 {t:'text',html:'<p>Numbers decompose too. <code>n % 10</code> is the last digit and <code>n // 10</code> removes it, so a loop can peel a number apart one digit at a time.</p>'},
 {t:'code',title:'Peel the digits',code:`n = 4729
while n > 0:
    print("last digit:", n % 10, " rest:", n // 10)
    n //= 10`},
 {t:'q',ids:['th-p1','th-p2','th-dr1','th-b1']},
 {t:'q',title:'Code it',ids:['th-digit-sum','th-time-format','th-leap-year']}]},

{title:'Brute force first',short:'Brute force',mins:14,lead:'A brute force tries every candidate answer. It is usually slow, but it is easy to get right, it proves you understand the problem, and it shows you where the wasted work is.',does:['visualize','complexity','dry run','code'],blocks:[
 {t:'cards',title:'From brute force to better',items:[
  {tag:'1',title:'List the candidates',body:'What could the answer be? Every pair? Every subarray? Every subset?'},
  {tag:'2',title:'Check each one',body:'Write the simplest check. Correctness first.'},
  {tag:'3',title:'Count the work',body:'How many candidates × cost per check? That is your complexity.'},
  {tag:'4',title:'Find repeated work',body:'What do neighbouring candidates recompute? That is where a better data structure or pattern helps.'}]},
 {t:'viz',fn:'brute-pairs',title:'Every pair, once',intro:'Watch the two loops visit each pair (i, j) with i &lt; j. Count the checks and compare with n(n − 1) / 2.'},
 {t:'q',ids:['th-p3','th-c1','th-c4','th-dr3','th-m1']},
 {t:'q',title:'Code it',ids:['th-count-pairs','th-max-subarray-brute','th-zero-triplets']},
 {t:'teacher',items:['Live-code th-max-subarray-brute in O(n³) first (sum of every slice), then ask: what does sum(nums[s:e + 1]) recompute? Improve it to O(n²) together. Kadane in topic 4 is the next step.']}]},

{title:'Best, average and worst cases',short:'Cases',mins:10,lead:'The same code can be fast on one input and slow on another. Big-O (upper bound), Big-Omega (lower bound) and Big-Theta (both) let you say precisely how fast, and for which case.',does:['predict','concept'],blocks:[
 {t:'table',head:['Symbol','Means','Linear search example'],rows:[['O(f)','grows <b>at most</b> like f','worst case is O(n)'],['Ω(f)','grows <b>at least</b> like f','best case is Ω(1); every case is Ω(1)'],['Θ(f)','grows <b>exactly</b> like f (both)','worst case is Θ(n), best case is Θ(1)']],note:'When people say "linear search is O(n)" they mean the worst case. Interviews almost always ask about the worst case.'},
 {t:'viz',fn:'linear-search',title:'Best and worst case',intro:'Search for the first element (best case), then for a value that is not there (worst case). Count the comparisons.'},
 {t:'q',ids:['th-p6','th-m2','th-m3','th-m6']}]},

{title:'Math every programmer uses',short:'Math',mins:14,lead:'A little math turns loops into formulas and O(n) into O(√n) or O(log n). You only need a handful of facts.',does:['predict','complexity','debug','code'],blocks:[
 {t:'grid',items:[
  {title:'Sums',body:'1 + 2 + … + n = n(n + 1) / 2. Number of pairs = n(n − 1) / 2.'},
  {title:'Logarithms',body:'Halving n until it reaches 1 takes log₂ n steps. Counting digits takes log₁₀ n steps.'},
  {title:'Divisors',body:'Divisors come in pairs (d, n / d), so checking up to √n is enough.'},
  {title:'Modulo',body:'<code>x % m</code> wraps around into 0..m − 1: clocks, circular arrays, even/odd, last digit.'},
  {title:'GCD',body:"Euclid: gcd(a, b) = gcd(b, a % b). Fast: O(log min(a, b))."},
  {title:'Integer division',body:'Use <code>//</code> for whole numbers. <code>/</code> always gives a float and can lose precision.'}]},
 {t:'q',ids:['th-p4','th-p5','th-p7','th-m8','th-c2','th-c3']},
 {t:'q',ids:['th-dr2','th-b3','th-d1']},
 {t:'q',title:'Code it',ids:['th-sum-to-n','th-is-prime','th-gcd','th-count-divisors','th-collatz','th-diagonal-sum','th-count-primes']}]},

{title:'Test your own code',short:'Testing',mins:10,lead:'Passing the example is not the same as being correct. Professionals test edge cases on purpose and compare tricky code with a simple version.',does:['predict','complete','debug'],blocks:[
 {t:'task',items:['<b>Edge cases:</b> empty, one element, two elements, all equal, negatives, zero, the largest allowed value.','<b>Boundaries:</b> the first and last index, loops that run 0 or 1 times, &lt; versus &lt;=.','<b>Assertions:</b> <code>assert</code> your assumptions so a broken one fails loudly and early.','<b>Stress test:</b> run a fast solution and a brute force on hundreds of random small inputs and compare.']},
 {t:'q',ids:['th-p8','th-m7','th-b2']},
 {t:'q',title:'Find the bug',ids:['th-d2','th-d3','th-d4']}]}],

challenge:[
 {t:'b2o',title:'Count pairs with a given sum: all pairs → dictionary',qid:'th-count-pairs',problem:'<p>Count pairs i &lt; j with nums[i] + nums[j] == target.</p>',
  brute:{code:`def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count`,cx:'O(n²)',why:'Every pair is checked: n(n − 1) / 2 checks.'},
  slow:{q:'For a fixed j, what is the inner loop really asking?',opts:['How many earlier values equal target − nums[j]?','Is nums[j] the largest?','Is the list sorted?','Nothing useful'],a:0,why:'It scans all earlier values just to count one specific value.'},
  better:{q:'Which tool answers "how many times have I seen value v?" in O(1)?',opts:['A dictionary of counts','A stack','Sorting','A second nested loop'],a:0,why:'Keep counts of the values seen so far; look up the complement in O(1).'},
  optimal:{code:`def count_pairs(nums, target):
    seen = {}
    count = 0
    for x in nums:
        count += seen.get(target - x, 0)
        seen[x] = seen.get(x, 0) + 1
    return count`,cx:'O(n)',why:'One pass, one dictionary lookup and one update per element.'},
  takeaway:'<p>Write the brute force, find the question the inner loop keeps re-asking, then answer it with a data structure.</p>'}],

review:[
 {t:'flash',items:[['First thing to do with a new problem?','Restate it, work an example, ask about edge cases and constraints.'],['n ≤ 20 suggests…','Brute force over subsets (2ⁿ) is fine.'],['n up to 10⁵ suggests…','O(n log n) or O(n).'],['O vs Ω vs Θ?','Upper bound, lower bound, both.'],['Sum 1..n?','n(n + 1) / 2.'],['Why test divisors only to √n?','Divisors come in pairs; one is at most √n.'],['What is a stress test?','Compare a fast solution with a brute force on many random small inputs.']]},
 {t:'quiz',topic:'thinking',n:8,title:'Topic quiz'},
 {t:'task',title:'Homework',items:['For three exercises you solved earlier, write: the edge cases you considered, a brute force, and its complexity.','Write a stress test for one of your solutions in topic 4 against a brute force.']}]
});
