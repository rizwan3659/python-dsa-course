/* Visualizers for topic 9: call stack + return path, recursion tree with memoization (from the original session 3), backtracking tree. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

/* ---------- call stack: watch calls go down and values come back up ---------- */
const FN={
 factorial:{label:'factorial(n)',arg:4,max:7,src:`def factorial(n):
    if n <= 1:
        return 1                      # base case
    return n * factorial(n - 1)       # recursive case`,
  run(n,R){const go=(n,d)=>{const id=R.call(`factorial(${n})`,d,`n = ${n}`);R.emit(2,`factorial(${n}) is called. Is n ≤ 1?`,id);
    if(n<=1){R.ret(id,1,'1');R.emit(3,`Base case: n = ${n}, so return 1. No more calls: now the return path begins.`,id,'ok');R.pop();return 1}
    R.wait(id,`${n} × factorial(${n-1})`);R.emit(4,`Not the base case. factorial(${n}) needs factorial(${n-1}) first, so it <b>waits</b> on the call stack.`,id);
    const r=go(n-1,d+1);const v=n*r;R.ret(id,v,`${n} × ${r} = ${v}`);R.emit(4,`factorial(${n-1}) returned ${r}. Resume: ${n} × ${r} = ${v}. Return ${v} to the caller.`,id,'ok');R.pop();return v};return go(n,0)}},
 sum:{label:'total(nums)',arg:'1 2 3 4',src:`def total(nums):
    if not nums:
        return 0                      # base case: empty list
    return nums[0] + total(nums[1:])`,
  run(a,R){const show=x=>'['+x.join(', ')+']';const go=(a,d)=>{const id=R.call(`total(${show(a)})`,d,`nums = ${show(a)}`);R.emit(2,`total(${show(a)}) is called. Is the list empty?`,id);
    if(!a.length){R.ret(id,0,'0');R.emit(3,'Base case: empty list, return 0.',id,'ok');R.pop();return 0}
    R.wait(id,`${a[0]} + total(${show(a.slice(1))})`);R.emit(4,`Take the first element (${a[0]}) and recurse on the rest.`,id);
    const r=go(a.slice(1),d+1);const v=a[0]+r;R.ret(id,v,`${a[0]} + ${r} = ${v}`);R.emit(4,`The rest summed to ${r}; return ${a[0]} + ${r} = ${v}.`,id,'ok');R.pop();return v};return go(a,0)}},
 power:{label:'power(2, n)',arg:10,max:40,src:`def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`,
  run(n,R){const go=(n,d)=>{const id=R.call(`power(2, ${n})`,d,`n = ${n}`);R.emit(2,`power(2, ${n}) is called.`,id);
    if(n===0){R.ret(id,1,'1');R.emit(3,'Base case: anything to the power 0 is 1.',id,'ok');R.pop();return 1}
    R.wait(id,`power(2, ${Math.floor(n/2)})²${n%2?' × 2':''}`);R.emit(4,`Halve the problem: compute power(2, ${Math.floor(n/2)}) once and square it.`,id);
    const h=go(Math.floor(n/2),d+1);const v=n%2?h*h*2:h*h;R.ret(id,v,`${h} × ${h}${n%2?' × 2':''} = ${v}`);R.emit(n%2?7:6,`half = ${h}. ${n} is ${n%2?'odd':'even'}, so return ${h} × ${h}${n%2?' × 2':''} = ${v}.`,id,'ok');R.pop();return v};return go(n,0)}},
 fib:{label:'fib(n)',arg:4,max:5,src:`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,
  run(n,R){const go=(n,d)=>{const id=R.call(`fib(${n})`,d,`n = ${n}`);R.emit(2,`fib(${n}) is called.`,id);
    if(n<2){R.ret(id,n,String(n));R.emit(3,`Base case: fib(${n}) = ${n}.`,id,'ok');R.pop();return n}
    R.wait(id,`fib(${n-1}) + fib(${n-2})`);R.emit(4,`fib(${n}) needs fib(${n-1}) first…`,id);const a=go(n-1,d+1);
    R.wait(id,`${a} + fib(${n-2})`);R.emit(4,`fib(${n-1}) = ${a}. Now fib(${n}) calls fib(${n-2}).`,id);const b=go(n-2,d+1);
    R.ret(id,a+b,`${a} + ${b} = ${a+b}`);R.emit(4,`fib(${n}) = ${a} + ${b} = ${a+b}.`,id,'ok');R.pop();return a+b};return go(n,0)}}};
C.addViz('call-stack',{topic:'recursion',title:'Recursion: call stack and return path',desc:'Each call waits on the stack until the smaller call returns. Step down to the base case, then watch the values travel back up.',ico:'factorial(4)\n↓ 4 × factorial(3)\n    ↓ 3 × factorial(2)',p:'recursion'},(el)=>{
  let fn='factorial';
  const sh=V.shell(el,{controls:V.modeButtons(Object.entries(FN).map(([k,f])=>[k,f.label]),fn)+`<span style="width:6px"></span>${V.input('a','Input',4,'7em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:FN.factorial.src,
    draw(f,pn){const rows=f.calls.map((c,i)=>`<div style="padding-left:${c.d*26}px;display:flex;gap:8px;align-items:baseline;${i===f.cur?'font-weight:600':''}" class="mono small"><span style="color:${c.ret!=null?'var(--good)':i===f.cur?'var(--warn)':'var(--muted)'}">${c.d?'↳':'●'}</span><span>${esc(c.label)}</span><span class="muted">${c.ret!=null?'= '+esc(c.retx)+' ✓':c.wait?'= '+esc(c.wait)+' …waiting':''}</span></div>`).join('');
      const stack=f.stack.slice().reverse().map((id,j)=>`<div class="sitem ${j===0?'top':''}" style="width:100%;height:auto;padding:6px 8px;text-align:left;display:block"><b class="mono small">${esc(f.calls[id].label)}</b><br><span class="tiny muted">${esc(f.calls[id].local)}${f.calls[id].wait?' · waiting for '+esc(f.calls[id].wait):''}</span></div>`).join('');
      pn.stage.innerHTML=`<div class="grid2" style="gap:16px;min-width:0"><div class="col" style="gap:4px"><span class="eyebrow">Calls (indent = depth)</span>${rows}</div><div class="col" style="gap:4px;min-width:0"><span class="eyebrow">Call stack (top = running now)</span><div class="col" style="gap:4px">${stack||'<span class="muted small">empty: all calls returned</span>'}</div></div></div>`;
      pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars({depth:f.stack.length,'calls so far':f.calls.length})}});
  const load=()=>{const F_=FN[fn];U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===fn)));
    let arg=sh.$('[data-in=a]').value;if(fn==='sum'){arg=V.parseList(arg,6).filter(x=>typeof x==='number');if(!arg.length)arg=[1,2,3,4]}else{arg=U.clamp(parseInt(arg,10)||F_.arg,0,F_.max)}
    const calls=[],stack=[],F=[];const R={call(label,d,local){calls.push({label,d,local,ret:null,wait:null});stack.push(calls.length-1);return calls.length-1},wait(id,w){calls[id].wait=w},ret(id,v,x){calls[id].ret=v;calls[id].retx=x;calls[id].wait=null},pop(){stack.pop()},
      emit(line,msg,cur,k){F.push({line,msg,cur,k,calls:calls.map(c=>Object.assign({},c)),stack:stack.slice(),src:F_.src})}};
    const v=F_.run(arg,R);F.push({line:0,msg:`Done: the original call returned <b>${v}</b>. The stack grew to depth ${Math.max(...F.map(f=>f.stack.length))} and unwound completely.`,k:'ok',calls:calls.map(c=>Object.assign({},c)),stack:[],src:F_.src});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){fn=b.dataset.mode;sh.$('[data-in=a]').value=FN[fn].arg;load()}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- recursion tree of fib(n), with and without memoization (original session 3 lab) ---------- */
