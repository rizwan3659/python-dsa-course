/* Topic 16 · Trie. */
COURSE.topic({id:'trie',
goal:'Store words as shared prefix paths, and answer insert, search and prefix queries in time proportional to the word length.',
learn:[
{title:'Prefix trees',short:'Trie',mins:8,lead:'A trie stores words letter by letter. Words that share a prefix share the same path from the root, and a marker says where a word ends.',does:['visualize','predict','concept'],blocks:[
 {t:'diagram',text:`
        (root)
        /    \\
       c      d
       |      |
       a      o
      / \\     |
     t*  r*   g*          * = a word ends here
         |                words: cat, car, care, dog
         e*`,aria:'Trie storing cat, car, care and dog'},
 {t:'viz',fn:'trie',title:'Insert, search, prefix',intro:'Insert “cart”. Then search “ca” (a prefix, not a word) and run a prefix search for “ca”.'},
 {t:'q',ids:['tr-p1','tr-p2','tr-p3','tr-m2','tr-dr1']}]},

{title:'Building one',short:'Implementation',mins:10,lead:'Each node holds a dict of children and an end flag. Insert creates missing children; search walks and checks the end flag; starts_with only walks.',does:['complete','debug','complexity'],blocks:[
 {t:'code',title:'A compact trie',code:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

root = TrieNode()

def insert(word):
    node = root
    for ch in word:
        node = node.children.setdefault(ch, TrieNode())
    node.end = True

def walk(prefix):
    node = root
    for ch in prefix:
        node = node.children.get(ch)
        if node is None:
            return None
    return node

for w in ["cat", "car", "care"]:
    insert(w)
print(walk("car").end, walk("ca").end, walk("cab"))`},
 {t:'q',ids:['tr-b1','tr-b2','tr-d1','tr-d2','tr-c1','tr-c2','tr-c3','tr-m3']},
 {t:'q',title:'Build it',ids:['build-trie']}]},

{title:'Prefix problems',short:'Uses',mins:12,lead:'Autocomplete, replacing words with their roots, counting prefixes and wildcard search are all a walk down the trie followed by a look at what is below.',does:['choose','code'],blocks:[
 {t:'q',ids:['tr-m1','tr-ch1','tr-ch2']},
 {t:'q',title:'Code it',ids:['tr-lcp','tr-count-prefix','tr-replace','tr-suggest']}]}],

challenge:[
 {t:'q',title:'Hard problems',intro:'Interview-level problems for this topic. Try each without hints first, and write the brute force and its complexity before you code.',ids:['tr-word-search','tr-concatenated']},
 {t:'b2o',title:'Autocomplete: scan every word → walk a trie',qid:'tr-suggest',problem:'<p>After each typed character, suggest stored words that start with the typed prefix.</p>',
  brute:{code:`def suggestions(products, prefix):
    return sorted(p for p in products if p.startswith(prefix))[:3]`,cx:'O(n log n)',cxOpts:['O(L)','O(n)','O(n log n)','O(n · L)'],why:'Each keystroke scans (and sorts) all n products.'},
  slow:{q:'What is repeated between keystrokes “m”, “mo”, “mou”?',opts:['Each keystroke rescans all products, although “mou” only extends “mo” by one letter','The sorting key','Nothing','The input string'],a:0,why:'The work for the shorter prefix is thrown away and redone.'},
  better:{q:'Which structure lets you extend a prefix by one letter in O(1)?',opts:['A trie: follow one child per typed letter','A hash set','A heap','A sorted list'],a:0,why:'Each keystroke moves one node down; precomputed suggestions can sit at each node.'},
  optimal:{code:`def build(products):
    root = {}
    for p in sorted(products):
        node = root
        for ch in p:
            node = node.setdefault(ch, {"#": []})
            if len(node["#"]) < 3:
                node["#"].append(p)
    return root
# each keystroke: node = node.get(ch); answer = node["#"]`,cx:'O(L)',cxOpts:['O(L)','O(n)','O(n log n)','O(n · L)'],why:'After building once, each keystroke costs O(1) and a query of length L costs O(L).'},
  takeaway:'<p>Pay once to organise the data by prefix, and every prefix query becomes a short walk.</p>'}],

review:[
 {t:'flash',items:[['Trie node holds…','Children (dict or 26 slots) and an end-of-word flag.'],['Insert/search cost?','O(L) for a word of length L.'],['search vs starts_with?','search also checks the end flag.'],['When a set is enough?','Exact membership only.'],['Autocomplete?','Walk the prefix, then list (or cache) words below.']]}]
});
