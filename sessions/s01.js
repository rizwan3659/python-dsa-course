COURSE.add({id:'s01',n:1,part:'A',
title:'Python for DSA and how to solve problems',
goal:'Get fluent with the Python tools every algorithm uses, and learn a repeatable way to attack a new problem.',
outcomes:['Use lists, tuples, dicts and sets confidently','Read and write slicing, comprehensions, enumerate and zip','Follow a 6-step method for any coding problem','Solve and test small problems in the browser'],
modules:[
{title:'How to solve any coding problem',tab:'Problem solving',mins:15,out:'Know the 6-step method',lead:'Most beginners start typing immediately. Strong problem solvers spend the first few minutes understanding and planning, and the code comes out right the first time.',blocks:[
 {t:'cards',title:'The UMPIRE method',intro:'Use this on every exercise in the course. Click each step.',items:[
  {tag:'U',title:'Understand',sub:'Restate the problem',body:'<p>Say the problem in your own words. What is the input? What is the output? Write 2 examples by hand, including an edge case (empty list, one element, negatives, duplicates).</p>'},
  {tag:'M',title:'Match',sub:'Seen something similar?',body:'<p>Does it look like a known pattern? Counting → dictionary. Sorted input → two pointers or binary search. "All combinations" → recursion. You will collect these patterns throughout the course.</p>'},
  {tag:'P',title:'Plan',sub:'Steps in plain English',body:'<p>Write the steps as comments before any code. If you cannot explain the plan, you are not ready to code it.</p>'},
  {tag:'I',title:'Implement',sub:'Turn the plan into code',body:'<p>Translate each comment into a few lines. Use clear names: <code>count</code>, not <code>c</code>.</p>'},
  {tag:'R',title:'Review',sub:'Trace by hand',body:'<p>Run your examples through the code in your head (or with <code>print</code>). Check the edge cases.</p>'},
  {tag:'E',title:'Evaluate',sub:'How fast? How much memory?',body:'<p>State the time and space complexity (session 2). Could it be faster?</p>'}]},
 {t:'teacher',items:['Show a problem ("find the largest number in a list") and ask students to do only U and P aloud before anyone types.','Set expectations: every session has exercises with automatic tests. Press Check; green means done.']}]},

{title:'Python toolkit I: lists, tuples and slicing',tab:'Lists',mins:25,out:'Predict list operations',lead:'A Python list is an ordered, changeable sequence. It is the array you will use most in this course.',blocks:[
 {t:'code',title:'Lists: create, index, change',code:`
nums = [5, 3, 8, 1]
print(nums[0], nums[-1])     # first and last: 5 1
nums.append(9)               # add to the end
nums[1] = 30                 # change an item
print(nums, len(nums))       # [5, 30, 8, 1, 9] 5
print(sorted(nums))          # new sorted list; nums itself is unchanged
nums.sort(reverse=True)      # sorts nums in place
print(nums)`},
 {t:'code',title:'Slicing: list[start:stop:step]',code:`
letters = ["a", "b", "c", "d", "e", "f"]
print(letters[1:4])    # ['b', 'c', 'd']  (stop is excluded)
print(letters[:3])     # first three
print(letters[-2:])    # last two
print(letters[::2])    # every second item
print(letters[::-1])   # reversed copy
point = (3, 4)         # a tuple: like a list, but cannot be changed
x, y = point           # unpacking
print(x + y)`},
 {t:'mcq',title:'Predict the output',items:[
  {q:'<code>a = [1, 2, 3, 4, 5]; print(a[1:3])</code>',opts:['[1, 2, 3]','[2, 3]','[2, 3, 4]'],a:1,why:'Start 1 included, stop 3 excluded.'},
  {q:'<code>a = [4, 1, 3]; b = a.sort(); print(b)</code>',opts:['[1, 3, 4]','None','[4, 1, 3]'],a:1,why:'<code>sort()</code> changes the list in place and returns None. Use <code>sorted(a)</code> for a new list.'},
  {q:'<code>a = [1, 2]; b = a; b.append(3); print(a)</code>',opts:['[1, 2]','[1, 2, 3]'],a:1,why:'<code>b = a</code> does not copy: both names point to the same list. Use <code>a.copy()</code> or <code>a[:]</code> to copy.'},
  {q:'<code>"python"[::-1]</code>',opts:['"nohtyp"','"python"','Error'],a:0,why:'Strings slice like lists.'}]}]},

{title:'Python toolkit II: dicts, sets, loops and functions',tab:'Dicts + sets',mins:25,out:'Use dicts and sets for counting and lookup',lead:'A dictionary maps keys to values; a set holds unique items. Both look things up in about one step, which is why they appear in so many fast solutions.',blocks:[
 {t:'code',title:'Dictionaries and sets',code:`
ages = {"asha": 21, "ravi": 19}
ages["meera"] = 22                 # add
print(ages.get("john", 0))         # default if missing: 0
for name, age in ages.items():
    print(name, age)

seen = set()
for x in [3, 1, 3, 2, 1]:
    seen.add(x)
print(seen, 2 in seen)             # {1, 2, 3} True`},
 {t:'code',title:'Counting: the most common pattern in this course',code:`
from collections import Counter

text = "banana"
counts = {}
for ch in text:
    counts[ch] = counts.get(ch, 0) + 1
print(counts)                      # {'b': 1, 'a': 3, 'n': 2}
print(Counter(text).most_common(1))  # [('a', 3)]`},
 {t:'code',title:'Comprehensions, enumerate and zip',code:`
nums = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
print(squares, evens)

for i, value in enumerate(["x", "y", "z"]):
    print(i, value)

names, scores = ["a", "b"], [90, 75]
print(dict(zip(names, scores)))    # {'a': 90, 'b': 75}

def average(values):
    """Return the mean of a non-empty list."""
    return sum(values) / len(values)
print(average(scores))`},
 {t:'mcq',items:[
  {q:'Best structure to check "have I seen this number before?" many times?',opts:['list','set','tuple'],a:1,why:'<code>x in set</code> takes about one step; <code>x in list</code> scans the list.'},
  {q:'<code>d = {}; d["a"] += 1</code>',opts:['d is {"a": 1}','KeyError'],a:1,why:'The key does not exist yet. Use <code>d.get("a", 0) + 1</code> or <code>collections.defaultdict(int)</code>.'},
  {q:'<code>[x * 2 for x in range(4) if x != 2]</code>',opts:['[0, 2, 6]','[0, 2, 4, 6]','[2, 6]'],a:0}]}]},

{title:'Coding exercises',tab:'Exercises',mins:40,out:'4 exercises solved',lead:'Write the function, press <b>Run</b> to try it with your own prints, then <b>Check</b> to run the tests. Use UMPIRE: examples and a plan first.',blocks:[
 {t:'exercise',title:'Exercise 1 · Count vowels',prompt:'<p>Write <code>count_vowels(s)</code> that returns how many vowels (a, e, i, o, u, upper or lower case) are in the string <code>s</code>.</p><p>Example: <code>count_vowels("Hello World")</code> → <code>3</code></p>',
  starter:`
def count_vowels(s):
    # your code here
    pass

print(count_vowels("Hello World"))`,
  solution:`
def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in "aeiou")`,
  tests:[['count_vowels("Hello World")','3'],['count_vowels("")','0'],['count_vowels("AEIOU aeiou")','10'],['count_vowels("rhythm")','0']],
  hint:'Lower-case the string once, then loop and check <code>ch in "aeiou"</code>.'},
 {t:'exercise',title:'Exercise 2 · Second largest',prompt:'<p>Write <code>second_largest(nums)</code> that returns the second largest <b>distinct</b> value, or <code>None</code> if there is none.</p><p><code>second_largest([4, 9, 2, 9])</code> → <code>4</code> · <code>second_largest([7, 7])</code> → <code>None</code></p>',
  starter:`
def second_largest(nums):
    # your code here
    pass`,
  solution:`
def second_largest(nums):
    first = second = None
    for x in nums:
        if first is None or x > first:
            first, second = x, first
        elif x != first and (second is None or x > second):
            second = x
    return second`,
  tests:[['second_largest([4, 9, 2, 9])','4'],['second_largest([7, 7])','None'],['second_largest([])','None'],['second_largest([-1, -5, -3])','-3'],['second_largest([1, 2])','1']],
  hint:'A short version: <code>sorted(set(nums))</code> and take the second from the end if it exists. Can you do it in one pass without sorting?',explain:'One pass keeps the two largest distinct values seen so far. The short version with <code>sorted(set(nums))</code> is also correct, just slower (it sorts).'},
 {t:'exercise',title:'Exercise 3 · Word frequency',prompt:'<p>Write <code>word_freq(text)</code> that returns a dict mapping each lower-case word to how many times it appears. Words are separated by spaces.</p><p><code>word_freq("the cat and The dog")</code> → <code>{"the": 2, "cat": 1, "and": 1, "dog": 1}</code></p>',
  starter:`
def word_freq(text):
    # your code here
    pass`,
  solution:`
def word_freq(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts`,
  tests:[['word_freq("the cat and The dog")','{"the": 2, "cat": 1, "and": 1, "dog": 1}'],['word_freq("")','{}'],['word_freq("a a a")','{"a": 3}']]},
 {t:'exercise',title:'Exercise 4 · Remove duplicates, keep order',prompt:'<p>Write <code>dedupe(items)</code> that returns a new list without duplicates, keeping the <b>first</b> occurrence order.</p><p><code>dedupe([3, 1, 3, 2, 1])</code> → <code>[3, 1, 2]</code></p>',
  starter:`
def dedupe(items):
    # your code here
    pass`,
  solution:`
def dedupe(items):
    seen = set()
    result = []
    for x in items:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result`,
  tests:[['dedupe([3, 1, 3, 2, 1])','[3, 1, 2]'],['dedupe([])','[]'],['dedupe(["b", "a", "b"])','["b", "a"]']],
  hint:'Keep a set of what you have seen, and a list for the answer.'},
 {t:'teacher',items:['Let students struggle for 5 minutes per exercise before showing hints. Ask the fastest finishers to explain their plan, not their code.','Exercise 2 has a nice discussion: sorting is O(n log n), one pass is O(n). This sets up session 2.']}]},

{title:'Review',tab:'Review',mins:15,out:'Flashcards + homework',blocks:[
 {t:'flash',items:[['UMPIRE?','Understand, Match, Plan, Implement, Review, Evaluate.'],['sort() vs sorted()?','sort() changes the list and returns None; sorted() returns a new list.'],['b = a for lists?','Both names refer to the same list. Copy with a[:] or a.copy().'],['Fast membership check?','Use a set or dict, not a list.'],['Counting idiom?','counts[x] = counts.get(x, 0) + 1, or collections.Counter.'],['Reverse a list or string?','x[::-1]']]},
 {t:'task',title:'Homework',items:['Write <code>is_anagram(a, b)</code> two ways: with sorting, and with counting.','Write <code>chunk(items, k)</code> that splits a list into lists of size k.']}]}
]});
