/* Topic 16 · Trie. */
COURSE.qs('trie',[
{id:'tr-p1',type:'predict',d:1,p:'trie',title:'A trie made of dicts',code:`root = {}
for w in ["to", "tea"]:
    node = root
    for ch in w:
        node = node.setdefault(ch, {})
    node["$"] = True             # end-of-word marker
print(sorted(root["t"].keys()))`,a:"['e', 'o']",why:'Both words share the node for “t”; under it the paths split into “e” and “o”.'},
{id:'tr-p2',type:'predict',d:2,p:'trie',title:'How many nodes?',code:`root = {}
created = 0
for w in ["car", "cat", "cart"]:
    node = root
    for ch in w:
        if ch not in node:
            node[ch] = {}
            created += 1
        node = node[ch]
print(created)`,a:'5',why:'c, a, r, t (for cat) and t (for cart under car). Shared prefixes are stored once.'},
{id:'tr-p3',type:'predict',d:1,p:'trie',title:'Prefix is not a word',code:`root = {}
for w in ["car"]:
    node = root
    for ch in w:
        node = node.setdefault(ch, {})
    node["$"] = True

def search(word):
    node = root
    for ch in word:
        if ch not in node:
            return False
        node = node[ch]
    return "$" in node

print(search("ca"), search("car"))`,a:'False True',why:'The path for “ca” exists, but no word ends there.'},
{id:'tr-c1',type:'complexity',d:1,p:'trie',title:'Insert a word',q:'Inserting a word of length L into a trie that already holds n words. Time?',code:`node = root
for ch in word:
    node = node.children.setdefault(ch, TrieNode())
node.end = True`,opts:['O(n)','O(L)','O(n · L)','O(log n)'],a:1,why:'One step per character, no matter how many words are stored.'},
{id:'tr-c2',type:'complexity',d:2,p:'trie',title:'Prefix check',q:'starts_with(prefix) for a prefix of length P?',code:`def starts_with(root, prefix):
    node = root
    for ch in prefix:
        if ch not in node.children:
            return False
        node = node.children[ch]
    return True`,opts:['O(P)','O(n)','O(n · P)','O(1)'],a:0,why:'Compare: checking a prefix against a list of n words is O(n · P).'},
{id:'tr-c3',type:'complexity',d:2,p:'trie',title:'Trie memory',q:'Worst-case number of nodes for n words with total length T?',code:`for w in words:
    insert(w)`,opts:['O(n)','O(T)','O(T²)','O(26ⁿ)'],a:1,why:'At most one node per character; shared prefixes save space.'},
{id:'tr-m1',type:'mcq',d:1,p:'trie',title:'Why a trie?',q:'A set answers “is this word stored?” in O(1). What does a trie add?',opts:['Nothing','Fast prefix queries: “any word starting with ‘pre’?”, “all words starting with …”','Less memory always','Sorting numbers'],a:1,why:'Autocomplete, spell checkers and IP routing all need prefix queries.'},
{id:'tr-m2',type:'mcq',d:1,p:'trie',title:'The end flag',q:'Why does each trie node need an “end of word” flag?',opts:['To save memory','Because a path can be a prefix of another word without being a word itself (e.g. “ca” in “cat”)','To count letters','It is optional'],a:1,why:'Without it, search("ca") would wrongly succeed after inserting “cat”.'},
{id:'tr-m3',type:'mcq',d:2,p:'trie',title:'Children: dict or array?',q:'Children stored as a dict vs a 26-slot list (lowercase only). Which is true?',opts:['The list is faster to index but wastes space for sparse nodes; the dict stores only existing children','The dict cannot store letters','The list supports any Unicode','They are identical'],a:0,why:'Both give O(1) child access; the trade-off is memory vs simplicity.'},
{id:'tr-ch1',type:'choose',d:1,p:'trie',title:'Search box suggestions',q:'As the user types, show stored words that start with what they typed.',opts:['Set','Trie','Heap','Queue'],a:1,why:'Walk the prefix once, then list the words below that node.'},
{id:'tr-ch2',type:'choose',d:1,p:'hashing',title:'Spell-check yes/no only',q:'You only need “is this exact word in the dictionary?”.',opts:['Trie','Set','Sorted list','Stack'],a:1,why:'Simpler and O(1) average. Use a trie when prefixes matter.'},
{id:'tr-dr1',type:'dryrun',d:1,p:'trie',title:'Inserting “tea”',code:`root = {}
node = root
for ch in "tea":
    node = node.setdefault(ch, {})`,cols:['ch','root'],given:[0],rows:[['t',"{'t': {}}"],['e',"{'t': {'e': {}}}"],['a',"{'t': {'e': {'a': {}}}}"]],why:'Each character creates (or reuses) one level deeper.'},
{id:'tr-b1',type:'blanks',d:1,p:'trie',title:'Complete insert',code:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

def insert(root, word):
    node = root
    for ch in word:
        node = node.children.______(ch, TrieNode())
    ______

def has(root, word):
    node = root
    for ch in word:
        node = node.children.get(ch)
        if node is None:
            return False
    return node.end`,blanks:[['setdefault'],['node.end = True']],post:`def _t():
    r = TrieNode()
    insert(r, "cat")
    return (has(r, "cat"), has(r, "ca"))`,tests:[['_t()','(True, False)']],why:'setdefault reuses an existing child or creates it; the last node marks the end of the word.'},
{id:'tr-b2',type:'blanks',d:1,p:'trie',title:'Complete starts_with',code:`def starts_with(root, prefix):
    node = root                 # nested dicts
    for ch in prefix:
        if ______:
            return False
        node = ______
    return True`,blanks:[['ch not in node'],['node[ch]']],tests:[['starts_with({"c": {"a": {"t": {"$": True}}}}, "ca")','True'],['starts_with({"c": {"a": {}}}, "cb")','False']],why:'Just walk the path; no end check needed for prefixes.'},
{id:'tr-d1',type:'debug',d:1,p:'trie',title:'Prefixes count as words',code:`def search(root, word):
    node = root                  # nested dicts, "$" marks a word end
    for ch in word:
        if ch not in node:
            return False
        node = node[ch]
    return True`,opts:['It should return node','It never checks the end marker, so any prefix of a stored word is “found”','ch not in node is wrong','It needs recursion'],a:1,why:'Return "$" in node.',fix:`def search(root, word):
    node = root
    for ch in word:
        if ch not in node:
            return False
        node = node[ch]
    return "$" in node`,tests:[['search({"c": {"a": {"t": {"$": True}}}}, "ca")','False'],['search({"c": {"a": {"t": {"$": True}}}}, "cat")','True']]},
{id:'tr-d2',type:'debug',d:2,p:'trie',title:'Inserting erases words',code:`def insert(root, word):
    node = root
    for ch in word:
        node[ch] = {}
        node = node[ch]
    node["$"] = True`,opts:['"$" is not allowed as a key','node[ch] = {} REPLACES an existing child, deleting every word below it','It should insert backwards','It needs a return'],a:1,why:'Insert "cat" then "car": the second insert wipes out the "a" subtree that held "cat". Use setdefault.',fix:`def insert(root, word):
    node = root
    for ch in word:
        node = node.setdefault(ch, {})
    node["$"] = True`,post:`def _t():
    r = {}
    insert(r, "cat")
    insert(r, "car")
    return "t" in r["c"]["a"]`,tests:[['_t()','True']]},
{id:'tr-lcp',type:'code',d:1,p:'trie',title:'Longest Common Prefix',prompt:'<p>Return the longest prefix shared by all words ("" if none). (A trie works; so does comparing characters column by column.)</p>',starter:`def longest_common_prefix(words):
    pass`,solution:`def longest_common_prefix(words):
    if not words:
        return ""
    prefix = ""
    for chars in zip(*words):            # column by column
        if len(set(chars)) != 1:
            break
        prefix += chars[0]
    return prefix`,tests:[['longest_common_prefix(["flower", "flow", "flight"])','"fl"'],['longest_common_prefix(["dog", "racecar", "car"])','""'],['longest_common_prefix(["a"])','"a"'],['longest_common_prefix([])','""']],constraints:['0 ≤ len(words) ≤ 200','0 ≤ len(word) ≤ 200'],mistakes:['Crashing on an empty list or an empty word.','Comparing only the first two words.'],followup:'Find the longest prefix shared by at least half of the words.',hints:['In a trie, the common prefix is the path from the root while each node has exactly one child and is not a word end.','Simpler: zip(*words) gives columns of characters.'],approach:'Column scan (or a single-branch walk in a trie).',cx:'O(total characters)'},
{id:'tr-count-prefix',type:'code',d:1,p:'trie',title:'Count Words With a Prefix',prompt:'<p>Build a trie from <code>words</code>, then return how many words start with each prefix in <code>queries</code>.</p>',starter:`def count_prefixes(words, queries):
    pass`,solution:`def count_prefixes(words, queries):
    root = {}
    for w in words:
        node = root
        for ch in w:
            node = node.setdefault(ch, {"#": 0})
            node["#"] += 1               # how many words pass through this node
    out = []
    for q in queries:
        node = root
        for ch in q:
            node = node.get(ch)
            if node is None:
                break
        if node is None:
            out.append(0)
        else:
            out.append(node["#"] if q else len(words))
    return out`,tests:[['count_prefixes(["apple", "app", "apt", "bat"], ["ap", "app", "b", "c"])','[3, 2, 1, 0]'],['count_prefixes([], ["a"])','[0]'],['count_prefixes(["a", "ab", "abc"], ["", "a", "abc", "abcd"])','[3, 3, 1, 0]'],['count_prefixes(["x"], [])','[]']],constraints:['0 ≤ len(words), len(queries) ≤ 10<sup>4</sup>'],mistakes:['Walking the whole subtree to count (store counts in nodes).','Counting a word once per matching letter.'],followup:'Support deleting words.',hints:['Store at every node how many words pass through it.','Increase a counter in every node you pass while inserting; a query walks the prefix and reads its counter.'],approach:'Trie with pass-through counts.',cx:'O(total characters + query length)'},
{id:'tr-replace',type:'code',d:2,p:'trie',title:'Replace Words',prompt:'<p>Replace every word in the sentence by its shortest root from <code>roots</code> (if any root is a prefix of it).</p><p><code>(["cat", "bat", "rat"], "the cattle was rattled by the battery")</code> → <code>"the cat was rat by the bat"</code></p>',starter:`def replace_words(roots, sentence):
    pass`,solution:`def replace_words(roots, sentence):
    trie = {}
    for r in roots:
        node = trie
        for ch in r:
            node = node.setdefault(ch, {})
        node["$"] = r
    out = []
    for word in sentence.split():
        node, rep = trie, word
        for ch in word:
            if ch not in node:
                break
            node = node[ch]
            if "$" in node:              # shortest root found
                rep = node["$"]
                break
        out.append(rep)
    return " ".join(out)`,tests:[['replace_words(["cat", "bat", "rat"], "the cattle was rattled by the battery")','"the cat was rat by the bat"'],['replace_words(["a", "b", "c"], "aadsfasf absbs bbab cadsfafs")','"a a b c"'],['replace_words([], "hello world")','"hello world"'],['replace_words(["a", "aa"], "aaa b")','"a b"']],constraints:['1 ≤ len(roots) ≤ 1000','sentence ≤ 10<sup>6</sup> characters'],mistakes:['Replacing with the longest root instead of the shortest.','Checking every root against every word: O(R · W).'],followup:'Roots can contain wildcards.',hints:['Put the roots in a trie.','Walk each word down the trie and stop at the first node that ends a root.','Insert all roots into a trie; for each word, walk until you hit an end-of-root marker.'],approach:'Trie of roots; shortest match per word.',cx:'O(total characters)'},
{id:'tr-suggest',type:'code',d:2,p:'trie',title:'Search Suggestions',prompt:'<p>After each character typed of <code>search_word</code>, return up to 3 products (alphabetically smallest) starting with the typed prefix.</p>',starter:`def suggested_products(products, search_word):
    pass`,solution:`def suggested_products(products, search_word):
    root = {}
    for p in sorted(products):
        node = root
        for ch in p:
            node = node.setdefault(ch, {"#": []})
            if len(node["#"]) < 3:
                node["#"].append(p)      # sorted insert order keeps the 3 smallest
    out, node = [], root
    for ch in search_word:
        node = node.get(ch) if node else None
        out.append(node["#"] if node else [])
    return out`,tests:[['suggested_products(["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse")','[["mobile", "moneypot", "monitor"], ["mobile", "moneypot", "monitor"], ["mouse", "mousepad"], ["mouse", "mousepad"], ["mouse", "mousepad"]]'],['suggested_products(["havana"], "tatiana")','[[], [], [], [], [], [], []]'],['suggested_products(["a", "ab", "abc", "abd", "b"], "ab")','[["a", "ab", "abc"], ["ab", "abc", "abd"]]'],['suggested_products([], "x")','[[]]']],constraints:['1 ≤ len(products) ≤ 1000'],mistakes:['Returning more than three products.','Not sorting the products first.'],followup:'Rank suggestions by popularity (projects/08_autocomplete).',hints:['Sort the products first so the first 3 you store at each node are the smallest.','Each node keeps up to 3 suggestions for its prefix.'],approach:'Trie with up to 3 cached suggestions per node.',cx:'O(total characters)'},
{id:'tr-wildcard',type:'code',d:2,p:'trie',title:'Word Dictionary With Wildcards',prompt:'<p>Class <code>WordDictionary</code>: <code>add_word(w)</code>, and <code>search(w)</code> where <code>.</code> matches any one letter.</p>',starter:`class WordDictionary:
    def __init__(self):
        pass

    def add_word(self, word):
        pass

    def search(self, word):
        pass`,solution:`class WordDictionary:
    def __init__(self):
        self.root = {}

    def add_word(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return "$" in node
            ch = word[i]
            if ch == ".":
                return any(dfs(child, i + 1) for key, child in node.items() if key != "$")
            return ch in node and dfs(node[ch], i + 1)
        return dfs(self.root, 0)`,post:`def _t():
    d = WordDictionary()
    for w in ["bad", "dad", "mad"]:
        d.add_word(w)
    return [d.search(x) for x in ["pad", "bad", ".ad", "b..", "b.", "...."]]`,tests:[['_t()','[False, True, True, True, False, False]'],['(lambda d: (d.add_word("bad"), d.add_word("dad"), d.search("pad"), d.search(".ad"), d.search("b.."), d.search("..."), d.search("b"), d.search("....")))(WordDictionary())[2:]','(False, True, True, True, False, False)'],['(lambda d: (d.add_word("a"), d.search("."), d.search("a"), d.search("aa")))(WordDictionary())[1:]','(True, True, False)'],['(lambda d: d.search("a"))(WordDictionary())','False']],constraints:['up to 10<sup>4</sup> calls','words up to 25 letters, at most 2 dots per search'],mistakes:['Treating "." as a literal character.','Matching prefixes instead of whole words.'],followup:'Support "*" for any sequence of letters.',hints:['Normal letters follow one child.','A dot must try every child: DFS.'],approach:'Trie + DFS branching on wildcards.',cx:'O(L) without dots; worse with many dots'},
{id:'tr-longest-word',type:'code',d:2,p:'trie',title:'Longest Word Built Letter by Letter',prompt:'<p>Return the longest word that can be built one letter at a time, where every prefix is also in the list. Ties: the alphabetically smallest.</p><p><code>["w", "wo", "wor", "worl", "world"]</code> → <code>"world"</code></p>',starter:`def longest_word(words):
    pass`,solution:`def longest_word(words):
    have = set(words)
    best = ""
    for w in sorted(words):
        if len(w) > len(best) and all(w[:i] in have for i in range(1, len(w))):
            best = w
    return best`,tests:[['longest_word(["w", "wo", "wor", "worl", "world"])','"world"'],['longest_word(["a", "banana", "app", "appl", "ap", "apply", "apple"])','"apple"'],['longest_word(["b"])','"b"'],['longest_word(["ab"])','""']],constraints:['1 ≤ len(words) ≤ 1000','1 ≤ len(word) ≤ 30'],mistakes:['Not checking every prefix of the word, only the longest one.','Breaking ties by length only.'],followup:'Return all such words, longest first.',hints:['Every prefix must itself be a word.','A trie where you only walk through nodes marked as word ends; or a set of words + a sorted scan.','Put the words in a set; a word is buildable if every prefix word[:i] is in the set.'],approach:'Check prefixes (set or trie).',cx:'O(total characters · L)'},
{id:'tr-word-search',type:'code',d:3,p:'trie',title:'Word Search II',prompt:'<p>Return all words from the list that can be traced on the letter grid by moving up/down/left/right, using each cell at most once per word. Return them sorted.</p>',starter:`def find_words(board, words):
    pass`,solution:`def find_words(board, words):
    root = {}
    for w in words:
        node = root
        for ch in w:
            node = node.setdefault(ch, {})
        node["$"] = w
    rows, cols, found = len(board), len(board[0]), set()

    def dfs(r, c, node):
        ch = board[r][c]
        nxt = node.get(ch)
        if nxt is None:
            return
        if "$" in nxt:
            found.add(nxt["$"])
        board[r][c] = "#"                # mark as used
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "#":
                dfs(nr, nc, nxt)
        board[r][c] = ch                 # un-mark (backtrack)

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)
    return sorted(found)`,tests:[['find_words([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"])','["eat", "oath"]'],['find_words([["a", "b"], ["c", "d"]], ["abcb"])','[]'],['find_words([["a"]], ["a"])','["a"]'],['find_words([["a", "b"], ["c", "d"]], ["abdc", "acdb", "abcd", "a"])','["a", "abdc", "acdb"]']],constraints:['1 ≤ rows, cols ≤ 12','1 ≤ len(words) ≤ 3 × 10<sup>4</sup>'],mistakes:['Running a separate word search for every word (too slow).','Not marking found words, so they are reported twice.'],followup:'Prune trie branches once all their words are found.',hints:['Searching each word separately repeats a lot of work.','Put all words in a trie; one DFS from each cell follows the trie and stops as soon as no word continues.'],approach:'Grid backtracking guided by a trie.',cx:'Exponential in word length, pruned by the trie'}
]);

/* ---------- second hard problem (added with the v2 backfill) ---------- */
COURSE.qs('trie',[
{id:'tr-concatenated',type:'code',d:3,p:'trie',title:'Concatenated Words',prompt:'<p>Return, in alphabetical order, every word in the list that can be written as a concatenation of <b>at least two</b> shorter words from the same list (words may repeat).</p>',prereq:['dp-word-break','build-trie'],
constraints:['0 ≤ len(words) ≤ 10<sup>4</sup>','1 ≤ len(words[i]) ≤ 30, words are distinct'],
starter:`def concatenated_words(words):
    # your code here
    pass`,solution:`def concatenated_words(words):
    root = {}
    for w in words:                           # trie of all words; "#" marks a word end
        node = root
        for ch in w:
            node = node.setdefault(ch, {})
        node["#"] = True

    def pieces(w, start, memo):
        # the most words w[start:] can be split into (0 if it cannot be split)
        if start == len(w):
            return 0
        if start in memo:
            return memo[start]
        best, node = -1, root
        for i in range(start, len(w)):
            node = node.get(w[i])
            if node is None:
                break
            if "#" in node:
                rest = pieces(w, i + 1, memo)
                if rest >= 0:
                    best = max(best, rest + 1)
        memo[start] = best
        return best

    return sorted(w for w in words if pieces(w, 0, {}) >= 2)`,
tests:[['concatenated_words(["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"])','["catsdogcats", "dogcatsdog", "ratcatdogcat"]'],['concatenated_words(["cat", "dog", "catdog"])','["catdog"]'],['concatenated_words([])','[]'],['concatenated_words(["a", "aa", "aaa"])','["aa", "aaa"]'],['concatenated_words(["abc"])','[]'],['len(concatenated_words(["a" * i for i in range(1, 31)]))','29']],
hints:['This is Word Break, run for every word, where the dictionary is the list itself (but a word may not use only itself).','Walk the trie from each start position to find every word that begins there; memoize per start position.'],approach:'Trie of all words + memoized word-break that counts pieces, keeping words with at least two pieces.',cx:'O(n · L²) time where L is the maximum word length',
mistakes:['Counting a word as "concatenated" because it matches itself (one piece).','No memoization: exponential on words like "aaaa…".','Trying all pairs of words (misses three-word concatenations and is O(n²)).'],
followup:'Return, for each concatenated word, one way to split it.'},
]);
