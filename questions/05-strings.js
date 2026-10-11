/* Topic 5 · Strings. */
COURSE.qs('strings',[
{id:'st-p1',type:'predict',d:1,p:'python',title:'Strings cannot change',code:`s = "cat"
s[0] = "b"
print(s)`,opts:['bat','cat','TypeError','IndexError'],a:2,why:'Strings are immutable. Build a new one: <code>"b" + s[1:]</code>.'},
{id:'st-p2',type:'predict',d:1,p:'python',title:'Slicing',code:`s = "algorithm"
print(s[1:4], s[-3:])`,a:'lgo thm',why:'Index 1 up to (not including) 4, and the last three characters.'},
{id:'st-p3',type:'predict',d:1,p:'python',title:'split and join',code:`words = "  data   structures  ".split()
print("-".join(words))`,a:'data-structures',why:'split() with no argument splits on any run of whitespace and drops empty pieces.'},
{id:'st-p4',type:'predict',d:1,p:'python',title:'Characters as numbers',code:`print(ord("c") - ord("a"), chr(ord("a") + 25))`,a:'2 z',why:'ord gives the code point. ord(ch) − ord("a") maps a..z to 0..25: handy for 26-slot count arrays.'},
{id:'st-p5',type:'predict',d:1,p:'python',title:'find vs index',code:`s = "banana"
print(s.find("na"), s.find("x"), s.count("a"))`,a:'2 -1 3',why:'find returns the first index or −1 (index() would raise ValueError). count counts non-overlapping occurrences.'},
{id:'st-p6',type:'predict',d:1,p:'python',title:'strip',code:`print("[" + "  hi  ".strip() + "]")`,a:'[hi]',why:'strip removes leading and trailing whitespace (lstrip/rstrip do one side).'},
{id:'st-p7',type:'predict',d:1,p:'python',title:'Repeat and add',code:`print("ab" * 3 + "c")`,a:'abababc',why:'* repeats, + concatenates. Both build new strings.'},
{id:'st-p8',type:'predict',d:2,p:'python',title:'Cleaning a sentence',code:`s = "A man, a plan!"
clean = "".join(ch.lower() for ch in s if ch.isalnum())
print(clean)`,a:'amanaplan',why:'Keep letters and digits, lower-case them. A common first step for palindrome problems.'},
{id:'st-p9',type:'predict',d:1,p:'sorting',title:'sorted() on a string',code:`print(sorted("cab"))`,opts:["'abc'","['a', 'b', 'c']","['c', 'a', 'b']",'Error'],a:1,why:'sorted always returns a list. Use "".join(sorted(s)) to get a string back.'},
{id:'st-p10',type:'predict',d:2,p:'python',title:'Comparing strings',code:`print("apple" < "banana", "Zebra" < "apple", "10" < "9")`,a:'True True True',why:'Strings compare character by character by code point: "Z" (90) < "a" (97), and "1" < "9". Numbers stored as strings do not compare numerically!'},
{id:'st-p11',type:'predict',d:1,p:'python',title:'Upper, lower, title',code:`s = "hello World"
print(s.upper(), s.capitalize())`,a:'HELLO WORLD Hello world',why:'Each method returns a new string.'},
{id:'st-p12',type:'predict',d:2,p:'two-pointers',title:'Reverse words',code:`s = "the sky is blue"
print(" ".join(reversed(s.split())))`,a:'blue is sky the',why:'Split into words, reverse the list, join back.'},
{id:'st-c1',type:'complexity',d:2,p:'big-o',title:'Building a string with +=',code:`result = ""
for word in words:              # n characters in total
    result = result + word`,a:'O(n²)',why:'Each + copies everything built so far. (CPython sometimes optimises +=, but you cannot rely on it.) Use "".join(words): O(n).'},
{id:'st-c2',type:'complexity',d:1,p:'big-o',title:'join',code:`result = "".join(parts)       # total length n`,a:'O(n)',why:'join computes the final size once and copies each piece once.'},
{id:'st-c3',type:'complexity',d:1,p:'big-o',title:'Reversing with a slice',code:`r = s[::-1]`,a:'O(n)',why:'A new string of n characters.'},
{id:'st-c4',type:'complexity',d:2,p:'big-o',title:'Comparing two strings',code:`same = (a == b)                # both of length n`,a:'O(n)',why:'Compared character by character (it stops early at the first difference).'},
{id:'st-c5',type:'complexity',d:2,p:'sliding-window',title:'Every substring',code:`count = 0
for i in range(len(s)):
    for j in range(i + 1, len(s) + 1):
        count += 1                 # s[i:j]`,a:'O(n²)',why:'There are n(n + 1)/2 substrings. Slicing each one would even make it O(n³).'},
{id:'st-m1',type:'mcq',d:1,p:'python',title:'Immutable means…',q:'What does it mean that Python strings are immutable?',opts:['They cannot be printed','Their characters cannot be changed in place; every “change” creates a new string','They are always lowercase','They cannot be sliced'],a:1,why:'To edit character by character, convert to a list, edit, then "".join it.'},
{id:'st-m2',type:'mcq',d:1,p:'hashing',title:'26 counters',q:'For lowercase letters only, what is a compact alternative to a dict of counts?',opts:['A set','A list of 26 ints indexed by ord(ch) − ord("a")','A tuple of strings','A sorted string'],a:1,why:'Fixed size, fast, and two such lists can be compared with ==.'},
{id:'st-m3',type:'mcq',d:2,p:'hashing',title:'Anagram signature',q:'Which value is identical for all anagrams of a word?',opts:['The first letter','The sorted letters (or the tuple of 26 counts)','The length times 26','The word reversed'],a:1,why:'Great as a dict key for grouping anagrams.'},
{id:'st-ch1',type:'choose',d:1,p:'hashing',title:'Character counts',q:'You need the count of every character in a text.',opts:['str.count for each character','collections.Counter(text)','A stack','Sorting'],a:1,why:'One pass. Calling str.count per distinct character re-scans the text each time.'},
{id:'st-ch2',type:'choose',d:1,p:'python',title:'Building output',q:'You build a long output string piece by piece in a loop.',opts:['s += piece','Collect pieces in a list, then "".join(pieces)','Use a set','Use recursion'],a:1,why:'Linear time instead of potentially quadratic.'},
{id:'st-dr1',type:'dryrun',d:1,p:'python',title:'Reversing by prepending',code:`s = "abc"
result = ""
for ch in s:
    result = ch + result`,cols:['ch','result'],given:[0],rows:[['a','a'],['b','ba'],['c','cba']],why:'Each new character goes in front.'},
{id:'st-dr2',type:'dryrun',d:1,p:'two-pointers',title:'Palindrome pointers',code:`s = "level"
left, right = 0, len(s) - 1
while left < right and s[left] == s[right]:
    left += 1
    right -= 1`,cols:['left','right'],rows:[['1','3'],['2','2']],why:'l/l and e/e match; the pointers meet at the middle “v”.'},
{id:'st-dr3',type:'dryrun',d:1,p:'hashing',title:'26-slot counts',code:`counts = [0] * 26
for ch in "abba":
    counts[ord(ch) - ord("a")] += 1`,cols:['ch','counts[:2]'],given:[0],rows:[['a','[1, 0]'],['b','[1, 1]'],['b','[1, 2]'],['a','[2, 2]']],why:'Slot 0 counts a, slot 1 counts b.'},
{id:'st-b1',type:'blanks',d:1,p:'two-pointers',title:'Complete is_palindrome',code:`def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if ______:
            return False
        left += 1
        ______
    return True`,blanks:[['s[left] != s[right]'],['right -= 1']],tests:[['is_palindrome("racecar")','True'],['is_palindrome("ab")','False'],['is_palindrome("")','True']],why:'Compare the ends, then move inward.'},
{id:'st-b2',type:'blanks',d:2,p:'two-pointers',title:'Complete compress',code:`def compress(s):
    out, i = [], 0
    while i < len(s):
        j = i
        while j < len(s) and ______:
            j += 1
        out.append(s[i] + str(______))
        i = j
    return "".join(out)`,blanks:[['s[j] == s[i]'],['j - i']],tests:[['compress("aaabccdd")','"a3b1c2d2"'],['compress("")','""'],['compress("z")','"z1"']],why:'j runs to the end of the group of equal characters; the group length is j − i.'},
{id:'st-b3',type:'blanks',d:1,p:'python',title:'Complete reverse_words',code:`def reverse_words(s):
    return " ".join(______)`,blanks:[['reversed(s.split())','s.split()[::-1]']],tests:[['reverse_words("the sky is blue")','"blue is sky the"'],['reverse_words("  hello   world  ")','"world hello"']],why:'split() also removes extra spaces.'},
{id:'st-d1',type:'debug',d:1,p:'python',title:'Editing a string in place',code:`def capitalize_first(s):
    s[0] = s[0].upper()
    return s`,opts:['upper() is wrong','Strings are immutable: s[0] = … raises TypeError','It should return None','s[0] should be s[1]'],a:1,why:'Build a new string: s[:1].upper() + s[1:].',fix:`def capitalize_first(s):
    return s[:1].upper() + s[1:]`,tests:[['capitalize_first("hello")','"Hello"'],['capitalize_first("")','""']]},
{id:'st-d2',type:'debug',d:1,p:'two-pointers',title:'Strict palindrome',code:`def is_palindrome_sentence(s):
    return s == s[::-1]`,opts:['[::-1] is wrong','It compares spaces, punctuation and case, so "Race car" is rejected','It should use sorted','It works'],a:1,why:'Clean first (keep alphanumerics, lower-case), or use two pointers that skip non-alphanumerics.',fix:`def is_palindrome_sentence(s):
    clean = [ch.lower() for ch in s if ch.isalnum()]
    return clean == clean[::-1]`,tests:[['is_palindrome_sentence("Race car")','True'],['is_palindrome_sentence("A man, a plan, a canal: Panama")','True'],['is_palindrome_sentence("abc")','False']]},
{id:'st-d3',type:'debug',d:2,p:'two-pointers',title:'Compression loses the last group',code:`def compress(s):
    if not s:
        return ""
    out, count = [], 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            out.append(s[i - 1] + str(count))
            count = 1
    return "".join(out)`,opts:['count should start at 0','The final group is never appended after the loop','range should start at 0','str(count) is wrong'],a:1,why:'compress("aab") returns "a2" instead of "a2b1".',fix:`def compress(s):
    if not s:
        return ""
    out, count = [], 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            out.append(s[i - 1] + str(count))
            count = 1
    out.append(s[-1] + str(count))
    return "".join(out)`,tests:[['compress("aab")','"a2b1"'],['compress("a")','"a1"']]},
{id:'st-reverse',type:'code',d:1,p:'two-pointers',title:'Reverse String',prompt:'<p><code>chars</code> is a list of characters. Reverse it in place with O(1) extra space.</p>',starter:`def reverse_string(chars):
    pass`,solution:`def reverse_string(chars):
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1`,post:`def _check(s):
    a = list(s)
    reverse_string(a)
    return "".join(a)`,tests:[['_check("hello")','"olleh"','','["h", "e", "l", "l", "o"]'],['_check("ab")','"ba"','','["a", "b"]'],['_check("")','""','','[]'],['_check("abcde")','"edcba"']],constraints:['0 ≤ len(s) ≤ 10<sup>5</sup>','O(1) extra space'],mistakes:['Returning a reversed copy instead of changing the list.','Swapping all the way to the end, which undoes the reversal.'],followup:'Reverse each word of a sentence in place, keeping the word order.',hints:['Swap the ends and move inward.','Swap the two ends, then move both pointers inward until they meet.'],approach:'Two pointers.',cx:'O(n) time, O(1) space'},
{id:'st-palindrome',type:'code',d:1,p:'two-pointers',title:'Valid Palindrome',prompt:'<p>Ignoring case and every non-alphanumeric character, is the string a palindrome?</p>',starter:`def is_palindrome(s):
    pass`,solution:`def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if not s[left].isalnum():
            left += 1
        elif not s[right].isalnum():
            right -= 1
        elif s[left].lower() != s[right].lower():
            return False
        else:
            left += 1
            right -= 1
    return True`,tests:[['is_palindrome("A man, a plan, a canal: Panama")','True'],['is_palindrome("race a car")','False'],['is_palindrome(" ")','True'],['is_palindrome("0P")','False']],constraints:['1 ≤ len(s) ≤ 2 × 10<sup>5</sup>'],mistakes:['Forgetting to lower-case before comparing.','Building a cleaned copy is fine, but comparing before skipping non-alphanumeric characters is not.'],followup:'Allow one deletion (st-palindrome-ii).',hints:['Cleaning into a new string is fine (O(n) space).','O(1) space: two pointers that skip characters which are not letters or digits.'],approach:'Two pointers with skipping.',cx:'O(n) time, O(1) space'},
{id:'st-char-freq',type:'code',d:1,p:'hashing',title:'Character Frequency',prompt:'<p>Return a list of <code>(char, count)</code> pairs for the characters of s, most frequent first; ties alphabetical.</p>',starter:`def char_frequency(s):
    pass`,solution:`from collections import Counter

def char_frequency(s):
    return sorted(Counter(s).items(), key=lambda kv: (-kv[1], kv[0]))`,tests:[['char_frequency("banana")','[("a", 3), ("n", 2), ("b", 1)]'],['char_frequency("")','[]'],['char_frequency("abab")','[("a", 2), ("b", 2)]'],['char_frequency("aaab")','[("a", 3), ("b", 1)]']],constraints:['0 ≤ len(s) ≤ 10<sup>5</sup>'],mistakes:['Sorting by count only, so ties come out in random order.','Sorting ascending instead of most frequent first.'],followup:'Return only the k most frequent characters with a heap.',hints:['Count, then sort by (−count, char).','Count with a dict or Counter, then sort with the key (−count, char).'],approach:'Counter + sorted with a tuple key.',cx:'O(n + k log k)'},
{id:'st-first-unique',type:'code',d:1,p:'hashing',title:'First Unique Character',prompt:'<p>Return the index of the first character that appears exactly once, or -1.</p>',starter:`def first_uniq_char(s):
    pass`,solution:`from collections import Counter

def first_uniq_char(s):
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1`,tests:[['first_uniq_char("leetcode")','0'],['first_uniq_char("loveleetcode")','2'],['first_uniq_char("aabb")','-1'],['first_uniq_char("")','-1']],constraints:['0 ≤ len(s) ≤ 10<sup>5</sup>','lowercase letters'],mistakes:['Using s.count() for each character: O(n²).','Returning the character instead of its index.'],followup:'Answer the same question for a stream of characters arriving one by one.',hints:['Two passes: count everything, then find the first count of 1.','Count first; then scan again and return the first index whose count is 1.'],approach:'Counter, then scan.',cx:'O(n)'},
{id:'st-compress',type:'code',d:2,p:'two-pointers',title:'String Compression',prompt:'<p>Replace each run of a repeated character by the character and the run length; single characters keep no number. If the result is not shorter than s, return s.</p><p><code>"aabcccccaaa"</code> → <code>"a2bc5a3"</code></p>',starter:`def compress(s):
    pass`,solution:`def compress(s):
    out, i = [], 0
    while i < len(s):
        j = i
        while j < len(s) and s[j] == s[i]:
            j += 1
        out.append(s[i] + (str(j - i) if j - i > 1 else ""))
        i = j
    result = "".join(out)
    return result if len(result) < len(s) else s`,tests:[['compress("aabcccccaaa")','"a2bc5a3"'],['compress("abc")','"abc"'],['compress("")','""'],['compress("aaaaaaaaaaaa")','"a12"']],constraints:['0 ≤ len(s) ≤ 10<sup>4</sup>'],mistakes:['Forgetting to write the last run after the loop.','Building the result with += inside the loop instead of a list + join.'],followup:'Write the inverse function that decompresses "a2bc5".',hints:['Walk over groups of equal characters with two indexes.','Build pieces in a list and join at the end.'],approach:'Run-length encoding with a group pointer.',cx:'O(n)'},
{id:'st-longest-unique',type:'code',d:2,p:'sliding-window',title:'Longest Substring Without Repeating Characters',prompt:'<p>Return the length of the longest substring with no repeated characters.</p><p><code>"abcabcbb"</code> → <code>3</code> ("abc")</p>',starter:`def length_of_longest_substring(s):
    pass`,solution:`def length_of_longest_substring(s):
    last = {}                      # char -> last index seen
    left = best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1    # jump past the previous copy
        last[ch] = right
        best = max(best, right - left + 1)
    return best`,brute:{code:`def length_of_longest_substring(s):
    best = 0
    for i in range(len(s)):
        seen = set()
        for j in range(i, len(s)):
            if s[j] in seen:
                break
            seen.add(s[j])
            best = max(best, j - i + 1)
    return best`,cx:'O(n²)'},tests:[['length_of_longest_substring("abcabcbb")','3'],['length_of_longest_substring("bbbbb")','1'],['length_of_longest_substring("pwwkew")','3'],['length_of_longest_substring("")','0'],['length_of_longest_substring("abba")','2']],constraints:['0 ≤ len(s) ≤ 5 × 10<sup>4</sup>'],mistakes:['Moving the left edge backwards when an old repeat is found (use max).','Restarting the scan after every repeat: O(n²).'],followup:'Return the substring itself, not just its length.',hints:['Brute force restarts from every index.','Keep a window with no repeats. When a repeat enters, move left just past its previous position.'],approach:'Sliding window + last-seen index dict.',cx:'O(n)'},
{id:'st-reverse-words',type:'code',d:1,p:'python',title:'Reverse Words in a String',prompt:'<p>Return the words in reverse order, separated by single spaces (ignore extra spaces).</p>',starter:`def reverse_words(s):
    pass`,solution:`def reverse_words(s):
    return " ".join(reversed(s.split()))`,tests:[['reverse_words("the sky is blue")','"blue is sky the"'],['reverse_words("  hello world  ")','"world hello"'],['reverse_words("a good   example")','"example good a"'],['reverse_words("one")','"one"']],constraints:['1 ≤ len(s) ≤ 10<sup>4</sup>','s has at least one word'],mistakes:['Using split(" "), which keeps empty strings from repeated spaces.','Reversing the characters instead of the words.'],followup:'Do it in place on a list of characters with O(1) extra space.',hints:['split() handles the spaces for you.','s.split() with no argument drops all extra spaces.'],approach:'split, reverse, join.',cx:'O(n)'},
{id:'st-subsequence',type:'code',d:1,p:'two-pointers',title:'Is Subsequence',prompt:'<p>Return True if s can be obtained from t by deleting some characters (keeping order).</p>',starter:`def is_subsequence(s, t):
    pass`,solution:`def is_subsequence(s, t):
    i = 0
    for ch in t:
        if i < len(s) and s[i] == ch:
            i += 1
    return i == len(s)`,tests:[['is_subsequence("abc", "ahbgdc")','True'],['is_subsequence("axc", "ahbgdc")','False'],['is_subsequence("", "abc")','True'],['is_subsequence("abc", "")','False'],['is_subsequence("aaa", "aa")','False']],constraints:['0 ≤ len(s) ≤ 100, 0 ≤ len(t) ≤ 10<sup>4</sup>'],mistakes:['Using str.find without moving past the previous match.','Checking that the characters exist but not their order.'],followup:'Answer many s queries against the same t quickly (index lists + binary search).',hints:['Walk through t, advancing a pointer into s whenever the characters match.','Walk through t with a pointer into s; advance it on every match.'],approach:'Two pointers (greedy matching).',cx:'O(len(t))'},
{id:'st-roman',type:'code',d:1,p:'hashing',title:'Roman to Integer',prompt:'<p>Convert a Roman numeral (I, V, X, L, C, D, M) to an integer. A smaller value before a larger one is subtracted (IV = 4).</p>',starter:`def roman_to_int(s):
    pass`,solution:`def roman_to_int(s):
    val = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    total = 0
    for i, ch in enumerate(s):
        if i + 1 < len(s) and val[ch] < val[s[i + 1]]:
            total -= val[ch]
        else:
            total += val[ch]
    return total`,tests:[['roman_to_int("III")','3'],['roman_to_int("LVIII")','58'],['roman_to_int("MCMXCIV")','1994'],['roman_to_int("IV")','4'],['roman_to_int("MMMCMXCIX")','3999']],constraints:['1 ≤ len(s) ≤ 15','s is a valid numeral for 1..3999'],mistakes:['Always adding, so IV becomes 6.','Comparing a symbol with the previous one instead of the next one.'],followup:'Write the reverse: integer to Roman numeral.',hints:['Look at the next character: if it is bigger, this one is subtracted.','Subtract a symbol when it is smaller than the symbol after it; otherwise add it.'],approach:'Dict of values + look-ahead.',cx:'O(n)'},
{id:'st-caesar',type:'code',d:1,p:'math',title:'Caesar Cipher',prompt:'<p>Shift each lowercase letter k places forward in the alphabet (wrapping z → a). Leave other characters unchanged.</p>',starter:`def caesar(s, k):
    pass`,solution:`def caesar(s, k):
    out = []
    for ch in s:
        if "a" <= ch <= "z":
            out.append(chr((ord(ch) - ord("a") + k) % 26 + ord("a")))
        else:
            out.append(ch)
    return "".join(out)`,tests:[['caesar("abc xyz", 3)','"def abc"'],['caesar("hello!", 26)','"hello!"'],['caesar("", 5)','""'],['caesar("z", 1)','"a"']],constraints:['0 ≤ len(s) ≤ 10<sup>5</sup>','0 ≤ k ≤ 10<sup>9</sup>'],mistakes:['Forgetting to wrap with % 26 (z goes past the alphabet).','Shifting spaces and punctuation too.'],followup:'Decrypt a message when you do not know k (try all 26 and score by letter frequency).',hints:['Map the letter to 0..25, add k, take % 26, map back.','(ord(ch) − ord("a") + k) % 26 + ord("a") gives the shifted letter.'],approach:'ord/chr arithmetic.',cx:'O(n)'},
{id:'st-palindrome-ii',type:'code',d:2,p:'two-pointers',title:'Valid Palindrome II',prompt:'<p>Return True if s can become a palindrome after deleting at most one character.</p>',starter:`def valid_palindrome(s):
    pass`,solution:`def valid_palindrome(s):
    def is_pal(i, j):
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True
    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return is_pal(i + 1, j) or is_pal(i, j - 1)   # skip one side
        i += 1
        j -= 1
    return True`,tests:[['valid_palindrome("aba")','True'],['valid_palindrome("abca")','True'],['valid_palindrome("abc")','False'],['valid_palindrome("deeee")','True']],constraints:['1 ≤ len(s) ≤ 10<sup>5</sup>'],mistakes:['Trying every deletion: O(n²).','Only trying to skip the left character at the first mismatch.'],followup:'Allow up to k deletions (DP on intervals).',hints:['Use two pointers until the first mismatch.','At a mismatch, try skipping the left character OR the right one.'],approach:'Two pointers with one retry.',cx:'O(n)'},
{id:'st-longest-pal',type:'code',d:2,p:'two-pointers',title:'Longest Palindromic Substring',prompt:'<p>Return the longest palindromic substring (the first one if there is a tie).</p>',starter:`def longest_palindrome(s):
    pass`,solution:`def longest_palindrome(s):
    best = ""
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]
    for i in range(len(s)):
        for cand in (expand(i, i), expand(i, i + 1)):   # odd and even centres
            if len(cand) > len(best):
                best = cand
    return best`,tests:[['longest_palindrome("babad")','"bab"'],['longest_palindrome("cbbd")','"bb"'],['longest_palindrome("a")','"a"'],['longest_palindrome("")','""']],constraints:['0 ≤ len(s) ≤ 1000'],mistakes:['Only expanding around single characters, missing even-length palindromes.','Checking every substring: O(n³).'],followup:'Solve it in O(n) with Manacher\'s algorithm.',hints:['Every palindrome has a centre: a character or a gap between two characters.','Expand outward from each of the 2n − 1 centres.'],approach:'Expand around centres.',cx:'O(n²) time, O(1) space'},
{id:'st-count-pal',type:'code',d:2,p:'two-pointers',title:'Count Palindromic Substrings',prompt:'<p>Count the substrings (by position) that are palindromes.</p><p><code>"aaa"</code> → <code>6</code></p>',starter:`def count_substrings(s):
    pass`,solution:`def count_substrings(s):
    count = 0
    for center in range(2 * len(s) - 1):
        l, r = center // 2, center // 2 + center % 2
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
    return count`,tests:[['count_substrings("abc")','3'],['count_substrings("aaa")','6'],['count_substrings("")','0'],['count_substrings("abba")','6']],constraints:['0 ≤ len(s) ≤ 1000'],mistakes:['Counting distinct palindromes instead of positions.','Forgetting even-length centres between two characters.'],followup:'Count only the palindromic substrings of length ≥ 3.',hints:['Expand around every centre and count each successful expansion.','Every palindrome has a centre: expand from each of the 2n − 1 centres and count as you go.'],approach:'Expand around centres.',cx:'O(n²)'},
{id:'st-char-replace',type:'code',d:2,p:'sliding-window',title:'Longest Repeating Character Replacement',prompt:'<p>You may replace at most k characters. Return the length of the longest substring of one repeated letter you can get.</p><p><code>("AABABBA", 1)</code> → <code>4</code></p>',starter:`def character_replacement(s, k):
    pass`,solution:`from collections import defaultdict

def character_replacement(s, k):
    counts = defaultdict(int)
    left = best = top = 0
    for right, ch in enumerate(s):
        counts[ch] += 1
        top = max(top, counts[ch])           # most frequent letter in the window
        while (right - left + 1) - top > k:  # too many letters to replace
            counts[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,tests:[['character_replacement("ABAB", 2)','4'],['character_replacement("AABABBA", 1)','4'],['character_replacement("", 2)','0'],['character_replacement("AAAA", 0)','4']],constraints:['0 ≤ len(s) ≤ 10<sup>5</sup>','uppercase letters, 0 ≤ k ≤ len(s)'],mistakes:['Recomputing the max count from scratch each step (fine for 26 letters, but understand why).','Shrinking the window to empty instead of by one.'],followup:'Return the window boundaries too.',hints:['A window is fine if (window length − count of its most common letter) ≤ k.','Grow right; shrink left while the window needs too many replacements.'],approach:'Sliding window with letter counts.',cx:'O(n)'},
{id:'st-atoi',type:'code',d:2,p:'simulation',title:'String to Integer',prompt:'<p>Parse an integer: skip leading spaces, an optional + or −, then digits until a non-digit. Clamp to the 32-bit range [−2³¹, 2³¹ − 1]. No digits → 0.</p>',starter:`def my_atoi(s):
    pass`,solution:`def my_atoi(s):
    i, n = 0, len(s)
    while i < n and s[i] == " ":
        i += 1
    sign = 1
    if i < n and s[i] in "+-":
        sign = -1 if s[i] == "-" else 1
        i += 1
    num = 0
    while i < n and s[i].isdigit():
        num = num * 10 + int(s[i])
        i += 1
    num *= sign
    return max(-2 ** 31, min(2 ** 31 - 1, num))`,tests:[['my_atoi("42")','42'],['my_atoi("   -42")','-42'],['my_atoi("4193 with words")','4193'],['my_atoi("words 987")','0'],['my_atoi("-91283472332")','-2147483648']],constraints:['0 ≤ len(s) ≤ 200'],mistakes:['Accepting a sign after spaces in the middle of digits.','Forgetting to clamp to the 32-bit range.'],followup:'Also parse an optional decimal part and return a float.',hints:['Handle each phase in order with one index: spaces, sign, digits.','Walk with an index: skip spaces, read one optional sign, then read digits while they last.'],approach:'Careful left-to-right simulation.',cx:'O(n)'},
{id:'st-min-window',type:'code',d:3,p:'sliding-window',title:'Minimum Window Substring',prompt:'<p>Return the shortest substring of s that contains every character of t (with multiplicity), or "".</p><p><code>("ADOBECODEBANC", "ABC")</code> → <code>"BANC"</code></p>',starter:`def min_window(s, t):
    pass`,solution:`from collections import Counter

def min_window(s, t):
    need = Counter(t)
    missing = len(t)                 # characters still needed
    left = 0
    best = (float("inf"), 0, 0)
    for right, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        while missing == 0:          # window is valid: try to shrink it
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right + 1)
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    return s[best[1]:best[2]] if best[0] != float("inf") else ""`,tests:[['min_window("ADOBECODEBANC", "ABC")','"BANC"'],['min_window("a", "a")','"a"'],['min_window("a", "aa")','""'],['min_window("aaflslflsldkalskaaa", "aaa")','"aaa"']],constraints:['1 ≤ len(s), len(t) ≤ 10<sup>5</sup>'],mistakes:['Ignoring duplicate letters in t ("aa" needs two a’s).','Re-counting the window from scratch at every step.'],followup:'Return the number of distinct minimum windows.',hints:['Grow the window until it contains all of t; then shrink from the left while it still does.','Track how many required characters are still missing so the validity check is O(1).'],approach:'Variable sliding window with a need-counter.',cx:'O(len(s) + len(t))'}
]);

/* ---------- second hard problem (added with the v2 backfill) ---------- */
COURSE.qs('strings',[
{id:'st-regex',type:'code',d:3,p:'dp',title:'Regular Expression Matching',prompt:'<p>Return <code>True</code> if the pattern matches the <b>whole</b> string. <code>.</code> matches any single character and <code>x*</code> matches zero or more copies of the character before it.</p>',prereq:['dp-lcs'],
constraints:['0 ≤ len(s) ≤ 20, 1 ≤ len(p) ≤ 30','every * follows a letter or a dot'],
starter:`def is_match(s, p):
    # your code here
    pass`,solution:`from functools import lru_cache


def is_match(s, p):
    @lru_cache(maxsize=None)
    def match(i, j):                       # does s[i:] match p[j:]?
        if j == len(p):
            return i == len(s)
        first = i < len(s) and p[j] in (s[i], ".")
        if j + 1 < len(p) and p[j + 1] == "*":
            # skip "x*" entirely, or use it for one character and stay on it
            return match(i, j + 2) or (first and match(i + 1, j))
        return first and match(i + 1, j + 1)

    return match(0, 0)`,
tests:[['is_match("aa", "a")','False'],['is_match("aa", "a*")','True'],['is_match("ab", ".*")','True'],['is_match("aab", "c*a*b")','True'],['is_match("mississippi", "mis*is*p*.")','False'],['is_match("", "a*b*")','True'],['is_match("ab", ".*c")','False'],['is_match("aaaaaaaaaaaaaaaaaaab", "a*a*a*a*a*a*a*a*a*c")','False']],
hints:['Compare the first character, then think about what "x*" allows: use it zero times, or once and keep it.','State: (i, j) = positions in s and p. Memoize, or the a*a*a*… test takes exponential time.'],approach:'Top-down DP over (i, j) with the two choices for a starred character.',cx:'O(len(s) · len(p)) time and space',
dry:`is_match("aab", "c*a*b")
c* used 0 times → a* used twice → b matches b → end of both → True`,
mistakes:['Treating * as "any characters" (that is wildcard matching, a different problem).','Recursion without memoization: exponential on patterns like a*a*a*…','Forgetting that the pattern must match the whole string, not a prefix.'],
followup:'Write the bottom-up table version, then support "+" (one or more).'},
]);
