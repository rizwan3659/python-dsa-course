/* Topic 1 · Python for DSA. Includes the exercises from the original session 1. */
COURSE.qs('python',[
/* ---------- predict ---------- */
{id:'py-p1',type:'predict',d:1,p:'python',title:'Swap in one line',code:`a, b = 1, 2
a, b = b, a
print(a, b)`,a:'2 1',why:'The right side is built first as a tuple (2, 1), then unpacked into a and b. No temp variable needed.'},
{id:'py-p2',type:'predict',d:1,p:'python',title:'Three kinds of division',code:`print(7 // 2, 7 % 2, 7 / 2)`,a:'3 1 3.5',why:'<code>//</code> is floor division, <code>%</code> the remainder, <code>/</code> always gives a float.'},
{id:'py-p3',type:'predict',d:1,p:'python',title:'if / elif order',code:`x = 15
if x > 10:
    print("big")
elif x > 5:
    print("medium")
else:
    print("small")`,opts:['big','medium','big\nmedium','small'],a:0,why:'Only the first true branch runs. 15 > 10, so the elif is never checked.'},
{id:'py-p4',type:'predict',d:1,p:'python',title:'range with a step',code:`print(list(range(2, 10, 3)))`,a:'[2, 5, 8]',why:'Start at 2, add 3 each time, stop before 10.'},
{id:'py-p5',type:'predict',d:1,p:'python',title:'Counting halvings',code:`n = 10
count = 0
while n > 1:
    n //= 2
    count += 1
print(count)`,a:'3',hints:['Write down n after each step: 10 → ?'],why:'10 → 5 → 2 → 1: three steps. Halving loops run about log₂(n) times.'},
{id:'py-p6',type:'predict',d:1,p:'python',title:'The forgotten return',code:`def double(x):
    x * 2

print(double(3))`,opts:['6','None','3','Error'],a:1,why:'A function without a <code>return</code> statement returns <code>None</code>. The value x * 2 is computed and thrown away.'},
{id:'py-p7',type:'predict',d:1,p:'python',title:'Tuple unpacking',code:`point = (3, 4)
x, y = point
print(x * y)`,a:'12',why:'Unpacking assigns each tuple item to a name in order.'},
{id:'py-p8',type:'predict',d:1,p:'hashing',title:'dict.get with a default',code:`d = {"a": 1}
print(d.get("b", 0), d.get("a"))`,a:'0 1',why:'<code>get(key, default)</code> returns the default instead of raising KeyError.'},
{id:'py-p9',type:'predict',d:1,p:'hashing',title:'Looping over a dict',code:`d = {"x": 1, "y": 2}
for k, v in d.items():
    print(k, v)`,a:'x 1\ny 2',why:'<code>items()</code> yields (key, value) pairs. Dicts keep insertion order.'},
{id:'py-p10',type:'predict',d:1,p:'hashing',title:'Sets drop duplicates',code:`s = {3, 1, 3, 2, 1}
print(len(s), 2 in s)`,a:'3 True',why:'A set keeps one copy of each value: {1, 2, 3}. Membership checks are O(1) on average.'},
{id:'py-p11',type:'predict',d:1,p:'python',title:'Comprehension with a filter',code:`print([x * 2 for x in range(5) if x % 2])`,a:'[2, 6]',why:'<code>x % 2</code> is truthy for odd x: 1 and 3, doubled.'},
{id:'py-p12',type:'predict',d:1,p:'python',title:'zip stops at the shortest',code:`print(list(zip([1, 2, 3], "ab")))`,opts:["[(1, 'a'), (2, 'b')]","[(1, 'a'), (2, 'b'), (3, None)]","[1, 'a', 2, 'b']",'Error'],a:0,why:'<code>zip</code> pairs items up and stops when the shorter input runs out.'},
{id:'py-p13',type:'predict',d:1,p:'sorting',title:'Sorting with a key',code:`words = ["bb", "a", "ccc"]
print(sorted(words, key=len))`,a:"['a', 'bb', 'ccc']",why:'<code>key=len</code> sorts by length. A lambda works too: <code>key=lambda w: len(w)</code>.'},
{id:'py-p14',type:'predict',d:1,p:'python',title:'Two names, one list',code:`a = [1, 2]
b = a
b.append(3)
print(a)`,opts:['[1, 2]','[1, 2, 3]'],a:1,why:'<code>b = a</code> does not copy: both names point to the same list. Use <code>a.copy()</code> or <code>a[:]</code> to copy.'},
{id:'py-p15',type:'predict',d:1,p:'sorting',title:'What sort() returns',code:`a = [4, 1, 3]
b = a.sort()
print(b)`,opts:['[1, 3, 4]','None','[4, 1, 3]'],a:1,why:'<code>sort()</code> changes the list in place and returns None. Use <code>sorted(a)</code> for a new list.'},
{id:'py-p16',type:'predict',d:1,p:'python',title:'Reverse a string',code:`print("python"[::-1])`,a:'nohtyp',why:'Strings slice like lists; a step of −1 walks backwards.'},
{id:'py-p17',type:'predict',d:1,p:'design',title:'Objects keep state',code:`class Counter:
    def __init__(self):
        self.n = 0

    def inc(self):
        self.n += 1
        return self.n

c = Counter()
c.inc()
print(c.inc())`,a:'2',why:'<code>self.n</code> lives on the object, so it remembers the first call.'},
{id:'py-p18',type:'predict',d:2,p:'python',title:'The mutable default trap',code:`def add(x, items=[]):
    items.append(x)
    return items

add(1)
print(add(2))`,opts:['[2]','[1, 2]','[1]','Error'],a:1,why:'The default list is created <b>once</b>, when the function is defined, and shared by every call. Use <code>items=None</code> and create the list inside.'},
{id:'py-p19',type:'predict',d:1,p:'python',title:'enumerate a string',code:`for i, ch in enumerate("hi"):
    print(i, ch)`,a:'0 h\n1 i',why:'enumerate yields (index, item) pairs starting at 0.'},
{id:'py-p20',type:'predict',d:1,p:'python',title:'Dict comprehension',code:`print({x: x * x for x in range(3)})`,a:'{0: 0, 1: 1, 2: 4}',why:'<code>{key: value for …}</code> builds a dict in one expression.'},
{id:'py-p21',type:'predict',d:2,p:'python',title:'Local vs global',code:`x = 5

def f():
    x = 10
    return x

f()
print(x)`,a:'5',why:'Assigning to x inside f creates a <b>local</b> x. The global x is untouched.'},
{id:'py-p22',type:'predict',d:2,p:'python',title:'== vs is',code:`a = [1]
b = [1]
print(a == b, a is b)`,a:'True False',why:'<code>==</code> compares values; <code>is</code> asks “the very same object?”. These are two equal lists.'},
{id:'py-p23',type:'predict',d:1,p:'python',title:'Tuples cannot change',code:`t = (1, 2)
t[0] = 5
print(t)`,opts:['(5, 2)','(1, 2)','TypeError','IndexError'],a:2,why:'Tuples are immutable. That is also why they can be dict keys and set members.'},
{id:'py-p24',type:'predict',d:1,p:'python',title:'String methods return new strings',code:`s = "cat"
s.upper()
print(s)`,a:'cat',why:'Strings are immutable: <code>upper()</code> returns a new string, which was thrown away. Write <code>s = s.upper()</code>.'},
{id:'py-p25',type:'predict',d:1,p:'hashing',title:'Missing key',code:`d = {}
d["a"] += 1
print(d)`,opts:["{'a': 1}",'KeyError','{}'],a:1,why:'The key does not exist yet. Use <code>d.get("a", 0) + 1</code> or <code>collections.defaultdict(int)</code>.'},
{id:'py-p26',type:'predict',d:1,p:'python',title:'Filter and map',code:`print([x * 2 for x in range(4) if x != 2])`,opts:['[0, 2, 6]','[0, 2, 4, 6]','[2, 6]'],a:0,why:'x runs over 0, 1, 3 (2 is skipped); each is doubled.'},
{id:'py-p27',type:'predict',d:1,p:'python',title:'any and all',code:`print(any([0, "", 3]), all([1, 0]))`,a:'True False',why:'<code>any</code>: is at least one item truthy? (3 is). <code>all</code>: are all truthy? (0 is not).'},
{id:'py-p28',type:'predict',d:1,p:'python',title:'max with a key',code:`print(max(["apple", "kiwi", "banana"], key=len))`,a:'banana',why:'The key function decides what is compared: lengths 5, 4, 6.'},

/* ---------- choose / concept ---------- */
{id:'py-ch1',type:'choose',d:1,p:'hashing',title:'Fast “seen before?”',q:'Best structure to check “have I seen this number before?” many times?',opts:['list','set','tuple'],a:1,why:'<code>x in set</code> takes about one step; <code>x in list</code> scans the list.'},
{id:'py-ch2',type:'choose',d:1,p:'hashing',title:'What can be a dict key?',q:'Which of these can be used as a dictionary key?',opts:['[1, 2]','(1, 2)','{1, 2}','{"a": 1}'],a:1,why:'Keys must be hashable, which means immutable. Tuples (of immutable items) are; lists, sets and dicts are not.'},
{id:'py-m1',type:'mcq',d:1,p:'python',title:'Making a real copy',q:'Which line gives <code>b</code> an independent copy of the list <code>a</code>?',opts:['b = a','b = a[:]','b == a','b = a.sort()'],a:1,why:'A full slice builds a new list. (So do <code>a.copy()</code> and <code>list(a)</code>.) It is a shallow copy: inner lists are still shared.'},
{id:'py-m2',type:'mcq',d:1,p:'design',title:'What is self?',q:'Inside a method, what does <code>self</code> refer to?',opts:['The class itself','The object the method was called on','The previous object created','A global variable'],a:1,why:'<code>c.inc()</code> is really <code>Counter.inc(c)</code>: self is c.'},
{id:'py-m3',type:'mcq',d:1,p:'python',title:'UMPIRE: first step',q:'You get a new problem. What do you do first?',opts:['Start typing the code','Restate it and work two examples by hand, including an edge case','Look up the solution','Pick a data structure at random'],a:1,why:'Understand first: input, output, examples, edge cases (empty, one item, duplicates, negatives).'},

/* ---------- dry runs ---------- */
{id:'py-dr1',type:'dryrun',d:1,p:'python',title:'Two counters',code:`nums = [3, -1, 4]
pos = 0
neg = 0
for n in nums:
    if n > 0:
        pos += n
    else:
        neg += 1`,cols:['n','pos','neg'],given:[0],rows:[['3','3','0'],['-1','3','1'],['4','7','1']],why:'Positive numbers are added to pos; anything else increases neg.'},
{id:'py-dr2',type:'dryrun',d:1,p:'python',title:'Halving loop',code:`n = 20
steps = 0
while n > 1:
    n //= 2
    steps += 1`,cols:['n','steps'],rows:[['10','1'],['5','2'],['2','3'],['1','4']],why:'20 → 10 → 5 → 2 → 1. The loop stops as soon as n is 1.'},
{id:'py-dr3',type:'dryrun',d:1,p:'hashing',title:'Counting with a dict',code:`counts = {}
for ch in "abca":
    counts[ch] = counts.get(ch, 0) + 1`,cols:['ch','counts'],given:[0],rows:[['a',"{'a': 1}"],['b',"{'a': 1, 'b': 1}"],['c',"{'a': 1, 'b': 1, 'c': 1}"],['a',"{'a': 2, 'b': 1, 'c': 1}"]],why:'The counting idiom: read the old count (default 0), add one, store it back.'},

/* ---------- blanks ---------- */
{id:'py-b1',type:'blanks',d:1,p:'hashing',title:'The counting idiom',code:`def char_count(text):
    counts = {}
    for ch in text:
        counts[ch] = ______
    return counts`,blanks:[['counts.get(ch, 0) + 1','counts.get(ch,0)+1','1 + counts.get(ch, 0)']],tests:[['char_count("abca")','{"a": 2, "b": 1, "c": 1}'],['char_count("")','{}']],why:'<code>get</code> with a default of 0 handles characters seen for the first time.'},
{id:'py-b2',type:'blanks',d:1,p:'python',title:'Filter with a comprehension',code:`def evens(nums):
    return [______]`,blanks:[['x for x in nums if x % 2 == 0','n for n in nums if n % 2 == 0']],tests:[['evens([1, 2, 3, 4])','[2, 4]'],['evens([])','[]'],['evens([-2, 5])','[-2]']],why:'<code>[expression for item in iterable if condition]</code>.'},
{id:'py-b3',type:'blanks',d:1,p:'design',title:'Complete the class',code:`class Point:
    def __init__(self, x, y):
        ______
        ______

    def dist2(self):
        return self.x ** 2 + self.y ** 2`,blanks:[['self.x = x'],['self.y = y']],tests:[['Point(3, 4).dist2()','25'],['Point(0, 0).dist2()','0']],why:'<code>__init__</code> stores the arguments on the object so other methods can use them through self.'},
{id:'py-b4',type:'blanks',d:1,p:'python',title:'Two lists into a dict',code:`def make_dict(keys, values):
    return dict(______)`,blanks:[['zip(keys, values)']],tests:[['make_dict(["a", "b"], [1, 2])','{"a": 1, "b": 2}'],['make_dict([], [])','{}']],why:'<code>zip</code> makes (key, value) pairs and <code>dict</code> turns pairs into a dictionary.'},

/* ---------- debug ---------- */
{id:'py-d1',type:'debug',d:2,p:'python',title:'Tags that remember',code:`def add_tag(tag, tags=[]):
    tags.append(tag)
    return tags`,opts:['append should be extend','The default list is created once and shared between calls','tags should be a tuple','return should be inside a loop'],a:1,why:'Call it twice with no list and the second call returns <code>["a", "b"]</code>. Default to None and create a fresh list inside.',fix:`def add_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags`,tests:[['add_tag("a")','["a"]'],['add_tag("b")','["b"]'],['add_tag("c", ["x"])','["x", "c"]']]},
{id:'py-d2',type:'debug',d:1,p:'python',title:'A square of nothing',code:`def square(x):
    x * x`,opts:['x * x should be x ** 2','The function never returns the value, so it returns None','The parameter needs a type','It should print instead'],a:1,why:'Without <code>return</code>, Python returns None.',fix:`def square(x):
    return x * x`,tests:[['square(3)','9'],['square(-2)','4']]},
{id:'py-d3',type:'debug',d:1,p:'python',title:'Returns too early',code:`def total(nums):
    t = 0
    for n in nums:
        t += n
        return t`,opts:['t should start at 1','return is indented inside the loop, so it returns after the first number','+= should be =','The loop should use range'],a:1,why:'Indentation is logic in Python. Move <code>return t</code> out of the loop.',fix:`def total(nums):
    t = 0
    for n in nums:
        t += n
    return t`,tests:[['total([1, 2, 3])','6'],['total([])','0']]},
{id:'py-d4',type:'debug',d:1,p:'python',title:'Nobody is excellent',code:`def label(score):
    if score >= 50:
        return "pass"
    elif score >= 90:
        return "excellent"
    return "fail"`,opts:['>= should be >','The 90 check can never run: anything ≥ 90 already matched ≥ 50. Check 90 first','elif should be if','It should return numbers'],a:1,why:'Order conditions from most specific to least specific.',fix:`def label(score):
    if score >= 90:
        return "excellent"
    elif score >= 50:
        return "pass"
    return "fail"`,tests:[['label(95)','"excellent"'],['label(60)','"pass"'],['label(10)','"fail"']]},

/* ---------- code (exercises 1, 3, 4 come from the original session 1) ---------- */
{id:'py-count-vowels',type:'code',d:1,p:'python',title:'Count Vowels',prompt:'<p>Write <code>count_vowels(s)</code> that returns how many vowels (a, e, i, o, u, upper or lower case) are in the string <code>s</code>.</p><p><code>count_vowels("Hello World")</code> → <code>3</code></p>',starter:`def count_vowels(s):
    # your code here
    pass

print(count_vowels("Hello World"))`,solution:`def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in "aeiou")`,tests:[['count_vowels("Hello World")','3'],['count_vowels("")','0'],['count_vowels("AEIOU aeiou")','10'],['count_vowels("rhythm")','0']],hints:['Lower-case the string once.','Loop over the characters and check <code>ch in "aeiou"</code>.'],approach:'Normalise case, then count matching characters.',cx:'O(n) time'},
{id:'py-word-freq',type:'code',d:1,p:'hashing',title:'Word Frequency',prompt:'<p>Write <code>word_freq(text)</code> that returns a dict mapping each lower-case word to how many times it appears. Words are separated by spaces.</p><p><code>word_freq("the cat and The dog")</code> → <code>{"the": 2, "cat": 1, "and": 1, "dog": 1}</code></p>',starter:`def word_freq(text):
    # your code here
    pass`,solution:`def word_freq(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts`,tests:[['word_freq("the cat and The dog")','{"the": 2, "cat": 1, "and": 1, "dog": 1}'],['word_freq("")','{}'],['word_freq("a a a")','{"a": 3}']],hints:['<code>text.lower().split()</code> gives the words.','Use the counting idiom: <code>counts[w] = counts.get(w, 0) + 1</code>.'],approach:'Split, then count with a dict (or collections.Counter).',cx:'O(n) time'},
{id:'py-dedupe',type:'code',d:1,p:'hashing',title:'Remove Duplicates, Keep Order',prompt:'<p>Write <code>dedupe(items)</code> that returns a new list without duplicates, keeping the <b>first</b> occurrence order.</p><p><code>dedupe([3, 1, 3, 2, 1])</code> → <code>[3, 1, 2]</code></p>',starter:`def dedupe(items):
    # your code here
    pass`,solution:`def dedupe(items):
    seen = set()
    result = []
    for x in items:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result`,tests:[['dedupe([3, 1, 3, 2, 1])','[3, 1, 2]'],['dedupe([])','[]'],['dedupe(["b", "a", "b"])','["b", "a"]']],hints:['Keep a set of what you have seen, and a list for the answer.','<code>list(set(items))</code> loses the order: why?'],approach:'Set for O(1) “seen?” checks, list for the ordered output.',cx:'O(n) time, O(n) space'},
{id:'py-fizzbuzz',type:'code',d:1,p:'python',title:'FizzBuzz',prompt:'<p>Return a list of strings for 1..n: "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for both, otherwise the number as a string.</p>',starter:`def fizzbuzz(n):
    pass`,solution:`def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out`,tests:[['fizzbuzz(5)','["1", "2", "Fizz", "4", "Buzz"]'],['fizzbuzz(15)[-1]','"FizzBuzz"'],['fizzbuzz(0)','[]']],hints:['Check the “both” case first.'],approach:'Loop 1..n with if/elif in the right order.',cx:'O(n) time'},
{id:'py-chunk',type:'code',d:1,p:'python',title:'Chunk a List',prompt:'<p>Split a list into lists of size <code>k</code> (the last may be shorter).</p><p><code>chunk([1, 2, 3, 4, 5], 2)</code> → <code>[[1, 2], [3, 4], [5]]</code></p>',starter:`def chunk(items, k):
    pass`,solution:`def chunk(items, k):
    return [items[i:i + k] for i in range(0, len(items), k)]`,tests:[['chunk([1, 2, 3, 4, 5], 2)','[[1, 2], [3, 4], [5]]'],['chunk([], 3)','[]'],['chunk([1, 2, 3], 3)','[[1, 2, 3]]']],hints:['range(0, len(items), k) gives the start of each chunk.','A slice past the end is safe.'],approach:'Step through start indexes in jumps of k and slice.',cx:'O(n) time'},
{id:'py-invert',type:'code',d:1,p:'hashing',title:'Invert a Dictionary',prompt:'<p>Swap keys and values. All values are distinct.</p><p><code>invert({"a": 1, "b": 2})</code> → <code>{1: "a", 2: "b"}</code></p>',starter:`def invert(d):
    pass`,solution:`def invert(d):
    return {v: k for k, v in d.items()}`,tests:[['invert({"a": 1, "b": 2})','{1: "a", 2: "b"}'],['invert({})','{}']],hints:['A dict comprehension over d.items().'],approach:'Dict comprehension.',cx:'O(n) time'},
{id:'py-longest-word',type:'code',d:1,p:'python',title:'Longest Word',prompt:'<p>Return the longest word in a sentence (the first one if there is a tie), or "" for an empty sentence.</p>',starter:`def longest_word(sentence):
    pass`,solution:`def longest_word(sentence):
    words = sentence.split()
    return max(words, key=len) if words else ""`,tests:[['longest_word("the quick brown fox")','"quick"'],['longest_word("")','""'],['longest_word("a bb cc")','"bb"']],hints:['max() accepts key=len and keeps the first of equal items.'],approach:'split, then max with key=len.',cx:'O(n) time'},
{id:'py-bank',type:'code',d:1,p:'design',title:'BankAccount Class',prompt:'<p>Write a class <code>BankAccount</code>:</p><ul><li><code>BankAccount(owner)</code> starts with <code>balance = 0</code></li><li><code>deposit(amount)</code> adds to the balance</li><li><code>withdraw(amount)</code> subtracts and returns True, or returns False (and changes nothing) if there is not enough money</li></ul>',starter:`class BankAccount:
    def __init__(self, owner):
        pass`,solution:`class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True`,post:`def _t1():
    a = BankAccount("asha")
    a.deposit(50)
    return a.balance
def _t2():
    a = BankAccount("ravi")
    a.deposit(10)
    return (a.withdraw(30), a.balance)
def _t3():
    a = BankAccount("meera")
    a.deposit(40)
    return (a.withdraw(15), a.balance)`,tests:[['_t1()','50','','deposit(50) → balance 50'],['_t2()','(False, 10)','','withdraw more than the balance → False, balance unchanged'],['_t3()','(True, 25)','','deposit 40, withdraw 15 → True, balance 25']],hints:['Store owner and balance on self in __init__.','withdraw: check first, then change.'],approach:'Attributes on self; methods read and update them.',cx:'O(1) per operation'},
{id:'py-transpose',type:'code',d:2,p:'matrix',title:'Transpose a Matrix',prompt:'<p>Return the transpose of a rectangular matrix (rows become columns), as a list of lists.</p><p><code>[[1, 2, 3], [4, 5, 6]]</code> → <code>[[1, 4], [2, 5], [3, 6]]</code></p>',starter:`def transpose(m):
    pass`,solution:`def transpose(m):
    return [list(col) for col in zip(*m)]`,tests:[['transpose([[1, 2, 3], [4, 5, 6]])','[[1, 4], [2, 5], [3, 6]]'],['transpose([[7]])','[[7]]'],['transpose([])','[]']],hints:['Element m[r][c] moves to position [c][r].','Pythonic trick: zip(*m) yields the columns as tuples.'],approach:'Nested comprehension, or zip(*m).',cx:'O(rows × cols) time'},
{id:'py-group-len',type:'code',d:2,p:'hashing',title:'Group Words by Length',prompt:'<p>Return a dict mapping each word length to the list of words with that length, in their original order.</p><p><code>group_by_len(["hi", "cat", "yo", "dog"])</code> → <code>{2: ["hi", "yo"], 3: ["cat", "dog"]}</code></p>',starter:`def group_by_len(words):
    pass`,solution:`from collections import defaultdict

def group_by_len(words):
    groups = defaultdict(list)
    for w in words:
        groups[len(w)].append(w)
    return dict(groups)`,tests:[['group_by_len(["hi", "cat", "yo", "dog"])','{2: ["hi", "yo"], 3: ["cat", "dog"]}'],['group_by_len([])','{}']],hints:['Use the length as the key.','defaultdict(list) creates an empty list the first time you touch a key.'],approach:'defaultdict(list) keyed by length.',cx:'O(n) time'}
]);
