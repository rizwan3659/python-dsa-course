/* Topic 5 · Strings. */
COURSE.topic({id:'strings',
goal:'Work fluently with immutable strings: slicing, building, counting characters, and the two-pointer and sliding-window techniques on text.',
learn:[
{title:'Strings are immutable sequences',short:'Basics',mins:8,lead:'A string behaves like a list of characters you can index and slice, except that you can never change it in place. Every “change” builds a new string.',does:['predict','concept','debug'],blocks:[
 {t:'diagram',text:`
  s = "python"
       0 1 2 3 4 5         s[1:4] → "yth"
      -6-5-4-3-2-1         s[::-1] → "nohtyp"`,aria:'String indexes'},
 {t:'code',title:'Everyday string tools',code:`s = "  Data Structures  "
t = s.strip().lower()
print(t, len(t))
print(t.split(), "-".join(t.split()))
print(t.startswith("data"), t.find("struct"), t.replace("data", "info"))
print(ord("a"), chr(98), "abc" < "abd")`},
 {t:'q',ids:['st-p1','st-p2','st-p3','st-p5','st-p6','st-p7','st-p11','st-m1']},
 {t:'q',title:'Find the bug',ids:['st-d1']}]},

{title:'Building strings efficiently',short:'Building',mins:7,lead:'Because strings are immutable, adding to one in a loop can copy everything again and again. Collect pieces in a list and join once.',does:['complexity','choose','dry run','code'],blocks:[
 {t:'q',ids:['st-c1','st-c2','st-c3','st-ch2','st-dr1','st-p12']},
 {t:'q',title:'Code it',ids:['st-reverse-words','st-reverse']}]},

{title:'Counting characters',short:'Frequency',mins:9,lead:'Character counts answer anagram, uniqueness and frequency questions. Use Counter, a dict, or a list of 26 slots.',does:['visualize','predict','dry run','code'],blocks:[
 {t:'viz',fn:'char-freq',title:'Count as you go'},
 {t:'q',ids:['st-p4','st-p9','st-m2','st-m3','st-ch1','st-dr3']},
 {t:'q',title:'Code it',ids:['st-char-freq','st-first-unique','h-anagram']}]},

{title:'Two pointers on strings',short:'Two pointers',mins:10,lead:'Palindromes, subsequences and in-place reversals all use two indexes moving through the text.',does:['visualize','predict','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'palindrome',title:'Check a sentence'},
 {t:'q',ids:['st-p8','st-p10','st-dr2','st-b1','st-d2']},
 {t:'q',title:'Code it',ids:['st-palindrome','st-subsequence','st-palindrome-ii']}]},

{title:'Groups and compression',short:'Compression',mins:8,lead:'Many string tasks walk over groups of equal characters: one index marks the start of a group, another runs to its end.',does:['complete','debug','code'],blocks:[
 {t:'q',ids:['st-b2','st-d3','st-b3']},
 {t:'q',title:'Code it',ids:['st-compress','tr-lcp']}]},

{title:'Sliding windows on strings',short:'Windows',mins:12,lead:'“Longest / shortest substring such that …” is a sliding-window question: grow on the right, shrink on the left, and keep counts of what is inside.',does:['visualize','complexity','code'],blocks:[
 {t:'viz',fn:'sliding-window',title:'Longest substring without repeats',arg:{mode:'unique'}},
 {t:'q',ids:['st-c5','st-c4']},
 {t:'q',title:'Code it',ids:['st-longest-unique','st-char-replace','h-find-anagrams']}]}],

visualize:[{t:'viz',fn:'sliding-window',arg:{mode:'unique'},title:'Sliding window on a string',intro:'Longest substring without repeating characters.'}],

challenge:[
 {t:'b2o',title:'Longest Substring Without Repeats: restart everywhere → sliding window',qid:'st-longest-unique',problem:'<p>Return the length of the longest substring with no repeated characters.</p>',
  brute:{code:`def length_of_longest_substring(s):
    best = 0
    for i in range(len(s)):
        seen = set()
        for j in range(i, len(s)):
            if s[j] in seen:
                break
            seen.add(s[j])
            best = max(best, j - i + 1)
    return best`,cx:'O(n²)',why:'Every start index re-scans forward.'},
  slow:{q:'After the window "abc" meets a second "a", the brute force restarts from "b". What is wasted?',opts:['It re-checks "bc", which we already know has no repeats','Nothing','The set','The max() call'],a:0,why:'Everything between the old "a" and the new one is still valid.'},
  better:{q:'What should happen instead?',opts:['Restart from the end','Move the left edge just past the previous "a" and keep going (sliding window)','Sort the string','Use recursion'],a:1,why:'left and right both only move forward: O(n).'},
  optimal:{code:`def length_of_longest_substring(s):
    last, left, best = {}, 0, 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best`,cx:'O(n)',why:'One pass; the dict lookups are O(1).'},
  takeaway:'<p>When a window becomes invalid, repair it by moving its left edge instead of starting over.</p>'}],

review:[
 {t:'flash',items:[['Can you change s[0]?','No: strings are immutable.'],['Build a long string?','List of pieces + "".join.'],['Letter index 0..25?','ord(ch) − ord("a").'],['sorted("cab")?',"A list: ['a', 'b', 'c']."],['Palindrome check?','Two pointers, skip non-alphanumerics, compare lower-case.'],['Longest substring without repeats?','Sliding window + last-seen dict.']]}]
});
