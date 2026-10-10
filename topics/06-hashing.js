/* Topic 6 · Hash tables. */
COURSE.topic({id:'hashing',
goal:'Understand how dict and set find a key in O(1), use Counter and defaultdict fluently, and recognise the hashing patterns that turn O(n²) into O(n).',
learn:[
{title:'Why hashing is fast',short:'How it works',mins:8,lead:'A list must be scanned to find a value. A hash table computes where the value lives: the key goes through a hash function, which picks a bucket.',does:['visualize','predict','complexity'],blocks:[
 {t:'diagram',text:`
      key            "cat"
       │
       ▼
    hash()     →   312            (a number computed from the key)
       │
       ▼
  312 % 8      →   bucket 0       (8 buckets in the table)
       │
       ▼
    bucket 0   →   ("cat", 3)     (the stored key-value pair)`,aria:'Key goes through hash, modulo number of buckets, to a bucket holding the value'},
 {t:'viz',fn:'hash-table',title:'Put, get, delete',intro:'Get “cat”. Then put a new key and predict its bucket before stepping: add up the character codes, then take % 8.'},
 {t:'q',ids:['h-c1','h-p9','h-p7']}]},

{title:'Collisions and resizing',short:'Collisions',mins:8,lead:'Different keys can land in the same bucket. Each bucket keeps a short chain, and the table grows when chains would get long.',does:['visualize','dry run','concept','debug'],blocks:[
 {t:'grid',items:[
  {title:'Collision',body:'Two different keys, same bucket. Unavoidable: there are far more possible keys than buckets.'},
  {title:'Chaining',body:'A bucket holds a small list of (key, value) pairs. Lookup compares keys within that one list.'},
  {title:'Resizing',body:'When keys per bucket (the <b>load factor</b>) passes a limit, allocate ~2× buckets and re-insert everything. Rare, so still O(1) on average.'}]},
 {t:'viz',fn:'hash-table',title:'Make it collide, then make it grow',intro:'Press “Add colliding keys”, then “Fill until it resizes”. Notice keys moving to new buckets.'},
 {t:'q',ids:['h-dr3','h-m1','h-m2','h-m4','h-c3']},
 {t:'q',title:'Why must keys be immutable?',ids:['h-m3','h-d1']}]},

{title:'The dict and set toolkit',short:'dict + set',mins:8,lead:'The operations you will use in almost every hashing solution.',does:['predict','choose','debug'],blocks:[
 {t:'code',title:'dict and set essentials',code:`d = {"a": 1}
d["b"] = 2                     # insert / overwrite
print(d.get("z", 0))           # safe read with a default
print("a" in d)                # O(1) membership
for k, v in d.items():         # insertion order
    print(k, v)
d.setdefault("c", []).append(5)
print(d)

a, b = {1, 2, 3}, {2, 3, 4}
print(a & b, a | b, a - b)     # intersection, union, difference
grid = {(0, 0): "#"}            # tuples make good keys`},
 {t:'q',ids:['h-p3','h-p4','h-p5','h-p8','h-p10','h-p12','h-m5']},
 {t:'q',ids:['h-ch3','h-ch4','h-d2','h-d5']}]},

{title:'Counter and defaultdict',short:'Counter',mins:8,lead:'Two dict subclasses from collections that remove boilerplate: Counter counts, defaultdict creates missing values for you.',does:['predict','complete','code'],blocks:[
 {t:'code',title:'Counter and defaultdict',code:`from collections import Counter, defaultdict

c = Counter("banana")
print(c)                       # Counter({'a': 3, 'n': 2, 'b': 1})
print(c["z"])                  # 0, no KeyError
print(c.most_common(1))        # [('a', 3)]

groups = defaultdict(list)
for word in ["apple", "avocado", "banana"]:
    groups[word[0]].append(word)
print(dict(groups))            # {'a': ['apple', 'avocado'], 'b': ['banana']}`},
 {t:'q',ids:['h-p1','h-p2','h-p6','h-p11','h-ch1','h-ch2']},
 {t:'q',ids:['h-b1','h-b2','h-d4']},
 {t:'q',title:'Code it',ids:['h-anagram','h-group-anagrams']}]},

{title:'Hashing patterns',short:'Patterns',mins:12,lead:'Five ideas cover most hashing problems: seen-set, complement lookup, counting, grouping by a key, and prefix sum + map.',does:['visualize','dry run','complete','code'],blocks:[
 {t:'table',head:['Pattern','Signal in the problem','Core line'],rows:[
  ['Seen set','“duplicate”, “first repeat”, “cycle”','<code>if x in seen: …; seen.add(x)</code>'],
  ['Complement lookup','“two numbers that add up to …”','<code>if target - x in seen</code>'],
  ['Counting','“frequency”, “anagram”, “most common”','<code>Counter(items)</code>'],
  ['Group by key','“group”, “categorise”','<code>groups[key(x)].append(x)</code>'],
  ['Prefix sum + map','“subarray with sum k” (negatives allowed)','<code>count += seen[prefix - k]</code>']]},
 {t:'viz',fn:'two-sum-hash',title:'Complement lookup, step by step'},
 {t:'q',ids:['h-dr1','h-dr2','h-b3','h-d3']},
 {t:'q',title:'Code it',ids:['h-longest-consecutive','h-zero-sum','h-nearby-dup']}]},

{title:'Build your own HashMap',short:'Build it',mins:15,lead:'Put it all together: buckets, chaining, and resizing, without using dict.',does:['code','debug'],blocks:[
 {t:'q',title:'Build it from scratch',ids:['build-hashmap']}]}],

challenge:[
 {t:'b2o',title:'Longest Consecutive Sequence: sort → set',qid:'h-longest-consecutive',problem:'<p>Return the length of the longest run of consecutive integers in an unsorted list, e.g. <code>[100, 4, 200, 1, 3, 2]</code> → 4.</p>',
  brute:{note:'For each number, count upward by repeatedly searching the list.',code:`def longest_consecutive(nums):
    best = 0
    for x in nums:
        length = 1
        while x + length in nums:        # list search
            length += 1
        best = max(best, length)
    return best`,cx:'O(n³)',cxOpts:['O(n)','O(n log n)','O(n²)','O(n³)'],why:'For input like [1, 2, …, n]: each <code>in nums</code> scans O(n), the while loop runs up to n times per x, and there are n values of x. That is O(n³) in the worst case.'},
  slow:{q:'Two kinds of waste happen here. Which pair?',opts:['Searching a list (O(n) per check), and recounting the same run from every one of its members','Creating the variable best, and calling max','Using a for loop, and using a while loop','None: this is optimal'],a:0,why:'Starting at 2 recounts most of the run that 1 already counted, and every check scans the list.'},
  better:{q:'What fixes both?',opts:['Sort and binary search each value','A set for O(1) checks, and only start counting at numbers x where x − 1 is absent','A stack','Recursion'],a:1,why:'The set makes checks O(1). Run starts are counted once each, so every number is visited a constant number of times.'},
  optimal:{code:`def longest_consecutive(nums):
    s = set(nums)
    best = 0
    for x in s:
        if x - 1 not in s:
            length = 1
            while x + length in s:
                length += 1
            best = max(best, length)
    return best`,cx:'O(n)',why:'The inner while loop only runs from run starts, so across all x it advances at most n times in total.'},
  takeaway:'<p>A set gives O(1) membership, and a smart “only start here” condition stops you repeating work.</p>'}],

review:[
 {t:'flash',items:[['Average cost of d[key]?','O(1).'],['Worst case?','O(n), if every key collides. Rare in practice.'],['Collision?','Different keys, same bucket.'],['Load factor?','Keys per bucket; exceeding a limit triggers a resize.'],['Why are lists unhashable?','They can change, which would change their hash.'],['Counter vs dict?','Counter returns 0 for missing keys and has most_common.'],['defaultdict trap?','Reading a missing key creates it.'],['Two Sum pattern?','Check target − x in seen, then store x.']]}]
});
