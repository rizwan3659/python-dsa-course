/* Topic 21 · Bit Manipulation — question bank. */
COURSE.qs('bits',[
/* ---------- predict the output ---------- */
{id:'bit-p1',type:'predict',d:1,p:'bits',title:'bin() and int(…, 2)',code:`print(bin(10), int("1011", 2))`,a:'0b1010 11',why:'10 = 8 + 2 = 0b1010. "1011" in base 2 is 8 + 2 + 1 = 11.'},
{id:'bit-p2',type:'predict',d:1,p:'bits',title:'AND, OR, XOR',code:`print(6 & 3, 6 | 3, 6 ^ 3)`,a:'2 7 5',hints:['6 = 110 and 3 = 011.','AND keeps bits set in both, OR in either, XOR in exactly one.'],why:'110 & 011 = 010 (2), 110 | 011 = 111 (7), 110 ^ 011 = 101 (5).'},
{id:'bit-p3',type:'predict',d:1,p:'bits',title:'Shifts',code:`print(1 << 4, 40 >> 3)`,a:'16 5',why:'Shifting left by k multiplies by 2ᵏ; shifting right by k floor-divides by 2ᵏ: 40 // 8 = 5.'},
{id:'bit-p4',type:'predict',d:2,p:'bits',title:'Bitwise NOT in Python',code:`print(~5, ~-1)`,a:'-6 0',why:'Python integers behave as if they had infinitely many sign bits, so <code>~x == -x - 1</code>.'},
{id:'bit-p5',type:'predict',d:2,p:'bits',title:'Two classic tricks',code:`x = 12
print(x & (x - 1), x & -x)`,a:'8 4',hints:['12 = 1100.','x & (x − 1) removes the lowest 1 bit; x & −x keeps only it.'],why:'1100 & 1011 = 1000 (8). x & −x isolates the lowest set bit: 0100 (4).'},
{id:'bit-p6',type:'predict',d:1,p:'bits',title:'XOR everything',code:`r = 0
for x in [4, 1, 2, 1, 2]:
    r ^= x
print(r)`,a:'4',why:'Pairs cancel because x ^ x = 0, and 0 ^ y = y. Only the number that appears once survives.'},
{id:'bit-p7',type:'predict',d:1,p:'bits',title:'Counting bits',code:`print(bin(13).count("1"), (13).bit_length())`,a:'3 4',why:'13 = 0b1101: three 1 bits, and four bits are needed to write it. (Python 3.10+ also has <code>(13).bit_count()</code>.)'},

/* ---------- concept ---------- */
{id:'bit-m1',type:'mcq',d:1,p:'bits',title:'Why XOR finds the single number',q:'Every number appears twice except one. Why does XOR-ing all of them give the single one?',opts:['XOR sorts the numbers','x ^ x = 0, x ^ 0 = x, and XOR is commutative and associative, so the pairs cancel in any order','XOR adds the numbers','It only works for small numbers'],a:1,why:'Order does not matter, so you can imagine grouping each pair: they become 0, leaving the single number.'},
{id:'bit-m2',type:'mcq',d:1,p:'bits',title:'n & (n − 1)',q:'What does <code>n & (n - 1)</code> do?',opts:['Divides n by 2','Clears the lowest set bit of n','Sets the lowest bit','Counts the bits'],a:1,why:'Subtracting 1 flips the lowest 1 and every 0 below it, so the AND erases exactly that 1. It is 0 exactly when n is a power of two (or 0).'},
{id:'bit-m3',type:'mcq',d:2,p:'bits',title:'Is bit i set?',q:'Which expression is 1 when bit i of n is set, else 0?',opts:['n & i','(n >> i) & 1','n | (1 << i)','n ^ i'],a:1,why:'Shift bit i to position 0 and mask it. <code>n & (1 << i)</code> also works as a truth value, but gives 2ⁱ, not 1.'},
{id:'bit-m4',type:'mcq',d:2,p:'bits',title:'32-bit answers in Python',q:'A problem expects 32-bit unsigned results, but Python integers are unbounded. What do you do?',opts:['Nothing','Mask with & 0xFFFFFFFF to keep the low 32 bits','Use floats','Convert to strings'],a:1,why:'Masking simulates fixed-width arithmetic. To read the result as a signed 32-bit number, subtract 2³² when bit 31 is set.'},
{id:'bit-m5',type:'mcq',d:1,p:'bits',title:'Subsets as numbers',q:'How can the integers 0 .. 2ⁿ − 1 represent all subsets of n items?',opts:['They cannot','Bit i of the number says whether item i is in the subset','Each number is the size of a subset','Only for n ≤ 8'],a:1,why:'Each of the 2ⁿ bit patterns is a different in/out choice for the n items.'},

/* ---------- complexity ---------- */
{id:'bit-c1',type:'complexity',d:2,p:'bits',title:"Kernighan's bit count",code:`count = 0
while n:
    n &= n - 1
    count += 1`,opts:['O(1)','O(k), k = number of 1 bits','O(n)','O(n log n)'],a:1,why:'Each step removes one set bit, so the loop runs once per 1 bit (at most log₂ n + 1 times).'},
{id:'bit-c2',type:'complexity',d:2,p:'bits',title:'All subsets by mask',code:`for mask in range(1 << n):
    subset = [items[i] for i in range(n) if mask >> i & 1]`,opts:['O(n)','O(n²)','O(2ⁿ)','O(n · 2ⁿ)'],a:3,why:'2ⁿ masks, and building each subset checks n bits.'},

/* ---------- choose ---------- */
{id:'bit-ch1',type:'choose',d:1,p:'bits',title:'Twenty switches',q:'You track which of 20 switches are on and need to store and compare millions of states quickly.',opts:['A list of 20 booleans per state','One integer bitmask per state','A string per state','A dict per state'],a:1,why:'A 20-bit integer is compact, hashable and compares in O(1). Setting or testing a switch is one bitwise operation.'},
{id:'bit-ch2',type:'choose',d:1,p:'bits',title:'One number appears once',q:'Every value appears twice except one. Find it in O(n) time and O(1) extra space.',opts:['XOR all values','Sort and scan','A Counter','A set'],a:0,why:'Sorting needs O(n log n); a Counter or set needs O(n) space. XOR needs neither.'},

/* ---------- dry run ---------- */
{id:'bit-dr1',type:'dryrun',d:1,p:'bits',title:"Kernighan's trick",code:`n = 44
count = 0
while n:
    n &= n - 1
    count += 1`,cols:['n','count'],rows:[['40','1'],['32','2'],['0','3']],setup:'44 = 0b101100.',why:'Each step clears the lowest 1: 101100 → 101000 → 100000 → 0. Three 1 bits.'},
{id:'bit-dr2',type:'dryrun',d:1,p:'bits',title:'Decimal to binary by hand',code:`n = 13
bits = ""
while n > 0:
    bits = str(n % 2) + bits
    n //= 2`,cols:['n','bits'],rows:[['6','1'],['3','01'],['1','101'],['0','1101']],why:'n % 2 is the lowest bit; n // 2 shifts right. Bits come out lowest first, so each is put in front.'},

/* ---------- complete ---------- */
{id:'bit-b1',type:'blanks',d:1,p:'bits',title:'Complete set_bit and clear_bit',code:`def set_bit(n, i):
    return n ______ (1 << i)

def clear_bit(n, i):
    return n & ______(1 << i)`,blanks:[['|'],['~']],tests:[['set_bit(8, 1)','10'],['set_bit(10, 1)','10'],['clear_bit(15, 0)','14'],['clear_bit(8, 0)','8']],why:'OR with a mask turns a bit on. AND with the inverted mask (all ones except bit i) turns it off.'},
{id:'bit-b2',type:'blanks',d:2,p:'bits',title:'Complete subsets by bitmask',code:`def subsets(items):
    out = []
    for mask in range(______):
        out.append([items[i] for i in range(len(items)) if ______])
    return out`,blanks:[['1 << len(items)','2 ** len(items)','1<<len(items)'],['mask >> i & 1','(mask >> i) & 1','mask & (1 << i)']],tests:[['subsets([1, 2])','[[], [1], [2], [1, 2]]'],['subsets([])','[[]]'],['len(subsets([1, 2, 3, 4]))','16']],why:'Each mask from 0 to 2ⁿ − 1 is one subset; bit i decides whether items[i] is in it.'},

/* ---------- debug ---------- */
{id:'bit-d1',type:'debug',d:1,p:'bits',title:'Zero is not a power of two',code:`def is_power_of_two(n):
    return (n & (n - 1)) == 0`,opts:['n - 1 should be n + 1','For n = 0, 0 & −1 is 0, so 0 is reported as a power of two: also require n > 0','The brackets change the meaning','Powers of two have two set bits'],a:1,why:'Bit tricks often have one special case. Here it is 0 (and negative numbers): check n > 0 first.',fix:`def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,tests:[['is_power_of_two(4)','True'],['is_power_of_two(6)','False'],['is_power_of_two(0)','False'],['is_power_of_two(1)','True']]},
{id:'bit-d2',type:'debug',d:1,p:'bits',title:'Testing the wrong bit',code:`def is_set(n, i):
    return n & i != 0`,opts:['It should use |','It ANDs with the number i instead of the mask 1 << i','i should be i − 1','It should return n'],a:1,why:'Bit i has the value 2ⁱ, so the mask is <code>1 << i</code>. (In Python, &amp; binds tighter than !=, so the brackets are not the problem here.)',fix:`def is_set(n, i):
    return (n >> i) & 1 == 1`,tests:[['is_set(5, 2)','True'],['is_set(5, 1)','False'],['is_set(8, 3)','True'],['is_set(1, 0)','True']]},
{id:'bit-d3',type:'debug',d:2,p:'bits',title:'The missing number goes missing',code:`def missing_number(nums):
    result = 0
    for i in range(len(nums)):
        result ^= i ^ nums[i]
    return result`,opts:['XOR cannot find missing numbers','The indexes only go up to n − 1, but the full range is 0..n: also XOR in n','result should start at 1','nums must be sorted'],a:1,why:'The list holds n of the n + 1 numbers 0..n. XOR every number of the full range with every element; start result at n so n is included.',fix:`def missing_number(nums):
    result = len(nums)
    for i in range(len(nums)):
        result ^= i ^ nums[i]
    return result`,tests:[['missing_number([3, 0, 1])','2'],['missing_number([0, 1])','2'],['missing_number([1])','0']]},

/* ---------- coding (schema v2) ---------- */
{id:'bit-count-ones',type:'code',d:1,p:'bits',title:'Number of 1 Bits',prompt:'<p>Return how many 1 bits a non-negative integer has, without <code>bin()</code> or <code>bit_count()</code>.</p>',
constraints:['0 ≤ n &lt; 2<sup>63</sup>'],
starter:`def count_ones(n):
    # your code here
    pass`,solution:`def count_ones(n):
    count = 0
    while n:
        n &= n - 1        # clear the lowest set bit
        count += 1
    return count`,
tests:[['count_ones(11)','3'],['count_ones(0)','0'],['count_ones(128)','1'],['count_ones(2**63 - 1)','63'],['count_ones(44)','3']],
hints:['Check the lowest bit with n & 1, then shift right.','Faster: n & (n − 1) removes one set bit per step.'],approach:"Kernighan's trick: clear the lowest set bit until n is 0.",cx:'O(k) time where k is the number of set bits, O(1) space',
mistakes:['Using n / 2 (float) instead of n >> 1 or n // 2.','Looping a fixed 32 times and missing higher bits of a 64-bit value.'],
followup:'Count the 1 bits of every number from 0 to n in O(n) (bit-counting-bits).'},

{id:'bit-power-two',type:'code',d:1,p:'bits',title:'Power of Two',prompt:'<p>Return <code>True</code> if n is a power of two (1, 2, 4, 8, …), using a bitwise test instead of a loop.</p>',
constraints:['−2<sup>31</sup> ≤ n ≤ 2<sup>31</sup> − 1'],
starter:`def is_power_of_two(n):
    # your code here
    pass`,solution:`def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,
tests:[['is_power_of_two(1)','True'],['is_power_of_two(16)','True'],['is_power_of_two(3)','False'],['is_power_of_two(0)','False'],['is_power_of_two(-8)','False'],['is_power_of_two(2**30)','True']],
hints:['A power of two has exactly one 1 bit.','n & (n − 1) clears that bit; zero and negatives are not powers of two.'],approach:'n > 0 and (n & (n − 1)) == 0.',cx:'O(1) time and space',
mistakes:['Forgetting n > 0 (0 & −1 == 0).','Using n % 2 == 0, which is also true for 6.'],
followup:'Is n a power of four? (One set bit, at an even position: n & 0x55555555.)'},

{id:'bit-single',type:'code',d:1,p:'bits',title:'Single Number',prompt:'<p>Every value appears exactly twice except one, which appears once. Return it in O(n) time and O(1) extra space.</p>',
constraints:['1 ≤ len(nums) ≤ 3 × 10<sup>4</sup>, odd','−3 × 10<sup>4</sup> ≤ nums[i] ≤ 3 × 10<sup>4</sup>'],
starter:`def single_number(nums):
    # your code here
    pass`,solution:`def single_number(nums):
    result = 0
    for x in nums:
        result ^= x       # pairs cancel: x ^ x == 0
    return result`,
tests:[['single_number([2, 2, 1])','1'],['single_number([4, 1, 2, 1, 2])','4'],['single_number([1])','1'],['single_number([-3, 7, 7])','-3'],['single_number([0, 5, 5])','0']],
hints:['What is x ^ x? What is x ^ 0?','XOR all the numbers together.'],approach:'XOR everything: duplicates cancel out.',cx:'O(n) time, O(1) space',
mistakes:['Using a set or Counter: correct, but O(n) space.','Starting result at 1 instead of 0.'],
followup:'Every value appears three times except one (bit-single-ii).'},

{id:'bit-missing',type:'code',d:1,p:'bits',title:'Missing Number',prompt:'<p>The list contains n distinct numbers from 0..n, so exactly one is missing. Return it using XOR (or a sum), in O(1) extra space.</p>',
constraints:['1 ≤ n ≤ 10<sup>4</sup>'],
starter:`def missing_number(nums):
    # your code here
    pass`,solution:`def missing_number(nums):
    result = len(nums)            # n itself has no index
    for i, x in enumerate(nums):
        result ^= i ^ x
    return result`,
tests:[['missing_number([3, 0, 1])','2'],['missing_number([0, 1])','2'],['missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1])','8'],['missing_number([1])','0'],['missing_number([0])','1']],
hints:['XOR all numbers 0..n with all the list elements.','Everything appears twice except the missing number.'],approach:'XOR of the full range with the list; or n(n + 1)/2 − sum(nums).',cx:'O(n) time, O(1) space',
mistakes:['Forgetting to include n in the range.','Sorting first (O(n log n)).'],
followup:'Two numbers are missing. Find both with XOR (see bit-two-singles).'},

{id:'bit-ops',type:'code',d:1,p:'bits',title:'Get, Set, Clear, Toggle',prompt:'<p>Write four one-line functions for bit i (0 = lowest): <code>get_bit(n, i)</code> returns 0 or 1; <code>set_bit</code>, <code>clear_bit</code> and <code>toggle_bit</code> return the new number.</p>',
constraints:['0 ≤ n &lt; 2<sup>62</sup>, 0 ≤ i &lt; 62'],
starter:`def get_bit(n, i):
    pass


def set_bit(n, i):
    pass


def clear_bit(n, i):
    pass


def toggle_bit(n, i):
    pass`,solution:`def get_bit(n, i):
    return (n >> i) & 1


def set_bit(n, i):
    return n | (1 << i)


def clear_bit(n, i):
    return n & ~(1 << i)


def toggle_bit(n, i):
    return n ^ (1 << i)`,
tests:[['get_bit(5, 0), get_bit(5, 1), get_bit(5, 2)','(1, 0, 1)'],['set_bit(8, 0)','9'],['clear_bit(15, 3)','7'],['toggle_bit(5, 1)','7'],['toggle_bit(7, 1)','5'],['set_bit(1, 61)','2**61 + 1'],['clear_bit(2, 0)','2']],
hints:['Every operation uses the mask 1 << i.','get: shift and AND 1. set: OR. clear: AND with the inverted mask. toggle: XOR.'],approach:'Build the mask 1 << i and combine it with &, |, ^ or ~.',cx:'O(1) each',
mistakes:['clear_bit with n & (1 << i), which keeps only that bit.','Returning n & (1 << i) from get_bit (that is 2ⁱ, not 1).'],
followup:'Clear all bits above i, or all bits from i down to 0, with one mask each.'},

{id:'bit-hamming',type:'code',d:1,p:'bits',title:'Hamming Distance',prompt:'<p>Return the number of bit positions where x and y differ.</p>',prereq:['bit-count-ones'],
constraints:['0 ≤ x, y &lt; 2<sup>31</sup>'],
starter:`def hamming_distance(x, y):
    # your code here
    pass`,solution:`def hamming_distance(x, y):
    diff = x ^ y          # 1 exactly where the bits differ
    count = 0
    while diff:
        diff &= diff - 1
        count += 1
    return count`,
tests:[['hamming_distance(1, 4)','2'],['hamming_distance(3, 1)','1'],['hamming_distance(0, 0)','0'],['hamming_distance(2**31 - 1, 0)','31'],['hamming_distance(7, 8)','4']],
hints:['XOR marks the positions where two bits differ.','Count the 1 bits of x ^ y.'],approach:'Popcount of x ^ y.',cx:'O(number of differing bits)',
mistakes:['Comparing decimal digits instead of bits.'],
followup:'Sum of Hamming distances over all pairs in a list, in O(32 · n): count ones and zeros per bit position.'},

{id:'bit-counting-bits',type:'code',d:2,p:'dp',title:'Counting Bits 0..n',prompt:'<p>Return a list where element i is the number of 1 bits in i, for every i from 0 to n, in O(n) total.</p>',prereq:['bit-count-ones'],
constraints:['0 ≤ n ≤ 10<sup>5</sup>'],
starter:`def count_bits(n):
    # your code here
    pass`,solution:`def count_bits(n):
    bits = [0] * (n + 1)
    for i in range(1, n + 1):
        bits[i] = bits[i >> 1] + (i & 1)   # i without its lowest bit, plus that bit
    return bits`,
tests:[['count_bits(2)','[0, 1, 1]'],['count_bits(5)','[0, 1, 1, 2, 1, 2]'],['count_bits(0)','[0]'],['count_bits(8)[-1]','1'],['sum(count_bits(1023))','5120']],
hints:['i >> 1 is i with its lowest bit removed, and it is smaller than i.','bits[i] = bits[i >> 1] + (i & 1): a DP that reuses earlier answers.'],approach:'DP on numbers: reuse the answer for i >> 1.',cx:'O(n) time, O(n) space',
mistakes:['Recounting every number from scratch: O(n log n).','Writing bits[i // 2] + i % 2 is fine, but i / 2 is a float index.'],
followup:'Use bits[i & (i − 1)] + 1 instead. Why does it work?'},

{id:'bit-reverse',type:'code',d:2,p:'bits',title:'Reverse 32 Bits',prompt:'<p>Reverse the bits of a 32-bit unsigned integer (bit 0 becomes bit 31, and so on) and return the result.</p>',
constraints:['0 ≤ n &lt; 2<sup>32</sup>'],
starter:`def reverse_bits(n):
    # your code here
    pass`,solution:`def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)   # move the lowest bit of n to the end of result
        n >>= 1
    return result`,
tests:[['reverse_bits(1)','2**31'],['reverse_bits(0)','0'],['reverse_bits(43261596)','964176192'],['reverse_bits(2**32 - 1)','2**32 - 1'],['reverse_bits(2**31)','1']],
hints:['Take bits from the right end of n one at a time.','Append each to result by shifting result left first. Do it exactly 32 times, even if n becomes 0.'],approach:'32 iterations of: shift result left, add the lowest bit of n, shift n right.',cx:'O(32) = O(1) time',
mistakes:['Stopping when n becomes 0 (leading zeros matter).','Using bin(n)[::-1] without padding to 32 bits.'],
followup:'If this is called millions of times, cache the reversal of each byte (256 entries).'},

{id:'bit-gray',type:'code',d:2,p:'bits',title:'Gray Code',prompt:'<p>Return the n-bit Gray code sequence starting at 0: all 2ⁿ numbers, where consecutive numbers differ in exactly one bit. Use the standard reflected Gray code.</p>',
constraints:['0 ≤ n ≤ 16'],
starter:`def gray_code(n):
    # your code here
    pass`,solution:`def gray_code(n):
    return [i ^ (i >> 1) for i in range(1 << n)]`,
tests:[['gray_code(2)','[0, 1, 3, 2]'],['gray_code(1)','[0, 1]'],['gray_code(0)','[0]'],['gray_code(3)','[0, 1, 3, 2, 6, 7, 5, 4]'],['all(bin(a ^ b).count("1") == 1 for a, b in zip(gray_code(10), gray_code(10)[1:]))','True']],
hints:['There is a direct formula for the i-th Gray code.','g(i) = i ^ (i >> 1).'],approach:'Formula i ^ (i >> 1) for i in 0 .. 2ⁿ − 1.',cx:'O(2ⁿ) time and space (the output size)',
mistakes:['Generating by trial and error, which may not match the standard order.'],
followup:'Build the sequence by reflection: Gray(n) = Gray(n − 1) followed by its reverse with the top bit set.'},

{id:'bit-add',type:'code',d:2,p:'bits',title:'Add Without +',prompt:'<p>Return a + b for non-negative integers without using <code>+</code>, <code>-</code> or <code>sum()</code>: use XOR for the sum without carries and AND + shift for the carries.</p>',
constraints:['0 ≤ a, b ≤ 10<sup>9</sup>'],
starter:`def add(a, b):
    # your code here
    pass`,solution:`def add(a, b):
    while b:
        carry = (a & b) << 1    # positions where both have a 1 produce a carry
        a = a ^ b               # sum ignoring carries
        b = carry
    return a`,
tests:[['add(1, 2)','3'],['add(5, 7)','12'],['add(0, 0)','0'],['add(0, 9)','9'],['add(10**9, 10**9)','2000000000'],['add(255, 1)','256']],
hints:['XOR adds bits without carrying; AND finds where a carry happens.','Repeat with (a ^ b, (a & b) << 1) until there is no carry.'],approach:'Ripple-carry addition with XOR and AND.',cx:'O(number of bits) time',
mistakes:['Forgetting to shift the carry left.','Running it on negative numbers in Python: unbounded ints never stop carrying (mask to 32 bits if you need negatives).'],
followup:'Support negative numbers by masking to 32 bits and converting the result back to a signed value.'},

{id:'bit-subsets',type:'code',d:2,p:'bits',title:'All Subsets (bitmask)',prompt:'<p>Return every subset of <code>items</code> (each a list keeping the original order), using bitmasks instead of recursion. The order of the subsets does not matter.</p>',prereq:['bit-m5'],
constraints:['0 ≤ len(items) ≤ 15, items are distinct'],
starter:`def subsets(items):
    # your code here
    pass`,solution:`def subsets(items):
    n = len(items)
    result = []
    for mask in range(1 << n):                       # 2^n masks
        result.append([items[i] for i in range(n) if (mask >> i) & 1])
    return result`,
tests:[['subsets([1, 2, 3])','[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]','groups'],['subsets([])','[[]]','groups'],['subsets(["a"])','[[], ["a"]]','groups'],['len(subsets(list(range(10))))','1024'],['sorted(map(len, subsets([1, 2, 3, 4])))','[0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4]']],
hints:['Count from 0 to 2ⁿ − 1; each number is one subset.','Item i is in the subset when bit i of the mask is 1.'],approach:'Enumerate masks 0 .. 2ⁿ − 1 and decode each.',cx:'O(n · 2ⁿ) time and output size',
mistakes:['range(2 * n) instead of range(1 << n).','Testing mask & i instead of mask >> i & 1.'],
followup:'Enumerate only the subsets of a given mask m: sub = m; while sub: ...; sub = (sub − 1) & m.'},

{id:'bit-two-singles',type:'code',d:2,p:'bits',title:'Two Single Numbers',prompt:'<p>Every value appears twice except two values that appear once. Return those two, smaller first, in O(n) time and O(1) extra space.</p>',prereq:['bit-single'],
constraints:['2 ≤ len(nums) ≤ 3 × 10<sup>4</sup>','−2<sup>31</sup> ≤ nums[i] &lt; 2<sup>31</sup>'],
starter:`def two_singles(nums):
    # your code here
    pass`,solution:`def two_singles(nums):
    both = 0
    for x in nums:
        both ^= x              # = a ^ b, nonzero because a != b
    low = both & -both         # a bit where a and b differ
    a = 0
    for x in nums:
        if x & low:            # split into two groups by that bit
            a ^= x
    b = both ^ a
    return sorted([a, b])`,
tests:[['two_singles([1, 2, 1, 3, 2, 5])','[3, 5]'],['two_singles([-1, 0])','[-1, 0]'],['two_singles([0, 1])','[0, 1]'],['two_singles([4, 4, 7, 9, 9, 2])','[2, 7]'],['two_singles([-5, 3, 3, 8])','[-5, 8]']],
hints:['XOR of everything is a ^ b. Any 1 bit in it is a position where a and b differ.','Split the numbers by that bit: each group contains one of the two singles, and pairs stay together.'],approach:'XOR all, isolate the lowest differing bit with x & −x, then XOR each half separately.',cx:'O(n) time, O(1) space',
mistakes:['Using a set: correct but O(n) space.','Isolating the bit with both & 1 (that bit may be 0).'],
followup:'What if three numbers appear once?'},

{id:'bit-single-ii',type:'code',d:3,p:'bits',title:'Single Number II',prompt:'<p>Every value appears three times except one, which appears once. Return it with O(1) extra space. Values are 32-bit signed integers.</p>',prereq:['bit-single','bit-ops'],
constraints:['1 ≤ len(nums) ≤ 3 × 10<sup>4</sup>','−2<sup>31</sup> ≤ nums[i] &lt; 2<sup>31</sup>'],
starter:`def single_number_ii(nums):
    # your code here
    pass`,solution:`def single_number_ii(nums):
    result = 0
    for i in range(32):
        ones = sum((x >> i) & 1 for x in nums)   # works for negatives: >> keeps the sign
        if ones % 3:
            result |= 1 << i
    if result >= 1 << 31:                          # bit 31 set: negative in 32-bit
        result -= 1 << 32
    return result`,
tests:[['single_number_ii([2, 2, 3, 2])','3'],['single_number_ii([0, 1, 0, 1, 0, 1, 99])','99'],['single_number_ii([-2, -2, 1, 1, -3, 1, -3, -3, -4, -2])','-4'],['single_number_ii([7])','7'],['single_number_ii([-1, -1, -1, 5])','5'],['single_number_ii([2**31 - 1, 0, 0, 0])','2**31 - 1']],
hints:['Look at one bit position at a time. Count how many numbers have that bit set.','Triples contribute a multiple of 3; the remainder modulo 3 is the single number’s bit.'],approach:'Count each of the 32 bits modulo 3, rebuild the number, and fix the sign.',cx:'O(32 · n) time, O(1) space',
mistakes:['Forgetting the sign: bit 31 set means a negative number.','XOR, which only cancels pairs.'],
followup:'Do it in one pass with two bitmasks ones and twos (a tiny state machine).'},
]);
