/* Visualizers for topics 12–15: tree anatomy, traversals, binary search tree, heap, trie. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;
const clone=n=>n?{v:n.v,id:n.id,l:clone(n.l),r:clone(n.r)}:null;
const nodesOf=root=>{const out=[];const w=n=>{if(!n)return;out.push(n);w(n.l);w(n.r)};w(root);return out};
const parseTree=s=>V.parseList(String(s).replace(/None|null|-/gi,' _ '),15).map(x=>x==='_'?null:x);

/* ---------- anatomy: click any node ---------- */
C.addViz('tree-anatomy',{topic:'trees',title:'Tree anatomy: click any node',desc:'Root, parent, child, leaf, depth, height and subtree, shown on a real tree. Then find all the leaves yourself.',ico:'      8\n    /   \\\n   4     12\n  / \\   /  \\',p:'tree'},(el)=>{
  let root=V.buildTree([8,4,12,2,6,10,14,1]),sel=null,quiz=null;
  el.innerHTML=`<div class="viz-ctl">${V.input('t','Level order','8 4 12 2 6 10 14 1','14em')}<button class="btn small primary" type="button" data-go>Load</button><button class="btn small" type="button" data-quiz>🎯 Click every leaf</button></div><div data-stage></div><div class="msg" data-m aria-live="polite"></div><div data-vars></div>`;
  const $=s=>el.querySelector(s);const all=()=>nodesOf(root);
  const parentOf=id=>all().find(n=>(n.l&&n.l.id===id)||(n.r&&n.r.id===id));
  const depth=id=>{let d=0,p=parentOf(id);while(p){d++;p=parentOf(p.id)}return d};
  const height=n=>n?1+Math.max(height(n.l),height(n.r)):0;
  const byId=id=>all().find(n=>n.id===id);
  const draw=()=>{const cls={};if(quiz){quiz.picked.forEach(id=>cls[id]=quiz.leaves.has(id)?'ok':'bad')}
    else if(sel!=null){const n=byId(sel);nodesOf(n).forEach(x=>cls[x.id]='vis');cls[sel]='cur';const p=parentOf(sel);if(p)cls[p.id]='hl'}
    $('[data-stage]').innerHTML=V.tree(root,{cls,clickable:true,aria:'Tree: click a node'});
    $('[data-vars]').innerHTML=V.vars({nodes:all().length,'tree height (levels)':height(root),leaves:all().filter(n=>!n.l&&!n.r).length})};
  const say=(t,k)=>{const m=$('[data-m]');m.className='msg'+(k?' '+k:'');m.innerHTML=t};
  const info=id=>{const n=byId(id),p=parentOf(id),kids=[n.l,n.r].filter(Boolean);const role=!p?'the <b>root</b> (no parent)':kids.length?'an <b>internal node</b>':'a <b>leaf</b> (no children)';
    say(`<b>${esc(n.v)}</b> is ${role}. Parent: ${p?esc(p.v):'none'} · Children: ${kids.map(k=>esc(k.v)).join(', ')||'none'} · <b>Depth</b> ${depth(id)} (edges from the root) · <b>Height</b> of its subtree: ${height(n)} level${height(n)>1?'s':''} · Subtree size: ${nodesOf(n).length} (shaded).`)};
  const pick=id=>{if(quiz){if(quiz.picked.has(id))return;quiz.picked.add(id);const ok=quiz.leaves.has(id);const found=[...quiz.picked].filter(x=>quiz.leaves.has(x)).length,wrong=[...quiz.picked].length-found;
      draw();if(found===quiz.leaves.size){say(`All ${found} leaves found${wrong?` (with ${wrong} wrong click${wrong>1?'s':''}: those nodes have children)`:' with no mistakes'}. Leaves are the nodes with no children.`,'ok');quiz=null}
      else say(ok?`Yes, ${esc(byId(id).v)} is a leaf. ${quiz.leaves.size-found} to go.`:`${esc(byId(id).v)} has a child, so it is not a leaf. Keep looking.`,ok?'ok':'bad');return}
    sel=id;draw();info(id)};
  $('[data-stage]').addEventListener('click',e=>{const g=e.target.closest('[data-id]');if(g)pick(+g.dataset.id)});
  $('[data-stage]').addEventListener('keydown',e=>{const g=e.target.closest('[data-id]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(+g.dataset.id)}});
  $('[data-go]').addEventListener('click',()=>{const r=V.buildTree(parseTree($('[data-in=t]').value));if(r)root=r;sel=null;quiz=null;draw();say('Click any node to see its role, depth and height.')});
  $('[data-quiz]').addEventListener('click',()=>{sel=null;quiz={leaves:new Set(all().filter(n=>!n.l&&!n.r).map(n=>n.id)),picked:new Set()};draw();say(`Challenge: click every <b>leaf</b> (${quiz.leaves.size} of them).`)});
  draw();say('Click any node to see its role, depth and height.')});

/* ---------- traversals ---------- */
const TR={
 pre:{label:'Preorder',src:`def preorder(node):
    if node is None:
        return
    visit(node)              # root
    preorder(node.left)      # left
    preorder(node.right)     # right`},
 in:{label:'Inorder',src:`def inorder(node):
    if node is None:
        return
    inorder(node.left)       # left
    visit(node)              # root
    inorder(node.right)      # right`},
 post:{label:'Postorder',src:`def postorder(node):
    if node is None:
        return
    postorder(node.left)     # left
    postorder(node.right)    # right
    visit(node)              # root`},
 level:{label:'Level order (BFS)',src:`from collections import deque

def level_order(root):
    queue = deque([root])
    while queue:
        node = queue.popleft()
        visit(node)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)`}};
C.addViz('tree-traversal',{topic:'trees',title:'Tree traversals',desc:'Preorder, inorder, postorder (DFS) and level order (BFS). The current node is highlighted and the visit order grows below.',ico:'Visited:\n[8, 4, 2, 6, 12, …]',p:'tree'},(el,api)=>{
  let mode=api.arg.mode||'pre';
  const sh=V.shell(el,{controls:V.modeButtons(Object.entries(TR).map(([k,t])=>[k,t.label]),mode)+`<span style="width:6px"></span>${V.input('t','Level order','8 4 12 2 6 10 14','13em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:TR.pre.src,
    draw(f,pn){pn.stage.innerHTML=V.tree(f.root,{cls:f.cls,aria:'Tree being traversed'})+`<div class="row" style="margin-top:8px"><span class="eyebrow">${f.qname}</span>${f.q.length?f.q.map(v=>`<span class="var">${esc(v)}</span>`).join(''):'<span class="mono tiny muted">empty</span>'}</div>`;
      pn.say(f.msg,f.k);pn.vars.innerHTML=`<div class="row"><span class="eyebrow">Visited</span><span class="mono">[${f.out.join(', ')}]</span></div>`}});
  const load=()=>{U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));const root=V.buildTree(parseTree(sh.$('[data-in=t]').value))||V.buildTree([8,4,12,2,6,10,14]);
    const F=[],out=[],vis={},q=[];const src=TR[mode].src;const f=(line,msg,cur,k)=>{const cls=Object.assign({},vis);if(cur)cls[cur.id]=cls[cur.id]==='vis'?'cur':'hl';F.push({root,line,msg,cls,out:out.slice(),q:q.slice(),qname:mode==='level'?'Queue (front at left)':'Call stack (bottom → top)',src,k})};
    const visit=(n,line)=>{out.push(n.v);vis[n.id]='vis';f(line,`<b>Visit ${esc(n.v)}</b>.`,n)};
    if(mode==='level'){q.push(root.v);const Q=[root];f(4,`Start with the root in the queue.`);while(Q.length){const n=Q.shift();q.shift();f(6,`Dequeue ${esc(n.v)} from the front.`,n);visit(n,7);
        [n.l,n.r].forEach(c=>{if(c){Q.push(c);q.push(c.v)}});if(n.l||n.r)f(9,`Enqueue its children (${[n.l,n.r].filter(Boolean).map(c=>c.v).join(', ')}) at the back. They wait until this whole level is done.`,n)}}
    else{const go=n=>{if(!n)return;q.push(n.v);f(1,`Call on ${esc(n.v)}.`,n);
        if(mode==='pre')visit(n,4);if(n.l)f(mode==='pre'?5:4,`Go left to ${esc(n.l.v)}.`,n);go(n.l);
        if(mode==='in')visit(n,5);if(n.r)f(mode==='post'?5:6,`Go right to ${esc(n.r.v)}.`,n);go(n.r);
        if(mode==='post')visit(n,6);q.pop();f(mode==='post'?6:mode==='in'?6:6,`Done with ${esc(n.v)}: return to the caller.`,null)};go(root)}
    f(0,`Traversal complete: [${out.join(', ')}].${mode==='in'?' For a BST, inorder gives the values in sorted order.':''}`,null,'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;load()}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- binary search tree ---------- */
C.addViz('bst',{topic:'bst',title:'Binary search tree: insert, search, delete',desc:'Smaller values go left, larger go right. Each operation walks one path from the root; deleting a node with two children borrows its in-order successor.',ico:'      8\n    /   \\\n   4     12\n  < 8     > 8',p:'bst'},(el)=>{
  let root=null,next=0;
  const sh=V.shell(el,{controls:`${V.input('v','Value',7,'4em')}<button class="btn small primary" type="button" data-op="ins">Insert</button><button class="btn small" type="button" data-op="find">Search</button><button class="btn small" type="button" data-op="del">Delete</button><button class="btn small" type="button" data-op="rand">Random tree</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,
    draw(f,pn){pn.stage.innerHTML=V.tree(f.root,{cls:f.cls,empty:'Empty tree: insert a value.',aria:'Binary search tree'});pn.say(f.msg,f.k);pn.vars.innerHTML=`<div class="row"><span class="eyebrow">Inorder</span><span class="mono">[${f.inorder.join(', ')}]</span></div>`+(f.py?`<p class="codeline" style="margin-top:6px">${U.hl(f.py)}</p>`:'')}});
  const inord=n=>n?[...inord(n.l),n.v,...inord(n.r)]:[];
  const ins=v=>{const nd={v,id:next++,l:null,r:null};if(!root){root=nd;return}let c=root;while(true){if(v<c.v){if(!c.l){c.l=nd;return}c=c.l}else if(v>c.v){if(!c.r){c.r=nd;return}c=c.r}else return}};
  const run=op=>{const raw=sh.$('[data-in=v]').value.trim(),v=parseInt(raw,10);const F=[];const f=(msg,cls,k,py)=>F.push({root:clone(root),cls:cls||{},msg,k,inorder:inord(root),py});
    if(op==='reset'){root=null;next=0;[8,4,12,2,6,10,14].forEach(ins);f('A BST: every left subtree is smaller than its node, every right subtree larger.');sh.pl.load(F);return}
    if(op==='rand'){root=null;next=0;const s=new Set();while(s.size<8)s.add(1+Math.floor(Math.random()*40));[...s].forEach(ins);f('Random insert order gives a different shape for similar values. Try inserting 1, 2, 3, 4, 5 in order on an empty tree: it becomes a line (height n).');sh.pl.load(F);return}
    if(isNaN(v)){f('Type a number first.',{},'warn');sh.pl.load(F);return}
    if(op==='ins'||op==='find'){if(!root){if(op==='ins'){ins(v);f(`The tree was empty: ${v} becomes the root.`,{[next-1]:'ok'},'ok',`root = insert(root, ${v})`)}else f('Empty tree: nothing to find.',{},'bad');sh.pl.load(F,{play:true});return}
      let c=root,steps=0;while(c){steps++;if(v===c.v){f(op==='ins'?`${v} is already in the tree (duplicates ignored).`:`Found ${v} after ${steps} comparison${steps>1?'s':''}: one path, O(h).`,{[c.id]:'ok'},op==='ins'?'warn':'ok');sh.pl.load(F,{play:true});return}
        const dir=v<c.v?'left':'right',child=v<c.v?c.l:c.r;f(`${v} ${v<c.v?'<':'>'} ${c.v}: go ${dir}.`,{[c.id]:'cmp'});
        if(!child){if(op==='ins'){ins(v);f(`Empty spot on the ${dir} of ${c.v}: insert ${v} here as a new leaf.`,{[next-1]:'ok'},'ok',`root = insert(root, ${v})`)}else f(`No ${dir} child of ${c.v}: ${v} is not in the tree.`,{[c.id]:'bad'},'bad');break}c=child}
      sh.pl.load(F,{play:true});return}
    if(op==='del'){let p=null,c=root;while(c&&c.v!==v){f(`${v} ${v<c.v?'<':'>'} ${c.v}: go ${v<c.v?'left':'right'}.`,{[c.id]:'cmp'});p=c;c=v<c.v?c.l:c.r}
      if(!c){f(`${v} is not in the tree.`,{},'bad');sh.pl.load(F,{play:true});return}
      const setChild=(par,old,nw)=>{if(!par)root=nw;else if(par.l===old)par.l=nw;else par.r=nw};
      if(c.l&&c.r){f(`${v} has two children. Replace it with its in-order successor: the smallest value in its right subtree.`,{[c.id]:'bad'});
        let sp=c,s=c.r;while(s.l){f(`Successor search: go left from ${s.v}.`,{[c.id]:'bad',[s.id]:'cmp'});sp=s;s=s.l}
        f(`The successor is ${s.v}. Copy it into the node holding ${v}…`,{[c.id]:'bad',[s.id]:'ok'});c.v=s.v;
        f(`…then remove ${s.v} from its old spot (it has at most a right child).`,{[c.id]:'ok',[s.id]:'bad'});setChild(sp===c?c:sp,s,s.r);if(sp===c)c.r=s.r;
        f(`Deleted ${v}. The inorder sequence is still sorted.`,{[c.id]:'ok'},'ok',`root = delete(root, ${v})`)}
      else{const child=c.l||c.r;f(child?`${v} has one child (${child.v}): link its parent straight to that child.`:`${v} is a leaf: just remove it.`,{[c.id]:'bad'});setChild(p,c,child);f(`Deleted ${v}.`,{},'ok',`root = delete(root, ${v})`)}
      sh.pl.load(F,{play:true})}};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))run('ins')});run('reset')});

