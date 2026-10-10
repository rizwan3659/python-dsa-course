/* Topic 18 · Advanced graphs: topological sort, cycles, union-find, shortest paths, minimum spanning trees. */
(function(){
const TOPO=`def _valid_topo(order, n, prereqs):
    if sorted(order) != list(range(n)):
        return False
    pos = {c: i for i, c in enumerate(order)}
    return all(pos[b] < pos[a] for a, b in prereqs)
`;
COURSE.qs('advgraphs',[
{id:'ag-p1',type:'predict',d:2,p:'topo-sort',title:'Kahn’s algorithm',code:`from collections import deque

graph = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
indeg = {u: 0 for u in graph}
for u in graph:
    for v in graph[u]:
        indeg[v] += 1
queue = deque(u for u in graph if indeg[u] == 0)
order = []
while queue:
    u = queue.popleft()
    order.append(u)
    for v in graph[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            queue.append(v)
print(order)`,a:"['a', 'b', 'c', 'd']",why:'d waits until both b and c are done (its in-degree reaches 0 only after both).'},
{id:'ag-p2',type:'predict',d:2,p:'shortest-path',title:'Dijkstra result',code:`import heapq

graph = {"A": [("B", 4), ("C", 1)], "B": [("D", 1)], "C": [("B", 2), ("D", 5)], "D": []}
dist = {"A": 0}
pq = [(0, "A")]
while pq:
    d, u = heapq.heappop(pq)
    if d > dist[u]:
        continue
    for v, w in graph[u]:
        if d + w < dist.get(v, float("inf")):
            dist[v] = d + w
            heapq.heappush(pq, (d + w, v))
print(dist["D"])`,a:'4',why:'A → C (1) → B (1 + 2 = 3) → D (3 + 1 = 4) beats A → B → D (5) and A → C → D (6).'},
{id:'ag-p3',type:'predict',d:1,p:'union-find',title:'Counting groups',code:`parent = list(range(5))

def find(x):
    while parent[x] != x:
        x = parent[x]
    return x

for a, b in [(0, 1), (2, 3), (1, 0)]:
    ra, rb = find(a), find(b)
    if ra != rb:
        parent[rb] = ra

print(len({find(i) for i in range(5)}))`,a:'3',why:'Groups: {0, 1}, {2, 3}, {4}. The edge (1, 0) joins nothing new.'},
{id:'ag-c1',type:'complexity',d:2,p:'shortest-path',title:'Dijkstra with a heap',q:'Dijkstra’s algorithm with a binary heap on V nodes and E edges. Time?',code:`while pq:
    d, u = heapq.heappop(pq)
    if d > dist[u]:
        continue
    for v, w in graph[u]:
        if d + w < dist[v]:
            dist[v] = d + w
            heapq.heappush(pq, (d + w, v))`,opts:['O(V + E)','O((V + E) log V)','O(V · E)','O(V²)'],a:1,why:'Each edge can push once (log V each); each node is settled once.'},
{id:'ag-c2',type:'complexity',d:1,p:'topo-sort',title:'Topological sort',q:'Kahn’s algorithm on V nodes and E edges. Time?',code:`while queue:
    u = queue.popleft()
    order.append(u)
    for v in graph[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            queue.append(v)`,opts:['O(V + E)','O(V log V)','O(V²)','O(E log E)'],a:0,why:'Every node and edge is handled once.'},
{id:'ag-c3',type:'complexity',d:2,p:'mst',title:"Kruskal's algorithm",q:'Kruskal on E edges. Which step dominates?',code:`for w, u, v in sorted(edges):
    if find(u) != find(v):
        union(u, v)`,opts:['O(E) for the union-find work','O(E log E) for sorting the edges','O(V²)','O(E²)'],a:1,why:'Union-find operations are almost O(1); sorting costs E log E.'},
{id:'ag-c4',type:'complexity',d:3,p:'union-find',title:'Union-find with both optimisations',q:'With path compression AND union by size, the amortized cost of find() is…',code:`def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]`,opts:['O(n)','O(log n)','O(α(n)): practically constant','O(1) exactly'],a:2,why:'α is the inverse Ackermann function: below 5 for any input that fits in the universe.'},
{id:'ag-m1',type:'mcq',d:1,p:'topo-sort',title:'When does a topological order exist?',q:'A topological order exists exactly when the directed graph…',opts:['Is connected','Has no cycles (is a DAG)','Has weights','Is a tree'],a:1,why:'In a cycle, every node waits for another one in the cycle.'},
{id:'ag-m2',type:'mcq',d:2,p:'shortest-path',title:'Dijkstra’s blind spot',q:'Dijkstra can give wrong answers when…',opts:['The graph is undirected','Some edge weights are negative','There are more than 100 nodes','Weights are decimals'],a:1,why:'Once a node is settled it is never improved; a later negative edge could have made it shorter. Use Bellman-Ford.'},
{id:'ag-m3',type:'mcq',d:1,p:'mst',title:'Minimum spanning tree',q:'A minimum spanning tree of a connected weighted graph is…',opts:['The shortest path between two nodes','A set of V − 1 edges connecting all nodes with the smallest total weight','The heaviest cycle','A BFS tree'],a:1,why:'Cheapest way to connect everything (no cycles needed).'},
{id:'ag-m4',type:'mcq',d:2,p:'dfs',title:'Gray nodes',q:'In directed cycle detection with white/gray/black colors, meeting a GRAY node means…',opts:['The node is finished','A back edge to a node on the current DFS path: a cycle','The graph is disconnected','Nothing special'],a:1,why:'Black (finished) nodes are safe to meet; gray ones are ancestors still in progress.'},
{id:'ag-m5',type:'mcq',d:2,p:'union-find',title:'Cycles in undirected graphs',q:'Processing undirected edges with union-find, a cycle appears when…',opts:['An edge joins two different sets','An edge connects two nodes that already have the same root','find() is called twice','The graph has an even number of edges'],a:1,why:'They were already connected, so this edge closes a loop.'},
{id:'ag-m6',type:'mcq',d:2,p:'mst',title:'Prim vs Kruskal',q:'Which describes Prim’s algorithm?',opts:['Sort all edges, add those that do not form cycles','Grow one tree from a start node, always adding the cheapest edge leaving it','Relax every edge V − 1 times','Topologically sort first'],a:1,why:'The first option is Kruskal. Both are greedy and both find an MST.'},
{id:'ag-ch1',type:'choose',d:1,p:'topo-sort',title:'Course prerequisites',q:'Find an order to take courses so that prerequisites come first.',opts:['Dijkstra','Topological sort','Prim','Binary search'],a:1,why:'Dependencies form a DAG.'},
{id:'ag-ch2',type:'choose',d:1,p:'shortest-path',title:'Fastest route by road',q:'Shortest travel time between cities; all times are positive.',opts:['BFS','Dijkstra','Kruskal','Union-find'],a:1,why:'Weighted, non-negative: Dijkstra. (Unweighted would be BFS.)'},
{id:'ag-ch3',type:'choose',d:1,p:'mst',title:'Cheapest cabling',q:'Connect all offices with network cable using the least total cable.',opts:['Shortest path','Minimum spanning tree','Topological sort','Bipartite check'],a:1,why:'Connect everything at minimum total cost.'},
{id:'ag-ch4',type:'choose',d:2,p:'union-find',title:'Merging friend groups',q:'Friendships arrive one by one; after each, answer “are x and y in the same group?”.',opts:['Run BFS after every friendship','Union-find','Dijkstra','A heap'],a:1,why:'Nearly O(1) per union and per query.'},
{id:'ag-dr1',type:'dryrun',d:2,p:'topo-sort',title:'Kahn’s algorithm by hand',code:`from collections import deque
graph = {0: [1, 2], 1: [3], 2: [3], 3: []}
indeg = {0: 0, 1: 1, 2: 1, 3: 2}
queue = deque([0])
order = []
while queue:
    u = queue.popleft()
    order.append(u)
    for v in graph[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            queue.append(v)`,cols:['order','list(queue)','indeg[3]'],rows:[['[0]','[1, 2]','2'],['[0, 1]','[2]','1'],['[0, 1, 2]','[3]','0'],['[0, 1, 2, 3]','[]','0']],why:'3 becomes ready only after both 1 and 2 are taken.'},
{id:'ag-dr2',type:'dryrun',d:2,p:'union-find',title:'Union-find by hand',code:`parent = [0, 1, 2, 3]
def find(x):
    while parent[x] != x:
        x = parent[x]
    return x
components = 4
for a, b in [(0, 1), (1, 2), (0, 2), (3, 3)]:  #@
    ra, rb = find(a), find(b)
    if ra != rb:
        parent[rb] = ra
        components -= 1`,cols:['(a, b)','components'],rows:[['(0, 1)','3'],['(1, 2)','2'],['(0, 2)','2'],['(3, 3)','2']],why:'(0, 2) and (3, 3) join nodes that already share a root.'},
{id:'ag-b1',type:'blanks',d:2,p:'topo-sort',title:'Complete Kahn’s algorithm',code:`from collections import deque

def topo(n, edges):                 # edges u -> v
    graph = {i: [] for i in range(n)}
    indeg = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indeg[v] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            ______
            if ______:
                queue.append(v)
    return order if len(order) == n else []`,blanks:[['indeg[v] -= 1'],['indeg[v] == 0','not indeg[v]']],tests:[['topo(4, [(0, 1), (0, 2), (1, 3), (2, 3)])','[0, 1, 2, 3]'],['topo(2, [(0, 1), (1, 0)])','[]']],why:'Removing u frees its successors; a node is ready when nothing points to it any more.'},
{id:'ag-b2',type:'blanks',d:2,p:'shortest-path',title:'Complete the relaxation',code:`import heapq

def dijkstra(graph, start):
    dist = {start: 0}
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            nd = ______
            if nd < dist.get(v, float("inf")):
                dist[v] = nd
                ______
    return dist`,blanks:[['d + w'],['heapq.heappush(pq, (nd, v))']],tests:[['dijkstra({"A": [("B", 2), ("C", 5)], "B": [("C", 1)], "C": []}, "A")','{"A": 0, "B": 2, "C": 3}']],why:'If going through u is shorter, record it and push the new candidate.'},
{id:'ag-b3',type:'blanks',d:2,p:'union-find',title:'Complete find with path compression',code:`def find(parent, x):
    if parent[x] != x:
        parent[x] = ______
    return ______`,blanks:[['find(parent, parent[x])'],['parent[x]']],tests:[['find([0, 0, 1, 2], 3)','0'],['(lambda p: (find(p, 3), p))([0, 0, 1, 2])','(0, [0, 0, 0, 0])']],why:'After the call, every node on the path points straight at the root.'},
{id:'ag-d1',type:'debug',d:2,p:'shortest-path',title:'BFS on weighted edges',code:`from collections import deque

def shortest(graph, start):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v, w in graph[u]:
            if v not in dist:
                dist[v] = dist[u] + w
                queue.append(v)
    return dist`,opts:['deque is wrong here','BFS fixes a distance the first time it reaches a node, which is the fewest EDGES, not the smallest total weight','w should be ignored','It should start at distance 1'],a:1,why:'A → B (10) is found before A → C → B (1 + 1). Use Dijkstra.',fix:`import heapq

def shortest(graph, start):
    dist = {start: 0}
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return dist`,tests:[['shortest({"A": [("B", 10), ("C", 1)], "C": [("B", 1)], "B": []}, "A")["B"]','2']]},
{id:'ag-d2',type:'debug',d:2,p:'union-find',title:'Union without find',code:`def count_groups(n, pairs):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            x = parent[x]
        return x
    for a, b in pairs:
        parent[b] = a
    return len({find(i) for i in range(n)})`,opts:['find is wrong','parent[b] = a re-links b itself instead of joining the two ROOTS, which can cut b away from its old group','The set comprehension is wrong','range(n) should be range(n + 1)'],a:1,why:'With pairs (0, 1) then (2, 1), node 1 leaves 0’s group. Union the roots: parent[find(b)] = find(a).',fix:`def count_groups(n, pairs):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            x = parent[x]
        return x
    for a, b in pairs:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra
    return len({find(i) for i in range(n)})`,tests:[['count_groups(3, [(0, 1), (2, 1)])','1']]},
{id:'ag-d3',type:'debug',d:2,p:'topo-sort',title:'A cycle goes unnoticed',code:`from collections import deque

def course_order(n, prereqs):          # [a, b] means b before a
    graph, indeg = {i: [] for i in range(n)}, [0] * n
    for a, b in prereqs:
        graph[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return order`,opts:['The edges point the wrong way','With a cycle some courses never reach in-degree 0, and it silently returns a partial order instead of reporting failure','deque is wrong','indeg should start at 1'],a:1,why:'Check len(order) == n; otherwise return [] (impossible).',fix:`from collections import deque

def course_order(n, prereqs):
    graph, indeg = {i: [] for i in range(n)}, [0] * n
    for a, b in prereqs:
        graph[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return order if len(order) == n else []`,tests:[['course_order(3, [[1, 0], [0, 1]])','[]'],['course_order(2, [[1, 0]])','[0, 1]']]},
{id:'ag-can-finish',type:'code',d:2,p:'topo-sort',title:'Course Schedule',prompt:'<p>n courses; <code>[a, b]</code> means you must take b before a. Return True if all courses can be finished.</p>',starter:`def can_finish(n, prereqs):
    pass`,solution:`from collections import deque

def can_finish(n, prereqs):
    graph, indeg = {i: [] for i in range(n)}, [0] * n
    for a, b in prereqs:
        graph[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    taken = 0
    while queue:
        u = queue.popleft()
        taken += 1
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return taken == n`,tests:[['can_finish(2, [[1, 0]])','True'],['can_finish(2, [[1, 0], [0, 1]])','False'],['can_finish(3, [])','True'],['can_finish(4, [[1, 0], [2, 1], [3, 2], [1, 3]])','False']],hints:['Courses are nodes; b → a edges. You can finish everything iff there is no cycle.','Kahn: repeatedly take courses with no remaining prerequisites; count them.'],approach:'Topological sort / cycle check.',cx:'O(V + E)'},
{id:'ag-course-order',type:'code',d:2,p:'topo-sort',post:TOPO,title:'Course Schedule II',prompt:'<p>Return any valid order to take all n courses (<code>[a, b]</code> = b before a), or <code>[]</code> if impossible.</p>',starter:`def find_order(n, prereqs):
    pass`,solution:`from collections import deque

def find_order(n, prereqs):
    graph, indeg = {i: [] for i in range(n)}, [0] * n
    for a, b in prereqs:
        graph[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return order if len(order) == n else []`,tests:[['find_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]])','lambda order: _valid_topo(order, 4, [[1, 0], [2, 0], [3, 1], [3, 2]])','check','any valid order for 4 courses'],['find_order(2, [[0, 1], [1, 0]])','[]'],['find_order(1, [])','[0]']],hints:['Kahn’s algorithm records the order in which nodes become free.'],approach:'Kahn’s topological sort.',cx:'O(V + E)'},
{id:'ag-cycle-directed',type:'code',d:2,p:'dfs',title:'Cycle in a Directed Graph',prompt:'<p>Nodes 0..n − 1, directed edges. Return True if there is a cycle. Use DFS with three colors.</p>',starter:`def has_cycle(n, edges):
    pass`,solution:`def has_cycle(n, edges):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
    color = [0] * n               # 0 white, 1 gray (on path), 2 black (done)
    def dfs(u):
        color[u] = 1
        for v in graph[u]:
            if color[v] == 1:
                return True
            if color[v] == 0 and dfs(v):
                return True
        color[u] = 2
        return False
    return any(color[u] == 0 and dfs(u) for u in range(n))`,tests:[['has_cycle(3, [(0, 1), (1, 2), (2, 0)])','True'],['has_cycle(3, [(0, 1), (0, 2), (1, 2)])','False'],['has_cycle(1, [(0, 0)])','True'],['has_cycle(4, [(0, 1), (2, 3)])','False']],hints:['A visited set alone is not enough: in a DAG you can meet an already-visited node without a cycle (0 → 1 → 2 and 0 → 2).','Only a node still on the CURRENT path (gray) signals a cycle.'],approach:'Three-color DFS.',cx:'O(V + E)'},
{id:'ag-cycle-undirected',type:'code',d:2,p:'union-find',title:'Cycle in an Undirected Graph',prompt:'<p>Return True if an undirected graph (n nodes, edge list) has a cycle. Use union-find.</p>',starter:`def has_cycle_undirected(n, edges):
    pass`,solution:`def has_cycle_undirected(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return True           # already connected: this edge closes a loop
        parent[rv] = ru
    return False`,tests:[['has_cycle_undirected(3, [(0, 1), (1, 2), (2, 0)])','True'],['has_cycle_undirected(4, [(0, 1), (1, 2), (2, 3)])','False'],['has_cycle_undirected(2, [])','False']],hints:['Process edges one by one, merging components.','An edge whose two ends are already in the same component makes a cycle.'],approach:'Union-find.',cx:'O(E α(V))'},
{id:'ag-provinces',type:'code',d:2,p:'union-find',title:'Number of Provinces',prompt:'<p><code>is_connected[i][j] == 1</code> means cities i and j are directly connected. Return the number of provinces (connected groups).</p>',starter:`def find_circle_num(is_connected):
    pass`,solution:`def find_circle_num(is_connected):
    n = len(is_connected)
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    groups = n
    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j]:
                ri, rj = find(i), find(j)
                if ri != rj:
                    parent[rj] = ri
                    groups -= 1
    return groups`,tests:[['find_circle_num([[1, 1, 0], [1, 1, 0], [0, 0, 1]])','2'],['find_circle_num([[1, 0, 0], [0, 1, 0], [0, 0, 1]])','3'],['find_circle_num([[1]])','1']],hints:['The input is an adjacency matrix.','Each successful union reduces the number of groups by one.'],approach:'Union-find over the matrix (DFS also works).',cx:'O(n² α(n))'},
{id:'ag-redundant',type:'code',d:2,p:'union-find',title:'Redundant Connection',prompt:'<p>A tree with n nodes (1..n) got one extra edge. Return the edge that can be removed to make it a tree again (the last such edge in the input).</p>',starter:`def find_redundant(edges):
    pass`,solution:`def find_redundant(edges):
    parent = list(range(len(edges) + 1))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return [u, v]
        parent[rv] = ru`,tests:[['find_redundant([[1, 2], [1, 3], [2, 3]])','[2, 3]'],['find_redundant([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])','[1, 4]']],hints:['The redundant edge is the first one that connects two already-connected nodes.'],approach:'Union-find; report the edge that closes a cycle.',cx:'O(E α(V))'},
{id:'ag-network-delay',type:'code',d:2,p:'shortest-path',title:'Network Delay Time',prompt:'<p><code>times[i] = (u, v, w)</code>: a signal from u reaches v after w. Nodes are 1..n. Starting at k, how long until every node has the signal? -1 if some never do.</p>',starter:`import heapq

def network_delay(times, n, k):
    pass`,solution:`import heapq

def network_delay(times, n, k):
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))
    dist = {k: 0}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1`,tests:[['network_delay([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)','2'],['network_delay([[1, 2, 1]], 2, 1)','1'],['network_delay([[1, 2, 1]], 2, 2)','-1']],hints:['Shortest times from k to every node: Dijkstra.','The answer is the largest of those shortest times.'],approach:'Dijkstra, then max.',cx:'O((V + E) log V)'},
{id:'ag-min-cost-points',type:'code',d:2,p:'mst',title:'Min Cost to Connect All Points',prompt:'<p>Connecting points (x1, y1) and (x2, y2) costs |x1 − x2| + |y1 − y2|. Return the minimum cost to connect all points.</p>',starter:`import heapq

def min_cost_connect(points):
    pass`,solution:`import heapq

def min_cost_connect(points):
    n = len(points)
    seen, total = set(), 0
    pq = [(0, 0)]                          # (cost to join the tree, point index)
    while len(seen) < n:
        cost, i = heapq.heappop(pq)
        if i in seen:
            continue
        seen.add(i)
        total += cost
        xi, yi = points[i]
        for j in range(n):
            if j not in seen:
                d = abs(xi - points[j][0]) + abs(yi - points[j][1])
                heapq.heappush(pq, (d, j))
    return total`,tests:[['min_cost_connect([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]])','20'],['min_cost_connect([[3, 12], [-2, 5], [-4, 1]])','18'],['min_cost_connect([[0, 0]])','0']],hints:['Every pair of points is a possible edge: a complete graph.','Grow a tree with Prim’s algorithm (or sort all pairs and use Kruskal).'],approach:"Prim's MST on the complete graph.",cx:'O(n² log n)'},
{id:'ag-kruskal',type:'code',d:2,p:'mst',title:"Kruskal's MST Weight",prompt:'<p>Nodes 0..n − 1, weighted undirected edges <code>(u, v, w)</code>. Return the total weight of a minimum spanning tree (the graph is connected).</p>',starter:`def mst_weight(n, edges):
    pass`,solution:`def mst_weight(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total = used = 0
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[rv] = ru
            total += w
            used += 1
            if used == n - 1:
                break
    return total`,tests:[['mst_weight(4, [(0, 1, 1), (1, 2, 2), (0, 2, 3), (2, 3, 4), (1, 3, 5)])','7'],['mst_weight(2, [(0, 1, 9)])','9'],['mst_weight(3, [(0, 1, 5), (1, 2, 5), (0, 2, 1)])','6']],hints:['Sort edges by weight.','Take an edge only if it joins two different components (union-find).'],approach:"Kruskal's algorithm.",cx:'O(E log E)'},
{id:'ag-k-stops',type:'code',d:3,p:'shortest-path',title:'Cheapest Flights Within K Stops',prompt:'<p>Flights <code>(u, v, price)</code>. Return the cheapest price from src to dst with at most k stops, or -1.</p>',starter:`def find_cheapest_price(n, flights, src, dst, k):
    pass`,solution:`def find_cheapest_price(n, flights, src, dst, k):
    cost = [float("inf")] * n
    cost[src] = 0
    for _ in range(k + 1):                 # at most k + 1 flights
        new = cost[:]                      # use last round's costs only
        for u, v, p in flights:
            if cost[u] + p < new[v]:
                new[v] = cost[u] + p
        cost = new
    return -1 if cost[dst] == float("inf") else cost[dst]`,tests:[['find_cheapest_price(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1)','700'],['find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)','200'],['find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0)','500']],hints:['Plain Dijkstra ignores the stop limit.','Bellman-Ford limited to k + 1 rounds: each round allows one more flight. Copy the array each round so a round adds at most one edge.'],approach:'Bellman-Ford with k + 1 rounds.',cx:'O(k · E)'},
{id:'ag-bellman',type:'code',d:3,p:'shortest-path',title:'Shortest Paths With Negative Weights',prompt:'<p>Directed edges <code>(u, v, w)</code>, weights may be negative. Return the list of shortest distances from node 0 (use <code>None</code> for unreachable), or the string <code>"negative cycle"</code> if one is reachable.</p>',starter:`def bellman_ford(n, edges):
    pass`,solution:`def bellman_ford(n, edges):
    INF = float("inf")
    dist = [INF] * n
    dist[0] = 0
    for _ in range(n - 1):                 # a shortest path uses at most n - 1 edges
        changed = False
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:
            break
    for u, v, w in edges:                  # still improving → negative cycle
        if dist[u] != INF and dist[u] + w < dist[v]:
            return "negative cycle"
    return [None if d == INF else d for d in dist]`,tests:[['bellman_ford(4, [(0, 1, 4), (0, 2, 5), (1, 2, -3), (2, 3, 2)])','[0, 4, 1, 3]'],['bellman_ford(3, [(0, 1, 1), (1, 2, -1), (2, 1, -1)])','"negative cycle"'],['bellman_ford(3, [(0, 1, 2)])','[0, 2, None]']],hints:['Relax every edge n − 1 times.','If an edge can still be relaxed after that, a negative cycle is reachable.'],approach:'Bellman-Ford.',cx:'O(V · E)'},
{id:'ag-alien',type:'code',d:3,p:'topo-sort',title:'Alien Dictionary',prompt:'<p>Words are sorted in an unknown alphabet. Return the letters (all letters that appear) in an order consistent with it; if several orders work, return the alphabetically smallest; return "" if the input is invalid.</p>',starter:`def alien_order(words):
    pass`,solution:`import heapq

def alien_order(words):
    letters = sorted({c for w in words for c in w})
    graph = {c: set() for c in letters}
    indeg = {c: 0 for c in letters}
    for a, b in zip(words, words[1:]):
        for x, y in zip(a, b):
            if x != y:
                if y not in graph[x]:
                    graph[x].add(y)
                    indeg[y] += 1
                break
        else:
            if len(a) > len(b):
                return ""                  # "abc" before "ab" is impossible
    heap = [c for c in letters if indeg[c] == 0]
    heapq.heapify(heap)                    # smallest available letter first
    order = []
    while heap:
        c = heapq.heappop(heap)
        order.append(c)
        for d in graph[c]:
            indeg[d] -= 1
            if indeg[d] == 0:
                heapq.heappush(heap, d)
    return "".join(order) if len(order) == len(letters) else ""`,tests:[['alien_order(["wrt", "wrf", "er", "ett", "rftt"])','"wertf"'],['alien_order(["z", "x"])','"zx"'],['alien_order(["z", "x", "z"])','""'],['alien_order(["abc", "ab"])','""']],hints:['Compare each pair of neighbouring words: the first differing letters give one ordering rule (an edge).','Topologically sort the letters; a cycle (or a longer word before its own prefix) means invalid.'],approach:'Build edges from adjacent words, then topological sort (heap for the smallest order).',cx:'O(total characters)'}
]);
})();

