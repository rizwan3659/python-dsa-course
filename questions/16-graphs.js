/* Topic 16 · Graphs: representations, BFS, DFS, components and grids. */
COURSE.qs('graphs',[
{id:'g-p1',type:'predict',d:1,p:'dfs',title:'Building an adjacency list',code:`edges = [(1, 2), (1, 3), (2, 3)]
adj = {}
for u, v in edges:
    adj.setdefault(u, []).append(v)
    adj.setdefault(v, []).append(u)     # undirected: both directions
print(sorted(adj[3]))`,a:'[1, 2]',why:'Node 3 appears in two edges, so it has two neighbours.'},
{id:'g-p2',type:'predict',d:1,p:'dfs',title:'Sum of degrees',code:`adj = {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}
print(sum(len(v) for v in adj.values()))`,a:'6',why:'In an undirected graph every edge is counted twice: sum of degrees = 2 × edges (here 3 edges).'},
{id:'g-p3',type:'predict',d:1,p:'bfs',title:'BFS order',code:`from collections import deque

adj = {"A": ["B", "C"], "B": ["D"], "C": ["D", "E"], "D": [], "E": []}
order, seen, queue = [], {"A"}, deque(["A"])
while queue:
    u = queue.popleft()
    order.append(u)
    for v in adj[u]:
        if v not in seen:
            seen.add(v)
            queue.append(v)
print(order)`,a:"['A', 'B', 'C', 'D', 'E']",why:'Level 0: A. Level 1: B, C. Level 2: D (found from B), E (from C).'},
{id:'g-p4',type:'predict',d:1,p:'dfs',title:'DFS order',code:`adj = {"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []}
order, seen = [], set()

def dfs(u):
    seen.add(u)
    order.append(u)
    for v in adj[u]:
        if v not in seen:
            dfs(v)

dfs("A")
print(order)`,a:"['A', 'B', 'D', 'C', 'E']",why:'DFS finishes everything reachable through B (including D) before trying C.'},
{id:'g-p5',type:'predict',d:1,p:'dfs',title:'In-degree',code:`edges = [("a", "b"), ("c", "b"), ("b", "d")]    # directed u -> v
indeg = {}
for u, v in edges:
    indeg[v] = indeg.get(v, 0) + 1
print(indeg.get("b"), indeg.get("a", 0))`,a:'2 0',why:'Two edges point INTO b; nothing points into a.'},
{id:'g-p6',type:'predict',d:1,p:'matrix',title:'Adjacency matrix',code:`n = 3
m = [[0] * n for _ in range(n)]
for u, v in [(0, 1), (1, 2)]:
    m[u][v] = m[v][u] = 1
print(m)`,a:'[[0, 1, 0], [1, 0, 1], [0, 1, 0]]',why:'Undirected graphs have symmetric matrices.'},
{id:'g-p7',type:'predict',d:2,p:'bfs',title:'BFS distances',code:`from collections import deque

adj = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": ["E"], "E": []}
dist, queue = {"A": 0}, deque(["A"])
while queue:
    u = queue.popleft()
    for v in adj[u]:
        if v not in dist:
            dist[v] = dist[u] + 1
            queue.append(v)
print(dist["E"])`,a:'3',why:'A → B → D → E: the first time BFS reaches a node is along a shortest path (in edge count).'},
{id:'g-p8',type:'predict',d:2,p:'dfs',title:'Why visited matters',code:`adj = {1: [2], 2: [3], 3: [1]}    # a cycle
visits = 0
seen = set()

def dfs(u):
    global visits
    visits += 1
    seen.add(u)
    for v in adj[u]:
        if v not in seen:
            dfs(v)

dfs(1)
print(visits)`,a:'3',why:'Without the seen set, 1 → 2 → 3 → 1 → … would recurse forever.'},
{id:'g-c1',type:'complexity',d:1,p:'bfs',title:'BFS on an adjacency list',q:'BFS over a graph with V nodes and E edges. Time?',code:`while queue:
    u = queue.popleft()
    for v in adj[u]:
        if v not in seen:
            seen.add(v)
            queue.append(v)`,opts:['O(V)','O(E)','O(V + E)','O(V · E)'],a:2,why:'Each node is dequeued once and each adjacency list is scanned once.'},
{id:'g-c2',type:'complexity',d:1,p:'matrix',title:'Matrix space',q:'Space for an adjacency matrix of V nodes?',code:`m = [[0] * V for _ in range(V)]`,opts:['O(V)','O(E)','O(V + E)','O(V²)'],a:3,why:'Every pair gets a slot, even if there is no edge. Wasteful for sparse graphs.'},
{id:'g-c3',type:'complexity',d:1,p:'matrix',title:'Grid flood fill',q:'BFS over an R × C grid. Time?',code:`for r in range(R):
    for c in range(C):
        if grid[r][c] == 1 and (r, c) not in seen:
            bfs(r, c)`,opts:['O(R + C)','O(R × C)','O((R × C)²)','O(R² + C²)'],a:1,why:'Each cell is enqueued at most once and has at most 4 neighbours.'},
{id:'g-c4',type:'complexity',d:2,p:'dfs',title:'Edge lookup',q:'Checking “is there an edge u–v?” when adj[u] is a Python list?',code:`exists = v in adj[u]`,opts:['O(1)','O(degree of u)','O(V²)','O(E log E)'],a:1,why:'A list is scanned. Store neighbour sets for O(1), or use a matrix.'},
{id:'g-m1',type:'mcq',d:1,p:'dfs',title:'Directed vs undirected',q:'In a <b>directed</b> graph, an edge A → B means…',opts:['You can go from A to B and from B to A','You can go from A to B, but not necessarily back','A and B are the same node','The edge has a weight'],a:1,why:'One-way streets, follows on social media, prerequisites.'},
{id:'g-m2',type:'mcq',d:1,p:'shortest-path',title:'Weighted',q:'A <b>weighted</b> graph…',opts:['Has heavy nodes','Has a number (cost, distance, time) on each edge','Has more edges','Is always directed'],a:1,why:'Unweighted graphs treat every edge as cost 1.'},
{id:'g-m3',type:'mcq',d:1,p:'dfs',title:'List or matrix?',q:'A road map has 10,000 towns, each connected to about 4 others. Best representation?',opts:['Adjacency matrix (100 million cells)','Adjacency list (about 40,000 entries)','A single list of towns','A set of towns'],a:1,why:'Sparse graph → adjacency list: O(V + E) memory.'},
{id:'g-m4',type:'mcq',d:1,p:'bfs',title:'Shortest path in an unweighted graph',q:'Which algorithm finds the fewest edges from a start node to every other node?',opts:['DFS','BFS','Sorting','Binary search'],a:1,why:'BFS explores in rings of distance 0, 1, 2, …'},
{id:'g-m5',type:'mcq',d:1,p:'dfs',title:'Why a visited set?',q:'Why do BFS and DFS keep a visited set?',opts:['To sort the nodes','So that cycles do not cause infinite loops and nodes are not processed twice','To save the answer','For weighted edges'],a:1,why:'Graphs (unlike trees) can loop back.'},
{id:'g-m6',type:'mcq',d:1,p:'dfs',title:'Connected component',q:'A connected component is…',opts:['A single edge','A maximal group of nodes that can all reach each other','A node with many edges','The shortest path'],a:1,why:'Count components by starting a BFS/DFS from every unvisited node.'},
{id:'g-m7',type:'mcq',d:1,p:'tree',title:'Trees are graphs',q:'A tree is a graph that is…',opts:['Directed and weighted','Connected and has no cycles','Complete','Bipartite only'],a:1,why:'Which is also why a tree with n nodes has n − 1 edges.'},
{id:'g-ch1',type:'choose',d:1,p:'dfs',title:'Social network',q:'Store friendships among 1 million users, each with about 200 friends.',opts:['Adjacency matrix','Adjacency list (dict of sets)','List of users only','A heap'],a:1,why:'A matrix would need 10¹² cells.'},
{id:'g-ch2',type:'choose',d:1,p:'bfs',title:'Fewest moves in a maze',q:'Find the minimum number of steps from start to exit in a grid maze.',opts:['DFS','BFS','Heap sort','Union-find'],a:1,why:'All steps cost 1: BFS gives shortest paths.'},
{id:'g-ch3',type:'choose',d:2,p:'matrix',title:'Dense graph, many edge checks',q:'200 nodes, almost every pair connected, and you constantly ask “is u connected to v?”.',opts:['Adjacency matrix','Adjacency list of lists','Edge list','Linked list'],a:0,why:'Dense and small: the V² matrix is affordable and edge checks are O(1).'},
{id:'g-dr1',type:'dryrun',d:2,p:'bfs',title:'Tracing BFS',code:`from collections import deque
adj = {0: [1, 2], 1: [3], 2: [3], 3: []}
seen, queue, order = {0}, deque([0]), []
while queue:
    u = queue.popleft()
    order.append(u)
    for v in adj[u]:
        if v not in seen:
            seen.add(v)
            queue.append(v)`,cols:['order','list(queue)'],rows:[['[0]','[1, 2]'],['[0, 1]','[2, 3]'],['[0, 1, 2]','[3]'],['[0, 1, 2, 3]','[]']],why:'3 is enqueued once (from 1); when 2 looks at it, it is already seen.'},
{id:'g-dr2',type:'dryrun',d:2,p:'dfs',title:'Tracing iterative DFS',code:`adj = {0: [1, 2], 1: [3], 2: [], 3: []}
seen, stack, order = set(), [0], []
while stack:
    u = stack.pop()
    if u in seen:
        continue
    seen.add(u)
    order.append(u)
    for v in reversed(adj[u]):
        stack.append(v)`,cols:['order','stack'],rows:[['[0]','[2, 1]'],['[0, 1]','[2, 3]'],['[0, 1, 3]','[2]'],['[0, 1, 3, 2]','[]']],why:'Neighbours are pushed in reverse so the first neighbour is popped first, matching recursive DFS.'},
{id:'g-b1',type:'blanks',d:1,p:'dfs',title:'Complete the adjacency list',code:`def build_adj(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        ______
        ______
    return adj`,blanks:[['adj[u].append(v)'],['adj[v].append(u)']],tests:[['build_adj(3, [(0, 1), (1, 2)])','{0: [1], 1: [0, 2], 2: [1]}']],why:'Undirected: store each edge in both lists.'},
{id:'g-b2',type:'blanks',d:1,p:'bfs',title:'Complete BFS',code:`from collections import deque

def bfs(adj, start):
    seen = {start}
    queue = deque([start])
    order = []
    while queue:
        u = ______
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                ______
                queue.append(v)
    return order`,blanks:[['queue.popleft()'],['seen.add(v)']],tests:[['bfs({0: [1, 2], 1: [3], 2: [3], 3: []}, 0)','[0, 1, 2, 3]']],why:'popleft for FIFO; mark when enqueuing so nothing is queued twice.'},
{id:'g-b3',type:'blanks',d:2,p:'dfs',title:'Complete count_components',code:`def count_components(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen = set()
    def dfs(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    count = 0
    for i in range(n):
        if ______:
            ______
            count += 1
    return count`,blanks:[['i not in seen'],['dfs(i)']],tests:[['count_components(5, [(0, 1), (1, 2), (3, 4)])','2'],['count_components(3, [])','3']],why:'Each DFS from an unvisited node swallows one whole component.'},
{id:'g-d1',type:'debug',d:1,p:'bfs',title:'BFS that never ends',code:`from collections import deque

def bfs(adj, start):
    queue, order = deque([start]), []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            queue.append(v)
    return order`,q:'On a graph with a cycle (like an undirected edge A–B) this runs forever. Why?',opts:['popleft is wrong','There is no visited set, so nodes are re-added again and again','The queue should be a list','It should be recursive'],a:1,why:'Track seen nodes and only enqueue unseen ones.',fix:`from collections import deque

def bfs(adj, start):
    seen, queue, order = {start}, deque([start]), []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return order`},
{id:'g-d2',type:'debug',d:2,p:'bfs',title:'Visited too late',code:`from collections import deque

def bfs(adj, start):
    seen, queue, order = set(), deque([start]), []
    while queue:
        u = queue.popleft()
        seen.add(u)
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                queue.append(v)
    return order`,opts:['seen should be a list','Nodes are marked only when dequeued, so a node can be enqueued several times and appears twice in the order','popleft should be pop','order.append is in the wrong place'],a:1,why:'With 0 → 1, 0 → 2, 1 → 3, 2 → 3, node 3 is visited twice. Mark nodes when you enqueue them.',fix:`from collections import deque

def bfs(adj, start):
    seen, queue, order = {start}, deque([start]), []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return order`,tests:[['bfs({0: [1, 2], 1: [3], 2: [3], 3: []}, 0)','[0, 1, 2, 3]']]},
{id:'g-d3',type:'debug',d:1,p:'dfs',title:'One-way friendships',code:`def can_reach(n, edges, a, b):      # undirected graph
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
    seen = set()
    def dfs(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    dfs(a)
    return b in seen`,opts:['seen should be a list','For an undirected graph each edge must be added in BOTH directions','dfs should return a value','b in seen is wrong'],a:1,why:'can_reach(2, [(0, 1)], 1, 0) returns False.',fix:`def can_reach(n, edges, a, b):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen = set()
    def dfs(u):
        seen.add(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    dfs(a)
    return b in seen`,tests:[['can_reach(2, [(0, 1)], 1, 0)','True']]},
{id:'g-d4',type:'debug',d:2,p:'matrix',title:'Python’s negative indexes strike',code:`def land_neighbours(grid, r, c):
    count = 0
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if nr < len(grid) and nc < len(grid[0]) and grid[nr][nc] == 1:
            count += 1
    return count`,opts:['The directions are wrong','It never checks nr >= 0 and nc >= 0; grid[-1] silently wraps to the LAST row instead of failing','== 1 should be == 0','len(grid[0]) is wrong'],a:1,why:'For the top-left cell, (−1, 0) reads the bottom row. Always check 0 ≤ nr < rows and 0 ≤ nc < cols.',fix:`def land_neighbours(grid, r, c):
    count = 0
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 1:
            count += 1
    return count`,tests:[['land_neighbours([[1, 0], [0, 0], [1, 1]], 0, 0)','0']]},
{id:'g-adj',type:'code',d:1,p:'dfs',title:'Build an Adjacency List',prompt:'<p>Given n nodes (0..n − 1) and undirected edges, return a dict mapping each node to a <b>sorted</b> list of neighbours.</p>',starter:`def adjacency(n, edges):
    pass`,solution:`def adjacency(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    return {u: sorted(vs) for u, vs in adj.items()}`,tests:[['adjacency(4, [(0, 1), (0, 2), (2, 3)])','{0: [1, 2], 1: [0], 2: [0, 3], 3: [2]}'],['adjacency(2, [])','{0: [], 1: []}']],hints:['Start every node with an empty list, including isolated ones.'],approach:'Dict of lists, both directions.',cx:'O(V + E log E)'},
{id:'g-bfs',type:'code',d:1,p:'bfs',title:'BFS Order',prompt:'<p>Return the BFS visiting order from <code>start</code>. <code>adj</code> is a dict of neighbour lists; visit neighbours in the given order.</p>',starter:`from collections import deque

def bfs_order(adj, start):
    pass`,solution:`from collections import deque

def bfs_order(adj, start):
    seen, queue, order = {start}, deque([start]), []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return order`,tests:[['bfs_order({"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}, "A")','["A", "B", "C", "D"]'],['bfs_order({1: [2], 2: [1]}, 1)','[1, 2]'],['bfs_order({0: []}, 0)','[0]']],hints:['A deque, a seen set, and mark nodes when you enqueue them.'],approach:'Standard BFS.',cx:'O(V + E)'},
{id:'g-dfs',type:'code',d:1,p:'dfs',title:'DFS Order',prompt:'<p>Return the recursive DFS (preorder) visiting order from <code>start</code>, visiting neighbours in the given order.</p>',starter:`def dfs_order(adj, start):
    pass`,solution:`def dfs_order(adj, start):
    order, seen = [], set()
    def dfs(u):
        seen.add(u)
        order.append(u)
        for v in adj[u]:
            if v not in seen:
                dfs(v)
    dfs(start)
    return order`,tests:[['dfs_order({"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []}, "A")','["A", "B", "D", "C", "E"]'],['dfs_order({1: [2], 2: [3], 3: [1]}, 1)','[1, 2, 3]']],hints:['Recursion plus a seen set.'],approach:'Recursive DFS.',cx:'O(V + E)'},
{id:'g-has-path',type:'code',d:1,p:'bfs',title:'Find if a Path Exists',prompt:'<p>Undirected graph with n nodes and an edge list. Return True if <code>source</code> can reach <code>dest</code>.</p>',starter:`def valid_path(n, edges, source, dest):
    pass`,solution:`from collections import deque

def valid_path(n, edges, source, dest):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen, queue = {source}, deque([source])
    while queue:
        u = queue.popleft()
        if u == dest:
            return True
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                queue.append(v)
    return False`,tests:[['valid_path(3, [[0, 1], [1, 2], [2, 0]], 0, 2)','True'],['valid_path(6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5)','False'],['valid_path(1, [], 0, 0)','True']],hints:['Build an adjacency list, then BFS or DFS from source.'],approach:'Graph search.',cx:'O(V + E)'},
{id:'g-components',type:'code',d:2,p:'dfs',title:'Number of Connected Components',prompt:'<p>Return the number of connected components of an undirected graph with n nodes.</p>',starter:`def count_components(n, edges):
    pass`,solution:`def count_components(n, edges):
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    seen, count = set(), 0
    for s in range(n):
        if s in seen:
            continue
        count += 1
        stack = [s]                      # iterative DFS: no recursion limit
        seen.add(s)
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if v not in seen:
                    seen.add(v)
                    stack.append(v)
    return count`,tests:[['count_components(5, [[0, 1], [1, 2], [3, 4]])','2'],['count_components(5, [[0, 1], [1, 2], [2, 3], [3, 4]])','1'],['count_components(4, [])','4'],['count_components(20000, [[i, i + 1] for i in range(19999)])','1','','a 20,000-node chain (watch the recursion limit)']],hints:['Start a search from every node not yet seen; each start is a new component.','On a long chain, recursive DFS can hit Python’s recursion limit: use an explicit stack or BFS.'],approach:'Search from each unvisited node.',cx:'O(V + E)'},
{id:'g-islands',type:'code',d:2,p:'bfs',title:'Number of Islands',prompt:'<p><code>grid</code> holds "1" (land) and "0" (water). Count the islands (land connected up/down/left/right).</p>',starter:`def num_islands(grid):
    pass`,solution:`from collections import deque

def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    seen, count = set(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1" or (r, c) in seen:
                continue
            count += 1
            seen.add((r, c))
            queue = deque([(r, c)])
            while queue:
                y, x = queue.popleft()
                for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= ny < rows and 0 <= nx < cols and grid[ny][nx] == "1" and (ny, nx) not in seen:
                        seen.add((ny, nx))
                        queue.append((ny, nx))
    return count`,tests:[['num_islands([["1", "1", "0", "0"], ["1", "1", "0", "0"], ["0", "0", "1", "0"], ["0", "0", "0", "1"]])','3'],['num_islands([["1", "1", "1"], ["0", "1", "0"], ["1", "1", "1"]])','1'],['num_islands([["0"]])','0'],['num_islands([])','0']],hints:['Every land cell is a node; neighbours are the 4 adjacent land cells.','Scan the grid; each unvisited land cell starts a BFS/DFS that marks its whole island.'],approach:'Flood fill from each new land cell.',cx:'O(rows × cols)'},
{id:'g-flood-fill',type:'code',d:1,p:'dfs',title:'Flood Fill',prompt:'<p>Starting at (sr, sc), recolor the connected region of the same color (4-directional) to <code>color</code>. Return the image.</p>',starter:`def flood_fill(image, sr, sc, color):
    pass`,solution:`def flood_fill(image, sr, sc, color):
    old = image[sr][sc]
    if old == color:
        return image
    stack = [(sr, sc)]
    while stack:
        r, c = stack.pop()
        if 0 <= r < len(image) and 0 <= c < len(image[0]) and image[r][c] == old:
            image[r][c] = color
            stack.extend([(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)])
    return image`,tests:[['flood_fill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2)','[[2, 2, 2], [2, 2, 0], [2, 0, 1]]'],['flood_fill([[0, 0, 0], [0, 0, 0]], 0, 0, 0)','[[0, 0, 0], [0, 0, 0]]']],hints:['DFS from the start cell, recoloring cells of the original color.','If the new color equals the old one, return immediately (or you loop forever).'],approach:'DFS/BFS over same-colored cells.',cx:'O(rows × cols)'},
{id:'g-max-island',type:'code',d:2,p:'dfs',title:'Max Area of Island',prompt:'<p>Grid of 0/1. Return the area of the largest island (0 if none).</p>',starter:`def max_area(grid):
    pass`,solution:`def max_area(grid):
    rows, cols = len(grid), len(grid[0])
    seen, best = set(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != 1 or (r, c) in seen:
                continue
            area, stack = 0, [(r, c)]
            seen.add((r, c))
            while stack:
                y, x = stack.pop()
                area += 1
                for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= ny < rows and 0 <= nx < cols and grid[ny][nx] == 1 and (ny, nx) not in seen:
                        seen.add((ny, nx))
                        stack.append((ny, nx))
            best = max(best, area)
    return best`,tests:[['max_area([[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]])','6'],['max_area([[0, 0, 0]])','0']],hints:['Same as counting islands, but count cells during each fill.'],approach:'Flood fill with a counter.',cx:'O(rows × cols)'},
{id:'g-shortest-unweighted',type:'code',d:2,p:'bfs',title:'Shortest Path in a Grid',prompt:'<p>0 = open, 1 = wall. Return the fewest steps (4-directional) from the top-left to the bottom-right, or -1. Start and end count as reachable if open.</p>',starter:`def shortest_path(grid):
    pass`,solution:`from collections import deque

def shortest_path(grid):
    rows, cols = len(grid), len(grid[0])
    if grid[0][0] or grid[rows - 1][cols - 1]:
        return -1
    dist = {(0, 0): 0}
    queue = deque([(0, 0)])
    while queue:
        r, c = queue.popleft()
        if (r, c) == (rows - 1, cols - 1):
            return dist[(r, c)]
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and not grid[nr][nc] and (nr, nc) not in dist:
                dist[(nr, nc)] = dist[(r, c)] + 1
                queue.append((nr, nc))
    return -1`,tests:[['shortest_path([[0, 0, 0], [1, 1, 0], [0, 0, 0]])','4'],['shortest_path([[0, 1], [1, 0]])','-1'],['shortest_path([[0]])','0']],hints:['Every move costs 1: BFS.','Record each cell’s distance when you first reach it.'],approach:'BFS on grid cells.',cx:'O(rows × cols)'},
{id:'g-rotting',type:'code',d:2,p:'bfs',title:'Rotting Oranges',prompt:'<p>2 = rotten, 1 = fresh, 0 = empty. Each minute, rotten oranges rot their 4 neighbours. Return the minutes until no fresh orange remains, or -1 if impossible.</p>',starter:`def oranges_rotting(grid):
    pass`,solution:`from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue, fresh = deque(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))       # every rotten orange starts at once
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    while queue:
        r, c, t = queue.popleft()
        minutes = max(minutes, t)
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, t + 1))
    return -1 if fresh else minutes`,tests:[['oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])','4'],['oranges_rotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])','-1'],['oranges_rotting([[0, 2]])','0']],hints:['All rotten oranges spread at the same time: start BFS from ALL of them (multi-source BFS).','Track minutes with the BFS level; count fresh oranges to detect the impossible case.'],approach:'Multi-source BFS.',cx:'O(rows × cols)'},
{id:'g-bipartite',type:'code',d:2,p:'bfs',title:'Is the Graph Bipartite?',prompt:'<p><code>graph[i]</code> lists the neighbours of node i (undirected). Return True if the nodes can be split into two groups so every edge goes between the groups.</p>',starter:`def is_bipartite(graph):
    pass`,solution:`from collections import deque

def is_bipartite(graph):
    color = {}
    for s in range(len(graph)):
        if s in color:
            continue
        color[s] = 0
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in graph[u]:
                if v not in color:
                    color[v] = 1 - color[u]      # opposite group
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
    return True`,tests:[['is_bipartite([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]])','False'],['is_bipartite([[1, 3], [0, 2], [1, 3], [0, 2]])','True'],['is_bipartite([[], []])','True']],hints:['Two-color the graph: neighbours must get opposite colors.','If an edge connects two nodes of the same color, it is not bipartite. Remember disconnected parts.'],approach:'BFS two-coloring per component.',cx:'O(V + E)'},
{id:'g-judge',type:'code',d:1,p:'dfs',title:'Find the Town Judge',prompt:'<p>People 1..n; <code>trust[i] = [a, b]</code> means a trusts b. The judge trusts nobody and is trusted by everyone else. Return the judge, or -1.</p>',starter:`def find_judge(n, trust):
    pass`,solution:`def find_judge(n, trust):
    score = [0] * (n + 1)          # in-degree minus out-degree
    for a, b in trust:
        score[a] -= 1
        score[b] += 1
    for p in range(1, n + 1):
        if score[p] == n - 1:
            return p
    return -1`,tests:[['find_judge(2, [[1, 2]])','2'],['find_judge(3, [[1, 3], [2, 3]])','3'],['find_judge(3, [[1, 3], [2, 3], [3, 1]])','-1'],['find_judge(1, [])','1']],hints:['This is about in-degrees and out-degrees of a directed graph.'],approach:'Degree counting.',cx:'O(n + E)'},
{id:'g-keys-rooms',type:'code',d:1,p:'dfs',title:'Keys and Rooms',prompt:'<p>Room 0 is open; <code>rooms[i]</code> lists the keys found in room i. Can you visit every room?</p>',starter:`def can_visit_all(rooms):
    pass`,solution:`def can_visit_all(rooms):
    seen, stack = {0}, [0]
    while stack:
        for key in rooms[stack.pop()]:
            if key not in seen:
                seen.add(key)
                stack.append(key)
    return len(seen) == len(rooms)`,tests:[['can_visit_all([[1], [2], [3], []])','True'],['can_visit_all([[1, 3], [3, 0, 1], [2], [0]])','False']],hints:['Rooms are nodes, keys are directed edges. Is everything reachable from 0?'],approach:'Reachability with DFS.',cx:'O(V + E)'},
{id:'g-01-matrix',type:'code',d:2,p:'bfs',title:'Distance to the Nearest 0',prompt:'<p>For each cell of a 0/1 matrix, return the distance (4-directional steps) to the nearest 0.</p>',starter:`def update_matrix(mat):
    pass`,solution:`from collections import deque

def update_matrix(mat):
    rows, cols = len(mat), len(mat[0])
    dist = [[-1] * cols for _ in range(rows)]
    queue = deque()
    for r in range(rows):
        for c in range(cols):
            if mat[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))          # all zeros are sources
    while queue:
        r, c = queue.popleft()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))
    return dist`,tests:[['update_matrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]])','[[0, 0, 0], [0, 1, 0], [1, 2, 1]]'],['update_matrix([[0]])','[[0]]']],hints:['Running a BFS from every 1 is slow.','Reverse it: start ONE BFS from all the 0s at once.'],approach:'Multi-source BFS from every 0.',cx:'O(rows × cols)'},
{id:'g-all-paths',type:'code',d:2,p:'backtracking',title:'All Paths From Source to Target',prompt:'<p>A DAG with nodes 0..n − 1; <code>graph[i]</code> lists i’s successors. Return all paths from 0 to n − 1 (in DFS order).</p>',starter:`def all_paths(graph):
    pass`,solution:`def all_paths(graph):
    target, out, path = len(graph) - 1, [], [0]
    def dfs(u):
        if u == target:
            out.append(path[:])
            return
        for v in graph[u]:
            path.append(v)
            dfs(v)
            path.pop()
    dfs(0)
    return out`,tests:[['all_paths([[1, 2], [3], [3], []])','[[0, 1, 3], [0, 2, 3]]'],['all_paths([[4, 3, 1], [3, 2, 4], [3], [4], []])','[[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]']],hints:['It is a DAG, so no visited set is needed: paths cannot loop.','Backtracking: extend the path, recurse, undo.'],approach:'DFS backtracking over paths.',cx:'Exponential in the worst case (number of paths)'},
{id:'g-word-ladder',type:'code',d:3,p:'bfs',title:'Word Ladder',prompt:'<p>Change one letter at a time; every intermediate word must be in <code>word_list</code>. Return the number of words in the shortest sequence from begin to end (0 if impossible).</p>',starter:`def ladder_length(begin, end, word_list):
    pass`,solution:`from collections import deque

def ladder_length(begin, end, word_list):
    words = set(word_list)
    if end not in words:
        return 0
    queue, seen = deque([(begin, 1)]), {begin}
    while queue:
        word, steps = queue.popleft()
        if word == end:
            return steps
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + ch + word[i + 1:]
                if nxt in words and nxt not in seen:
                    seen.add(nxt)
                    queue.append((nxt, steps + 1))
    return 0`,tests:[['ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])','5'],['ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"])','0'],['ladder_length("a", "c", ["a", "b", "c"])','2']],hints:['Words are nodes; an edge connects words that differ in one letter.','Shortest sequence → BFS. Generate neighbours by changing each position to every letter.'],approach:'BFS over implicit word graph.',cx:'O(N · L · 26)'},
{id:'g-pacific',type:'code',d:3,p:'dfs',title:'Pacific Atlantic Water Flow',prompt:'<p>Water flows to a neighbour with height ≤ the current cell. The Pacific touches the top and left edges, the Atlantic the bottom and right. Return all cells (sorted [r, c] pairs) that can reach both oceans.</p>',starter:`def pacific_atlantic(heights):
    pass`,solution:`def pacific_atlantic(heights):
    rows, cols = len(heights), len(heights[0])
    def reach(starts):
        seen, stack = set(starts), list(starts)
        while stack:                          # walk UPHILL from the ocean
            r, c = stack.pop()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in seen and heights[nr][nc] >= heights[r][c]:
                    seen.add((nr, nc))
                    stack.append((nr, nc))
        return seen
    pac = reach([(0, c) for c in range(cols)] + [(r, 0) for r in range(rows)])
    atl = reach([(rows - 1, c) for c in range(cols)] + [(r, cols - 1) for r in range(rows)])
    return sorted([list(p) for p in pac & atl])`,tests:[['pacific_atlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])','[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]'],['pacific_atlantic([[1]])','[[0, 0]]']],hints:['Searching from every cell is slow.','Reverse the flow: from each ocean’s border, walk uphill. Answer = cells reached from both.'],approach:'Two reverse searches from the borders + intersection.',cx:'O(rows × cols)'}
]);