/* ---------- heap ---------- */
C.addViz('heap',{topic:'heap',title:'Heap: push, pop, bubble up and down',desc:'A complete binary tree stored in a list. Push bubbles up, pop bubbles down. Toggle min-heap or max-heap.',ico:'        2\n       / \\\n      5   4\n     / \\\n    9   7',p:'heap-topk'},(el)=>{
  let a=[2,5,4,9,7,8],kind='min';
  const better=(x,y)=>kind==='min'?x<y:x>y;
  const toTree=arr=>{const mk=i=>i<arr.length?{v:arr[i],id:i,l:mk(2*i+1),r:mk(2*i+2)}:null;return mk(0)};
  const sh=V.shell(el,{controls:`<button class="btn small" type="button" data-kind="min">Min-heap</button><button class="btn small" type="button" data-kind="max">Max-heap</button><span style="width:6px"></span>${V.input('v','Value',3,'4em')}<button class="btn small primary" type="button" data-op="push">Push</button><button class="btn small" type="button" data-op="pop">Pop ${''}</button><button class="btn small" type="button" data-op="heapify">Heapify random list</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,
    draw(f,pn){pn.stage.innerHTML=V.tree(toTree(f.a),{cls:f.cls,labels:Object.fromEntries(f.a.map((_,i)=>[i,'['+i+']'])),empty:'Empty heap',aria:'Heap as a tree'})+`<div style="margin-top:6px">${V.arr(f.a,{cls:f.cls,label:'list'})}</div>`;pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars({size:f.a.length,[kind==='min'?'min (a[0])':'max (a[0])']:f.a.length?f.a[0]:'–'})+(f.py?`<p class="codeline" style="margin-top:6px">${U.hl(f.py)}</p>`:'')}});
  const run=op=>{const F=[];const f=(msg,cls,k,py)=>F.push({a:a.slice(),cls:cls||{},msg,k,py});const w=kind==='min'?'smaller':'larger';
    U.$$('[data-kind]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.kind===kind)));
    const up=i=>{while(i>0){const p=(i-1)>>1;f(`Compare ${a[i]} (index ${i}) with its parent ${a[p]} (index ${p} = (${i} − 1) // 2).`,{[i]:'cmp',[p]:'cmp'});
        if(better(a[i],a[p])){[a[i],a[p]]=[a[p],a[i]];f(`${a[p]} is ${w}: swap. Bubble up.`,{[p]:'hl'});i=p}else{f(`${a[i]} is not ${w} than ${a[p]}: the heap property holds. Stop.`,{[i]:'ok'});return}}f('Reached the root.',{0:'ok'})};
    const down=(i,n)=>{n=n==null?a.length:n;while(true){const l=2*i+1,r=2*i+2;let b=i;if(l<n&&better(a[l],a[b]))b=l;if(r<n&&better(a[r],a[b]))b=r;
        const kids=[l,r].filter(x=>x<n);if(!kids.length){f(`${a[i]} has no children: stop.`,{[i]:'ok'});return}
        f(`Children of ${a[i]}: ${kids.map(x=>a[x]).join(' and ')} (indexes ${kids.join(', ')}). The ${w} of the three is ${a[b]}.`,Object.assign({[i]:'cmp'},...kids.map(x=>({[x]:'cmp'}))));
        if(b===i){f(`${a[i]} is already ${kind==='min'?'≤':'≥'} its children. Stop.`,{[i]:'ok'});return}[a[i],a[b]]=[a[b],a[i]];f(`Swap with ${a[i]}: bubble down.`,{[b]:'hl'});i=b}};
    if(op==='kind'){f(`Now a ${kind}-heap: every parent is ${kind==='min'?'≤':'≥'} its children. Heapify to rebuild.`);const s=a.slice();a=[];s.forEach(x=>{a.push(x)});for(let i=(a.length>>1)-1;i>=0;i--)down(i);f(`Rebuilt as a ${kind}-heap.`,{},'ok');sh.pl.load(F,{at:'end'});return}
    if(op==='reset'){a=kind==='min'?[2,5,4,9,7,8]:[9,7,8,2,5,4];f(`A ${kind}-heap. Index i has children 2i + 1 and 2i + 2, and parent (i − 1) // 2. The root a[0] is always the ${kind==='min'?'minimum':'maximum'}.`);sh.pl.load(F);return}
    if(op==='push'){const v=parseInt(sh.$('[data-in=v]').value,10);if(isNaN(v)){f('Type a number.',{},'warn');sh.pl.load(F);return}if(a.length>=15){f('This demo holds 15 values.',{},'warn');sh.pl.load(F);return}
      a.push(v);f(`Append ${v} at the end (index ${a.length-1}), keeping the tree complete.`,{[a.length-1]:'cmp'},null,`heapq.heappush(heap, ${v})`);up(a.length-1);f(`Push done in O(log n): at most one swap per level.`,{},'ok')}
    if(op==='pop'){if(!a.length){f('Empty heap: IndexError.',{},'bad');sh.pl.load(F);return}const top=a[0];f(`Pop removes the root, ${top}: the ${kind==='min'?'smallest':'largest'} value.`,{0:'bad'},null,'heapq.heappop(heap)');
      const last=a.pop();if(a.length){a[0]=last;f(`Move the last element (${last}) to the root to keep the tree complete.`,{0:'cmp'});down(0)}f(`Popped ${top}. O(log n).`,{},'ok')}
    if(op==='heapify'){a=Array.from({length:9},()=>1+Math.floor(Math.random()*40));f('A random list. Heapify sifts down every parent, starting from the last one: O(n) in total.');for(let i=(a.length>>1)-1;i>=0;i--){f(`Sift down from index ${i}.`,{[i]:'hl'});down(i)}f(`It is a ${kind}-heap now.`,{},'ok','heapq.heapify(nums)')}
    sh.pl.load(F,{play:op!=='heapify'})};
  sh.ctl.addEventListener('click',e=>{const k=e.target.closest('[data-kind]');if(k){kind=k.dataset.kind;run('kind');return}const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))run('push')});run('reset')});