/* ---------- Bellman-Ford and negative cycles (added with the v2 curriculum) ---------- */
COURSE.qs('advgraphs',[
{id:'ag-bf-dr1',type:'dryrun',d:2,p:'shortest-path',title:'Bellman-Ford rounds',code:`INF = float("inf")
edges = [(2, 3, 2), (1, 2, -3), (0, 2, 5), (0, 1, 4)]
dist = [0, INF, INF, INF]
for _ in range(3):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w`,cols:['dist'],rowLabel:'Round',rows:[['[0, 4, 5, inf]'],['[0, 4, 1, 7]'],['[0, 4, 1, 3]']],setup:'One row per round (after all edges are relaxed once).',why:'The edges are listed in an unlucky order, so good distances travel one edge further each round. With n nodes, n − 1 rounds are always enough.'},
{id:'ag-bf-m1',type:'mcq',d:2,p:'shortest-path',title:'Why n − 1 rounds?',q:'Why does Bellman-Ford relax every edge n − 1 times?',opts:['It is a safety margin','A shortest path without cycles has at most n − 1 edges, and each round fixes at least one more edge of it','Because Dijkstra needs n rounds','To sort the edges'],a:1,why:'After round k, every shortest path with at most k edges has its correct length.'},
{id:'ag-bf-m2',type:'mcq',d:2,p:'shortest-path',title:'Detecting a negative cycle',q:'After n − 1 rounds, one more round still improves some distance. What does that prove?',opts:['The graph is disconnected','There is a negative cycle reachable from the source, so "shortest" is not defined','The algorithm has a bug','The weights are all positive'],a:1,why:'Without negative cycles every distance is final after n − 1 rounds. Any further improvement means you can keep going round a cycle that lowers the cost.'},
{id:'ag-bf-ch1',type:'choose',d:2,p:'shortest-path',title:'Refunds on some routes',q:'Some edges have negative cost (refunds), there are no negative cycles, and you need shortest paths from one city.',opts:['Bellman-Ford','Dijkstra','BFS','Prim'],a:0,why:'Dijkstra assumes a settled node never improves, which negative edges break. Bellman-Ford handles them in O(V · E).'},
{id:'ag-bf-c1',type:'complexity',d:2,p:'shortest-path',title:'Bellman-Ford cost',code:`for _ in range(n - 1):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w`,opts:['O(V + E)','O(E log V)','O(V · E)','O(V²)'],a:2,why:'n − 1 rounds, each relaxing all E edges.'},
{id:'ag-negative-cycle',type:'code',d:2,p:'shortest-path',title:'Detect a Negative Cycle',prompt:'<p>Nodes are 0..n − 1 and edges are directed <code>(u, v, w)</code>. Return <code>True</code> if the graph contains any cycle with negative total weight (anywhere, not only reachable from node 0).</p>',prereq:['ag-bf-m2'],
constraints:['1 ≤ n ≤ 500','0 ≤ len(edges) ≤ 5000, −1000 ≤ w ≤ 1000'],
starter:`def has_negative_cycle(n, edges):
    # your code here
    pass`,solution:`def has_negative_cycle(n, edges):
    dist = [0] * n                 # like a virtual source joined to every node with weight 0
    for _ in range(n - 1):
        changed = False
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:            # settled early: no negative cycle
            return False
    return any(dist[u] + w < dist[v] for u, v, w in edges)`,
tests:[['has_negative_cycle(3, [(0, 1, 1), (1, 2, -1), (2, 0, -1)])','True'],['has_negative_cycle(3, [(0, 1, 1), (1, 2, -1), (2, 0, 1)])','False'],['has_negative_cycle(1, [])','False'],['has_negative_cycle(4, [(0, 1, 2), (2, 3, -5), (3, 2, 4)])','True'],['has_negative_cycle(2, [(0, 1, -5)])','False'],['has_negative_cycle(2, [(0, 0, -1)])','True']],
hints:['Run Bellman-Ford n − 1 rounds; then check whether any edge can still be relaxed.','To catch cycles anywhere, start every distance at 0 (as if a hidden source reached every node at cost 0).'],approach:'Bellman-Ford from a virtual source, plus one extra checking round.',cx:'O(V · E) time, O(V) space',
mistakes:['Starting only node 0 at distance 0, which misses cycles that node 0 cannot reach.','Stopping after n − 1 rounds without the extra check.'],
followup:'Return the nodes of one negative cycle (remember each node’s predecessor and walk back n steps).'},
]);
