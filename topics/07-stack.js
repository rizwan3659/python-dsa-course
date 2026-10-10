/* Topic 7 · Stack. */
COURSE.topic({id:'stack',
goal:'Use a stack whenever the most recent item matters most: matching brackets, undo, expression evaluation, and the monotonic stack pattern.',
learn:[
{title:'LIFO: last in, first out',short:'LIFO',mins:7,lead:'A stack only lets you touch the top. In Python, a list is a perfect stack: the end of the list is the top.',does:['visualize','predict','choose'],blocks:[
 {t:'diagram',text:`
         push(40)  ↓      ↑  pop() → 40
               ┌──────┐
       TOP  →  │  40  │
               ├──────┤
               │  30  │
               ├──────┤
               │  20  │
               ├──────┤
               │  10  │
               └──────┘`,aria:'A stack of four values with 40 on top'},
 {t:'table',head:['Operation','Python','Cost'],rows:[['push','<code>stack.append(x)</code>','O(1)'],['pop','<code>stack.pop()</code>','O(1)'],['peek','<code>stack[-1]</code>','O(1)'],['is empty?','<code>not stack</code>','O(1)']]},
 {t:'viz',fn:'stack',title:'Push, pop, peek',intro:'Push 50 and 60, then pop twice. Which values come out, and in what order? Predict before you click.'},
 {t:'q',ids:['s-p1','s-p2','s-p3','s-p7','s-m1']},
 {t:'q',ids:['s-m2','s-ch1','s-ch3']}]},

{title:'Matching brackets',short:'Brackets',mins:9,lead:'The classic stack problem: every closing bracket must match the most recent unmatched opening bracket.',does:['visualize','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'brackets',title:'Trace it',intro:'Try the examples on the right: one mismatch, one unclosed, one with an extra closer.'},
 {t:'q',ids:['s-dr1','s-b1','s-c2']},
 {t:'q',title:'Find the bug',ids:['s-d1','s-d2']},
 {t:'q',title:'Code it',ids:['s-valid-parens']}]},

{title:'Stacks that remember: undo, min stack, expressions',short:'Uses',mins:10,lead:'Save state before you change it, and the stack gives it back in reverse order. Store extra info on every push, and queries become O(1).',does:['predict','dry run','complete','code'],blocks:[
 {t:'q',ids:['s-p4','s-p5','s-p6']},
 {t:'q',ids:['s-dr2','s-b3']},
 {t:'q',title:'Min stack',ids:['s-b2','s-d3','s-c5']},
 {t:'q',title:'Code it',ids:['s-min-stack','s-postfix']}]},

{title:'The call stack',short:'Call stack',mins:5,lead:'Every function call pushes a frame; every return pops one. This is why recursion is really a stack in disguise.',does:['predict','concept'],blocks:[
 {t:'code',title:'Watch the order',code:`def f(n):
    if n == 0:
        return
    print("enter", n)
    f(n - 1)
    print("leave", n)

f(3)`},
 {t:'q',ids:['s-m4','s-p8']}]},

{title:'Monotonic stack',short:'Monotonic',mins:10,lead:'Keep the stack sorted (increasing or decreasing) by popping anything the new element beats. Every popped item has just found its answer.',does:['visualize','dry run','complexity','debug','code'],blocks:[
 {t:'callout',html:'<b>Signal:</b> “next greater / next smaller / previous greater element”, “how many days until warmer”, “span”. The brute force is O(n²); the monotonic stack is O(n).'},
 {t:'viz',fn:'monotonic-stack',title:'Next greater element'},
 {t:'q',ids:['s-dr3','s-m3','s-c3','s-c4','s-d4']},
 {t:'q',title:'Code it',ids:['s-next-greater','s-daily-temps']}]}],

challenge:[
 {t:'b2o',title:'Daily Temperatures: scan ahead → monotonic stack',qid:'s-daily-temps',problem:'<p>For each day, how many days until a warmer temperature?</p>',
  brute:{code:`def daily_temperatures(temps):
    answer = [0] * len(temps)
    for i in range(len(temps)):
        for j in range(i + 1, len(temps)):
            if temps[j] > temps[i]:
                answer[i] = j - i
                break
    return answer`,cx:'O(n²)',why:'A long cold spell makes every inner scan run far.'},
  slow:{q:'What is wasted when the temperatures go 75, 71, 69, 72?',opts:['Days 71 and 69 each scan forward separately, but 72 answers both at once','The answer array','Computing j − i','Nothing'],a:0,why:'One warm day can resolve many waiting days. Scanning from each day separately repeats the same comparisons.'},
  better:{q:'What structure keeps “days still waiting for a warmer day”?',opts:['A queue, oldest first','A stack of indexes with decreasing temperatures','A sorted list','A set'],a:1,why:'A new temperature resolves the most recent (coldest) waiting days first: LIFO.'},
  optimal:{code:`def daily_temperatures(temps):
    answer = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,cx:'O(n)',why:'Each index is pushed once and popped at most once.'},
  takeaway:'<p>Nested loops are not always O(n²): count how many times each element can be pushed and popped.</p>'}],

review:[
 {t:'flash',items:[['Stack order?','LIFO: last in, first out.'],['Python stack?','A list: append, pop, [-1].'],['Brackets algorithm?','Push openers; closer must match the top; stack empty at the end.'],['Min stack?','Parallel stack of running minimums.'],['Monotonic stack signal?','Next/previous greater or smaller element.'],['Why is the monotonic stack O(n)?','Each index is pushed and popped at most once.']]}]
});