C.addViz('fibtree',{topic:'recursion',title:'Recursion tree and memoization',desc:'Naive Fibonacci calls itself twice per call. Count the calls, then turn memoization on and watch the repeated work disappear.',ico:'      f(4)\n   f(3)  f(2)\n f(2) f(1)…',p:'dp'},(el)=>{
  el.innerHTML=`<div class="row"><label class="inline">n = <b class="mono" data-nv></b><input type="range" min="1" max="7" value="5" data-n style="width:160px" aria-label="n"></label><button class="btn" type="button" data-m aria-pressed="false">Memoization off</button></div><div class="svgbox"><svg data-svg role="img" aria-label="Recursion tree of fib(n)"></svg></div><div class="stats"><div><b data-c></b><span>function calls</span></div><div><b data-r></b><span>repeated (wasted) calls</span></div></div><div class="msg" data-v aria-live="polite"></div>`;
  let memo=false;const $=s=>el.querySelector(s);
  const draw=()=>{const n=+$('[data-n]').value;$('[data-nv]').textContent=n;const seen=new Set();let leaves=0,calls=0,rep=0;const counts={};
   const build=(k,d)=>{calls++;counts[k]=(counts[k]||0)+1;const nd={k,d,kids:[],cached:false};if(memo&&seen.has(k)){nd.cached=true}else{if(k>=2){nd.kids=[build(k-1,d+1),build(k-2,d+1)]}if(memo)seen.add(k)}
     if(!nd.kids.length){nd.x=leaves++}else nd.x=(nd.kids[0].x+nd.kids[nd.kids.length-1].x)/2;return nd};
   const root=build(n,0);Object.values(counts).forEach(c=>{if(c>1&&!memo)rep+=c-1});
   const W=Math.max(300,leaves*58+20),H=(n+1)*64+20,X=x=>30+x*58,Y=d=>30+d*64;let s='';
   const walk=nd=>{nd.kids.forEach(c=>{s+=`<line x1="${X(nd.x)}" y1="${Y(nd.d)}" x2="${X(c.x)}" y2="${Y(c.d)}" stroke="var(--line)" stroke-width="2"/>`;walk(c)})};walk(root);
   const dup=k=>!memo&&counts[k]>1;
   const dot=nd=>{s+=`<g><rect x="${X(nd.x)-26}" y="${Y(nd.d)-15}" width="52" height="30" rx="8" fill="${nd.cached?'var(--good-soft)':dup(nd.k)?'var(--marker-soft)':'var(--card)'}" stroke="${nd.cached?'var(--good)':dup(nd.k)?'var(--marker)':'var(--muted)'}"/><text x="${X(nd.x)}" y="${Y(nd.d)+5}" text-anchor="middle" font-size="13" font-family="var(--f-mono)" fill="var(--ink)">f(${nd.k})</text></g>`;nd.kids.forEach(dot)};dot(root);
   const svg=$('[data-svg]');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.minWidth=Math.min(W,900)+'px';svg.innerHTML=s;
   $('[data-c]').textContent=calls;$('[data-r]').textContent=memo?0:rep;$('[data-m]').textContent=memo?'Memoization on':'Memoization off';$('[data-m]').setAttribute('aria-pressed',String(memo));
   $('[data-v]').innerHTML=memo?`With memoization each f(k) is computed once; later calls (green) return the saved answer. ${calls} calls instead of ${[1,1,3,5,9,15,25,41][n]}.`:`Red boxes are computed more than once. f(${n}) makes ${calls} calls; the count roughly doubles each time n grows by 1.`};
  el.addEventListener('input',draw);el.addEventListener('click',e=>{if(e.target.closest('[data-m]')){memo=!memo;draw()}});draw()});

