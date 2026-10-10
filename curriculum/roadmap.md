# Learning roadmap

Go in order: each topic uses the ones before it. For every topic, do the lessons in the browser (**Learn** tab), then practise in the browser (**Practice**) or locally (`python dsa.py list <topic>`), then the **Review** quiz. Aim for about 30% reading and 70% solving.

Status: ✅ available · 🟡 partly covered · 🔜 planned (see [docs/audit.md](../docs/audit.md))

## Phase 1: Python programming foundations ✅
Topic 1 **Python for DSA**: variables, loops, functions, lists, tuples, dicts, sets, slicing, comprehensions, `lambda` and sorting keys, classes, references and mutability.
🔜 exception handling, `copy` vs `deepcopy`, input/output.

## Phase 2: Algorithmic thinking 🟡
Topic 1, lesson 1 (*How to solve any coding problem*) and topic 2 **Big-O Complexity**: counting steps, spotting complexity, growth rates, the cost of Python operations, space complexity, O(n²) → O(n).
🔜 a dedicated *Algorithmic Thinking* topic: decomposition, pseudocode, brute force first, best/average/worst case, Big-Omega and Big-Theta.

## Phase 3: Arrays and strings ✅
Topics 3 **Arrays** and 4 **Strings**: indexing, traversal, insert/delete costs, two pointers, prefix sums, sliding window, Kadane, frequency counting, palindromes, anagrams.
🔜 difference arrays.

## Phase 4: Searching and sorting ✅
Topics 10 **Searching** and 11 **Sorting**: linear and binary search, boundaries, binary search on the answer, rotated arrays; bubble, selection, insertion, merge, quick, heap and counting sort; custom keys and stability.

## Phase 5: Recursion and backtracking 🟡
Topic 9 **Recursion & Backtracking**: base cases, call stack, recursion trees, memoization, subsets, permutations, N-Queens (also in topic 18).
🔜 combination sum, Sudoku solver, pruning techniques.

## Phase 6: Linked lists, stacks and queues ✅
Topics 6 **Stack**, 7 **Queue & Deque**, 8 **Linked Lists**: singly and doubly linked lists, reversal, fast/slow pointers, cycle detection, min stack, brackets, monotonic stack and deque, circular queue.

## Phase 7: Hashing and heaps ✅
Topics 5 **Hash Tables** and 14 **Heap**: dict/set internals, collisions, `Counter`, two sum, grouping anagrams, heaps, `heapq`, top-K, merging.

## Phase 8: Trees and BSTs ✅
Topics 12 **Trees** and 13 **BST**: DFS and BFS traversals, height, diameter, LCA, BST insert/search/delete, validation, serialization.

## Phase 9: Graph algorithms ✅
Topics 16 **Graphs** and 17 **Advanced Graphs**: adjacency lists and matrices, BFS, DFS, components, grids, cycle detection, topological sort, union-find, Dijkstra, Prim and Kruskal.
🔜 a full Bellman-Ford lesson.

## Phase 10: Greedy and dynamic programming 🔜
Today: memoization in topic 9; greedy and intervals in topic 18.
🔜 *Greedy* and *Dynamic Programming* topics: interval scheduling, memoization → tabulation, 1D/2D DP, knapsack, coin change, LCS, LIS, grid DP, space optimisation.

## Phase 11: Advanced interview topics 🟡
Topic 15 **Trie** and topic 18 **Problem-Solving Patterns** (recognising the pattern, then easy → interview problems).
🔜 bit manipulation, segment trees, Fenwick trees, advanced DP and mixed-pattern sets.

## After each topic
1. `python dsa.py progress` shows your weak topics and what to do next.
2. The browser's **Revision** page brings back questions you got wrong (after 1, 2, 4 and 8 days).
3. When a phase is done, try the **Interview** page: a random problem, a timer and no hints.
