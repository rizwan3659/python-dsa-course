# Learning roadmap

Go in order: each topic uses the ones before it. For every topic, do the lessons in the browser (**Learn** tab), practise in the browser (**Practice**) or locally (`python dsa.py list <topic>`), then take the **Review** quiz. Aim for about 30% reading and 70% solving. The full lesson list is in the [syllabus](syllabus.md).

| Phase | Topics | What you learn |
|---|---|---|
| 1. Python foundations | 1 Python for DSA | variables, loops, functions, lists, tuples, dicts, sets, slicing, comprehensions, `lambda` and sort keys, classes, references and mutability, exceptions, shallow vs deep copies, reading input |
| 2. Algorithmic thinking | 2 Big-O, 3 Algorithmic Thinking | counting steps, growth rates, cost of Python operations, space; decomposition, pseudocode, brute force first, best/average/worst case, O/Ω/Θ, math for programmers, testing your own code |
| 3. Arrays and strings | 4 Arrays, 5 Strings | indexing, insert/delete costs, two pointers, prefix sums, sliding window, Kadane, frequency counting, palindromes, anagrams |
| 4. Searching and sorting | 11 Searching, 12 Sorting | linear and binary search, boundaries, search on the answer; bubble, selection, insertion, merge, quick, heap, counting sort; custom keys and stability |
| 5. Recursion and backtracking | 10 Recursion & Backtracking | base cases, call stack, recursion trees, memoization, subsets, permutations, combination sum, pruning, N-Queens, Sudoku, word search |
| 6. Linked lists, stacks, queues | 7 Stack, 8 Queue, 9 Linked Lists | singly and doubly linked lists, reversal, fast/slow pointers, min stack, brackets, monotonic stack and deque, circular queue |
| 7. Hashing and heaps | 6 Hash Tables, 15 Heap | dict/set internals, collisions, Counter, two sum, grouping, heaps, top-k, merging |
| 8. Trees and BSTs | 13 Trees, 14 BST, 16 Trie | traversals, height, diameter, LCA, construction, serialization, BST operations and validation, tries |
| 9. Graphs | 17 Graphs, 18 Advanced Graphs | adjacency lists, BFS, DFS, components, grids, cycles, topological sort, union-find, Dijkstra, Bellman-Ford, MST |
| 10. Greedy and DP | 19 Greedy, 20 Dynamic Programming | exchange arguments, interval scheduling; memoization, tabulation, 1D/2D DP, coins, knapsack, LCS, edit distance, LIS, space optimisation |
| 11. Advanced interview topics | 21 Bits, 22 Range Queries, 23 Patterns | bit tricks and masks; difference arrays, Fenwick and segment trees; recognising patterns and combining them |

Topics are numbered in study order; Topics 4–5 come before 6–10, and so on. Phases 4 and 5 can be swapped if you prefer recursion before sorting.

## Practice beyond the lessons

- **Mini-projects** after each phase: see [projects/](../projects/) (each lists the topics it needs).
- **Interview track:** the [Top 100 roadmap](../docs/interview/top-100.md) once you reach Phase 6.
- **Revision:** the browser's Revision page brings back questions you got wrong after 1, 2, 4 and 8 days; locally, `python dsa.py progress` lists weak topics.
- **Notebooks:** prefer Jupyter? Every topic is also a notebook in [notebooks/](../notebooks/).
