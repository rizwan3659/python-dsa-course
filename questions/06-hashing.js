/* Topic 6 · Hash tables: dict, set, Counter, defaultdict. */
COURSE.qs('hashing',[
/* ---------- predict ---------- */
{id:'h-p1',type:'predict',d:1,p:'hashing',title:'Counter.most_common',code:`from collections import Counter
c = Counter("mississippi")
print(c.most_common(2))`,opts:["[('i', 4), ('s', 4)]","[('s', 4), ('i', 4)]","[('i', 4), ('p', 2)]","['i', 's']"],a:0,why:'i and s both appear 4 times. Ties keep the order in which the keys were first seen (i before s).'},
{id:'h-p2',type:'predict',d:2,p:'hashing',title:'defaultdict creates on read',code:`from collections import defaultdict
d = defaultdict(list)
d["a"].append(1)
d["b"]
print(len(d))`,opts:['1','2','0','KeyError'],a:1,why:'Just <i>reading</i> a missing key on a defaultdict creates it with the default (an empty list). Use <code>"b" in d</code> to test without creating.'},
{id:'h-p3',type:'predict',d:1,p:'hashing',title:'Duplicate keys',code:`d = {"a": 1, "a": 2}
print(d)`,a:"{'a': 2}",why:'Keys are unique. The later value overwrites the earlier one.'},
{id:'h-p4',type:'predict',d:1,p:'hashing',title:'Set operations',code:`a = {1, 2, 3}
b = {2, 3, 4}
print(a & b, a - b)`,a:'{2, 3} {1}',why:'<code>&</code> is intersection, <code>-</code> difference, <code>|</code> union, <code>^</code> symmetric difference.'},
{id:'h-p5',type:'predict',d:1,p:'matrix',title:'Tuples as keys',code:`grid = {(0, 0): "A"}
print(grid.get((0, 0)), (1, 0) in grid)`,a:'A False',why:'Tuples are hashable, so (row, col) pairs make great dict keys for grids.'},
{id:'h-p6',type:'predict',d:2,p:'hashing',title:'Counter arithmetic',code:`from collections import Counter
print(dict(Counter("aab") - Counter("ab")))`,a:"{'a': 1}",why:'Subtracting Counters subtracts counts and drops anything that reaches zero or below.'},
{id:'h-p7',type:'predict',d:1,p:'hashing',title:'Distinct letters',code:`print(len(set("hello")))`,a:'4',why:'h, e, l, o: the two l’s collapse into one.'},
{id:'h-p8',type:'predict',d:2,p:'hashing',title:'setdefault',code:`d = {}
d.setdefault("x", []).append(5)
d.setdefault("x", []).append(6)
print(d)`,a:"{'x': [5, 6]}",why:'<code>setdefault</code> inserts the default only if the key is missing, and returns the stored value either way.'},
{id:'h-p9',type:'predict',d:2,p:'hashing',title:'Equal values hash equally',code:`print(hash(1) == hash(1.0), 1 in {1.0})`,a:'True True',why:'Objects that compare equal must have the same hash, otherwise lookups would miss them.'},
{id:'h-p10',type:'predict',d:2,p:'hashing',title:'Deleting while iterating',code:`d = {"a": 1, "b": 2}
for k in d:
    del d[k]
print(d)`,opts:['{}',"{'b': 2}",'RuntimeError','KeyError'],a:2,why:'Changing a dict’s size while looping over it raises RuntimeError. Loop over <code>list(d)</code> instead.'},
{id:'h-p11',type:'predict',d:1,p:'hashing',title:'Counter never raises',code:`from collections import Counter
c = Counter("abc")
print(c["z"])`,a:'0',why:'A Counter returns 0 for missing keys (without adding them).'},
{id:'h-p12',type:'predict',d:1,p:'sorting',title:'Sort keys by value',code:`scores = {"a": 3, "b": 1, "c": 2}
print(sorted(scores, key=scores.get))`,a:"['b', 'c', 'a']",why:'Iterating a dict gives keys; <code>key=scores.get</code> sorts them by their values.'},

/* ---------- complexity ---------- */
{id:'h-c1',type:'complexity',d:1,p:'hashing',title:'Lookup by key',code:`if key in d:
    value = d[key]`,a:'O(1)',why:'Hash the key, jump to its bucket, check a short chain: constant on average.'},
{id:'h-c2',type:'complexity',d:1,p:'hashing',title:'Building a Counter',code:`from collections import Counter
counts = Counter(words)`,a:'O(n)',why:'One O(1) update per word.'},
{id:'h-c3',type:'complexity',d:3,p:'hashing',title:'The worst case',q:'In the worst case, every key lands in the <b>same bucket</b>. What does one lookup cost then?',code:`value = d[key]`,a:'O(n)',why:'The chain holds all n keys and must be scanned. Good hash functions and resizing make this extremely unlikely, so we say O(1) <i>average</i>.'},
{id:'h-c4',type:'complexity',d:2,p:'hashing',title:'Grouping anagrams by sorted key',q:'n words, each of length at most k. Time complexity?',code:`groups = defaultdict(list)
for w in words:
    groups["".join(sorted(w))].append(w)`,opts:['O(n)','O(n · k)','O(n · k log k)','O(n²)'],a:2,why:'Sorting each word costs k log k, done n times. (Counting letters instead gives O(n · k).)'},
{id:'h-c5',type:'complexity',d:2,p:'hashing',title:'count() inside a loop',code:`dupes = [x for x in nums if nums.count(x) > 1]`,a:'O(n²)',why:'<code>list.count</code> scans the whole list each time. Build a Counter once: O(n).'},
{id:'h-c6',type:'complexity',d:1,p:'hashing',title:'Set from a list',code:`unique = set(nums)`,a:'O(n)',why:'n inserts, each O(1) on average.'},

/* ---------- concepts ---------- */
{id:'h-m1',type:'mcq',d:1,p:'hashing',title:'What is a collision?',q:'In a hash table, a <b>collision</b> is when…',opts:['Two keys are equal','Two different keys map to the same bucket','A key is missing','The table is full'],a:1,why:'There are more possible keys than buckets, so different keys sometimes share a bucket. The table must handle it.'},
{id:'h-m2',type:'mcq',d:1,p:'hashing',title:'Chaining',q:'With <b>chaining</b>, how does a bucket hold several colliding keys?',opts:['It keeps only the newest key','It stores a small list of (key, value) pairs and compares keys within it','It moves one key to the end of the table','It raises an error'],a:1,why:'Lookup = hash to the bucket, then compare keys in its short list. (Python itself uses open addressing, a different strategy with the same goal.)'},
{id:'h-m3',type:'mcq',d:2,p:'hashing',title:'Why can’t a list be a key?',q:'Why does <code>{[1, 2]: "x"}</code> raise <code>TypeError: unhashable type</code>?',opts:['Lists are too long','A list can change after insertion, which would change its hash and lose it in the wrong bucket','Dicts only accept strings','Lists have no == operator'],a:1,why:'Keys must be immutable so their hash never changes. Use a tuple: <code>{(1, 2): "x"}</code>.'},
{id:'h-m4',type:'mcq',d:2,p:'hashing',title:'Why resize?',q:'Why does a hash table grow (rehash into more buckets) as you insert keys?',opts:['To keep chains short so lookups stay O(1) on average','To sort the keys','Because Python lists have a size limit','To free memory'],a:0,why:'Keeping the load factor (keys per bucket) bounded keeps each bucket small.'},
{id:'h-m5',type:'mcq',d:1,p:'hashing',title:'dict ordering',q:'Since Python 3.7, iterating over a dict gives the keys in…',opts:['Sorted order','Random order','Insertion order','Hash order'],a:2,why:'Dicts remember insertion order. Sets do <b>not</b> guarantee any order.'},

/* ---------- choose ---------- */
{id:'h-ch1',type:'choose',d:1,p:'hashing',title:'Count frequencies',q:'You need how many times each word appears in a text.',opts:['list','set','collections.Counter','tuple'],a:2,why:'Counter is a dict built for counting: <code>Counter(words)</code>.'},
{id:'h-ch2',type:'choose',d:1,p:'hashing',title:'Group items by a key',q:'You want to group students into lists by their class name.',opts:['set','defaultdict(list)','Counter','sorted list'],a:1,why:'<code>groups[cls].append(student)</code> with no “is the key there yet?” check.'},
{id:'h-ch3',type:'choose',d:1,p:'matrix',title:'Sparse grid',q:'A 1,000,000 × 1,000,000 grid where only a few hundred cells have values.',opts:['A list of lists','A dict with (row, col) tuple keys','A set of rows','A Counter of columns'],a:1,why:'Store only the cells that exist. A full list of lists would need 10¹² slots.'},
{id:'h-ch4',type:'choose',d:1,p:'hashing',title:'Remove duplicates, order irrelevant',q:'You need the distinct values from a list; order does not matter.',opts:['set(nums)','sorted(nums)','nums[::-1]','A while loop with list.remove'],a:0,why:'One line, O(n).'},

/* ---------- dry runs ---------- */
{id:'h-dr1',type:'dryrun',d:1,p:'hashing',title:'Remember the last index',code:`nums = [3, 1, 4, 3]
seen = {}
for i, x in enumerate(nums):
    seen[x] = i`,cols:['x','seen'],given:[0],rows:[['3','{3: 0}'],['1','{3: 0, 1: 1}'],['4','{3: 0, 1: 1, 4: 2}'],['3','{3: 3, 1: 1, 4: 2}']],why:'Writing an existing key overwrites its value but keeps its original position in the dict.'},
{id:'h-dr2',type:'dryrun',d:2,p:'hashing',title:'Counting complement pairs',code:`nums = [1, 5, 3, 3]
target = 6
seen = set()
pairs = 0
for x in nums:
    if target - x in seen:
        pairs += 1
    seen.add(x)`,cols:['x','pairs'],given:[0],rows:[['1','0'],['5','1'],['3','1'],['3','2']],why:'5 finds its partner 1; the second 3 finds the first 3.'},
{id:'h-dr3',type:'dryrun',d:1,p:'hashing',title:'Which bucket?',code:`keys = [12, 7, 3, 22]
buckets = [[] for _ in range(5)]
for k in keys:
    buckets[k % 5].append(k)`,cols:['k','k % 5'],given:[0],rows:[['12','2'],['7','2'],['3','3'],['22','2']],why:'12, 7 and 22 all collide in bucket 2. With 5 buckets, any keys that differ by a multiple of 5 collide.'},

/* ---------- blanks ---------- */
{id:'h-b1',type:'blanks',d:2,p:'hashing',title:'Complete group_anagrams',code:`from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        key = ______
        groups[key].______
    return list(groups.values())`,blanks:[['"".join(sorted(w))',"''.join(sorted(w))",'tuple(sorted(w))'],['append(w)']],tests:[['group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])','[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]','groups'],['group_anagrams([])','[]']],why:'Anagrams have the same sorted letters, so the sorted string is a perfect grouping key.'},
{id:'h-b2',type:'blanks',d:1,p:'hashing',title:'Complete first_unique',code:`from collections import Counter

def first_unique(s):
    counts = ______
    for i, ch in enumerate(s):
        if ______:
            return i
    return -1`,blanks:[['Counter(s)'],['counts[ch] == 1']],tests:[['first_unique("leetcode")','0'],['first_unique("loveleetcode")','2'],['first_unique("aabb")','-1']],why:'Two passes: count everything, then find the first character whose count is 1.'},
{id:'h-b3',type:'blanks',d:1,p:'hashing',title:'Complete two_sum',code:`def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        need = ______
        if need in seen:
            return ______
        seen[x] = i`,blanks:[['target - x'],['[seen[need], i]']],tests:[['two_sum([2, 7, 11, 15], 9)','[0, 1]'],['two_sum([3, 3], 6)','[0, 1]']],why:'Look for the complement before storing x, so an element is never paired with itself.'},

/* ---------- debug ---------- */
{id:'h-d1',type:'debug',d:1,p:'hashing',title:'Unhashable key',code:`def count_points(points):
    counts = {}
    for p in points:            # p is a list like [x, y]
        counts[p] = counts.get(p, 0) + 1
    return counts`,opts:['get() needs a third argument','A list cannot be a dict key: convert it with tuple(p)','counts should be a set','The loop should use range'],a:1,why:'Lists are mutable, so they are unhashable. <code>tuple(p)</code> works.',fix:`def count_points(points):
    counts = {}
    for p in points:
        key = tuple(p)
        counts[key] = counts.get(key, 0) + 1
    return counts`,tests:[['count_points([[1, 2], [1, 2], [0, 0]])','{(1, 2): 2, (0, 0): 1}']]},
{id:'h-d2',type:'debug',d:1,p:'hashing',title:'Counting from nothing',code:`def counts(words):
    d = {}
    for w in words:
        d[w] += 1
    return d`,opts:['+= is not allowed on dicts','The first time a word appears it has no entry, so d[w] raises KeyError','words must be sorted first','d should be a list'],a:1,why:'Use <code>d[w] = d.get(w, 0) + 1</code>, <code>defaultdict(int)</code> or <code>Counter</code>.',fix:`def counts(words):
    d = {}
    for w in words:
        d[w] = d.get(w, 0) + 1
    return d`,tests:[['counts(["a", "b", "a"])','{"a": 2, "b": 1}'],['counts([])','{}']]},
{id:'h-d3',type:'debug',d:2,p:'hashing',title:'Pairs with itself',code:`def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        seen[x] = i
        if target - x in seen:
            return [seen[target - x], i]`,opts:['enumerate starts at 1','It stores x before checking, so x can match itself (two_sum([3, 2, 4], 6) returns [0, 0])','seen should be a list','The return is reversed'],a:1,why:'Check the complement <b>before</b> adding the current number.',fix:`def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i`,tests:[['two_sum([3, 2, 4], 6)','[1, 2]'],['two_sum([3, 3], 6)','[0, 1]']]},
{id:'h-d4',type:'debug',d:1,p:'hashing',title:'Anagram check with sets',code:`def is_anagram(a, b):
    return set(a) == set(b)`,opts:['Sets are unordered, so it fails for "ab" and "ba"','Sets drop counts: "aab" and "abb" look like anagrams','It should use sorted(set(a))','Nothing is wrong'],a:1,why:'Anagrams need equal <b>counts</b>, not just equal letters. Compare Counters (or sorted strings).',fix:`from collections import Counter

def is_anagram(a, b):
    return Counter(a) == Counter(b)`,tests:[['is_anagram("aab", "abb")','False'],['is_anagram("listen", "silent")','True']]},
{id:'h-d5',type:'debug',d:2,p:'hashing',title:'Cleaning zeros out of a dict',code:`def drop_zeros(d):
    for k in d:
        if d[k] == 0:
            del d[k]
    return d`,opts:['del does not work on dicts','The dict changes size during iteration: RuntimeError','== 0 should be is 0','It deletes the wrong keys'],a:1,why:'Iterate over a snapshot of the keys, <code>list(d)</code>, or build a new dict with a comprehension.',fix:`def drop_zeros(d):
    for k in list(d):
        if d[k] == 0:
            del d[k]
    return d`,tests:[['drop_zeros({"a": 0, "b": 1, "c": 0})','{"b": 1}']]},

/* ---------- code ---------- */
{id:'h-anagram',type:'code',d:1,p:'hashing',title:'Valid Anagram',prompt:'<p>Return True if <code>t</code> is an anagram of <code>s</code> (same letters, same counts).</p>',starter:`def is_anagram(s, t):
    pass`,solution:`from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)`,tests:[['is_anagram("anagram", "nagaram")','True'],['is_anagram("rat", "car")','False'],['is_anagram("", "")','True'],['is_anagram("ab", "a")','False'],['is_anagram("aab", "abb")','False']],hints:['Sorting both strings and comparing works in O(n log n).','Counting letters works in O(n).'],approach:'Compare letter counts (Counter or a 26-slot array).',cx:'O(n) time'},
{id:'h-group-anagrams',type:'code',d:2,p:'hashing',title:'Group Anagrams',prompt:'<p>Group the words that are anagrams of each other. Return a list of groups (any order of groups and of words inside a group).</p><p><code>["eat", "tea", "tan", "ate", "nat", "bat"]</code> → <code>[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]</code></p>',starter:`def group_anagrams(words):
    pass`,solution:`from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())`,tests:[['group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])','[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]','groups'],['group_anagrams([""])','[[""]]','groups'],['group_anagrams(["a"])','[["a"]]','groups'],['group_anagrams(["ab", "ba", "abc"])','[["ab", "ba"], ["abc"]]','groups']],hints:['What do all anagrams of a word have in common?','Use that as a dict key and collect words in lists.'],approach:'Key = sorted letters (or a tuple of 26 counts); defaultdict(list).',cx:'O(n · k log k) time'},
{id:'h-intersection',type:'code',d:1,p:'hashing',title:'Intersection of Two Arrays',prompt:'<p>Return the distinct values that appear in both lists, in ascending order.</p>',starter:`def intersection(a, b):
    pass`,solution:`def intersection(a, b):
    return sorted(set(a) & set(b))`,tests:[['intersection([1, 2, 2, 1], [2, 2])','[2]'],['intersection([4, 9, 5], [9, 4, 9, 8, 4])','[4, 9]'],['intersection([], [1])','[]']],hints:['Sets have an intersection operator.'],approach:'set(a) & set(b), then sort.',cx:'O(n + m) plus sorting the result'},
{id:'h-intersect-counts',type:'code',d:1,p:'hashing',title:'Intersection With Counts',prompt:'<p>Each value should appear as many times as it appears in <b>both</b> lists. Return the result in ascending order.</p><p><code>intersect([1, 2, 2, 1], [2, 2])</code> → <code>[2, 2]</code></p>',starter:`def intersect(a, b):
    pass`,solution:`from collections import Counter

def intersect(a, b):
    both = Counter(a) & Counter(b)       # minimum of the counts
    return sorted(both.elements())`,tests:[['intersect([1, 2, 2, 1], [2, 2])','[2, 2]'],['intersect([4, 9, 5], [9, 4, 9, 8, 4])','[4, 9]'],['intersect([1, 1, 1], [1, 1])','[1, 1]'],['intersect([], [])','[]']],hints:['Count each list.','For each value, keep min(count in a, count in b) copies.'],approach:'Counter & Counter takes the minimum count per key.',cx:'O(n + m) plus sorting'},
{id:'h-freq-sort',type:'code',d:2,p:'hashing',title:'Sort Characters by Frequency',prompt:'<p>Rearrange the string so that more frequent characters come first. Break ties by character order (<code>"A" &lt; "a"</code>).</p><p><code>"tree"</code> → <code>"eert"</code></p>',starter:`def frequency_sort(s):
    pass`,solution:`from collections import Counter

def frequency_sort(s):
    counts = Counter(s)
    order = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    return "".join(ch * n for ch, n in order)`,tests:[['frequency_sort("tree")','"eert"'],['frequency_sort("cccaaa")','"aaaccc"'],['frequency_sort("Aabb")','"bbAa"'],['frequency_sort("")','""']],hints:['Count first.','Sort (char, count) pairs by count descending, then by char: key=lambda kv: (-kv[1], kv[0]).'],approach:'Counter, sort by (−count, char), rebuild with ch * count.',cx:'O(n + k log k) for k distinct characters'},
{id:'h-top-k',type:'code',d:2,p:'heap-topk',title:'Top K Frequent Elements',prompt:'<p>Return the k most frequent values, most frequent first. Break ties with the smaller value first.</p><p><code>top_k_frequent([1, 1, 1, 2, 2, 3], 2)</code> → <code>[1, 2]</code></p>',starter:`def top_k_frequent(nums, k):
    pass`,solution:`from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    order = sorted(counts, key=lambda x: (-counts[x], x))
    return order[:k]`,tests:[['top_k_frequent([1, 1, 1, 2, 2, 3], 2)','[1, 2]'],['top_k_frequent([1], 1)','[1]'],['top_k_frequent([4, 4, 5, 5, 6], 2)','[4, 5]'],['top_k_frequent([3, 0, 1, 0], 1)','[0]']],hints:['Count with a Counter.','Sorting the distinct values by (−count, value) is simple. A heap or bucket sort can beat O(n log n).'],approach:'Count, then sort keys by frequency (or heapq.nlargest, or buckets indexed by count for O(n)).',cx:'O(n log n) simple; O(n) with buckets'},
{id:'h-longest-consecutive',type:'code',d:2,p:'hashing',title:'Longest Consecutive Sequence',prompt:'<p>Return the length of the longest run of consecutive integers (in any order in the list). Aim for O(n), so no sorting.</p><p><code>[100, 4, 200, 1, 3, 2]</code> → <code>4</code> (1, 2, 3, 4)</p>',starter:`def longest_consecutive(nums):
    pass`,solution:`def longest_consecutive(nums):
    s = set(nums)
    best = 0
    for x in s:
        if x - 1 not in s:            # x starts a run
            length = 1
            while x + length in s:
                length += 1
            best = max(best, length)
    return best`,tests:[['longest_consecutive([100, 4, 200, 1, 3, 2])','4'],['longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])','9'],['longest_consecutive([])','0'],['longest_consecutive([1, 2, 0, 1])','3']],hints:['Sorting gives O(n log n). For O(n), put everything in a set.','Only start counting from numbers x where x − 1 is NOT in the set: those are run starts.'],approach:'Set + count upward only from run starts, so each number is visited O(1) times.',cx:'O(n) time, O(n) space'},
{id:'h-nearby-dup',type:'code',d:1,p:'hashing',title:'Contains Nearby Duplicate',prompt:'<p>Return True if two equal values sit at positions i ≠ j with <code>abs(i - j) &lt;= k</code>.</p>',starter:`def contains_nearby_duplicate(nums, k):
    pass`,solution:`def contains_nearby_duplicate(nums, k):
    last = {}
    for i, x in enumerate(nums):
        if x in last and i - last[x] <= k:
            return True
        last[x] = i
    return False`,tests:[['contains_nearby_duplicate([1, 2, 3, 1], 3)','True'],['contains_nearby_duplicate([1, 0, 1, 1], 1)','True'],['contains_nearby_duplicate([1, 2, 3, 1, 2, 3], 2)','False'],['contains_nearby_duplicate([], 0)','False']],hints:['Remember the most recent index of each value.'],approach:'Dict value → last index.',cx:'O(n) time'},
{id:'h-isomorphic',type:'code',d:1,p:'hashing',title:'Isomorphic Strings',prompt:'<p>Two strings are isomorphic if the characters of s can be replaced (consistently, one-to-one) to get t. <code>"egg"</code>/<code>"add"</code> → True, <code>"foo"</code>/<code>"bar"</code> → False.</p>',starter:`def is_isomorphic(s, t):
    pass`,solution:`def is_isomorphic(s, t):
    if len(s) != len(t):
        return False
    st, ts = {}, {}
    for a, b in zip(s, t):
        if st.setdefault(a, b) != b or ts.setdefault(b, a) != a:
            return False
    return True`,tests:[['is_isomorphic("egg", "add")','True'],['is_isomorphic("foo", "bar")','False'],['is_isomorphic("paper", "title")','True'],['is_isomorphic("badc", "baba")','False']],hints:['Map s → t, and check each mapping stays consistent.','You also need the reverse map: two letters of s cannot map to the same letter of t.'],approach:'Two dicts (s→t and t→s).',cx:'O(n) time'},
{id:'h-word-pattern',type:'code',d:1,p:'hashing',title:'Word Pattern',prompt:'<p>Does the sentence follow the pattern? <code>("abba", "dog cat cat dog")</code> → True; <code>("abba", "dog dog dog dog")</code> → False.</p>',starter:`def word_pattern(pattern, s):
    pass`,solution:`def word_pattern(pattern, s):
    words = s.split()
    if len(words) != len(pattern):
        return False
    return len(set(pattern)) == len(set(words)) == len(set(zip(pattern, words)))`,tests:[['word_pattern("abba", "dog cat cat dog")','True'],['word_pattern("abba", "dog cat cat fish")','False'],['word_pattern("aaaa", "dog cat cat dog")','False'],['word_pattern("abba", "dog dog dog dog")','False'],['word_pattern("ab", "dog")','False']],hints:['Same idea as isomorphic strings, with words instead of letters.','Neat trick: a bijection exists iff the number of distinct letters, distinct words and distinct (letter, word) pairs are all equal.'],approach:'Two maps, or the distinct-count trick.',cx:'O(n) time'},
{id:'h-ransom',type:'code',d:1,p:'hashing',title:'Ransom Note',prompt:'<p>Can the note be written using letters from the magazine (each letter used once)?</p>',starter:`def can_construct(note, magazine):
    pass`,solution:`from collections import Counter

def can_construct(note, magazine):
    have = Counter(magazine)
    for ch, n in Counter(note).items():
        if have[ch] < n:
            return False
    return True`,tests:[['can_construct("a", "b")','False'],['can_construct("aa", "aab")','True'],['can_construct("aa", "ab")','False'],['can_construct("", "x")','True']],hints:['Count the magazine letters.'],approach:'Counter of the magazine must cover the note’s counts.',cx:'O(n + m) time'},
{id:'h-longest-pal',type:'code',d:1,p:'hashing',title:'Longest Palindrome From Letters',prompt:'<p>Using the letters of <code>s</code> (case-sensitive), how long is the longest palindrome you can build?</p><p><code>"abccccdd"</code> → <code>7</code> (e.g. "dccaccd")</p>',starter:`def longest_palindrome(s):
    pass`,solution:`from collections import Counter

def longest_palindrome(s):
    length = 0
    odd = False
    for n in Counter(s).values():
        length += n // 2 * 2
        if n % 2:
            odd = True
    return length + (1 if odd else 0)`,tests:[['longest_palindrome("abccccdd")','7'],['longest_palindrome("a")','1'],['longest_palindrome("Aa")','1'],['longest_palindrome("aabb")','4'],['longest_palindrome("")','0']],hints:['Pairs of letters can go on both sides.','One leftover single letter may sit in the middle.'],approach:'Sum the even part of each count, plus 1 if any count is odd.',cx:'O(n) time'},
{id:'h-zero-sum',type:'code',d:2,p:'prefix-sum',title:'Zero-Sum Subarray Exists',prompt:'<p>Return True if some non-empty contiguous subarray sums to 0.</p><p><code>[4, 2, -3, 1, 6]</code> → True (2, −3, 1)</p>',starter:`def has_zero_sum(nums):
    pass`,solution:`def has_zero_sum(nums):
    seen = {0}
    total = 0
    for x in nums:
        total += x
        if total in seen:
            return True
        seen.add(total)
    return False`,tests:[['has_zero_sum([4, 2, -3, 1, 6])','True'],['has_zero_sum([4, 2, 0, 1])','True'],['has_zero_sum([1, 2, 3])','False'],['has_zero_sum([])','False'],['has_zero_sum([-5, 5])','True']],hints:['If two prefix sums are equal, what do the numbers between them add up to?','Store prefix sums in a set (start with 0).'],approach:'Prefix sums + set: a repeated prefix sum means a zero-sum stretch.',cx:'O(n) time'},
{id:'h-four-sum-count',type:'code',d:2,p:'hashing',title:'4Sum Count',prompt:'<p>Count tuples (i, j, k, l) with <code>a[i] + b[j] + c[k] + d[l] == 0</code>. All four lists have length n.</p>',starter:`def four_sum_count(a, b, c, d):
    pass`,solution:`from collections import Counter

def four_sum_count(a, b, c, d):
    ab = Counter(x + y for x in a for y in b)
    return sum(ab[-(x + y)] for x in c for y in d)`,tests:[['four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2])','2'],['four_sum_count([0], [0], [0], [0])','1'],['four_sum_count([1], [1], [1], [1])','0']],hints:['Four nested loops is O(n⁴).','Split it: count all sums a + b in a dict, then for each c + d look up its negative.'],approach:'Meet in the middle with a Counter of pair sums.',cx:'O(n²) time and space'},
{id:'h-contiguous',type:'code',d:2,p:'prefix-sum',title:'Contiguous Array (equal 0s and 1s)',prompt:'<p>Return the length of the longest contiguous subarray with the same number of 0s and 1s.</p><p><code>[0, 1, 0]</code> → <code>2</code></p>',starter:`def find_max_length(nums):
    pass`,solution:`def find_max_length(nums):
    first = {0: -1}          # running balance -> first index it appeared
    balance = best = 0
    for i, x in enumerate(nums):
        balance += 1 if x == 1 else -1
        if balance in first:
            best = max(best, i - first[balance])
        else:
            first[balance] = i
    return best`,tests:[['find_max_length([0, 1])','2'],['find_max_length([0, 1, 0])','2'],['find_max_length([0, 0, 1, 0, 0, 0, 1, 1])','6'],['find_max_length([])','0']],hints:['Treat 0 as −1. Now you want the longest subarray with sum 0.','Same running sum at indexes i and j → the part between them is balanced. Store the FIRST index of each sum.'],approach:'Prefix balance + dict of first occurrence.',cx:'O(n) time'},
{id:'h-unique-occ',type:'code',d:1,p:'hashing',title:'Unique Number of Occurrences',prompt:'<p>Return True if no two different values occur the same number of times.</p>',starter:`def unique_occurrences(nums):
    pass`,solution:`from collections import Counter

def unique_occurrences(nums):
    counts = Counter(nums).values()
    return len(counts) == len(set(counts))`,tests:[['unique_occurrences([1, 2, 2, 1, 1, 3])','True'],['unique_occurrences([1, 2])','False'],['unique_occurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0])','True']],hints:['Count, then check the counts for duplicates.'],approach:'Counter, then a set of the counts.',cx:'O(n) time'},
{id:'h-jewels',type:'code',d:1,p:'hashing',title:'Jewels and Stones',prompt:'<p>Each character of <code>jewels</code> is a jewel type. How many characters of <code>stones</code> are jewels?</p>',starter:`def num_jewels(jewels, stones):
    pass`,solution:`def num_jewels(jewels, stones):
    j = set(jewels)
    return sum(1 for s in stones if s in j)`,tests:[['num_jewels("aA", "aAAbbbb")','3'],['num_jewels("z", "ZZ")','0'],['num_jewels("", "abc")','0']],hints:['Put the jewel types in a set.'],approach:'Set lookup per stone.',cx:'O(n + m) time'},
{id:'h-happy',type:'code',d:1,p:'hashing',title:'Happy Number',prompt:'<p>Repeatedly replace n by the sum of the squares of its digits. n is happy if this reaches 1; otherwise it loops forever. Return True if n is happy.</p><p><code>19</code> → True (1² + 9² = 82 → 68 → 100 → 1)</p>',starter:`def is_happy(n):
    pass`,solution:`def is_happy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1`,tests:[['is_happy(19)','True'],['is_happy(2)','False'],['is_happy(1)','True'],['is_happy(7)','True']],hints:['How do you know a sequence is looping? You see a number again.'],approach:'Set of seen numbers detects the cycle (Floyd’s fast/slow pointers also work).',cx:'O(log n) per step'},
{id:'h-find-anagrams',type:'code',d:2,p:'sliding-window',title:'Find All Anagrams in a String',prompt:'<p>Return the start indexes of every substring of <code>s</code> that is an anagram of <code>p</code>.</p><p><code>find_anagrams("cbaebabacd", "abc")</code> → <code>[0, 6]</code></p>',starter:`def find_anagrams(s, p):
    pass`,solution:`from collections import Counter

def find_anagrams(s, p):
    k = len(p)
    need = Counter(p)
    window = Counter(s[:k])
    out = [0] if window == need and len(s) >= k else []
    for right in range(k, len(s)):
        window[s[right]] += 1
        left_ch = s[right - k]
        window[left_ch] -= 1
        if window[left_ch] == 0:
            del window[left_ch]
        if window == need:
            out.append(right - k + 1)
    return out`,tests:[['find_anagrams("cbaebabacd", "abc")','[0, 6]'],['find_anagrams("abab", "ab")','[0, 1, 2]'],['find_anagrams("a", "ab")','[]'],['find_anagrams("aaa", "a")','[0, 1, 2]']],hints:['Every candidate substring has length len(p): a fixed-size window.','Keep letter counts of the window and update them as it slides.'],approach:'Fixed sliding window with a Counter compared against Counter(p).',cx:'O(n) time (26-letter counters)'},
{id:'h-k-distinct',type:'code',d:2,p:'sliding-window',title:'Longest Substring With At Most K Distinct Characters',prompt:'<p>Return the length of the longest substring that contains at most <code>k</code> distinct characters.</p><p><code>("eceba", 2)</code> → <code>3</code> ("ece")</p>',starter:`def longest_k_distinct(s, k):
    pass`,solution:`from collections import defaultdict

def longest_k_distinct(s, k):
    counts = defaultdict(int)
    left = best = 0
    for right, ch in enumerate(s):
        counts[ch] += 1
        while len(counts) > k:
            counts[s[left]] -= 1
            if counts[s[left]] == 0:
                del counts[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best`,tests:[['longest_k_distinct("eceba", 2)','3'],['longest_k_distinct("aa", 1)','2'],['longest_k_distinct("abc", 0)','0'],['longest_k_distinct("", 2)','0'],['longest_k_distinct("aabbcc", 2)','4']],hints:['Variable window: grow right; while there are too many distinct letters, shrink left.','A dict of counts tells you how many distinct letters are inside: len(counts).'],approach:'Sliding window + dict of counts (delete keys that hit zero).',cx:'O(n) time'}
]);