/* ---------- trie ---------- */
C.addViz('trie',{topic:'trie',title:'Trie: insert, search, prefix search',desc:'Words share their prefixes as paths from the root. A thick ring marks a node where a word ends.',ico:'   •\n   c\n   a\n  t r\n    e',p:'trie'},(el)=>{
  let root,next;
  const reset=words=>{root={v:'•',id:0,kids:[],end:false};next=1;words.forEach(w=>add(w))};
  const add=w=>{let n=root;for(const ch of w){let c=n.kids.find(k=>k.ch===ch);if(!c){c={v:ch,ch,id:next++,kids:[],end:false};n.kids.push(c);n.kids.sort((x,y)=>x.ch<y.ch?-1:1)}n=c}n.end=true};
  const cl=n=>({v:n.v,ch:n.ch,id:n.id,end:n.end,kids:n.kids.map(cl)});
  const words=(n,p)=>[...(n.end?[p]:[]),...n.kids.flatMap(k=>words(k,p+k.ch))];
  const sh=V.shell(el,{controls:`${V.input('w','Word','cart','7em')}<button class="btn small primary" type="button" data-op="ins">Insert word</button><button class="btn small" type="button" data-op="search">Search</button><button class="btn small" type="button" data-op="prefix">Prefix search</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,
    draw(f,pn){pn.stage.innerHTML=V.tree(f.root,{cls:f.cls,r:16,dx:40,dy:52,aria:'Trie'});pn.say(f.msg,f.k);pn.vars.innerHTML=`<div class="row"><span class="eyebrow">Words</span><span class="mono small">${f.words.join(', ')}</span></div>`}});
  const run=op=>{const w=sh.$('[data-in=w]').value.trim().toLowerCase().replace(/[^a-z]/g,'').slice(0,10);const F=[];const f=(msg,cls,k)=>F.push({root:cl(root),cls:cls||{},msg,k,words:words(root,'')});
    if(op==='reset'){reset(['cat','car','care','dog']);f('The words cat, car, care and dog. “ca” is stored once and shared.');sh.pl.load(F);return}
    if(!w){f('Type a lowercase word.',{},'warn');sh.pl.load(F);return}
    let n=root;const path={0:'hl'};f(`Start at the root and follow “${w}” one letter at a time.`,{0:'cmp'});
    for(let i=0;i<w.length;i++){const ch=w[i];let c=n.kids.find(k=>k.ch===ch);
      if(!c){if(op==='ins'){if(next>40){f('This demo trie is full.',{},'warn');break}c={v:ch,ch,id:next++,kids:[],end:false};n.kids.push(c);n.kids.sort((x,y)=>x.ch<y.ch?-1:1);path[c.id]='ok';f(`No child “${ch}”: create it.`,Object.assign({},path))}
        else{f(`No child “${ch}” under “${w.slice(0,i)||'root'}”: ${op==='search'?`“${w}” is not in the trie.`:`no word starts with “${w}”.`}`,Object.assign({},path,{[n.id]:'bad'}),'bad');sh.pl.load(F,{play:true});return}}
      else{path[c.id]='hl';f(`Follow “${ch}”.`,Object.assign({},path,{[c.id]:'cmp'}))}n=c}
    if(op==='ins'){n.end=true;f(`Mark the last node as the end of a word. Inserted “${w}” in O(${w.length}).`,Object.assign({},path,{[n.id]:'ok'}),'ok')}
    if(op==='search')f(n.end?`The path exists AND the last node is marked as a word end: “${w}” is in the trie.`:`The path exists, but “${w}” is only a prefix (no end marker here). search returns False.`,Object.assign({},path,{[n.id]:n.end?'ok':'bad'}),n.end?'ok':'bad');
    if(op==='prefix'){const found=words(n,w);const sub={};const walk=x=>{sub[x.id]='vis';x.kids.forEach(walk)};walk(n);f(`Every word below this node starts with “${w}”: ${found.join(', ')}. (Autocomplete works exactly like this.)`,Object.assign(sub,path,{[n.id]:'ok'}),'ok')}
    sh.pl.load(F,{play:true})};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))run('search')});run('reset')});
})(COURSE);
