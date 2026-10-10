/* Topic 18 · Advanced graphs. */
COURSE.topic({id:'advgraphs',
goal:'Order tasks with topological sort, detect cycles, track connectivity with union-find, find weighted shortest paths with Dijkstra, and build minimum spanning trees with Prim and Kruskal.',
learn:[
{title:'Topological sort',short:'Topo sort',mins:12,lead:'In a directed acyclic graph (DAG), order the nodes so every edge points forward. Kahn’s algorithm repeatedly takes a node with no remaining incoming edges.',does:['visualize','predict','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'adv-graphs',title:'Course order',arg:{mode:'topo'},intro:'Before each step, name the courses that are ready (in-degree 0).'},
 {t:'q',ids:['ag-m1','ag-p1','ag-dr1','ag-c2','ag-ch1']},
 {t:'q',ids:['ag-b1','ag-d3']},
 {t:'q',title:'Code it',ids:['ag-can-finish','ag-course-order']}]},

{title:'Detecting cycles',short:'Cycles',mins:10,lead:'Directed graphs: DFS with three colors; reaching a gray node (still on the current path) means a cycle. Undirected graphs: union-find, or DFS that ignores the edge back to the parent.',does:['visualize','concept','code'],blocks:[
 {t:'viz',fn:'adv-graphs',title:'Three colors',arg:{mode:'cycle'}},
 {t:'q',ids:['ag-m4','ag-m5']},
 {t:'q',title:'Code it',ids:['ag-cycle-directed','ag-cycle-undirected']}]},

{title:'Union-find',short:'Union-find',mins:10,lead:'A forest of parent pointers that answers “are a and b connected?” and merges groups, in almost O(1) per operation with path compression and union by size.',does:['visualize','predict','dry run','complete','debug','build'],blocks:[
 {t:'viz',fn:'adv-graphs',title:'Merge sets edge by edge',arg:{mode:'uf'}},
 {t:'q',ids:['ag-p3','ag-dr2','ag-b3','ag-d2','ag-c4','ag-ch4']},
 {t:'q',title:'Code it',ids:['ag-provinces','ag-redundant']},
 {t:'q',title:'Build it',ids:['build-union-find']}]},

{title:"Dijkstra's shortest paths",short:'Dijkstra',mins:12,lead:'With non-negative weights, always settle the unsettled node with the smallest known distance (a min-heap gives it to you), then relax its edges.',does:['visualize','predict','complete','debug','code'],blocks:[
 {t:'viz',fn:'adv-graphs',title:'Relax the edges',arg:{mode:'dijkstra'},intro:'Before each pop, predict which node comes out of the heap.'},
 {t:'q',ids:['ag-p2','ag-c1','ag-m2','ag-ch2','ag-b2','ag-d1']},
 {t:'q',title:'Code it',ids:['ag-network-delay','ag-bellman']}]},

{title:'Minimum spanning trees',short:'MST',mins:12,lead:'Connect every node with the least total edge weight. Prim grows one tree from a start node; Kruskal adds the globally cheapest edges that do not form a cycle.',does:['visualize','concept','code'],blocks:[
 {t:'viz',fn:'adv-graphs',title:'Prim, then Kruskal',arg:{mode:'prim'},intro:'Run Prim, then switch to Kruskal. Do they pick the same total?'},
 {t:'q',ids:['ag-m3','ag-m6','ag-c3','ag-ch3']},
 {t:'q',title:'Code it',ids:['ag-kruskal','ag-min-cost-points']}]}],

challenge:[
 {t:'b2o',title:'Weighted shortest path: BFS → Dijkstra',qid:'ag-network-delay',problem:'<p>Signals travel along weighted directed edges. How long until a signal from k reaches every node?</p>',
  brute:{note:'Try BFS, which worked for unweighted graphs.',code:`from collections import deque

def network_delay(times, n, k):
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))
    dist, q = {k: 0}, deque([k])
    while q:
        u = q.popleft()
        for v, w in graph[u]:
            if v not in dist:
                dist[v] = dist[u] + w     # first arrival is final?!
                q.append(v)
    return max(dist.values()) if len(dist) == n else -1`,cx:'O(n)',cxOpts:['O(n)','O(n log n)','O(n²)','O(2ⁿ)'],why:'Fast (linear in V + E), but WRONG: with weights, the first path found is not necessarily the cheapest.'},
  slow:{q:'What goes wrong?',opts:['It is too slow','BFS fixes a distance when a node is first reached (fewest edges), but a path with more edges can be cheaper','The queue overflows','It ignores directions'],a:1,why:'A → B (10) vs A → C → B (1 + 1).'},
  better:{q:'What should decide which node to finalise next?',opts:['Arrival order (queue)','The smallest known total distance (a min-heap)','Alphabetical order','Random choice'],a:1,why:'That is Dijkstra’s greedy rule; it is correct when weights are non-negative.'},
  optimal:{code:`import heapq

def network_delay(times, n, k):
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))
    dist, pq = {k: 0}, [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1`,cx:'O(n log n)',cxOpts:['O(n)','O(n log n)','O(n²)','O(2ⁿ)'],why:'O((V + E) log V) with a heap: a little slower than BFS, and correct.'},
  takeaway:'<p>“Optimal” first means correct. Pick the algorithm that matches the problem’s guarantees: BFS for unweighted, Dijkstra for non-negative weights, Bellman-Ford for negative weights.</p>'}],

review:[
 {t:'flash',items:[['Topological order exists iff…','The directed graph has no cycle (a DAG).'],["Kahn's algorithm?",'Queue of in-degree-0 nodes; removing a node decrements its successors.'],['Directed cycle check?','DFS colors: meeting a gray node = back edge.'],['Union-find ops?','find (with path compression) and union (by size): ~O(1).'],['Dijkstra requires…','Non-negative weights. O((V + E) log V).'],['Negative weights?','Bellman-Ford, O(V·E); also detects negative cycles.'],['Prim vs Kruskal?','Grow one tree with a heap vs sorted edges + union-find.']]}]
});
