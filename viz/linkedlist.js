/* Visualizers for topic 8: a singly linked list with animated pointer changes, and fast/slow pointers. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

/* nodes: [{v, next}] where next is an index into nodes or null; order: display order (indexes) ; labels: {name: index} */
V.ll=(nodes,o)=>{o=o||{};const order=o.order||nodes.map((_,i)=>i);const tags={};Object.entries(o.labels||{}).forEach(([k,i])=>{if(i!=null)(tags[i]=tags[i]||[]).push(k)});
  const pos={};order.forEach((id,p)=>pos[id]=p);let h='<div class="ll">';
  if(o.noneLeft)h+=`<span class="lnone">None</span><span class="larrow rev">←</span>`;
  order.forEach((id,p)=>{const n=nodes[id];const c=(o.cls&&o.cls[id])||'';
    h+=`<div class="lnode ${c}"><span class="tagt">${(tags[id]||[]).join('<br>')}</span><span class="lv">${esc(n.v)}</span><span class="lp">${n.next==null?'∅':'•'}</span></div>`;
    const nx=order[p+1];if(nx==null){if(n.next==null)h+=`<span class="larrow">→</span><span class="lnone">None</span>`;else if(pos[n.next]!=null&&pos[n.next]<p)h+=`<span class="larrow rev" title="points back">↩ ${esc(nodes[n.next].v)}</span>`;return}
    const fwd=n.next===nx,back=nodes[nx].next===id;h+=`<span class="larrow ${back?'rev':!fwd?'cut':''}">${fwd?'→':back?'←':'·'}</span>`});
  if(!order.length)h+='<span class="lnone">head → None</span>';
  return h+'</div>'};