/* ---------- backtracking: subsets decision tree ---------- */
C.addViz('backtracking',{topic:'recursion',title:'Backtracking: generate all subsets',desc:'At each number, choose: include it or skip it. Explore, record at the leaves, then undo the choice and try the other branch.',ico:'        []\n   [1]       []\n [1,2] [1] [2] []',p:'backtracking'},(el)=>{
  const src=`def subsets(nums):
    result, path = [], []
    def backtrack(i):
        if i == len(nums):
            result.append(path[:])     # record a copy
            return
        path.append(nums[i])           # choose: include nums[i]
        backtrack(i + 1)               # explore
        path.pop()                     # un-choose
        backtrack(i + 1)               # explore without it
    backtrack(0)
    return result`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','1 2 3','7em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.tree(f.root,{cls:f.cls,edgeText:true,r:22,dx:58,dy:66,aria:'Decision tree of subsets'})+`<div class="row" style="margin-top:8px"><span class="eyebrow">path</span><span class="mono">[${f.path.join(', ')}]</span><span class="eyebrow" style="margin-left:12px">result</span><span class="mono small">${f.result.map(r=>'['+r.join(', ')+']').join(' ')||'[]'}</span></div>`;pn.say(f.msg,f.k)}});
  const load=()=>{let a=V.parseList(sh.$('[data-in=arr]').value,4);if(!a.length)a=[1,2,3];let id=0;
    const mk=(i,path)=>{const n={id:id++,v:'['+path.join(',')+']',kids:[]};if(i<a.length){const L=mk(i+1,path.concat([a[i]]));L.edge='+'+a[i];const R=mk(i+1,path);R.edge='skip';n.kids=[L,R]}return n};
    const root=mk(0,[]);const F=[],vis={},path=[],result=[];
    const snap=(line,msg,cur,k)=>{const cls=Object.assign({},vis);if(cur!=null)cls[cur]='cur';F.push({root,line,msg,cls,path:path.slice(),result:result.map(r=>r.slice()),k})};
    const bt=(i,node)=>{snap(4,`backtrack(${i}) with path [${path.join(', ')}].`,node.id);
      if(i===a.length){result.push(path.slice());vis[node.id]='ok';snap(5,`Leaf: every number decided. Record [${path.join(', ')}].`,node.id,'ok');return}
      path.push(a[i]);snap(7,`Choose: include ${a[i]}.`,node.kids[0].id);bt(i+1,node.kids[0]);
      path.pop();snap(9,`Un-choose: remove ${a[i]} from path (back to [${path.join(', ')}]). This undo is what makes it backtracking.`,node.id,'warn');
      bt(i+1,node.kids[1]);vis[node.id]='vis'};
    bt(0,root);snap(12,`All ${result.length} = 2^${a.length} subsets generated. Each level doubles the branches: O(2ⁿ) leaves.`,null,'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
