/* Visualizers for topics 16–17: graph builder with BFS/DFS, grid islands, and advanced graph algorithms. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;
const circle=(ids,W,H)=>{const cx=W/2,cy=H/2,r=Math.min(W,H)/2-34;return ids.map((id,i)=>({id,x:Math.round(cx+r*Math.cos(-Math.PI/2+2*Math.PI*i/ids.length)),y:Math.round(cy+r*Math.sin(-Math.PI/2+2*Math.PI*i/ids.length))}))};
const chips=(arr,empty)=>arr.length?arr.map(v=>`<span class="var">${esc(v)}</span>`).join(''):`<span class="mono tiny muted">${empty||'empty'}</span>`;
const adjOf=(nodes,edges,dir)=>{const a={};nodes.forEach(n=>a[n.id]=[]);edges.forEach(e=>{a[e.u].push(e.v);if(!dir)a[e.v].push(e.u)});Object.values(a).forEach(l=>l.sort());return a};

/* ---------- graph builder + BFS / DFS ---------- */
C.addViz('graph',{topic:'graphs',title:'Graph builder: BFS and DFS',desc:'Add nodes and edges (click two nodes to connect them), switch between directed and undirected, then run BFS or DFS and watch the queue, stack and visited set.',ico:'A — B — D\n|   |\nC — E',p:'bfs'},(el)=>{
  const W=520,H=300;let dir=false,nodes,edges,sel=null;
  const preset=()=>{const ids=['A','B','C','D','E','F','G'];nodes=circle(ids,W,H);edges=[['A','B'],['A','C'],['B','D'],['C','D'],['D','E'],['E','F'],['C','G']].map(([u,v])=>({u,v}))};preset();
  const sh=V.shell(el,{controls:`<button class="btn small" type="button" data-dir aria-pressed="false">Directed</button><button class="btn small" type="button" data-op="add">+ Add node</button>${V.input('u','Edge',`A`,'2.5em')}${V.input('v','to','E','2.5em')}<button class="btn small" type="button" data-op="edge">Add edge</button><button class="btn small" type="button" data-op="rm">Remove edge</button><span style="width:6px"></span>${V.input('s','Start','A','2.5em')}<button class="btn small primary" type="button" data-op="bfs">Run BFS</button><button class="btn small primary" type="button" data-op="dfs">Run DFS</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,
    draw(f,pn){pn.stage.innerHTML=V.graph({nodes,edges,directed:dir,cls:f.cls,ecls:f.ecls,W,H,aria:'Graph'})+(f.adj?`<div class="small mono muted" style="margin-top:6px">${Object.entries(f.adj).map(([k,l])=>`${k}: [${l.join(', ')}]`).join(' · ')}</div>`:'');
      pn.say(f.msg,f.k);pn.vars.innerHTML=f.ds?`<div class="col" style="gap:6px"><div class="row"><span class="eyebrow">${f.dsName}</span>${chips(f.ds)}</div><div class="row"><span class="eyebrow">Visited</span>${chips(f.visited,'{}')}</div><div class="row"><span class="eyebrow">Order</span><span class="mono">[${f.order.join(', ')}]</span></div></div>`:''}});
  const still=(msg,k)=>{const cls={};if(sel)cls[sel]='hl';sh.pl.load([{cls,ecls:{},msg,k,adj:adjOf(nodes,edges,dir)}])};
  const toggleEdge=(u,v,force)=>{if(u===v)return 'A node cannot connect to itself here.';const i=edges.findIndex(e=>(e.u===u&&e.v===v)||(!dir&&e.u===v&&e.v===u));
    if(i>=0&&force!=='add'){edges.splice(i,1);return `Removed edge ${u}${dir?' → ':' — '}${v}.`}if(i<0&&force!=='rm'){edges.push({u,v});return `Added edge ${u}${dir?' → ':' — '}${v}.`}return force==='rm'?'That edge does not exist.':'That edge already exists.'};
  const run=op=>{const ids=nodes.map(n=>n.id);
    if(op==='reset'){preset();sel=null;still('An undirected graph stored as an adjacency list (shown below the drawing). Click two nodes to add or remove an edge between them.');return}
    if(op==='add'){if(nodes.length>=12){still('This demo holds 12 nodes.','warn');return}const id=String.fromCharCode(65+nodes.length);const keep=nodes.map(n=>n.id).concat([id]);nodes=circle(keep,W,H);still(`Added node ${id}. Connect it by clicking it and then another node.`,'ok');return}
    if(op==='edge'||op==='rm'){const u=sh.$('[data-in=u]').value.trim().toUpperCase(),v=sh.$('[data-in=v]').value.trim().toUpperCase();if(!ids.includes(u)||!ids.includes(v)){still('Use node names that exist.','bad');return}still(toggleEdge(u,v,op==='edge'?'add':'rm'));return}
    const s=sh.$('[data-in=s]').value.trim().toUpperCase();if(!ids.includes(s)){still('Pick a start node that exists.','bad');return}
    const adj=adjOf(nodes,edges,dir),F=[],vis=new Set(),order=[],ecls={};const ek=(a,b)=>V.ekey(a,b,dir);
    const snap=(msg,cur,ds,extra,k)=>{const cls={};vis.forEach(x=>cls[x]='vis');ds.forEach(x=>{if(!vis.has(x)||op==='bfs')cls[x]=cls[x]||'hl'});if(cur)cls[cur]='cur';Object.assign(cls,extra||{});F.push({cls,ecls:Object.assign({},ecls),msg,k,adj,ds:ds.slice(),dsName:op==='bfs'?'Queue (front at left)':'Stack (top at right)',visited:[...vis],order:order.slice()})};
    if(op==='bfs'){const q=[s];vis.add(s);snap(`BFS from ${s}: put it in the queue and mark it visited.`,null,q);
      while(q.length){const u=q.shift();order.push(u);snap(`Dequeue ${u} and process it.`,u,q);
        for(const v of adj[u]){if(vis.has(v)){snap(`Neighbour ${v} is already visited: skip.`,u,q,{[v]:'dim'});continue}vis.add(v);q.push(v);ecls[ek(u,v)]='ok';snap(`Neighbour ${v} is new: mark visited and enqueue.`,u,q)}}
      snap(`BFS order: ${order.join(' → ')}. Nodes come out level by level: green edges form the BFS tree (shortest paths in edges from ${s}).${vis.size<ids.length?` Unreached: ${ids.filter(x=>!vis.has(x)).join(', ')} (another component${dir?' or wrong edge direction':''}).`:''}`,null,[],{},'ok')}
    else{const stack=[];const go=u=>{vis.add(u);order.push(u);stack.push(u);snap(`Visit ${u} (mark it). It goes on the call stack.`,u,stack);
        for(const v of adj[u]){if(vis.has(v)){snap(`From ${u}: ${v} is already visited.`,u,stack,{[v]:'vis'});continue}ecls[ek(u,v)]='ok';snap(`From ${u}: go deep into ${v}.`,u,stack);go(v);snap(`Back at ${u} after finishing ${v}.`,u,stack)}
        stack.pop();snap(`${u} has no unvisited neighbours left: return (pop it).`,null,stack)};
      go(s);snap(`DFS order: ${order.join(' → ')}. It goes as deep as possible before backtracking.${vis.size<ids.length?` Unreached: ${ids.filter(x=>!vis.has(x)).join(', ')}.`:''}`,null,[],{},'ok')}
    sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-dir]')){dir=!dir;e.target.closest('[data-dir]').setAttribute('aria-pressed',String(dir));still(dir?'Directed: an edge u → v can only be followed from u. Edges are drawn as arrows.':'Undirected: every edge works both ways.');return}
    const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});
  sh.pn.stage.addEventListener('click',e=>{const g=e.target.closest('[data-node]');if(!g)return;const id=g.dataset.node;if(!sel){sel=id;still(`Selected ${id}. Click another node to add or remove an edge from ${id}.`);return}
    if(sel===id){sel=null;still('Selection cleared.');return}const msg=toggleEdge(sel,id);sel=null;still(msg,'ok')});
  run('reset')});

/* ---------- grid: count islands with BFS ---------- */
C.addViz('grid-islands',{topic:'graphs',title:'Grids as graphs: count islands',desc:'Each land cell is a node connected to its land neighbours. Click cells to draw land, then flood-fill each island with BFS.',ico:'1 1 0 0\n1 0 0 1\n0 0 1 1',p:'bfs'},(el)=>{
  const R=6,Cc=9;let g=['110000100','110001100','001000000','000110011','010000011','000011000'].map(r=>r.split('').map(Number));
  const sh=V.shell(el,{controls:`<button class="btn small primary" type="button" data-op="run">Count islands (BFS)</button><button class="btn small" type="button" data-op="clear">Clear</button><button class="btn small" type="button" data-op="random">Random</button><span class="small muted">Click a cell to toggle land / water.</span>`,
    draw(f,pn){pn.stage.innerHTML=`<div style="display:grid;grid-template-columns:repeat(${Cc},38px);gap:3px;width:max-content" role="grid" aria-label="Grid">${f.g.map((row,r)=>row.map((v,c)=>{const lab=f.lab[r][c];const cur=f.cur&&f.cur[0]===r&&f.cur[1]===c,inq=f.q&&f.q.some(p=>p[0]===r&&p[1]===c);
      const bg=cur?'var(--warn)':lab?`hsl(${(lab*67)%360} 55% 55% / .55)`:v?'var(--good-soft)':'var(--card)';return `<button type="button" data-cell="${r},${c}" style="height:38px;border:1.5px solid ${inq?'var(--blue)':v?'var(--good)':'var(--line)'};border-radius:5px;background:${bg};font-family:var(--f-mono);font-size:.75rem;color:var(--ink)" aria-label="row ${r} col ${c} ${v?'land':'water'}">${lab||''}</button>`}).join('')).join('')}</div>`;
      pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars({islands:f.count,'queue size':f.q?f.q.length:0})}});
  const blank=()=>g.map(r=>r.map(()=>0));
  const still=msg=>sh.pl.load([{g,lab:blank(),msg,count:0}]);
  const run=()=>{const lab=blank(),F=[];let count=0;const snap=(msg,cur,q,k)=>F.push({g,lab:lab.map(r=>r.slice()),msg,cur,q:q?q.slice():null,count,k});
    snap('Scan every cell. Each unlabeled land cell starts a new island.');
    for(let r=0;r<R;r++)for(let c=0;c<Cc;c++){if(!g[r][c]||lab[r][c])continue;count++;lab[r][c]=count;const q=[[r,c]];snap(`New land at (${r}, ${c}): island #${count}. BFS from here.`,[r,c],q);
      while(q.length){const [y,x]=q.shift();for(const [dy,dx] of [[1,0],[-1,0],[0,1],[0,-1]]){const ny=y+dy,nx=x+dx;if(ny<0||nx<0||ny>=R||nx>=Cc||!g[ny][nx]||lab[ny][nx])continue;lab[ny][nx]=count;q.push([ny,nx])}snap(`Visit (${y}, ${x}); enqueue its unvisited land neighbours (up, down, left, right).`,[y,x],q)}}
    snap(`${count} island${count===1?'':'s'}. Every cell was handled once: O(rows × cols).`,null,null,'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(!b)return;if(b.dataset.op==='run')run();if(b.dataset.op==='clear'){g=blank();still('Empty sea. Click cells to add land.')}if(b.dataset.op==='random'){g=g.map(r=>r.map(()=>Math.random()<0.4?1:0));still('Random map. Predict the number of islands, then run.')}});
  sh.pn.stage.addEventListener('click',e=>{const b=e.target.closest('[data-cell]');if(!b)return;const [r,c]=b.dataset.cell.split(',').map(Number);g[r][c]=1-g[r][c];still('Edited. Predict the number of islands, then run.')});
  still('Land cells (green) that touch up/down/left/right belong to the same island. How many islands? Predict, then run.')});

/* ---------- advanced graph algorithms ---------- */
const DAG={nodes:[['math',60,60],['prog',60,220],['ds',220,140],['algo',380,60],['db',220,260],['ml',500,140],['web',380,240]],edges:[['math','ds'],['prog','ds'],['prog','db'],['ds','algo'],['algo','ml'],['math','ml'],['db','web'],['ds','web']]};
const WG={nodes:[['A',60,150],['B',180,50],['C',180,250],['D',320,50],['E',320,250],['F',460,150]],edges:[['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','E',10],['C','D',8],['D','E',2],['D','F',6],['E','F',3]]};
const CYC={nodes:[['A',70,80],['B',230,60],['C',390,90],['D',300,230],['E',120,230]],edges:[['A','B'],['B','C'],['C','D'],['D','B'],['A','E']]};
const ADV={
 topo:{label:'Topological sort',g:DAG,dir:true,src:`from collections import deque

def topo_sort(graph, nodes):
    indeg = {u: 0 for u in nodes}
    for u in nodes:
        for v in graph[u]:
            indeg[v] += 1
    queue = deque(u for u in nodes if indeg[u] == 0)
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)
    return order    # shorter than nodes → there is a cycle`},
 cycle:{label:'Cycle detection',g:CYC,dir:true,src:`def has_cycle(graph, nodes):
    WHITE, GRAY, BLACK = 0, 1, 2      # unvisited, on the path, done
    color = {u: WHITE for u in nodes}
    def dfs(u):
        color[u] = GRAY
        for v in graph[u]:
            if color[v] == GRAY:
                return True           # back edge → cycle
            if color[v] == WHITE and dfs(v):
                return True
        color[u] = BLACK
        return False
    return any(color[u] == WHITE and dfs(u) for u in nodes)`},
 uf:{label:'Union-Find',g:WG,dir:false,src:`parent = {u: u for u in nodes}

def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # path compression
        x = parent[x]
    return x

def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb:
        return False                    # already connected
    parent[rb] = ra
    return True`},
 dijkstra:{label:'Dijkstra',g:WG,dir:false,src:`import heapq

def dijkstra(graph, start):
    dist = {start: 0}
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue                     # stale entry
        for v, w in graph[u]:
            nd = d + w
            if nd < dist.get(v, float("inf")):
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist`},
 prim:{label:"Prim's MST",g:WG,dir:false,src:`import heapq

def prim(graph, start):
    seen, total = {start}, 0
    pq = [(w, start, v) for v, w in graph[start]]
    heapq.heapify(pq)
    while pq:
        w, u, v = heapq.heappop(pq)      # cheapest edge leaving the tree
        if v in seen:
            continue
        seen.add(v)
        total += w
        for x, wx in graph[v]:
            if x not in seen:
                heapq.heappush(pq, (wx, v, x))
    return total`},
 kruskal:{label:"Kruskal's MST",g:WG,dir:false,src:`def kruskal(nodes, edges):
    parent = {u: u for u in nodes}
    def find(x):
        while parent[x] != x:
            x = parent[x]
        return x
    total = 0
    for w, u, v in sorted(edges):        # cheapest edges first
        ru, rv = find(u), find(v)
        if ru != rv:                     # different components: no cycle
            parent[rv] = ru
            total += w
    return total`}};
C.addViz('adv-graphs',{topic:'advgraphs',title:'Advanced graph algorithms',desc:'Topological sort, cycle detection, union-find, Dijkstra, Prim and Kruskal, step by step on small example graphs.',ico:'A —4— B\n|2  /1 |5\nC ——— D',p:'shortest-path'},(el,api)=>{
  let mode=api.arg.mode||'dijkstra';
  const sh=V.shell(el,{controls:V.modeButtons(Object.entries(ADV).map(([k,m])=>[k,m.label]),mode)+`<span style="width:6px"></span><span data-start>${V.input('s','Start','A','3em')}</span><button class="btn small primary" type="button" data-go>Run</button>`,code:ADV.dijkstra.src,
    draw(f,pn){const m=ADV[f.mode];pn.stage.innerHTML=V.graph({nodes:m.g.nodes.map(([id,x,y])=>({id,x,y})),edges:m.g.edges.map(([u,v,w])=>({u,v,w})),directed:m.dir,cls:f.cls,ecls:f.ecls,labels:f.labels,W:560,H:300,r:f.mode==='topo'?24:19,aria:m.label});
      pn.say(f.msg,f.k);pn.vars.innerHTML=f.panel||''}});
  const load=()=>{const m=ADV[mode];U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));sh.$('[data-start]').hidden=!['dijkstra','prim'].includes(mode);
    const N=m.g.nodes.map(n=>n[0]),E=m.g.edges,F=[],ecls={},cls={};const adj={};N.forEach(n=>adj[n]=[]);E.forEach(([u,v,w])=>{adj[u].push([v,w]);if(!m.dir)adj[v].push([u,w])});Object.values(adj).forEach(l=>l.sort((a,b)=>a[0]<b[0]?-1:1));
    const ek=(u,v)=>V.ekey(u,v,m.dir);const snap=(msg,o)=>{o=o||{};F.push(Object.assign({mode,src:m.src,cls:Object.assign({},cls,o.cls||{}),ecls:Object.assign({},ecls,o.ecls||{}),labels:o.labels,panel:o.panel,msg,k:o.k}))};
    if(mode==='topo'){const indeg={};N.forEach(n=>indeg[n]=0);E.forEach(([u,v])=>indeg[v]++);const lab=()=>Object.fromEntries(N.map(n=>[n,'in '+indeg[n]]));const q=N.filter(n=>!indeg[n]),order=[];
      const panel=()=>`<div class="col" style="gap:6px"><div class="row"><span class="eyebrow">Queue (in-degree 0)</span>${chips(q)}</div><div class="row"><span class="eyebrow">Order</span><span class="mono">[${order.join(', ')}]</span></div></div>`;
      q.forEach(n=>cls[n]='hl');snap(`Courses with prerequisites (an edge u → v means take u before v). Count incoming edges (in-degree). ${q.join(', ')} have none: they can be taken first.`,{labels:lab(),panel:panel()});
      while(q.length){const u=q.shift();order.push(u);cls[u]='vis';snap(`Take ${u}.`,{cls:{[u]:'cur'},labels:lab(),panel:panel()});
        for(const [v] of adj[u]){indeg[v]--;ecls[ek(u,v)]='ok';if(!indeg[v]){q.push(v);cls[v]='hl';snap(`${u} → ${v}: ${v}’s in-degree drops to 0, so it is ready: enqueue.`,{cls:{[u]:'cur'},labels:lab(),panel:panel()})}else snap(`${u} → ${v}: ${v} still waits for ${indeg[v]} more prerequisite${indeg[v]>1?'s':''}.`,{cls:{[u]:'cur'},labels:lab(),panel:panel()})}}
      snap(order.length===N.length?`A valid order: ${order.join(' → ')}. Every edge points forward. (If some nodes never reach in-degree 0, there is a cycle.)`:'Some nodes were never freed: the graph has a cycle.',{labels:lab(),panel:panel(),k:'ok'})}
    if(mode==='cycle'){const color={};N.forEach(n=>color[n]=0);const path=[];let found=false;const C3=()=>{const c={};N.forEach(n=>{if(color[n]===1)c[n]='hl';if(color[n]===2)c[n]='vis'});return c};
      const panel=()=>`<div class="row"><span class="eyebrow">Current path (gray)</span><span class="mono">${path.join(' → ')||'–'}</span></div><p class="small muted">White = unvisited, gray (amber) = on the current DFS path, done (teal) = fully explored.</p>`;
      const dfs=u=>{color[u]=1;path.push(u);snap(`Enter ${u}: color it gray (on the current path).`,{cls:Object.assign(C3(),{[u]:'cur'}),panel:panel()});
        for(const [v] of adj[u]){if(found)return;if(color[v]===1){ecls[ek(u,v)]='bad';found=true;snap(`Edge ${u} → ${v} points back to ${v}, which is still gray (on the path): a <b>back edge</b>. Cycle: ${path.slice(path.indexOf(v)).join(' → ')} → ${v}.`,{cls:Object.assign(C3(),{[v]:'bad',[u]:'bad'}),panel:panel(),k:'bad'});return}
          if(color[v]===0){ecls[ek(u,v)]='vis';snap(`${u} → ${v}: ${v} is white, go deeper.`,{cls:Object.assign(C3(),{[u]:'cur'}),panel:panel()});dfs(v)}else snap(`${u} → ${v}: ${v} is already done (no cycle through it).`,{cls:C3(),panel:panel()})}
        if(found)return;color[u]=2;path.pop();snap(`All edges of ${u} explored: color it done and leave the path.`,{cls:C3(),panel:panel()})};
      for(const n of N){if(found)break;if(color[n]===0)dfs(n)}if(!found)snap('No back edge found: the graph is acyclic.',{cls:C3(),k:'ok'})}
    if(mode==='uf'){const parent={};N.forEach(n=>parent[n]=n);const find=x=>{while(parent[x]!==x)x=parent[x];return x};let comps=N.length;
      const panel=()=>`<div class="col" style="gap:6px">${V.vars(Object.fromEntries(N.map(n=>['parent['+n+']',parent[n]])))}<div class="row"><span class="eyebrow">Components</span><span class="mono">${comps}</span></div></div>`;
      const colorComp=()=>{const roots=[...new Set(N.map(find))];const c={};N.forEach(n=>{c[n]=parent[n]===n?'vis':''});return c};
      snap('Every node starts as its own set (its own parent). Process the edges one by one.',{panel:panel()});
      for(const [u,v] of E){const ru=find(u),rv=find(v);if(ru===rv){ecls[ek(u,v)]='bad';snap(`Edge ${u}–${v}: find(${u}) = ${ru} and find(${v}) = ${rv} are the same root. Already connected: this edge would close a cycle.`,{cls:Object.assign(colorComp(),{[u]:'bad',[v]:'bad'}),panel:panel()})}
        else{parent[rv]=ru;comps--;ecls[ek(u,v)]='ok';snap(`Edge ${u}–${v}: roots ${ru} and ${rv} differ, so union them: parent[${rv}] = ${ru}. Components: ${comps}.`,{cls:Object.assign(colorComp(),{[u]:'cur',[v]:'cur'}),panel:panel()})}}
      snap(`Done: ${comps} component${comps>1?'s':''}. With path compression and union by size, each operation is almost O(1).`,{cls:colorComp(),panel:panel(),k:'ok'})}
    if(mode==='dijkstra'||mode==='prim'){const s=(sh.$('[data-in=s]').value.trim().toUpperCase())||'A';if(!N.includes(s)){snap('Pick a start node that exists (A–F).',{k:'bad'});sh.pl.load(F);return}
      if(mode==='dijkstra'){const dist={};N.forEach(n=>dist[n]=Infinity);dist[s]=0;const done=new Set(),prev={};let pq=[[0,s]];const lab=()=>Object.fromEntries(N.map(n=>[n,dist[n]===Infinity?'∞':String(dist[n])]));
        const panel=()=>`<div class="row"><span class="eyebrow">Priority queue (dist, node)</span>${chips(pq.slice().sort((a,b)=>a[0]-b[0]).map(p=>`(${p[0]}, ${p[1]})`))}</div>`;
        snap(`Distances start at ∞, except ${s} = 0. Always settle the closest unsettled node next.`,{labels:lab(),panel:panel(),cls:{[s]:'hl'}});
        while(pq.length){pq.sort((a,b)=>a[0]-b[0]);const [d,u]=pq.shift();if(done.has(u)){snap(`Pop (${d}, ${u}): ${u} is already settled with a shorter distance. Skip this stale entry.`,{labels:lab(),panel:panel()});continue}
          done.add(u);cls[u]='vis';if(prev[u])ecls[ek(prev[u],u)]='ok';snap(`Pop (${d}, ${u}): the smallest distance left, so ${u} is final: ${d}.`,{labels:lab(),panel:panel(),cls:{[u]:'cur'}});
          for(const [v,w] of adj[u]){if(done.has(v))continue;const nd=d+w;if(nd<dist[v]){const old=dist[v];dist[v]=nd;prev[v]=u;pq.push([nd,v]);snap(`Relax ${u} → ${v}: ${d} + ${w} = ${nd} < ${old===Infinity?'∞':old}. Update ${v} and push (${nd}, ${v}).`,{labels:lab(),panel:panel(),cls:{[u]:'cur',[v]:'hl'},ecls:{[ek(u,v)]:'hl'}})}
            else snap(`${u} → ${v}: ${d} + ${w} = ${nd} is not better than ${dist[v]}.`,{labels:lab(),panel:panel(),cls:{[u]:'cur'},ecls:{[ek(u,v)]:'dim'}})}}
        snap(`Shortest distances from ${s}: ${N.map(n=>`${n}=${dist[n]}`).join(', ')}. Green edges form the shortest-path tree. O((V + E) log V).`,{labels:lab(),k:'ok'})}
      else{const seen=new Set([s]);let total=0;let pq=adj[s].map(([v,w])=>[w,s,v]);cls[s]='vis';const panel=()=>`<div class="col" style="gap:6px"><div class="row"><span class="eyebrow">Candidate edges</span>${chips(pq.slice().sort((a,b)=>a[0]-b[0]).map(p=>`${p[1]}–${p[2]}:${p[0]}`))}</div><div class="row"><span class="eyebrow">MST weight</span><span class="mono">${total}</span></div></div>`;
        snap(`Grow a tree from ${s}. At each step, add the cheapest edge that leaves the tree.`,{panel:panel()});
        while(pq.length){pq.sort((a,b)=>a[0]-b[0]);const [w,u,v]=pq.shift();if(seen.has(v)){snap(`Edge ${u}–${v} (${w}) leads back into the tree: skip (it would make a cycle).`,{panel:panel(),ecls:{[ek(u,v)]:'dim'}});continue}
          seen.add(v);total+=w;cls[v]='vis';ecls[ek(u,v)]='ok';snap(`Cheapest edge leaving the tree: ${u}–${v} (${w}). Add ${v}. Total = ${total}.`,{panel:panel(),cls:{[v]:'cur'}});adj[v].forEach(([x,wx])=>{if(!seen.has(x))pq.push([wx,v,x])})}
        snap(`Minimum spanning tree weight: ${total} (${N.length - 1} edges connect all ${N.length} nodes).`,{panel:panel(),k:'ok'})}}
    if(mode==='kruskal'){const parent={};N.forEach(n=>parent[n]=n);const find=x=>{while(parent[x]!==x)x=parent[x];return x};let total=0,used=0;const sorted=E.slice().sort((a,b)=>a[2]-b[2]);
      const panel=i=>`<div class="col" style="gap:6px"><div class="row"><span class="eyebrow">Edges by weight</span>${sorted.map((e,j)=>`<span class="var ${j===i?'on':''}" style="${j<i?'opacity:.5':''}">${e[0]}–${e[1]}:${e[2]}</span>`).join('')}</div><div class="row"><span class="eyebrow">MST weight</span><span class="mono">${total}</span></div></div>`;
      snap('Sort all edges by weight. Take each edge unless it connects two nodes that are already connected (union-find checks that).',{panel:panel(-1)});
      sorted.forEach(([u,v,w],i)=>{const ru=find(u),rv=find(v);if(ru===rv){ecls[ek(u,v)]='bad';snap(`${u}–${v} (${w}): ${u} and ${v} are already connected. Adding it would create a cycle: skip.`,{panel:panel(i)})}
        else{parent[rv]=ru;total+=w;used++;ecls[ek(u,v)]='ok';cls[u]=cls[v]='vis';snap(`${u}–${v} (${w}): different components, take it. Total = ${total}.`,{panel:panel(i),cls:{[u]:'cur',[v]:'cur'}})}});
      snap(`Minimum spanning tree weight: ${total}, using ${used} edges. O(E log E) for the sort.`,{panel:panel(sorted.length),k:'ok'})}
    sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;load()}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
