/* Topic 3 · Algorithmic Thinking — question bank: understand, decompose, brute force, cases, math reasoning, testing. */
COURSE.qs('thinking',[
/* ---------- predict the output ---------- */
{id:'th-p1',type:'predict',d:1,p:'math',title:'Integer division and remainder',code:`n = 4729
print(n // 10, n % 10)`,a:'472 9',hints:['// drops the last digit.','% 10 keeps only the last digit.'],why:'<code>n // 10</code> removes the last digit and <code>n % 10</code> is the last digit. Together they let you peel a number apart digit by digit.'},
{id:'th-p2',type:'predict',d:1,p:'math',title:'Peeling digits',code:`n = 305
digits = []
while n > 0:
    digits.append(n % 10)
    n //= 10
print(digits)`,a:'[5, 0, 3]',why:'Digits come out last-first: 5, then 0, then 3. Reverse the list if you need them in reading order.'},
{id:'th-p3',type:'predict',d:1,p:'brute-force',title:'How many pairs?',code:`n = 5
count = 0
for i in range(n):
    for j in range(i + 1, n):
        count += 1
print(count)`,a:'10',hints:['i = 0 pairs with 4 values of j, i = 1 with 3, ...','4 + 3 + 2 + 1.'],why:'There are n(n − 1) / 2 = 5 × 4 / 2 = 10 pairs with i &lt; j. That formula is why checking every pair is O(n²).'},
{id:'th-p4',type:'predict',d:2,p:'math',title:'Gauss in one line',code:`n = 100
print(n * (n + 1) // 2, sum(range(1, n + 1)))`,a:'5050 5050',why:'1 + 2 + … + n = n(n + 1) / 2. The formula gives the same answer as the loop in O(1).'},
{id:'th-p5',type:'predict',d:1,p:'math',title:'Modulo wraps around',code:`hours = [22, 23, 0, 1]
print([(h + 3) % 24 for h in hours])`,a:'[1, 2, 3, 4]',why:'<code>% 24</code> keeps a value in 0..23: anything that runs past the end wraps back to the start, like a clock.'},
{id:'th-p6',type:'predict',d:2,p:'brute-force',title:'Early exit',code:`def first_negative(nums):
    checks = 0
    for x in nums:
        checks += 1
        if x < 0:
            return checks
    return checks

print(first_negative([-1, 5, 7]), first_negative([5, 7, 9]))`,a:'1 3',hints:['The first list hits a negative straight away.','The second list never does.'],why:'Best case: 1 check (the answer is first). Worst case: all n checks (no answer at all). Same code, different inputs, different cost.'},
{id:'th-p7',type:'predict',d:2,p:'math',title:'How many halvings?',code:`n = 64
steps = 0
while n > 1:
    n //= 2
    steps += 1
print(steps)`,a:'6',why:'64 → 32 → 16 → 8 → 4 → 2 → 1 is 6 halvings, and log₂ 64 = 6. Anything that halves the problem each step is O(log n).'},
{id:'th-p8',type:'predict',d:1,p:'python',title:'assert as a safety net',code:`def average(nums):
    assert len(nums) > 0, "need at least one number"
    return sum(nums) / len(nums)

try:
    average([])
except AssertionError as e:
    print("caught:", e)`,a:'caught: need at least one number',why:'An <code>assert</code> states an assumption. When it fails you learn which assumption broke, instead of getting a confusing error later.'},

/* ---------- concept ---------- */
{id:'th-m1',type:'mcq',d:1,p:'brute-force',title:'Why start with brute force?',q:'In an interview you do not see a fast solution yet. What is the best first move?',opts:['Stay quiet until you think of the optimal solution','Describe a correct brute-force solution and its complexity, then look for repeated work','Start coding something and fix it later','Ask for the answer'],a:1,why:'A correct slow solution proves you understand the problem, gives you something to test against, and shows where the wasted work is.'},
{id:'th-m2',type:'mcq',d:1,p:'big-o',title:'Big-O, Omega, Theta',q:'Linear search takes 1 step in the best case and n steps in the worst case. Which statement is correct?',opts:['Linear search is Θ(1)','Its worst-case running time is Θ(n), and its best case is Θ(1)','It is O(1) because sometimes it is fast','Big-O only describes the best case'],a:1,why:'Each case has its own bound. O is an upper bound, Ω a lower bound and Θ means both. "Linear search is O(n)" usually means the worst case.'},
{id:'th-m3',type:'mcq',d:2,p:'big-o',title:'Average case',q:'You search for a value that is equally likely to be at any of n positions. On average, how many elements does linear search check?',opts:['1','About n / 2','log n','n²'],a:1,why:'Averaging 1, 2, …, n gives (n + 1) / 2. Still Θ(n): constants do not change the growth rate.'},
{id:'th-m4',type:'mcq',d:1,p:'brute-force',title:'Edge cases first',q:'You must return the second largest value in a list. Which input is the most important edge case to ask about?',opts:['A list of 1,000 numbers','A list where every value is the same, or with fewer than two values','A sorted list','A list of positive numbers'],a:1,why:'With fewer than two distinct values there is no second largest. Ask what to return (None? an error?) before you code.'},
{id:'th-m5',type:'mcq',d:1,p:'brute-force',title:'Decomposition',q:'"Return the most common word in a sentence, ignoring case and punctuation." Which split into steps is best?',opts:['One big loop that does everything at once','Normalise the text → split into words → count each word → pick the word with the biggest count','Sort the sentence','Use recursion'],a:1,why:'Each step is small enough to write and test on its own. Most problems are a pipeline of simple steps like this.'},
{id:'th-m6',type:'mcq',d:2,p:'big-o',title:'Lower bound of a problem',q:'Why can no algorithm find the maximum of an unsorted list in less than Ω(n) time?',opts:['Because Python is slow','Any element you skip could be the maximum, so you must look at all n','Because max() is O(n)','It can: use binary search'],a:1,why:'This is a lower bound for the problem, not just for one algorithm: every element has to be read at least once.'},
{id:'th-m7',type:'mcq',d:1,p:'brute-force',title:'Testing against brute force',q:'You wrote a fast but tricky solution. What is a good way to test it?',opts:['Trust it if the first example passes','Compare it with a simple brute-force version on many small random inputs','Only test very large inputs','Read it again carefully'],a:1,why:'The brute force is easy to get right. If both agree on hundreds of random cases, the fast one is probably correct. This is called stress testing.'},
{id:'th-m8',type:'mcq',d:2,p:'math',title:'Only check up to √n',q:'To test whether n is prime by trial division, why is it enough to try divisors up to √n?',opts:['Because primes are rare','If n = a × b with both a and b bigger than √n, then a × b would be bigger than n','Because even numbers are never prime','It is not enough'],a:1,why:'Divisors come in pairs (a, n / a), and one of each pair is at most √n. Checking up to √n turns O(n) into O(√n).'},

/* ---------- complexity ---------- */
{id:'th-c1',type:'complexity',d:1,p:'brute-force',title:'All pairs',code:`for i in range(n):
    for j in range(i + 1, n):
        check(i, j)`,a:'O(n²)',why:'n(n − 1) / 2 pairs. Halving n² does not change the growth rate.'},
{id:'th-c2',type:'complexity',d:2,p:'math',title:'Divisors up to √n',code:`d = 1
while d * d <= n:
    if n % d == 0:
        count += 2
    d += 1`,opts:['O(1)','O(log n)','O(√n)','O(n)','O(n²)'],a:2,why:'The loop stops when d² passes n, so it runs about √n times.'},
{id:'th-c3',type:'complexity',d:2,p:'math',title:'Counting digits',code:`digits = 0
while n > 0:
    n //= 10
    digits += 1`,a:'O(log n)',why:'Each step divides n by 10, so the loop runs once per digit: log₁₀ n times.'},
{id:'th-c4',type:'complexity',d:1,p:'brute-force',title:'All triples',code:`for i in range(n):
    for j in range(i + 1, n):
        for k in range(j + 1, n):
            check(i, j, k)`,opts:['O(n)','O(n²)','O(n³)','O(2ⁿ)'],a:2,why:'Three nested loops over n: about n³ / 6 triples, which is O(n³).'},

/* ---------- choose ---------- */
{id:'th-ch1',type:'choose',d:1,p:'brute-force',title:'n is tiny',q:'n is at most 20 and the problem asks for the best subset. What approach is reasonable?',opts:['Try every subset: 2²⁰ ≈ 1 million, which is fast enough','It is impossible','Only a greedy algorithm can work','Sort and binary search'],a:0,why:'Constraints tell you which complexity is allowed. n ≤ 20 often means "brute force over subsets is fine".'},
{id:'th-ch2',type:'choose',d:2,p:'big-o',title:'Reading constraints',q:'n can be up to 100,000. Roughly which complexity do you need?',opts:['O(n³)','O(n²) is risky (10¹⁰ steps); aim for O(n log n) or O(n)','O(2ⁿ)','Anything works'],a:1,why:'A rough budget is about 10⁷–10⁸ simple steps per second in Python-like languages. 10⁵ × 10⁵ = 10¹⁰ is far too many.'},

/* ---------- dry run ---------- */
{id:'th-dr1',type:'dryrun',d:1,p:'math',title:'Digit sum',code:`n = 4096
total = 0
while n > 0:
    total += n % 10
    n //= 10`,cols:['n','total'],rows:[['409','6'],['40','15'],['4','15'],['0','19']],why:'Each step adds the last digit to total and drops it from n: 6, then 9, then 0, then 4.'},
{id:'th-dr2',type:'dryrun',d:2,p:'math',title:"Euclid's algorithm",code:`a, b = 48, 18
while b != 0:
    a, b = b, a % b`,cols:['a','b'],rows:[['18','12'],['12','6'],['6','0']],why:'gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = gcd(6, 0) = 6. The remainder shrinks fast, which makes this O(log min(a, b)).'},
{id:'th-dr3',type:'dryrun',d:2,p:'brute-force',title:'Brute-force best pair',code:`nums = [3, -1, 4]
pairs = [(0, 1), (0, 2), (1, 2)]
best = None
for i, j in pairs:
    p = nums[i] * nums[j]
    if best is None or p > best:
        best = p`,cols:['i','j','p','best'],given:[0,1],rowLabel:'Pair',rows:[['0','1','-3','-3'],['0','2','12','12'],['1','2','-4','12']],why:'Every pair is tried once. The best product is 3 × 4 = 12.'},

/* ---------- complete the code ---------- */
{id:'th-b1',type:'blanks',d:1,p:'math',title:'Complete count_digits',code:`def count_digits(n):
    if n == 0:
        return ______
    count = 0
    while n > 0:
        n ______ 10
        count += 1
    return count`,blanks:['1','//='],tests:[['count_digits(0)','1'],['count_digits(7)','1'],['count_digits(12345)','5']],why:'Zero has one digit but the loop would not run, so it is a special case. Each <code>n //= 10</code> removes one digit.'},
{id:'th-b2',type:'blanks',d:2,p:'brute-force',title:'Complete the stress test',code:`import random

def brute_max(nums):
    best = nums[0]
    for x in nums:
        best = max(best, x)
    return best

def fast_max(nums):
    return sorted(nums)[______]

for _ in range(200):
    nums = [random.randint(-50, 50) for _ in range(random.randint(1, 8))]
    assert brute_max(nums) == ______, nums
print("all agree")`,blanks:[['-1','len(nums) - 1','len(nums)-1'],['fast_max(nums)']],out:'all agree',why:'Random small inputs plus a trusted slow version catch bugs that hand-picked examples miss. The failing input is printed by the assert.'},
{id:'th-b3',type:'blanks',d:2,p:'math',title:'Complete is_prime',code:`def is_prime(n):
    if n < 2:
        return False
    d = 2
    while ______ <= n:
        if n % d == 0:
            return ______
        d += 1
    return True`,blanks:[['d * d','d*d','d ** 2'],['False']],tests:[['is_prime(2)','True'],['is_prime(9)','False'],['is_prime(97)','True'],['is_prime(1)','False']],why:'Stop once d² passes n: any divisor larger than √n pairs with one smaller than √n that was already tried.'},

/* ---------- debug ---------- */
{id:'th-d1',type:'debug',d:1,p:'math',title:'Perfect squares are "prime"',code:`def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5)):
        if n % d == 0:
            return False
    return True`,opts:['n < 2 should be n < 3','range stops before √n, so for 9 or 25 the divisor 3 or 5 is never tried','The function should return None','n ** 0.5 is not a square root'],a:1,why:'<code>range(2, 3)</code> for n = 9 only tries 2. The stop value is excluded, so use <code>int(n ** 0.5) + 1</code>.',fix:`def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True`,tests:[['is_prime(9)','False'],['is_prime(25)','False'],['is_prime(7)','True'],['is_prime(2)','True']]},
{id:'th-d2',type:'debug',d:1,p:'brute-force',title:'Average of nothing',code:`def average(nums):
    return sum(nums) / len(nums)`,opts:['sum is wrong for negative numbers','An empty list divides by zero; the spec says to return 0.0','It should use //','len is O(n)'],a:1,why:'Always ask "what if the input is empty?". Here the spec wants 0.0 for an empty list.',fix:`def average(nums):
    if not nums:
        return 0.0
    return sum(nums) / len(nums)`,tests:[['average([2, 4])','3.0'],['average([])','0.0'],['average([5])','5.0']]},
{id:'th-d3',type:'debug',d:2,p:'brute-force',title:'Pairs counted twice',code:`def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count`,opts:['target should be compared with >=','j starts at 0, so each pair is counted twice and an element can pair with itself','The function needs a set','count should start at 1'],a:1,why:'Pairs (i, j) with i &lt; j are counted once by starting the inner loop at <code>i + 1</code>.',fix:`def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count`,tests:[['count_pairs([1, 2, 3, 4], 5)','2'],['count_pairs([3, 3], 6)','1'],['count_pairs([2], 4)','0']]},
{id:'th-d4',type:'debug',d:1,p:'math',title:'The digit sum that stops early',code:`def digit_sum(n):
    total = 0
    while n > 10:
        total += n % 10
        n //= 10
    return total`,opts:['% should be //','The loop stops while n still has one digit left (and skips 10 itself); use while n > 0','total should start at 1','n //= 10 should be n -= 10'],a:1,why:'For 123 the loop stops at n = 1 and loses that digit. Trace small inputs (0, 7, 10, 123) to find boundary bugs like this.',fix:`def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total`,tests:[['digit_sum(123)','6'],['digit_sum(10)','1'],['digit_sum(7)','7'],['digit_sum(0)','0']]},

/* ---------- coding (schema v2: constraints, examples, mistakes, follow-up) ---------- */
{id:'th-digit-sum',type:'code',d:1,p:'math',title:'Sum of Digits',prompt:'<p>Return the sum of the digits of a non-negative integer <code>n</code>, using arithmetic (<code>%</code> and <code>//</code>), not by converting to a string.</p>',
constraints:['0 ≤ n ≤ 10<sup>18</sup>'],
starter:`def digit_sum(n):
    # your code here
    pass`,solution:`def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10   # last digit
        n //= 10          # drop the last digit
    return total`,
tests:[['digit_sum(123)','6'],['digit_sum(0)','0'],['digit_sum(9)','9'],['digit_sum(1000)','1'],['digit_sum(999999999999999999)','162']],
hints:['n % 10 is the last digit. n // 10 removes it.','Repeat until n becomes 0.'],approach:'Peel digits off the end with % 10 and // 10 until nothing is left.',cx:'O(d) time where d is the number of digits (O(log n)), O(1) space',
dry:`n = 123: total 0 + 3 = 3, n = 12
         total 3 + 2 = 5, n = 1
         total 5 + 1 = 6, n = 0 → stop, return 6`,
mistakes:['Writing <code>while n > 10</code> and losing the last digit.','Using <code>/</code> instead of <code>//</code>, which turns n into a float.'],
followup:'Repeat the digit sum until a single digit is left (the "digital root"). Can you do it in O(1) with modulo 9?'},

{id:'th-sum-to-n',type:'code',d:1,p:'math',title:'Sum 1 to n in O(1)',prompt:'<p>Return 1 + 2 + … + n without a loop. Return 0 when n is 0.</p>',
constraints:['0 ≤ n ≤ 10<sup>12</sup> (a loop would be far too slow)'],
starter:`def sum_to_n(n):
    # your code here
    pass`,solution:`def sum_to_n(n):
    return n * (n + 1) // 2`,
tests:[['sum_to_n(1)','1'],['sum_to_n(10)','55'],['sum_to_n(0)','0'],['sum_to_n(100)','5050'],['sum_to_n(10**12)','500000000000500000000000']],
hints:['Pair the first and last numbers: 1 + n, 2 + (n − 1), …','There are n / 2 such pairs, each adding to n + 1.'],approach:'Gauss: n(n + 1) / 2, computed with integer division so the result stays exact.',cx:'O(1) time, O(1) space',
mistakes:['Using <code>/</code>: <code>n * (n + 1) / 2</code> is a float and loses precision for huge n.','Writing <code>n * n + 1 // 2</code>: operator precedence needs the brackets.'],
followup:'Return the sum of the squares 1² + 2² + … + n² in O(1). (Formula: n(n + 1)(2n + 1) / 6.)'},

{id:'th-is-prime',type:'code',d:1,p:'math',title:'Is It Prime?',prompt:'<p>Return <code>True</code> if <code>n</code> is a prime number. Numbers below 2 are not prime.</p>',prereq:['th-m8'],
constraints:['−10<sup>6</sup> ≤ n ≤ 10<sup>12</sup>','Your solution must be O(√n)'],
starter:`def is_prime(n):
    # your code here
    pass`,solution:`def is_prime(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True`,
tests:[['is_prime(2)','True'],['is_prime(15)','False'],['is_prime(97)','True'],['is_prime(1)','False'],['is_prime(0)','False'],['is_prime(-7)','False'],['is_prime(49)','False'],['is_prime(1000003)','True']],
hints:['Handle n < 2 first.','You only need to try divisors d while d * d <= n.'],approach:'Trial division up to √n.',cx:'O(√n) time, O(1) space',
mistakes:['Stopping before √n (missing 9 = 3 × 3).','Forgetting 0, 1 and negative numbers.','Looping up to n: correct but O(n), too slow for n = 10¹².'],
followup:'List all primes below n with the Sieve of Eratosthenes in O(n log log n).'},

{id:'th-gcd',type:'code',d:1,p:'math',title:'Greatest Common Divisor',prompt:'<p>Return the greatest common divisor of two non-negative integers, using Euclid’s algorithm (not <code>math.gcd</code>). <code>gcd(0, 0)</code> is 0.</p>',
constraints:['0 ≤ a, b ≤ 10<sup>18</sup>'],
starter:`def gcd(a, b):
    # your code here
    pass`,solution:`def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a`,
tests:[['gcd(48, 18)','6'],['gcd(7, 13)','1'],['gcd(0, 5)','5'],['gcd(5, 0)','5'],['gcd(0, 0)','0'],['gcd(10**18, 10**9)','1000000000']],
hints:['gcd(a, b) = gcd(b, a % b).','Stop when b becomes 0: the answer is a.'],approach:"Euclid's algorithm: replace (a, b) with (b, a % b) until b is 0.",cx:'O(log min(a, b)) time, O(1) space',
dry:`gcd(48, 18) → (18, 12) → (12, 6) → (6, 0) → 6`,
mistakes:['Subtracting instead of using %: correct but can take billions of steps.','Returning b instead of a at the end.'],
followup:'Write lcm(a, b) using gcd. Why compute a // gcd(a, b) * b instead of a * b // gcd(a, b)?'},

{id:'th-leap-year',type:'code',d:1,p:'brute-force',title:'Leap Year',prompt:'<p>A year is a leap year if it is divisible by 4, except years divisible by 100, unless they are also divisible by 400. Return <code>True</code> for leap years.</p>',
constraints:['1 ≤ year ≤ 10<sup>9</sup>'],
starter:`def is_leap(year):
    # your code here
    pass`,solution:`def is_leap(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0`,
tests:[['is_leap(2024)','True'],['is_leap(1900)','False'],['is_leap(2000)','True'],['is_leap(2023)','False'],['is_leap(2100)','False'],['is_leap(2400)','True']],
hints:['Check the most specific rule (400) first.','Then 100, then 4.'],approach:'Test the rules from most specific to least specific so each exception overrides the general rule.',cx:'O(1) time, O(1) space',
mistakes:['Checking % 4 first and returning True for 1900.','Forgetting that 2000 is a leap year.'],
followup:'Write it as one boolean expression, then decide which version is easier to read.'},

{id:'th-time-format',type:'code',d:1,p:'math',title:'Seconds to H:MM:SS',prompt:'<p>Convert a number of seconds to a string <code>"H:MM:SS"</code>. Hours are not padded; minutes and seconds always have two digits.</p>',
constraints:['0 ≤ seconds ≤ 10<sup>7</sup>'],
starter:`def format_time(seconds):
    # your code here
    pass`,solution:`def format_time(seconds):
    hours = seconds // 3600
    minutes = seconds % 3600 // 60
    secs = seconds % 60
    return f"{hours}:{minutes:02d}:{secs:02d}"`,
tests:[['format_time(3661)','"1:01:01"'],['format_time(0)','"0:00:00"'],['format_time(59)','"0:00:59"'],['format_time(86399)','"23:59:59"'],['format_time(360000)','"100:00:00"']],
hints:['3600 seconds in an hour, 60 in a minute.','What is left after removing whole hours? Use % 3600.'],approach:'Decompose: whole hours, then whole minutes of what remains, then seconds; format with :02d.',cx:'O(1) time, O(1) space',
mistakes:['Computing minutes as seconds // 60 (that includes the hours).','Forgetting zero padding: "1:1:1".'],
followup:'Parse the string back: "1:01:01" → 3661.'},

{id:'th-count-pairs',type:'code',d:1,p:'brute-force',title:'Count Pairs with a Given Sum',prompt:'<p>Count pairs of positions <code>i &lt; j</code> with <code>nums[i] + nums[j] == target</code>. Write the brute force: try every pair.</p>',
constraints:['0 ≤ len(nums) ≤ 300','−1000 ≤ nums[i], target ≤ 1000'],
starter:`def count_pairs(nums, target):
    # your code here
    pass`,solution:`def count_pairs(nums, target):
    count = 0
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):   # j > i: each pair once, never with itself
            if nums[i] + nums[j] == target:
                count += 1
    return count`,
tests:[['count_pairs([1, 2, 3, 4], 5)','2'],['count_pairs([3, 3, 3], 6)','3'],['count_pairs([], 1)','0'],['count_pairs([5], 10)','0'],['count_pairs([-1, 1, 0, 0], 0)','2']],
hints:['Two nested loops: i from 0, j from i + 1.','Starting j at i + 1 avoids double counting and pairing an element with itself.'],approach:'Brute force over all n(n − 1) / 2 pairs.',cx:'O(n²) time, O(1) space',
mistakes:['Starting j at 0, which counts every pair twice.','Counting the pair (i, i).'],
followup:'Solve it in O(n) with a dictionary of counts seen so far (see Hash Tables).'},

{id:'th-max-subarray-brute',type:'code',d:2,p:'brute-force',title:'Best Subarray Sum (brute force)',prompt:'<p>Return the largest sum of a non-empty contiguous subarray. Try every start, and extend the end one step at a time keeping a running sum, so the solution is O(n²), not O(n³).</p>',
constraints:['1 ≤ len(nums) ≤ 1000','−10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup>'],
starter:`def max_subarray(nums):
    # your code here
    pass`,solution:`def max_subarray(nums):
    best = nums[0]
    for start in range(len(nums)):
        total = 0
        for end in range(start, len(nums)):
            total += nums[end]          # sum of nums[start:end + 1], built incrementally
            best = max(best, total)
    return best`,
tests:[['max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])','6'],['max_subarray([1])','1'],['max_subarray([-3, -1, -2])','-1'],['max_subarray([5, 4, -1, 7, 8])','23'],['max_subarray([0, -1, 0])','0']],
hints:['A subarray is fixed by its start and end.','For a fixed start, extending the end by one only adds nums[end] to the previous sum.'],approach:'Two loops with a running sum: O(n²). Recomputing sum(nums[start:end + 1]) each time would be O(n³).',cx:'O(n²) time, O(1) space',
mistakes:['Starting best at 0, which is wrong when every number is negative.','Calling sum() on every slice: O(n³).'],
followup:"Kadane's algorithm solves it in O(n) (arr-max-subarray in topic 4). Use this brute force to stress-test it."},

{id:'th-count-divisors',type:'code',d:2,p:'math',title:'Count Divisors',prompt:'<p>Return how many positive integers divide <code>n</code> exactly.</p>',prereq:['th-m8'],
constraints:['1 ≤ n ≤ 10<sup>12</sup>','Must run in O(√n)'],
starter:`def count_divisors(n):
    # your code here
    pass`,solution:`def count_divisors(n):
    count = 0
    d = 1
    while d * d <= n:
        if n % d == 0:
            count += 1 if d * d == n else 2   # d and n // d
        d += 1
    return count`,
tests:[['count_divisors(1)','1'],['count_divisors(12)','6'],['count_divisors(36)','9'],['count_divisors(13)','2'],['count_divisors(1000000007)','2'],['count_divisors(735134400)','1344']],
hints:['Divisors come in pairs: d and n // d.','When d * d == n the pair is the same number: count it once.'],approach:'Walk d up to √n and count both members of each divisor pair.',cx:'O(√n) time, O(1) space',
dry:`n = 36: d=1 (1, 36) +2, d=2 (2, 18) +2, d=3 (3, 12) +2,
        d=4 (4, 9) +2, d=5 no, d=6 (6, 6) +1 → 9`,
mistakes:['Counting a perfect square’s root twice.','Looping all the way to n.'],
followup:'Return the divisors themselves in increasing order, still in O(√n) plus sorting.'},

{id:'th-collatz',type:'code',d:2,p:'simulation',title:'Collatz Steps',prompt:'<p>Starting from n, repeat: if n is even, halve it; otherwise replace it with 3n + 1. Return how many steps it takes to reach 1.</p>',
constraints:['1 ≤ n ≤ 10<sup>6</sup>'],
starter:`def collatz_steps(n):
    # your code here
    pass`,solution:`def collatz_steps(n):
    steps = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        steps += 1
    return steps`,
tests:[['collatz_steps(1)','0'],['collatz_steps(6)','8'],['collatz_steps(7)','16'],['collatz_steps(27)','111'],['collatz_steps(2)','1']],
hints:['Simulate exactly what the rules say.','Count steps until n == 1. Starting at 1 means 0 steps.'],approach:'Direct simulation with a while loop.',cx:'Unknown in general (an open problem!); fast in practice for these limits. O(1) space',
mistakes:['Using n / 2, which makes n a float.','Counting the starting number as a step.'],
followup:'Find the n below 100,000 with the most steps. Cache results in a dict so each chain reuses earlier answers.'},

{id:'th-diagonal-sum',type:'code',d:2,p:'matrix',title:'Matrix Diagonal Sum',prompt:'<p>Return the sum of both diagonals of a square matrix. If the size is odd, the centre cell belongs to both diagonals: count it once.</p>',
constraints:['1 ≤ n ≤ 100 (matrix is n × n)','−100 ≤ value ≤ 100'],
starter:`def diagonal_sum(grid):
    # your code here
    pass`,solution:`def diagonal_sum(grid):
    n = len(grid)
    total = 0
    for i in range(n):
        total += grid[i][i]            # main diagonal
        total += grid[i][n - 1 - i]    # anti-diagonal
    if n % 2 == 1:
        total -= grid[n // 2][n // 2]  # centre was added twice
    return total`,
tests:[['diagonal_sum([[1, 2, 3], [4, 5, 6], [7, 8, 9]])','25'],['diagonal_sum([[5]])','5'],['diagonal_sum([[1, 1], [1, 1]])','4'],['diagonal_sum([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])','68']],
hints:['Main diagonal: grid[i][i]. Anti-diagonal: grid[i][n − 1 − i].','When n is odd both diagonals meet at the centre.'],approach:'One pass over the rows, adding both diagonal cells, then subtract the centre once if n is odd.',cx:'O(n) time, O(1) space',
mistakes:['Looping over every cell: O(n²) and easy to get wrong.','Counting the centre twice for odd n.'],
followup:'Return the sum of each "ring" of the matrix, from the outside in.'},

{id:'th-zero-triplets',type:'code',d:3,p:'brute-force',title:'Count Zero-Sum Triplets',prompt:'<p>Count index triples <code>i &lt; j &lt; k</code> with <code>nums[i] + nums[j] + nums[k] == 0</code>. n is small, so a careful brute force is the intended solution.</p>',
constraints:['0 ≤ len(nums) ≤ 100','−100 ≤ nums[i] ≤ 100'],
starter:`def zero_triplets(nums):
    # your code here
    pass`,solution:`def zero_triplets(nums):
    n = len(nums)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    count += 1
    return count`,
tests:[['zero_triplets([-1, 0, 1, 2, -1, -4])','3'],['zero_triplets([0, 0, 0])','1'],['zero_triplets([0, 0, 0, 0])','4'],['zero_triplets([1, 2])','0'],['zero_triplets([])','0'],['zero_triplets([-2, 1, 1, -2, 1, 1])','12']],
hints:['Three nested loops, each starting after the previous index.','n ≤ 100 means about 160,000 triples: fine.'],approach:'Enumerate every triple once with i < j < k. The constraints make O(n³) acceptable.',cx:'O(n³) time, O(1) space',
mistakes:['Starting inner loops at 0 and counting the same triple six times.','Assuming the values are distinct.'],
followup:'Count the triples in O(n²) by sorting and using two pointers, or with a dictionary of pair sums.'},
]);
