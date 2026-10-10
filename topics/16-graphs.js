/* Topic 16 · Graphs. */
COURSE.topic({id:'graphs',
goal:'Model problems as graphs, choose between adjacency lists and matrices, and use BFS and DFS for reachability, components, shortest unweighted paths and grids.',
learn:[
{title:'What is a graph?',short:'Vocabulary',mins:8,lead:'Nodes (vertices) connected by edges. Edges can be one-way (directed) or two-way (undirected), and can carry weights. Trees, grids, maps and social networks are all graphs.',does:['concept','choose','predict'],blocks:[
 {t:'diagram',text:`
  undirected            directed              weighted
  A — B                 A → B                 A —4— B
  |   |                 ↑   ↓                 |2    |1
  C — D                 C ← D                 C —3— D`,aria:'Undirected, directed and weighted example graphs'},
 {t:'q',ids:['g-m1','g-m2','g-m6','g-m7','g-p5']}]},

{title:'Storing a graph',short:'List vs matrix',mins:8,lead:'An adjacency list stores each node’s neighbours: compact for sparse graphs. An adjacency matrix stores a V × V grid of 0/1 (or weights): instant edge checks, but V² memory.',does:['predict','complexity','choose','complete','code'],blocks:[
 {t:'code',title:'Both representations',code:`edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D")]

adj = {}                                   # adjacency list
for u, v in edges:
    adj.setdefault(u, []).append(v)
    adj.setdefault(v, []).append(u)
print(adj)

names = ["A", "B", "C", "D"]                # adjacency matrix
idx = {n: i for i, n in enumerate(names)}
m = [[0] * len(names) for _ in names]
for u, v in edges:
    m[idx[u]][idx[v]] = m[idx[v]][idx[u]] = 1
for row in m:
    print(row)`},
 {t:'q',ids:['g-p1','g-p2','g-p6','g-c2','g-c4','g-m3','g-ch1','g-ch3']},
 {t:'q',ids:['g-b1','g-d3']},
 {t:'q',title:'Code it',ids:['g-adj']}]},

{title:'Breadth-first search',short:'BFS',mins:12,lead:'BFS explores in rings: the start, then everything 1 edge away, then 2 edges away… using a queue. In an unweighted graph, the first time BFS reaches a node is along a shortest path.',does:['visualize','predict','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'graph',title:'Run BFS',intro:'Run BFS from A. Before each step, predict what the queue will look like. Then add an edge (click two nodes) and run it again.'},
 {t:'q',ids:['g-p3','g-p7','g-dr1','g-m4','g-c1']},
 {t:'q',ids:['g-b2','g-d1','g-d2']},
 {t:'q',title:'Code it',ids:['g-bfs','g-has-path']}]},

{title:'Depth-first search',short:'DFS',mins:10,lead:'DFS goes as deep as possible before backtracking, using recursion (the call stack) or an explicit stack. A visited set stops it from looping forever.',does:['visualize','predict','dry run','complete','code'],blocks:[
 {t:'viz',fn:'graph',title:'Run DFS',intro:'Run DFS from A and compare its order with BFS. Then switch to Directed and run both again.'},
 {t:'q',ids:['g-p4','g-p8','g-dr2','g-m5']},
 {t:'q',ids:['g-b3']},
 {t:'q',title:'Code it',ids:['g-dfs','g-components','g-keys-rooms']}]},

{title:'Grids are graphs',short:'Grids',mins:12,lead:'Each cell is a node; its neighbours are the cells up, down, left and right. Islands, flood fills, mazes and spreading processes are all BFS/DFS on a grid.',does:['visualize','complexity','debug','code'],blocks:[
 {t:'viz',fn:'grid-islands',title:'Count islands',intro:'Draw your own map. Predict the number of islands before running.'},
 {t:'q',ids:['g-c3','g-ch2','g-d4']},
 {t:'q',title:'Code it',ids:['g-flood-fill','g-islands','g-shortest-unweighted','g-rotting']}]}],

challenge:[
 {t:'b2o',title:'Distance to the Nearest 0: BFS per cell → one multi-source BFS',qid:'g-01-matrix',problem:'<p>For every cell of a 0/1 grid, find the distance to the nearest 0.</p>',
  brute:{code:`def update_matrix(mat):
    rows, cols = len(mat), len(mat[0])
    out = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            if mat[r][c] == 1:
                out[r][c] = bfs_to_nearest_zero(mat, r, c)   # O(R·C) each
    return out`,cx:'O(n²)',cxOpts:['O(n)','O(n log n)','O(n²)','O(2ⁿ)'],why:'With n = R × C cells, a full BFS for each cell costs O(n) each: O(n²) total.'},
  slow:{q:'What is repeated?',opts:['Neighbouring cells run almost identical searches over the same area','Reading the grid','Creating the output','Nothing'],a:0,why:'Each BFS rediscovers the same zeros.'},
  better:{q:'How do we search once for everyone?',opts:['DFS from the top-left','One BFS that starts from ALL zeros at the same time','Sort the cells','Dijkstra from each cell'],a:1,why:'Multi-source BFS: distances grow outward from every 0 together.'},
  optimal:{code:`from collections import deque

def update_matrix(mat):
    rows, cols = len(mat), len(mat[0])
    dist = [[-1] * cols for _ in range(rows)]
    q = deque()
    for r in range(rows):
        for c in range(cols):
            if mat[r][c] == 0:
                dist[r][c] = 0
                q.append((r, c))
    while q:
        r, c = q.popleft()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return dist`,cx:'O(n)',cxOpts:['O(n)','O(n log n)','O(n²)','O(2ⁿ)'],why:'Every cell enters the queue once.'},
  takeaway:'<p>When many searches share the same goal, reverse the direction and search once from all the goals.</p>'}],

review:[
 {t:'flash',items:[['Adjacency list vs matrix?','List: O(V + E) space, good for sparse. Matrix: O(V²), O(1) edge check.'],['BFS uses…','A queue; gives shortest paths in unweighted graphs.'],['DFS uses…','Recursion or a stack.'],['Why visited?','Cycles would cause infinite loops.'],['BFS/DFS cost?','O(V + E).'],['Count components?','Start a search from every unvisited node.'],['Grid neighbours?','Up/down/left/right with bounds checks (0 ≤ r < rows!).'],['Multi-source BFS?','Put all sources in the queue at the start.']]}]
});
