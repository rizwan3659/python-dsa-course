/* Visualizers for topic 22 (range queries): difference array, Fenwick tree paths, segment tree queries. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

C.addViz('diff-array',{topic:'rangeq',title:'Difference array',desc:'Each range addition touches only two cells of the difference array. One running-sum pass at the end applies every update.',ico:'+5 . . -5\n 5 5 5 0',p:'prefix-sum'},(el)=>{
  const src=`diff = [0] * (n + 1)
for l, r, v in updates:
    diff[l] += v
    diff[r + 1] -= v
run = 0
for i in range(n):
    run += diff[i]
    arr[i] = run`;
  const sh=V.shell(el,{controls:`${V.input('n','n','8','3em')}${V.input('u','Updates l-r:v','1-3:5 2-6:2 0-7:1','14em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.diff,{label:'diff',cls:f.dc||{}})+V.arr(f.arr,{label:'arr',cls:f.ac||{},cap:f.n});pn.vars.innerHTML=V.vars(f.vars||{});pn.say(f.msg,f.k)}});
  const load=()=>{const n=Math.max(1,Math.min(12,+sh.$('[data-in=n]').value||8));const ups=sh.$('[data-in=u]').value.split(/\s+/).map(s=>{const m=s.match(/^(\d+)-(\d+):(-?\d+)$/);return m?[+m[1],+m[2],+m[3]]:null}).filter(u=>u&&u[0]<=u[1]&&u[1]<n).slice(0,6);
    const diff=Array(n+1).fill(0),arr=[],F=[];F.push({n,diff:diff.slice(),arr:[],line:1,msg:`n = ${n}. ${ups.length} range update${ups.length===1?'':'s'}. Naively each would touch up to ${n} cells.`});
    ups.forEach(([l,r,v])=>{diff[l]+=v;F.push({n,diff:diff.slice(),arr:[],dc:{[l]:'cmp'},vars:{l,r,v},line:3,msg:`Add ${v} to ${l}..${r}: the change <b>starts</b> at ${l} → diff[${l}] += ${v}.`});
      diff[r+1]-=v;F.push({n,diff:diff.slice(),arr:[],dc:{[r+1]:'cmp'},vars:{l,r,v},line:4,msg:`…and <b>stops</b> after ${r} → diff[${r+1}] −= ${v}. Two cells, O(1).`})});
    let run=0;for(let i=0;i<n;i++){run+=diff[i];arr.push(run);F.push({n,diff:diff.slice(),arr:arr.slice(),dc:{[i]:'hl'},ac:{[i]:'ok'},vars:{i,run},line:7,msg:`run += diff[${i}] (${diff[i]}) → arr[${i}] = ${run}.`})}
    F.push({n,diff:diff.slice(),arr,line:8,msg:`Done: O(1) per update + one O(n) pass. The last diff cell (index ${n}) is never read.`,k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

C.addViz('fenwick',{topic:'rangeq',title:'Fenwick tree paths',desc:'tree[i] stores the sum of the last (i & −i) positions up to i. A query walks down by removing the lowest set bit; an update climbs by adding it.',ico:'13→12→8\n5→6→8→16',p:'range-query'},(el,api)=>{
  let mode=api.get('mode','query');
  const sh=V.shell(el,{controls:`<div class="row">${V.modeButtons([['query','prefix(i)'],['update','add(i, delta)']],mode)}</div><div class="row">${V.input('a','Values','3 2 -1 6 5 4 -3 3 7 2 3 1','14em')}${V.input('i','i (1-based)','11','3em')}${V.input('d','delta','4','3em')}<button class="btn small primary" type="button" data-go>Load</button></div>`,
    draw(f,pn){const n=f.vals.length;let h=V.arr(f.vals,{label:'values',idx:false,cls:i=>f.cover&&i+1>=f.cover[0]&&i+1<=f.cover[1]?'win':''});
      h+=`<div class="tbl dpt"><table><thead><tr><th scope="col">i</th><th scope="col">binary</th><th scope="col">covers</th><th scope="col">tree[i]</th></tr></thead><tbody>${[...Array(n)].map((_,k)=>{const i=k+1,lb=i&-i;
        return `<tr><th scope="row">${i}</th><td>${i.toString(2).padStart(4,'0')}</td><td>${i-lb+1}..${i}</td><td class="${f.cur===i?'cur':f.path.includes(i)?'ans':''}">${f.tree[i]}</td></tr>`}).join('')}</tbody></table></div>`;
      pn.stage.innerHTML=h;pn.vars.innerHTML=V.vars(f.vars||{},['total']);pn.say(f.msg,f.k)},code:`def prefix(i):
    total = 0
    while i > 0:
        total += tree[i]
        i -= i & -i
    return total`});
  const load=()=>{const vals=V.parseList(sh.$('[data-in=a]').value,16).map(Number).filter(x=>!isNaN(x));const n=vals.length;const tree=Array(n+1).fill(0);
    for(let i=1;i<=n;i++){let j=i;while(j<=n){tree[j]+=vals[i-1];j+=j&-j}}
    let i=Math.max(1,Math.min(n,+sh.$('[data-in=i]').value||1));const d=+sh.$('[data-in=d]').value||0;const F=[],path=[];
    if(mode==='query'){const src=`def prefix(i):\n    total = 0\n    while i > 0:\n        total += tree[i]\n        i -= i & -i\n    return total`;let total=0;const start=i;
      F.push({vals,tree:tree.slice(),path:[],src,line:2,vars:{i,total},msg:`prefix(${start}) = sum of positions 1..${start}. Start at i = ${start} (${start.toString(2)} in binary).`});
      while(i>0){total+=tree[i];path.push(i);const lb=i&-i;F.push({vals,tree:tree.slice(),path:path.slice(),cur:i,cover:[i-lb+1,i],src,line:4,vars:{i,'i & -i':lb,total},msg:`tree[${i}] covers ${i-lb+1}..${i} (length ${lb}). total = ${total}.`});i-=lb;F.push({vals,tree:tree.slice(),path:path.slice(),src,line:5,vars:{i,total},msg:`Remove the lowest set bit: i = ${i}${i?` (${i.toString(2)})`:''}.`})}
      F.push({vals,tree:tree.slice(),path,src,line:6,vars:{total},msg:`prefix(${start}) = ${total}, using ${path.length} nodes instead of ${start} values: O(log n).`,k:'ok'})}
    else{const src=`def add(i, delta):\n    while i <= n:\n        tree[i] += delta\n        i += i & -i`;const start=i;vals[start-1]+=d;
      F.push({vals,tree:tree.slice(),path:[],src,line:1,vars:{i,delta:d},msg:`add(${start}, ${d}): every node whose range contains position ${start} must change.`});
      while(i<=n){tree[i]+=d;path.push(i);const lb=i&-i;F.push({vals,tree:tree.slice(),path:path.slice(),cur:i,cover:[i-lb+1,i],src,line:3,vars:{i,'i & -i':lb},msg:`tree[${i}] covers ${i-lb+1}..${i}, which contains ${start}: += ${d}.`});i+=lb;F.push({vals,tree:tree.slice(),path:path.slice(),src,line:4,vars:{i},msg:`Add the lowest set bit: i = ${i}${i>n?` > n, stop`:''}.`})}
      F.push({vals,tree:tree.slice(),path,src,line:4,msg:`${path.length} nodes updated: O(log n).`,k:'ok'})}
    sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const m=e.target.closest('[data-mode]');if(m){mode=m.dataset.mode;api.set('mode',mode);U.$$('[data-mode]',sh.ctl).forEach(x=>x.setAttribute('aria-pressed',String(x===m)));load();return}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

C.addViz('segtree',{topic:'rangeq',title:'Segment tree query',desc:'Each node stores the sum of a range. A query uses nodes fully inside the range (green), splits nodes that partly overlap (orange) and skips nodes outside (grey): O(log n) nodes.',ico:'   [0,7]\n [0,3] [4,7]',p:'range-query'},(el)=>{
  const src=`def query(node, lo, hi, l, r):
    if r < lo or hi < l:          # outside
        return 0
    if l <= lo and hi <= r:       # fully inside
        return tree[node]
    mid = (lo + hi) // 2          # partial: split
    return (query(2 * node, lo, mid, l, r) +
            query(2 * node + 1, mid + 1, hi, l, r))`;
  const sh=V.shell(el,{controls:`${V.input('a','Values','5 8 6 3 2 7 2 6','12em')}${V.input('l','l','2','2.5em')}${V.input('r','r','6','2.5em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.vals,{cls:i=>i>=f.l&&i<=f.r?'win':''})+V.tree(f.root,{cls:f.cls,labels:f.labels,r:21,dx:50,dy:66,aria:'Segment tree'});pn.vars.innerHTML=V.vars(f.vars||{},['total']);pn.say(f.msg,f.k)}});
  const load=()=>{const vals=V.parseList(sh.$('[data-in=a]').value,8).map(Number).filter(x=>!isNaN(x));const n=vals.length;if(!n)return;
    const l=Math.max(0,Math.min(n-1,+sh.$('[data-in=l]').value||0)),r=Math.max(l,Math.min(n-1,+sh.$('[data-in=r]').value||0));const labels={};
    const build=(id,lo,hi)=>{if(lo===hi){labels[id]=`[${lo}]`;return {v:vals[lo],id,l:null,r:null}}const m=(lo+hi)>>1;const L=build(2*id,lo,m),R=build(2*id+1,m+1,hi);labels[id]=`[${lo},${hi}]`;return {v:L.v+R.v,id,l:L,r:R}};
    const root=build(1,0,n-1);const cls={},F=[];let total=0;
    F.push({vals,root,cls:{},labels,l,r,line:1,msg:`Each node holds the sum of its range (label below it). Query the sum of positions ${l}..${r}.`});
    const q=(node,lo,hi)=>{if(r<lo||hi<l){cls[node.id]='dim';F.push({vals,root,cls:Object.assign({},cls),labels,l,r,line:3,vars:{node:`[${lo},${hi}]`,total},msg:`[${lo}, ${hi}] is outside ${l}..${r}: contributes 0, do not go deeper.`});return}
      if(l<=lo&&hi<=r){cls[node.id]='ok';total+=node.v;F.push({vals,root,cls:Object.assign({},cls),labels,l,r,line:5,vars:{node:`[${lo},${hi}]`,total},msg:`[${lo}, ${hi}] is fully inside: take its stored sum ${node.v}. total = ${total}.`,k:'ok'});return}
      cls[node.id]='cmp';F.push({vals,root,cls:Object.assign({},cls),labels,l,r,line:6,vars:{node:`[${lo},${hi}]`,total},msg:`[${lo}, ${hi}] partly overlaps: split into its two halves.`});const m=(lo+hi)>>1;q(node.l,lo,m);q(node.r,m+1,hi)};
    q(root,0,n-1);const used=Object.values(cls).filter(c=>c==='ok').length;
    F.push({vals,root,cls,labels,l,r,line:8,vars:{total},msg:`Sum ${l}..${r} = ${total}, from ${used} stored node${used>1?'s':''}. At most about 2 nodes per level are used: O(log n).`,k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
