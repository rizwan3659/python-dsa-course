/* Topic 6 · Stack. */
COURSE.qs('stack',[
{id:'s-p1',type:'predict',d:1,p:'stack',title:'Push three, pop one',code:`s = []
s.append(1)
s.append(2)
s.append(3)
s.pop()
print(s)`,a:'[1, 2]',why:'pop() removes the most recently pushed item: 3.'},
{id:'s-p2',type:'predict',d:1,p:'stack',title:'Pop order',code:`s = [1, 2, 3]
print(s.pop(), s.pop(), s)`,a:'3 2 [1]',why:'Last in, first out: 3 comes off first, then 2.'},
{id:'s-p3',type:'predict',d:1,p:'stack',title:'A stack reverses',code:`s = []
for ch in "abc":
    s.append(ch)
out = ""
while s:
    out += s.pop()
print(out)`,a:'cba',why:'Pushing then popping everything reverses the order.'},
{id:'s-p4',type:'predict',d:1,p:'stack',title:'Pop, change, push back',code:`s = [5]
s.append(s[-1] * 2)
s.append(s.pop() + 1)
print(s)`,a:'[5, 11]',why:'[5] → [5, 10]; then 10 is popped, 11 pushed.'},
{id:'s-p5',type:'predict',d:2,p:'stack',title:'Undo',code:`history = []
text = ""
for word in ["hi", " there", "!"]:
    history.append(text)
    text += word
text = history.pop()
print(text)`,a:'hi there',why:'Before each edit the old text is saved. Undo pops the most recent saved state.'},
{id:'s-p6',type:'predict',d:2,p:'stack',title:'Evaluate postfix',code:`stack = []
for t in "3 4 + 2 *".split():
    if t.isdigit():
        stack.append(int(t))
    else:
        b, a = stack.pop(), stack.pop()
        stack.append(a + b if t == "+" else a * b)
print(stack[0])`,a:'14',why:'3 4 + → 7, then 7 2 * → 14. Postfix needs no parentheses: the stack holds pending operands.'},
{id:'s-p7',type:'predict',d:1,p:'stack',title:'Pop an empty stack',code:`s = []
print(s.pop())`,opts:['None','[]','IndexError','0'],a:2,why:'Check <code>if s:</code> before popping.'},
{id:'s-p8',type:'predict',d:2,p:'recursion',title:'The call stack unwinds',code:`def f(n):
    if n == 0:
        return
    print(n)
    f(n - 1)
    print(-n)

f(2)`,a:'2\n1\n-1\n-2',why:'Each call waits on the call stack. Code after the recursive call runs as the stack unwinds, in reverse order.'},
{id:'s-c1',type:'complexity',d:1,p:'stack',title:'push and pop on a list',code:`stack.append(x)
top = stack.pop()`,a:'O(1)',why:'Both work at the end of the list.'},
{id:'s-c2',type:'complexity',d:1,p:'stack',title:'Checking brackets',code:`def is_valid(s):
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif not stack or stack.pop() != {")": "(", "]": "[", "}": "{"}[ch]:
            return False
    return not stack`,a:'O(n)',why:'One O(1) stack operation per character.'},
{id:'s-c3',type:'complexity',d:2,p:'monotonic-stack',title:'A while inside a for',code:`for i, x in enumerate(nums):
    while stack and nums[stack[-1]] < x:
        result[stack.pop()] = x
    stack.append(i)`,a:'O(n)',hints:['How many times can each index be pushed? Popped?'],why:'It looks nested, but each index is pushed once and popped at most once: at most 2n stack operations in total. This is amortized analysis.'},
{id:'s-c4',type:'complexity',d:2,p:'stack',title:'Brute-force next greater',code:`for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[j] > nums[i]:
            result[i] = nums[j]
            break`,a:'O(n²)',why:'For a decreasing list, every inner loop runs to the end. The monotonic stack does it in O(n).'},
{id:'s-c5',type:'complexity',d:2,p:'design',title:'Min stack getMin',q:'A min stack keeps a second stack holding the minimum so far. Cost of <code>get_min()</code>?',code:`def get_min(self):
    return self.mins[-1]`,a:'O(1)',why:'The answer is precomputed at every push.'},
{id:'s-m1',type:'mcq',d:1,p:'stack',title:'LIFO',q:'LIFO means…',opts:['Last in, first out','Largest in, first out','List in, function out','Last item, first index'],a:0,why:'The most recently added item leaves first, like a pile of plates.'},
{id:'s-m2',type:'mcq',d:1,p:'stack',title:'Stacks in real life',q:'Which of these naturally uses a stack?',opts:['A printer queue','The browser Back button','A playlist on shuffle','Sorting exam scores'],a:1,why:'Back returns to the most recent page: last visited, first returned.'},
{id:'s-m3',type:'mcq',d:2,p:'monotonic-stack',title:'Monotonic stack',q:'In “next greater element”, what does the stack hold at any moment?',opts:['All numbers seen so far, sorted','Indexes still waiting for a greater element, with decreasing values','The answers','Only the maximum'],a:1,why:'A new bigger value resolves (pops) all the smaller waiting ones, so the waiting values are always decreasing.'},
{id:'s-m4',type:'mcq',d:1,p:'recursion',title:'The call stack',q:'When f calls g, where does Python remember where to continue in f?',opts:['In a queue','On the call stack','In a global variable','It does not need to'],a:1,why:'Each call pushes a frame; returning pops it. Too many frames → RecursionError.'},
{id:'s-ch1',type:'choose',d:1,p:'stack',title:'Undo in an editor',q:'Ctrl+Z should undo the most recent action first.',opts:['Queue','Stack','Set','Heap'],a:1,why:'Most recent first = LIFO.'},
{id:'s-ch2',type:'choose',d:1,p:'stack',title:'Matching tags',q:'Check that HTML-like tags &lt;a&gt;&lt;b&gt;&lt;/b&gt;&lt;/a&gt; are properly nested.',opts:['Stack','Queue','Dict only','Sorting'],a:0,why:'The most recently opened tag must close first.'},
{id:'s-ch3',type:'choose',d:1,p:'queue',title:'Serving customers',q:'Customers must be served in the order they arrived.',opts:['Stack','Queue','Heap','Set'],a:1,why:'First come, first served is FIFO: a queue. A stack would serve the newest customer first.'},
{id:'s-dr1',type:'dryrun',d:1,p:'stack',title:'Bracket stack',code:`s = "([])"
stack = []
for ch in s:
    if ch in "([":
        stack.append(ch)
    else:
        stack.pop()`,cols:['ch','stack'],given:[0],rows:[['(',"['(']"],['[',"['(', '[']"],[']',"['(']"],[')','[]']],why:'Openers are pushed, closers pop their partner. Empty at the end means balanced.'},
{id:'s-dr2',type:'dryrun',d:2,p:'stack',title:'Postfix evaluation',code:`tokens = "2 3 + 4 *".split()
stack = []
for t in tokens:
    if t.isdigit():
        stack.append(int(t))
    else:
        b = stack.pop()
        a = stack.pop()
        stack.append(a + b if t == "+" else a * b)`,cols:['t','stack'],given:[0],rows:[['2','[2]'],['3','[2, 3]'],['+','[5]'],['4','[5, 4]'],['*','[20]']],why:'An operator pops its two operands and pushes the result.'},
{id:'s-dr3',type:'dryrun',d:2,p:'monotonic-stack',title:'Next greater, by hand',code:`nums = [2, 1, 3]
result = [-1, -1, -1]
stack = []
for i, x in enumerate(nums):
    while stack and nums[stack[-1]] < x:
        result[stack.pop()] = x
    stack.append(i)`,cols:['i','stack','result'],given:[0],rows:[['0','[0]','[-1, -1, -1]'],['1','[0, 1]','[-1, -1, -1]'],['2','[2]','[3, 3, -1]']],why:'3 is greater than both waiting values, so it pops index 1 and index 0 and becomes their answer.'},
{id:'s-b1',type:'blanks',d:1,p:'stack',title:'Complete is_valid',code:`def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            ______
        elif not stack or ______:
            return False
    return ______`,blanks:[['stack.append(ch)'],['stack.pop() != pairs[ch]','pairs[ch] != stack.pop()'],['not stack','len(stack) == 0','stack == []']],tests:[['is_valid("()[]{}")','True'],['is_valid("(]")','False'],['is_valid("((")','False'],['is_valid(")")','False']],why:'Openers go on the stack; a closer must match the top; leftovers mean unbalanced.'},
{id:'s-b2',type:'blanks',d:2,p:'design',title:'Complete the min stack',code:`class MinStack:
    def __init__(self):
        self.items = []
        self.mins = []

    def push(self, x):
        self.items.append(x)
        self.mins.append(______)

    def pop(self):
        self.mins.pop()
        return self.items.pop()

    def get_min(self):
        return ______`,blanks:[['min(x, self.mins[-1]) if self.mins else x','x if not self.mins else min(x, self.mins[-1])'],['self.mins[-1]']],post:`def _t():
    s = MinStack()
    out = []
    for x in [5, 3, 7, 3, 1]:
        s.push(x)
    out.append(s.get_min())
    s.pop()
    out.append(s.get_min())
    s.pop(); s.pop()
    out.append(s.get_min())
    return out`,tests:[['_t()','[1, 3, 3]']],why:'mins[i] is the minimum of items[0..i], so popping both stacks together keeps the minimum correct.'},
{id:'s-b3',type:'blanks',d:2,p:'stack',title:'Complete the postfix evaluator',code:`def eval_postfix(tokens):
    stack = []
    for t in tokens:
        if t in "+-*":
            b = ______
            a = ______
            stack.append(a + b if t == "+" else a - b if t == "-" else a * b)
        else:
            stack.append(int(t))
    return stack[-1]`,blanks:[['stack.pop()'],['stack.pop()']],tests:[['eval_postfix(["5", "1", "-"])','4'],['eval_postfix(["2", "3", "4", "*", "+"])','14']],why:'The first pop is the RIGHT operand. Order matters for − and /.'},
{id:'s-d1',type:'debug',d:1,p:'stack',title:'Unclosed brackets pass',code:`def is_valid(s):
    pairs = {")": "(", "]": "["}
    stack = []
    for ch in s:
        if ch in "([":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return True`,opts:['The dict is backwards','It returns True even when brackets are left open, like "(("','pop() should be peek','It should use a queue'],a:1,why:'Return <code>not stack</code>: everything opened must have been closed.',fix:`def is_valid(s):
    pairs = {")": "(", "]": "["}
    stack = []
    for ch in s:
        if ch in "([":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack`,tests:[['is_valid("((")','False'],['is_valid("([])")','True']]},
{id:'s-d2',type:'debug',d:1,p:'stack',title:'Crash on a closing bracket',code:`def is_valid(s):
    pairs = {")": "("}
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif stack.pop() != pairs[ch]:
            return False
    return not stack`,opts:['pairs is wrong','For ")" with an empty stack, pop() raises IndexError','return not stack is wrong','== should be in'],a:1,why:'Guard the pop: <code>elif not stack or stack.pop() != pairs[ch]</code>.',fix:`def is_valid(s):
    pairs = {")": "("}
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack`,tests:[['is_valid(")(")','False'],['is_valid("()")','True']]},
{id:'s-d3',type:'debug',d:2,p:'design',title:'Min stack forgets',code:`class MinStack:
    def __init__(self):
        self.items = []
        self.min = None

    def push(self, x):
        self.items.append(x)
        if self.min is None or x < self.min:
            self.min = x

    def pop(self):
        return self.items.pop()

    def get_min(self):
        return self.min`,opts:['push should use <=','After popping the minimum, self.min still holds the old (removed) value','get_min should loop','items should be a deque'],a:1,why:'One variable cannot remember previous minimums. Keep a parallel stack of minimums.',fix:`class MinStack:
    def __init__(self):
        self.items = []
        self.mins = []

    def push(self, x):
        self.items.append(x)
        self.mins.append(x if not self.mins else min(x, self.mins[-1]))

    def pop(self):
        self.mins.pop()
        return self.items.pop()

    def get_min(self):
        return self.mins[-1]`,post:`def _t():
    s = MinStack()
    s.push(3)
    s.push(1)
    s.pop()
    return s.get_min()`,tests:[['_t()','3']]},
{id:'s-d4',type:'debug',d:2,p:'monotonic-stack',title:'Greater or equal?',code:`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] <= x:
            result[stack.pop()] = x
        stack.append(i)
    return result`,opts:['result should start at 0','<= also pops EQUAL values, so [2, 2] gives [2, -1] instead of [-1, -1]','enumerate is wrong here','The stack should store values'],a:1,why:'“Strictly greater” needs <code>&lt;</code>.',fix:`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result`,tests:[['next_greater([2, 2])','[-1, -1]'],['next_greater([1, 3])','[3, -1]']]},
{id:'s-valid-parens',type:'code',d:1,p:'stack',title:'Valid Parentheses',prompt:'<p>Return True if every bracket in <code>s</code> (only <code>()[]{}</code>) is closed by the same type, in the correct order.</p><p><code>"([]{})"</code> → True · <code>"(]"</code> → False · <code>"([)]"</code> → False</p>',starter:`def is_valid(s):
    pass`,solution:`def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack`,tests:[['is_valid("()")','True'],['is_valid("([]{})")','True'],['is_valid("(]")','False'],['is_valid("([)]")','False'],['is_valid("((")','False'],['is_valid("")','True'],['is_valid("}")','False']],hints:['Which bracket must the next closing bracket match?','Push openers; on a closer, the top of the stack must be its partner.'],approach:'Stack of open brackets; map each closer to its opener.',cx:'O(n) time, O(n) space'},
{id:'s-min-stack',type:'code',d:2,p:'design',title:'Min Stack',prompt:'<p>Design a stack with <code>push(x)</code>, <code>pop()</code>, <code>top()</code> and <code>get_min()</code>, all O(1).</p>',starter:`class MinStack:
    def __init__(self):
        pass

    def push(self, x):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def get_min(self):
        pass`,solution:`class MinStack:
    def __init__(self):
        self.items = []
        self.mins = []

    def push(self, x):
        self.items.append(x)
        self.mins.append(x if not self.mins else min(x, self.mins[-1]))

    def pop(self):
        self.mins.pop()
        return self.items.pop()

    def top(self):
        return self.items[-1]

    def get_min(self):
        return self.mins[-1]`,post:`def _t1():
    s = MinStack()
    s.push(-2); s.push(0); s.push(-3)
    a = s.get_min()
    s.pop()
    return (a, s.top(), s.get_min())
def _t2():
    s = MinStack()
    for x in [2, 2, 1, 1]:
        s.push(x)
    s.pop()
    b = s.get_min()
    s.pop()
    return (b, s.get_min())`,tests:[['_t1()','(-3, 0, -2)','','push −2, 0, −3; min; pop; top; min'],['_t2()','(1, 2)','','duplicate minimums']],hints:['A single min variable breaks when you pop the minimum.','Keep a second stack where each entry is the minimum of everything at or below it.'],approach:'Parallel stack of running minimums.',cx:'O(1) per operation'},
{id:'s-postfix',type:'code',d:2,p:'stack',title:'Evaluate Postfix (Reverse Polish)',prompt:'<p>Evaluate a postfix expression given as tokens. Operators: <code>+ - * /</code>; division truncates toward zero.</p><p><code>["2", "1", "+", "3", "*"]</code> → <code>9</code></p>',starter:`def eval_rpn(tokens):
    pass`,solution:`def eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))     # truncate toward zero
        else:
            stack.append(int(t))
    return stack[-1]`,tests:[['eval_rpn(["2", "1", "+", "3", "*"])','9'],['eval_rpn(["4", "13", "5", "/", "+"])','6'],['eval_rpn(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])','22'],['eval_rpn(["7", "-2", "/"])','-3']],hints:['Numbers wait on a stack until an operator needs them.','The first pop is the right operand. For division toward zero use int(a / b), not //.'],approach:'Operand stack; each operator pops two and pushes the result.',cx:'O(n) time'},
{id:'s-next-greater',type:'code',d:2,p:'monotonic-stack',title:'Next Greater Element',prompt:'<p>For each element, return the first element to its right that is strictly greater, or -1.</p><p><code>[2, 1, 2, 4, 3]</code> → <code>[4, 2, 4, -1, -1]</code></p>',starter:`def next_greater(nums):
    pass`,solution:`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []                       # indexes waiting for a greater value
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result`,brute:{code:`def next_greater(nums):
    result = [-1] * len(nums)
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[j] > nums[i]:
                result[i] = nums[j]
                break
    return result`,cx:'O(n²)'},tests:[['next_greater([2, 1, 2, 4, 3])','[4, 2, 4, -1, -1]'],['next_greater([])','[]'],['next_greater([5, 4, 3])','[-1, -1, -1]'],['next_greater([1, 2, 3])','[2, 3, -1]']],hints:['Brute force scans right from every index: O(n²).','Keep the indexes that have not found their answer yet on a stack. When a bigger number arrives, it answers all smaller ones on top.'],approach:'Monotonic decreasing stack of indexes.',cx:'O(n) time'},
{id:'s-daily-temps',type:'code',d:2,p:'monotonic-stack',title:'Daily Temperatures',prompt:'<p>For each day, how many days until a warmer temperature? 0 if never.</p><p><code>[73, 74, 75, 71, 69, 72, 76, 73]</code> → <code>[1, 1, 4, 2, 1, 1, 0, 0]</code></p>',starter:`def daily_temperatures(temps):
    pass`,solution:`def daily_temperatures(temps):
    answer = [0] * len(temps)
    stack = []                      # indexes of days still waiting
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,tests:[['daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])','[1, 1, 4, 2, 1, 1, 0, 0]'],['daily_temperatures([30, 40, 50, 60])','[1, 1, 1, 0]'],['daily_temperatures([30, 60, 90])','[1, 1, 0]'],['daily_temperatures([50])','[0]']],hints:['This is “next greater element”, but you record a distance instead of a value.','Store indexes on the stack so you can compute i − j.'],approach:'Monotonic stack of indexes; answer = distance when popped.',cx:'O(n) time'},
{id:'s-remove-adjacent',type:'code',d:1,p:'stack',title:'Remove Adjacent Duplicates',prompt:'<p>Repeatedly remove pairs of equal adjacent letters until none remain.</p><p><code>"abbaca"</code> → <code>"ca"</code></p>',starter:`def remove_duplicates(s):
    pass`,solution:`def remove_duplicates(s):
    stack = []
    for ch in s:
        if stack and stack[-1] == ch:
            stack.pop()
        else:
            stack.append(ch)
    return "".join(stack)`,tests:[['remove_duplicates("abbaca")','"ca"'],['remove_duplicates("azxxzy")','"ay"'],['remove_duplicates("aa")','""'],['remove_duplicates("")','""']],hints:['When a letter matches the last kept letter, both disappear.'],approach:'Stack of kept letters; pop on match.',cx:'O(n) time'},
{id:'s-backspace',type:'code',d:1,p:'stack',title:'Backspace String Compare',prompt:'<p><code>#</code> means backspace. Return True if both strings are equal after typing them.</p><p><code>("ab#c", "ad#c")</code> → True</p>',starter:`def backspace_compare(s, t):
    pass`,solution:`def backspace_compare(s, t):
    def typed(x):
        stack = []
        for ch in x:
            if ch == "#":
                if stack:
                    stack.pop()
            else:
                stack.append(ch)
        return stack
    return typed(s) == typed(t)`,tests:[['backspace_compare("ab#c", "ad#c")','True'],['backspace_compare("ab##", "c#d#")','True'],['backspace_compare("a#c", "b")','False'],['backspace_compare("#a", "a")','True']],hints:['Simulate the typing with a stack.','Backspace on an empty text does nothing.'],approach:'Build each final string with a stack and compare.',cx:'O(n + m) time'},
{id:'s-baseball',type:'code',d:1,p:'stack',title:'Baseball Game',prompt:'<p>Operations: an integer adds a score; <code>"+"</code> adds the sum of the last two scores; <code>"D"</code> doubles the last score; <code>"C"</code> removes the last score. Return the total.</p>',starter:`def cal_points(ops):
    pass`,solution:`def cal_points(ops):
    stack = []
    for op in ops:
        if op == "+":
            stack.append(stack[-1] + stack[-2])
        elif op == "D":
            stack.append(2 * stack[-1])
        elif op == "C":
            stack.pop()
        else:
            stack.append(int(op))
    return sum(stack)`,tests:[['cal_points(["5", "2", "C", "D", "+"])','30'],['cal_points(["5", "-2", "4", "C", "D", "9", "+", "+"])','27'],['cal_points(["1", "C"])','0']],hints:['Every operation reads or changes only the most recent scores.'],approach:'Stack of valid scores.',cx:'O(n) time'},
{id:'s-asteroids',type:'code',d:2,p:'stack',title:'Asteroid Collision',prompt:'<p>Positive asteroids move right, negative move left; size = absolute value. When two meet, the smaller explodes (both if equal). Return the survivors.</p><p><code>[5, 10, -5]</code> → <code>[5, 10]</code></p>',starter:`def asteroid_collision(asteroids):
    pass`,solution:`def asteroid_collision(asteroids):
    stack = []
    for a in asteroids:
        alive = True
        while alive and a < 0 and stack and stack[-1] > 0:
            if stack[-1] < -a:
                stack.pop()             # the right-mover explodes, keep checking
            elif stack[-1] == -a:
                stack.pop()             # both explode
                alive = False
            else:
                alive = False           # the incoming left-mover explodes
        if alive:
            stack.append(a)
    return stack`,tests:[['asteroid_collision([5, 10, -5])','[5, 10]'],['asteroid_collision([8, -8])','[]'],['asteroid_collision([10, 2, -5])','[10]'],['asteroid_collision([-2, -1, 1, 2])','[-2, -1, 1, 2]']],hints:['A collision only happens when the top of the stack moves right (> 0) and the new one moves left (< 0).','A big left-mover can destroy several right-movers in a row: use a while loop.'],approach:'Stack of survivors; resolve collisions against the top.',cx:'O(n) time'},
{id:'s-decode',type:'code',d:2,p:'stack',title:'Decode String',prompt:'<p><code>k[text]</code> means text repeated k times; brackets can nest.</p><p><code>"3[a2[c]]"</code> → <code>"accaccacc"</code></p>',starter:`def decode_string(s):
    pass`,solution:`def decode_string(s):
    stack = []                  # (text before the bracket, repeat count)
    cur, num = "", 0
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == "[":
            stack.append((cur, num))
            cur, num = "", 0
        elif ch == "]":
            prev, k = stack.pop()
            cur = prev + cur * k
        else:
            cur += ch
    return cur`,tests:[['decode_string("3[a]2[bc]")','"aaabcbc"'],['decode_string("3[a2[c]]")','"accaccacc"'],['decode_string("2[abc]3[cd]ef")','"abcabccdcdcdef"'],['decode_string("10[x]")','"xxxxxxxxxx"']],hints:['On "[", save what you have built so far and the count, then start fresh.','On "]", pop the saved state and combine: saved_text + current * count.'],approach:'Stack of (prefix, count) pairs for each open bracket.',cx:'O(output length)'},
{id:'s-stock-span',type:'code',d:2,p:'monotonic-stack',title:'Stock Span',prompt:'<p>The span on day i is the number of consecutive days up to and including day i with price ≤ price[i]. Return all spans.</p><p><code>[100, 80, 60, 70, 60, 75, 85]</code> → <code>[1, 1, 1, 2, 1, 4, 6]</code></p>',starter:`def stock_span(prices):
    pass`,solution:`def stock_span(prices):
    spans = []
    stack = []                      # indexes with decreasing prices
    for i, p in enumerate(prices):
        while stack and prices[stack[-1]] <= p:
            stack.pop()
        spans.append(i + 1 if not stack else i - stack[-1])
        stack.append(i)
    return spans`,tests:[['stock_span([100, 80, 60, 70, 60, 75, 85])','[1, 1, 1, 2, 1, 4, 6]'],['stock_span([10, 20, 30])','[1, 2, 3]'],['stock_span([])','[]']],hints:['The span reaches back to the previous day with a HIGHER price.','“Previous greater element” is a monotonic stack problem.'],approach:'Monotonic stack: pop all ≤ prices; the remaining top is the previous greater day.',cx:'O(n) time'},
{id:'s-simplify-path',type:'code',d:2,p:'stack',title:'Simplify Unix Path',prompt:'<p>Simplify an absolute Unix path: <code>.</code> is the current folder, <code>..</code> goes up, repeated slashes count as one.</p><p><code>"/a/./b/../../c/"</code> → <code>"/c"</code></p>',starter:`def simplify_path(path):
    pass`,solution:`def simplify_path(path):
    stack = []
    for part in path.split("/"):
        if part == "..":
            if stack:
                stack.pop()
        elif part and part != ".":
            stack.append(part)
    return "/" + "/".join(stack)`,tests:[['simplify_path("/home/")','"/home"'],['simplify_path("/../")','"/"'],['simplify_path("/home//foo/")','"/home/foo"'],['simplify_path("/a/./b/../../c/")','"/c"']],hints:['Split on "/" and handle each part.','".." pops a folder (if any); "" and "." do nothing.'],approach:'Stack of folder names.',cx:'O(n) time'},
{id:'s-histogram',type:'code',d:3,p:'monotonic-stack',title:'Largest Rectangle in Histogram',prompt:'<p>Bars have width 1 and the given heights. Return the area of the largest rectangle that fits.</p><p><code>[2, 1, 5, 6, 2, 3]</code> → <code>10</code> (heights 5 and 6, width 2)</p>',starter:`def largest_rectangle(heights):
    pass`,solution:`def largest_rectangle(heights):
    stack = []                      # indexes with increasing heights
    best = 0
    for i, h in enumerate(heights + [0]):     # the 0 flushes the stack at the end
        start = i
        while stack and heights[stack[-1]] >= h:
            j = stack.pop()
            left = stack[-1] + 1 if stack else 0
            best = max(best, heights[j] * (i - left))
        stack.append(i)
    return best`,tests:[['largest_rectangle([2, 1, 5, 6, 2, 3])','10'],['largest_rectangle([2, 4])','4'],['largest_rectangle([])','0'],['largest_rectangle([3, 3, 3])','9'],['largest_rectangle([6, 2, 5, 4, 5, 1, 6])','12']],hints:['For each bar, the widest rectangle of its height stretches until a shorter bar on each side.','Keep an increasing stack. When a shorter bar arrives, the popped bar’s rectangle ends here, and starts just after the new top.'],approach:'Monotonic increasing stack; compute each bar’s area when it is popped.',cx:'O(n) time'}
]);
