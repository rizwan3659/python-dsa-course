/* Topic 1 · Python for DSA. Lessons 1, 3, 4 and 6 come from the original session 1; each now ends in practice. */
COURSE.topic({id:'python',
goal:'Get fluent with the Python tools every algorithm uses, and learn a repeatable way to attack a new problem.',
learn:[
{title:'How to solve any coding problem',short:'Problem solving',mins:6,lead:'Most beginners start typing immediately. Strong problem solvers spend the first few minutes understanding and planning, and the code comes out right the first time.',does:['concept'],blocks:[
 {t:'cards',title:'The UMPIRE method',intro:'Use this on every exercise in the course. Click each step.',items:[
  {tag:'U',title:'Understand',sub:'Restate the problem',body:'<p>Say the problem in your own words. What is the input? What is the output? Write 2 examples by hand, including an edge case (empty list, one element, negatives, duplicates).</p>'},
  {tag:'M',title:'Match',sub:'Seen something similar?',body:'<p>Does it look like a known pattern? Counting → dictionary. Sorted input → two pointers or binary search. “All combinations” → recursion. You will collect these patterns throughout the course.</p>'},
  {tag:'P',title:'Plan',sub:'Steps in plain English',body:'<p>Write the steps as comments before any code. If you cannot explain the plan, you are not ready to code it.</p>'},
  {tag:'I',title:'Implement',sub:'Turn the plan into code',body:'<p>Translate each comment into a few lines. Use clear names: <code>count</code>, not <code>c</code>.</p>'},
  {tag:'R',title:'Review',sub:'Trace by hand',body:'<p>Run your examples through the code in your head (or with <code>print</code>). Check the edge cases.</p>'},
  {tag:'E',title:'Evaluate',sub:'How fast? How much memory?',body:'<p>State the time and space complexity (topic 2). Could it be faster?</p>'}]},
 {t:'q',ids:['py-m3']}]},

{title:'Variables, conditions, loops and functions',short:'Basics',mins:8,lead:'A quick revision of the core syntax. If these feel easy, race through the questions.',does:['predict','dry run','debug'],blocks:[
 {t:'code',title:'The essentials on one screen',code:`a, b = 7, 2
print(a // b, a % b, a / b)        # 3 1 3.5

if a > 5:
    print("big")
elif a > 2:
    print("medium")
else:
    print("small")

for i in range(3):                 # 0, 1, 2
    print(i)

n = 16
while n > 1:
    n //= 2

def area(w, h=1):                  # h has a default value
    return w * h

print(area(3), area(3, 4))`},
 {t:'q',ids:['py-p1','py-p2','py-p3','py-p4']},
 {t:'q',ids:['py-dr1','py-dr2']},
 {t:'q',ids:['py-p6','py-p21']},
 {t:'q',title:'Find the bug',ids:['py-d3','py-d4']}]},

{title:'Lists, tuples and slicing',short:'Lists',mins:8,lead:'A Python list is an ordered, changeable sequence. It is the array you will use most in this course. A tuple is the same idea, but cannot change.',does:['predict','code'],blocks:[
 {t:'code',title:'Lists: create, index, change',code:`nums = [5, 3, 8, 1]
print(nums[0], nums[-1])     # first and last: 5 1
nums.append(9)               # add to the end
nums[1] = 30                 # change an item
print(nums, len(nums))       # [5, 30, 8, 1, 9] 5
print(sorted(nums))          # new sorted list; nums itself is unchanged
nums.sort(reverse=True)      # sorts nums in place
print(nums)`},
 {t:'code',title:'Slicing: list[start:stop:step]',code:`letters = ["a", "b", "c", "d", "e", "f"]
print(letters[1:4])    # ['b', 'c', 'd']  (stop is excluded)
print(letters[:3])     # first three
print(letters[-2:])    # last two
print(letters[::2])    # every second item
print(letters[::-1])   # reversed copy
point = (3, 4)         # a tuple: like a list, but cannot be changed
x, y = point           # unpacking
print(x + y)`},
 {t:'q',ids:['py-p15','py-p16','py-p7','py-p23']},
 {t:'q',title:'Code it',ids:['py-chunk']}]},

{title:'Dicts and sets',short:'Dicts + sets',mins:9,lead:'A dictionary maps keys to values; a set holds unique items. Both look things up in about one step, which is why they appear in so many fast solutions.',does:['predict','dry run','complete','code'],blocks:[
 {t:'code',title:'Dictionaries and sets',code:`ages = {"asha": 21, "ravi": 19}
ages["meera"] = 22                 # add
print(ages.get("john", 0))         # default if missing: 0
for name, age in ages.items():
    print(name, age)

seen = set()
for x in [3, 1, 3, 2, 1]:
    seen.add(x)
print(seen, 2 in seen)             # {1, 2, 3} True`},
 {t:'code',title:'Counting: the most common pattern in this course',code:`from collections import Counter

text = "banana"
counts = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)                      # {'b': 1, 'a': 3, 'n': 2}
print(Counter(text).most_common(1))  # [('a', 3)]`},
 {t:'q',ids:['py-p8','py-p10','py-p25','py-ch1','py-ch2']},
 {t:'q',ids:['py-dr3','py-b1']},
 {t:'q',title:'Code it',ids:['py-word-freq','py-dedupe']}]},

{title:'References and mutability',short:'References',mins:8,lead:'Python names point at objects. Two names can point at the same list, and changing it through one name changes what the other sees. This causes more beginner bugs than anything else.',does:['visualize','predict','debug'],blocks:[
 {t:'viz',fn:'references',title:'Names → objects',intro:'Step through each scenario. Before each step, predict what the arrows will look like.'},
 {t:'grid',items:[
  {title:'Mutable',body:'list, dict, set: can change in place. Shared references see the change.'},
  {title:'Immutable',body:'int, float, str, tuple: “changing” always builds a new object.'},
  {title:'Copy when needed',body:'<code>a[:]</code>, <code>a.copy()</code>, <code>list(a)</code>, <code>dict(d)</code>. These are shallow copies.'}]},
 {t:'q',ids:['py-p14','py-p22','py-p24','py-m1','py-p18']},
 {t:'q',title:'Find the bug',ids:['py-d1']}]},

{title:'Comprehensions, enumerate, zip and lambda',short:'Pythonic tools',mins:8,lead:'Short, readable tools you will use in almost every solution.',does:['predict','complete','code'],blocks:[
 {t:'code',title:'Comprehensions, enumerate and zip',code:`nums = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
print(squares, evens)

for i, value in enumerate(["x", "y", "z"]):
    print(i, value)

names, scores = ["a", "b"], [90, 75]
print(dict(zip(names, scores)))    # {'a': 90, 'b': 75}

pairs = [(2, "b"), (1, "z"), (2, "a")]
print(sorted(pairs, key=lambda p: (p[0], p[1])))   # sort by a key function`},
 {t:'q',ids:['py-p11','py-p26','py-p12','py-p13','py-p19','py-p20','py-p27','py-p28']},
 {t:'q',ids:['py-b2','py-b4']},
 {t:'q',title:'Code it',ids:['py-count-vowels','py-transpose']}]},

{title:'Classes: the building block for data structures',short:'Classes',mins:7,lead:'Every data structure you build from scratch (stack, linked list, tree…) is a class: data stored on self, plus methods that change it.',does:['predict','complete','code'],blocks:[
 {t:'code',title:'A tiny class',code:`class Node:
    def __init__(self, val, next=None):
        self.val = val          # data lives on the object
        self.next = next

    def __repr__(self):
        return f"Node({self.val})"

a = Node(1)
b = Node(2, a)                  # b.next points at a
print(b, b.next, b.next.next)   # Node(2) Node(1) None`},
 {t:'q',ids:['py-p17','py-m2','py-b3']},
 {t:'q',title:'Code it',ids:['py-bank']}]},

{title:'Errors, copies and input',short:'Errors & input',mins:12,lead:'Real programs meet bad input, and real bugs come from sharing data you meant to copy. Handle the errors you expect, copy deliberately, and parse input in a few standard lines.',does:['predict','concept','debug','code'],blocks:[
 {t:'code',title:'try / except / else / finally',code:`def to_int(text):
    try:
        value = int(text)
    except ValueError:            # only the error you expect
        print("not a number:", text)
        return None
    else:                         # runs when nothing was raised
        return value
    finally:                      # always runs (clean-up)
        print("checked", text)

print(to_int("42"), to_int("4x2"))`},
 {t:'q',ids:['py-e1','py-e3','py-e5','py-e8']},
 {t:'grid',items:[
  {title:'Alias',body:'<code>b = a</code>: two names, one object.'},
  {title:'Shallow copy',body:'<code>a[:]</code>, <code>a.copy()</code>, <code>list(a)</code>: a new outer list, the <b>same</b> inner objects.'},
  {title:'Deep copy',body:'<code>copy.deepcopy(a)</code> or <code>[row[:] for row in grid]</code> for a grid: everything new.'}]},
 {t:'q',ids:['py-e2','py-e6','py-e9']},
 {t:'code',title:'Reading input quickly',code:`import sys

def main(text):
    data = text.split()           # all tokens at once (fast)
    n = int(data[0])
    nums = list(map(int, data[1:1 + n]))
    print(sum(nums))

main("3\\n4 5 6")                 # with real input: main(sys.stdin.read())`},
 {t:'q',ids:['py-e4','py-e7']},
 {t:'q',title:'Code it',ids:['py-safe-divide','py-read-matrix','py-parse-scores','py-deep-copy']}]}],

review:[
 {t:'flash',title:'Flashcards',items:[['UMPIRE?','Understand, Match, Plan, Implement, Review, Evaluate.'],['sort() vs sorted()?','sort() changes the list and returns None; sorted() returns a new list.'],['b = a for lists?','Both names refer to the same list. Copy with a[:] or a.copy().'],['Fast membership check?','Use a set or dict, not a list.'],['Counting idiom?','counts[x] = counts.get(x, 0) + 1, or collections.Counter.'],['Reverse a list or string?','x[::-1]'],['Mutable default argument?','Created once and shared. Use None and create inside.'],['Valid dict keys?','Hashable (immutable) values: numbers, strings, tuples.']]},
 {t:'task',title:'Homework',items:['Write <code>is_anagram(a, b)</code> two ways: with sorting, and with counting.','Write a <code>Matrix</code> class with <code>rows</code>, <code>cols</code> and a <code>transpose()</code> method.']}]
});