C.addViz('linked-list',{topic:'linkedlist',title:'Linked list: insert, delete, search, reverse',desc:'Every node stores a value and a pointer to the next node. Watch the pointers change one at a time.',ico:'HEAD\n ↓\n[10|•]→[20|•]→[30|•]→None',p:'linked-list'},(el)=>{
  let vals=[10,20,30,40];
  const src={
   head:`node = Node(x)
node.next = head
head = node`,
   tail:`node = Node(x)
cur = head
while cur.next:
    cur = cur.next
cur.next = node`,
   del:`dummy = Node(0, head)
prev, cur = dummy, head
while cur:
    if cur.val == x:
        prev.next = cur.next
        break
    prev, cur = cur, cur.next
head = dummy.next`,
   search:`cur = head
while cur:
    if cur.val == x:
        return True
    cur = cur.next
return False`,
   rev:`prev, cur = None, head
while cur:
    nxt = cur.next
    cur.next = prev
    prev = cur
    cur = nxt
head = prev`};
  const sh=V.shell(el,{controls:`${V.input('v','Value',25,'4em')}<button class="btn small primary" type="button" data-op="head">Insert head</button><button class="btn small" type="button" data-op="tail">Insert tail</button><button class="btn small" type="button" data-op="del">Delete value</button><button class="btn small" type="button" data-op="search">Search</button><button class="btn small" type="button" data-op="rev">Reverse</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,code:src.rev,
    draw(f,pn){pn.stage.innerHTML=V.ll(f.nodes,{order:f.order,labels:f.labels,cls:f.cls,noneLeft:f.noneLeft});pn.say(f.msg,f.k);pn.vars.innerHTML=f.vars?V.vars(f.vars):''}});
  const mk=()=>vals.map((v,i)=>({v,next:i<vals.length-1?i+1:null}));
  const run=op=>{const raw=sh.$('[data-in=v]').value.trim();const x=/^-?\d+$/.test(raw)?+raw:(raw||'?').slice(0,5);const F=[];let nodes=mk();const N=()=>nodes.map(n=>({v:n.v,next:n.next}));
    const f=(line,msg,o)=>F.push(Object.assign({nodes:N(),line,msg,src:src[op]||src.rev,order:o&&o.order||nodes.map((_,i)=>i),labels:{head:0}},o||{}));
    if(op==='reset'){vals=[10,20,30,40];nodes=mk();F.push({nodes:N(),order:nodes.map((_,i)=>i),labels:{head:0},msg:'head points at the first node; the last node points at None.',src:src.rev});sh.pl.load(F);return}
    if(op==='head'){if(vals.length>=8){f(1,'This demo holds 8 nodes.',{k:'warn'});sh.pl.load(F);return}
      nodes.push({v:x,next:null});const id=nodes.length-1;const ord=[id,...vals.map((_,i)=>i)];
      f(1,`Create a node holding ${esc(x)}. It points nowhere yet.`,{order:ord,labels:{head:0,node:id},cls:{[id]:'hl in'}});
      nodes[id].next=0;f(2,`node.next = head: the new node points at the old first node (${esc(vals[0]??'None')}).`,{order:ord,labels:{head:0,node:id},cls:{[id]:'hl'}});
      f(3,'head = node. Done in O(1): no other node was touched.',{order:ord,labels:{head:id},cls:{[id]:'ok'},k:'ok'});vals=[x,...vals]}
    if(op==='tail'){if(vals.length>=8){f(1,'This demo holds 8 nodes.',{k:'warn'});sh.pl.load(F);return}
      nodes.push({v:x,next:null});const id=nodes.length-1;const ord=[...vals.map((_,i)=>i),id];
      f(1,`Create a node holding ${esc(x)}.`,{order:ord,cls:{[id]:'hl in'},labels:{head:0,node:id}});
      for(let c=0;c<vals.length;c++){f(c?4:2,c<vals.length-1?`cur is at ${vals[c]}; cur.next exists, keep walking.`:`cur is at ${vals[c]}: cur.next is None, this is the last node.`,{order:ord,labels:{head:0,cur:c,node:id},cls:{[c]:'cmp',[id]:'hl'}})}
      nodes[vals.length-1].next=id;f(5,`cur.next = node. Without a tail pointer this walk makes insert-at-tail <b>O(n)</b>.`,{order:ord,labels:{head:0,node:id},cls:{[id]:'ok'},k:'ok'});vals=[...vals,x]}
    if(op==='search'){let found=false;for(let c=0;c<vals.length;c++){if(vals[c]===x){f(3,`cur.val == ${esc(x)}: found after visiting ${c+1} node${c?'s':''}.`,{labels:{head:0,cur:c},cls:{[c]:'ok'},k:'ok'});found=true;break}f(3,`cur.val = ${vals[c]} ≠ ${esc(x)}: move to cur.next.`,{labels:{head:0,cur:c},cls:{[c]:'cmp'}})}
      if(!found)f(6,`cur became None: ${esc(x)} is not in the list. Search is O(n): no indexing in a linked list.`,{labels:{head:0},k:'bad'})}
    if(op==='del'){const i=vals.indexOf(x);f(2,'A dummy node before the head means deleting the first node needs no special case.',{labels:{head:0,prev:null,cur:0}});
      for(let c=0;c<vals.length&&c<=Math.max(i,vals.length-1);c++){if(c===i)break;f(4,`cur.val = ${vals[c]} ≠ ${esc(x)}: advance prev and cur.`,{labels:{head:0,prev:c-1<0?null:c-1,cur:c},cls:{[c]:'cmp'}})}
      if(i<0){f(9,`${esc(x)} not found; nothing changes.`,{k:'bad'});sh.pl.load(F);return}
      f(5,`Found ${esc(x)}. To delete it, the previous node must skip over it.`,{labels:{head:0,prev:i-1<0?null:i-1,cur:i},cls:{[i]:'bad'}});
      if(i>0)nodes[i-1].next=nodes[i].next;const ord=nodes.map((_,j)=>j).filter(j=>j!==i);
      f(5,`prev.next = cur.next: the node holding ${esc(x)} is no longer reachable, and Python frees it. The unlink itself is O(1); finding it was O(n).`,{order:ord,labels:{head:i===0?(nodes[i].next):0},k:'ok'});vals=vals.filter((_,j)=>j!==i)}
    if(op==='rev'){let prev=null,cur=0;const lab=()=>({head:null,prev,cur,nxt:null});f(1,'prev = None, cur = head.',{labels:Object.assign(lab(),{head:0})});
      while(cur!=null){const nxt=nodes[cur].next;f(3,`Save nxt = cur.next (${nxt==null?'None':nodes[nxt].v}) before we break the link.`,{labels:{prev,cur,nxt},cls:{[cur]:'cmp'}});
        nodes[cur].next=prev;f(4,`cur.next = prev: node ${nodes[cur].v} now points ${prev==null?'at None':'back at '+nodes[prev].v}.`,{labels:{prev,cur,nxt},cls:{[cur]:'bad'},noneLeft:cur===0});
        prev=cur;cur=nxt;f(6,'Move prev and cur one step forward.',{labels:{prev,cur,nxt:null},cls:{[prev]:'ok'},noneLeft:true})}
      f(7,'cur is None, so prev is the new head. Reversed in one pass: O(n) time, O(1) extra space.',{labels:{head:prev},noneLeft:true,k:'ok'});vals=vals.slice().reverse()}
    sh.pl.load(F,{play:op!=='rev'})};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});run('reset')});

/* ---------- fast and slow pointers ---------- */
C.addViz('fast-slow',{topic:'linkedlist',title:'Fast and slow pointers',desc:'slow moves 1 step, fast moves 2. Find the middle node, or detect a cycle when they meet.',ico:'slow →\nfast →→\n[1]→[2]→[3]→[4]→[5]',p:'fast-slow'},(el)=>{
  let mode='middle';
  const SRC={middle:`slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
return slow            # the middle node`,cycle:`slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast:
        return True     # they met: cycle
return False`};
  const sh=V.shell(el,{controls:V.modeButtons([['middle','Find the middle'],['cycle','Detect a cycle']],mode)+`<span style="width:6px"></span>${V.input('n','Nodes',7,'3em')}<label class="inline small" data-cyc>Cycle back to index ${'<input type="text" data-in="c" value="2" style="width:3em">'}</label><button class="btn small primary" type="button" data-go>Load</button>`,code:SRC.middle,
    draw(f,pn){pn.stage.innerHTML=V.ll(f.nodes,{labels:f.labels,cls:f.cls});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));sh.$('[data-cyc]').hidden=mode!=='cycle';
    const n=U.clamp(parseInt(sh.$('[data-in=n]').value,10)||7,1,10);const c=mode==='cycle'?U.clamp(parseInt(sh.$('[data-in=c]').value,10),-1,n-1):-1;
    const nodes=Array.from({length:n},(_,i)=>({v:i+1,next:i<n-1?i+1:(c>=0?c:null)}));const F=[];let s=0,fa=0,steps=0;const src=SRC[mode];
    const f=(line,msg,k)=>F.push({nodes,line,msg,src,labels:s===fa?{'slow fast':s}:{slow:s,fast:fa},cls:{[s]:'hl',[fa]:'cmp'},vars:{steps,slow:s==null?'None':nodes[s].v,fast:fa==null?'None':nodes[fa].v},k});
    f(1,mode==='cycle'?(c>=0?`The last node points back to node ${c+1}: there is a cycle. Can the pointers prove it without marking nodes?`:'No cycle (try setting the cycle index ≥ 0).'):'Both pointers start at head.');
    while(fa!=null&&nodes[fa].next!=null){s=nodes[s].next;fa=nodes[nodes[fa].next].next;steps++;
      if(mode==='middle'){f(4,fa==null?'fast fell off the end.':`slow moved 1, fast moved 2.`)}
      else{if(s===fa){f(5,`slow and fast meet at node ${nodes[s].v} after ${steps} steps. Inside a cycle, fast gains one node per step, so it must catch slow: <b>cycle detected</b>.`,'ok');sh.pl.load(F);return}f(4,'slow +1, fast +2.')}
      if(steps>40)break}
    if(mode==='middle')f(5,`fast cannot move two more steps, so slow is at the middle: node ${nodes[s].v}. (For an even length, this is the second middle.) One pass, O(1) space.`,'ok');
    else f(7,'fast reached the end (None): no cycle.','ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;load()}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
