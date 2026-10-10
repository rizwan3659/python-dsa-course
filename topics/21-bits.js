/* Topic 21 · Bit Manipulation. */
COURSE.topic({id:'bits',
goal:'Read and write numbers in binary, use &, |, ^, ~, << and >> confidently, apply classic tricks (n & (n − 1), x & −x, XOR cancelling), and enumerate subsets with bitmasks.',
learn:[
{title:'Numbers in binary',short:'Binary',mins:10,lead:'Computers store integers as bits. Each position is a power of two, so 13 = 8 + 4 + 1 = 0b1101. Python can show and parse binary for you.',does:['predict','dry run'],blocks:[
 {t:'diagram',text:`
 bit index:    3    2    1    0
 place value:  8    4    2    1
 13 =          1    1    0    1     8 + 4 + 1 = 13`,aria:'The number 13 written in binary as 1101 with place values 8, 4, 2, 1'},
 {t:'code',title:'Binary in Python',code:`print(bin(13), int("1101", 2), f"{13:08b}")
print((13).bit_length(), bin(13).count("1"))`},
 {t:'q',ids:['bit-p1','bit-p7','bit-dr2']}]},

{title:'The bitwise operators',short:'Operators',mins:12,lead:'&, | and ^ combine two numbers column by column. << and >> slide all the bits. ~ flips them (and in Python, ~x is −x − 1).',does:['visualize','predict','concept'],blocks:[
 {t:'viz',fn:'bitwise',title:'Column by column',intro:'Try AND, OR and XOR on 44 and 27, then the shifts.'},
 {t:'table',head:['Operator','Rule per bit','Typical use'],rows:[['a & b','1 if both are 1','test or clear bits (masking)'],['a | b','1 if either is 1','set bits'],['a ^ b','1 if they differ','toggle bits, cancel pairs'],['~a','flip every bit','build "all except" masks'],['a << k','shift up k places','multiply by 2ᵏ, build masks 1 << i'],['a >> k','shift down k places','floor-divide by 2ᵏ, read bit i']],note:'Precedence in Python: + and − bind tighter than shifts, shifts tighter than &, then ^, then |, and comparisons come last. So 1 << i - 1 is 1 << (i − 1), and x & 1 == 1 is (x & 1) == 1. (C and Java differ!) When in doubt, add brackets.'},
 {t:'q',ids:['bit-p2','bit-p3','bit-p4']}]},

{title:'Masks: get, set, clear, toggle',short:'Masks',mins:12,lead:'A mask is a number with 1s exactly where you want to act. 1 << i selects bit i; combine it with the right operator to read or change that bit.',does:['complete','debug','code'],blocks:[
 {t:'code',title:'The four operations',code:`n, i = 0b1010, 0
print((n >> i) & 1)        # get   -> 0
print(n | (1 << i))        # set   -> 11
print(n & ~(1 << 1))       # clear -> 8
print(n ^ (1 << 3))        # toggle -> 2`},
 {t:'q',ids:['bit-m3','bit-b1','bit-d2','bit-d1','bit-m4']},
 {t:'q',title:'Code it',ids:['bit-ops','bit-power-two','bit-reverse']}]},

{title:'Classic tricks',short:'Tricks',mins:14,lead:'A few identities show up again and again: n & (n − 1) removes the lowest 1 bit, x & −x keeps only it, and x ^ x = 0 makes pairs vanish.',does:['visualize','dry run','predict','code'],blocks:[
 {t:'viz',fn:'bitwise',arg:{mode:'kern'},title:'Clearing the lowest 1 bit',intro:'Step through n = 44, then try 255 and 64.'},
 {t:'q',ids:['bit-p5','bit-m2','bit-dr1','bit-c1']},
 {t:'q',ids:['bit-p6','bit-m1','bit-ch2','bit-d3']},
 {t:'q',title:'Code it',ids:['bit-count-ones','bit-hamming','bit-counting-bits','bit-single','bit-missing','bit-two-singles','bit-single-ii','bit-add']},
 {t:'teacher',items:['Have students verify each trick on paper with 4-bit numbers before coding. Ask: why is x & −x the lowest set bit? (Two’s complement: −x = ~x + 1.)']}]},

{title:'Subsets as bitmasks',short:'Subsets',mins:12,lead:'With n items, the numbers 0 .. 2ⁿ − 1 are exactly the 2ⁿ subsets: bit i says whether item i is in. This replaces recursion for small n and is the basis of bitmask DP.',does:['complete','choose','code'],blocks:[
 {t:'diagram',text:`
 items = [a, b, c]
 mask  binary  subset
  0     000    []
  1     001    [a]
  2     010    [b]
  3     011    [a, b]
  4     100    [c]
  ...
  7     111    [a, b, c]`,aria:'Masks 0 to 7 map to the subsets of three items'},
 {t:'q',ids:['bit-m5','bit-c2','bit-ch1','bit-b2']},
 {t:'q',title:'Code it',ids:['bit-subsets','bit-gray']}]}],

challenge:[
 {t:'b2o',title:'Single number: counting → XOR',qid:'bit-single',problem:'<p>Every value appears twice except one. Find it.</p>',
  brute:{code:`def single_number(nums):
    for x in nums:
        if nums.count(x) == 1:
            return x`,cx:'O(n²)',why:'count() scans the whole list for every element.'},
  slow:{q:'What could replace the repeated counting?',opts:['A Counter (O(n) time, O(n) space), or a trick that needs no memory at all','Sorting twice','Nothing','Recursion'],a:0,why:'Counting once is O(n) but needs a dictionary. The question asks for O(1) space.'},
  better:{q:'Which operation makes equal pairs disappear?',opts:['XOR: x ^ x = 0','AND','OR','Shift'],a:0,why:'XOR is its own inverse, and the order of XORs does not matter.'},
  optimal:{code:`def single_number(nums):
    result = 0
    for x in nums:
        result ^= x
    return result`,cx:'O(n)',why:'One pass, one integer of extra memory.'},
  takeaway:'<p>When values come in pairs, XOR can cancel them for free.</p>'}],

review:[
 {t:'flash',items:[['13 in binary?','0b1101.'],['Get bit i?','(n >> i) & 1.'],['Set / clear / toggle bit i?','n | (1 << i), n & ~(1 << i), n ^ (1 << i).'],['n & (n − 1)?','Clears the lowest 1 bit; 0 iff n is 0 or a power of two.'],['x & −x?','Keeps only the lowest 1 bit.'],['x ^ x? x ^ 0?','0 and x.'],['~x in Python?','−x − 1.'],['All subsets of n items?','Masks 0 .. (1 << n) − 1.'],['1 << i - 1 means?','1 << (i − 1): arithmetic binds tighter than shifts. Bracket when unsure.']]},
 {t:'quiz',topic:'bits',n:8,title:'Topic quiz'},
 {t:'task',title:'Homework',items:['Write is_power_of_four(n) with one mask.','Enumerate all subsets of [1..10] with sum 15 using bitmasks, and compare with a backtracking version from topic 10.']}]
});
