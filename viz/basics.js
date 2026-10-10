/* Visualizers: shared shell + Python references (topic 1) + Big-O labs (topic 2). */
(function(C){
'use strict';
const U=C.U,V=C.V,node=U.node,esc=U.esc;

/* Standard visualizer layout: controls row, then [stage + message + variables | traced code], then the step player. */
V.shell=(el,o)=>{o=o||{};el.insertAdjacentHTML('beforeend',`<div class="viz-ctl" role="group" aria-label="Visualizer controls">${o.controls||''}</div>`);
  const ctl=el.lastElementChild,split=node('div',o.code?'viz-split':'col');split.style.gap='12px';el.appendChild(split);
  const left=node('div','col');left.style.gap='10px';split.appendChild(left);const pn=V.panel(left);
  const codeBox=o.code?node('div','col'):null;if(codeBox){codeBox.style.gap='6px';codeBox.innerHTML='<span class="eyebrow">Python</span><div data-code></div>';split.appendChild(codeBox)}
  const draw=(f,i,fs)=>{o.draw(f,pn,i,fs);if(codeBox)codeBox.querySelector('[data-code]').innerHTML=V.code(f.src||o.code,f.line)};
  const pl=V.player(el,draw,{keyHost:el});
  return {ctl,pn,pl,codeBox,$:s=>ctl.querySelector(s)}};
V.modeButtons=(modes,cur)=>modes.map(([k,l])=>`<button class="btn small" type="button" data-mode="${k}" aria-pressed="${k===cur}">${l}</button>`).join('');
V.input=(k,label,val,w)=>`<label class="inline small">${label}<input type="text" data-in="${k}" value="${esc(val)}" ${w?`style="width:${w}"`:''}></label>`;

/* ---------- Python names and objects (references, aliasing, mutability) ---------- */
C.addViz('references',{topic:'python',title:'Names, objects and references',desc:'Step through assignments and watch which objects each name points to. See why b = a does not copy a list.',ico:'a ─┐\nb ─┴→ [1, 2, 3]',p:'python'},(el)=>{
  const SC={
   alias:{label:'b = a (alias)',src:`a = [1, 2]
b = a
b.append(3)
print(a)`,steps:[
     {line:1,names:{a:0},objs:[[1,2]],msg:'A new list object is created; the name <code>a</code> refers to it.'},
     {line:2,names:{a:0,b:0},objs:[[1,2]],msg:'<code>b = a</code> copies the <b>reference</b>, not the list. Both names point at the same object.'},
     {line:3,names:{a:0,b:0},objs:[[1,2,3]],hl:0,msg:'<code>b.append(3)</code> changes the one shared list.'},
     {line:4,names:{a:0,b:0},objs:[[1,2,3]],msg:'So <code>print(a)</code> shows <code>[1, 2, 3]</code>.',ok:1}]},
   copy:{label:'b = a.copy()',src:`a = [1, 2]
b = a.copy()
b.append(3)
print(a, b)`,steps:[
     {line:1,names:{a:0},objs:[[1,2]],msg:'<code>a</code> refers to a list.'},
     {line:2,names:{a:0,b:1},objs:[[1,2],[1,2]],hl:1,msg:'<code>a.copy()</code> (or <code>a[:]</code>, <code>list(a)</code>) builds a <b>new</b> list object.'},
     {line:3,names:{a:0,b:1},objs:[[1,2],[1,2,3]],hl:1,msg:'Appending to <code>b</code> changes only the copy.'},
     {line:4,names:{a:0,b:1},objs:[[1,2],[1,2,3]],msg:'Prints <code>[1, 2] [1, 2, 3]</code>.',ok:1}]},
   rebind:{label:'rebinding vs mutating',src:`a = [1, 2]
b = a
b = b + [3]
print(a, b)`,steps:[
     {line:1,names:{a:0},objs:[[1,2]],msg:'<code>a</code> refers to a list.'},
     {line:2,names:{a:0,b:0},objs:[[1,2]],msg:'<code>b</code> refers to the same list.'},
     {line:3,names:{a:0,b:1},objs:[[1,2],[1,2,3]],hl:1,msg:'<code>b + [3]</code> builds a <b>new</b> list, then <code>b =</code> rebinds the name. <code>a</code> is untouched. (Note: <code>b += [3]</code> would mutate in place!)'},
     {line:4,names:{a:0,b:1},objs:[[1,2],[1,2,3]],msg:'Prints <code>[1, 2] [1, 2, 3]</code>.',ok:1}]},
   grid:{label:'[[0] * 3] * 2 trap',src:`row = [0] * 3
grid = [row] * 2
grid[0][0] = 9
print(grid)`,steps:[
     {line:1,names:{row:0},objs:[[0,0,0]],msg:'One list of three zeros.'},
     {line:2,names:{row:0,grid:1},objs:[[0,0,0],['→0','→0']],hl:1,msg:'<code>[row] * 2</code> makes a list holding the <b>same</b> inner list twice.'},
     {line:3,names:{row:0,grid:1},objs:[[9,0,0],['→0','→0']],hl:0,msg:'Changing <code>grid[0][0]</code> changes that one inner list…'},
     {line:4,names:{row:0,grid:1},objs:[[9,0,0],['→0','→0']],msg:'…which both rows show: <code>[[9, 0, 0], [9, 0, 0]]</code>. Build grids with <code>[[0] * 3 for _ in range(2)]</code>.',ok:1}]},
   func:{label:'functions get references',src:`def add_one(nums):
    nums.append(1)

data = []
add_one(data)
print(data)`,steps:[
     {line:4,names:{data:0},objs:[[]],msg:'<code>data</code> refers to an empty list.'},
     {line:5,names:{data:0,'nums (inside add_one)':0},objs:[[]],msg:'Calling <code>add_one(data)</code>: the parameter <code>nums</code> refers to the same list.'},
     {line:2,names:{data:0,'nums (inside add_one)':0},objs:[[1]],hl:0,msg:'<code>nums.append(1)</code> mutates the caller’s list.'},
     {line:6,names:{data:0},objs:[[1]],msg:'Prints <code>[1]</code>. Functions can change mutable arguments: copy first if you must not.',ok:1}]}};
  let cur='alias';
  const sh=V.shell(el,{controls:Object.entries(SC).map(([k,s])=>`<button class="btn small" type="button" data-sc="${k}" aria-pressed="${k===cur}">${s.label}</button>`).join(''),code:SC[cur].src,draw(f,pn){
    const names=Object.entries(f.names);
    pn.stage.innerHTML=`<div class="row" style="align-items:flex-start;gap:28px;min-width:max-content"><div class="col" style="gap:10px"><span class="eyebrow">Names</span>${names.map(([n,o])=>`<div class="row" style="gap:6px"><span class="var on"><b>name</b>${esc(n)}</span><span class="mono muted">→ obj ${o}</span></div>`).join('')}</div>
      <div class="col" style="gap:10px"><span class="eyebrow">Objects in memory</span>${f.objs.map((o,i)=>`<div class="row" style="gap:6px"><span class="mono tiny muted">obj ${i}</span>${V.arr(o.map(x=>x),{cls:f.hl===i?()=> 'hl':{},idx:false})}</div>`).join('')}</div></div>`;
    pn.say(f.msg,f.ok?'ok':'')}});
  const load=()=>{const s=SC[cur];sh.pl.load(s.steps.map(x=>Object.assign({src:s.src},x)))};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-sc]');if(!b)return;cur=b.dataset.sc;U.$$('[data-sc]',sh.ctl).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));load()});
  load()});

/* ---------- Big-O: growth table (from the original session 2 lab) ---------- */
C.addViz('growth',{topic:'bigo',title:'How fast does it grow?',desc:'Drag n and compare how many steps each complexity needs, and how long Python would take at about 10 million simple steps per second.',ico:'n = 1,000,000\nO(n²) → 28 hours',p:'big-o'},(el)=>{
  const F=[['O(1)',n=>1],['O(log n)',n=>Math.max(1,Math.log2(n))],['O(n)',n=>n],['O(n log n)',n=>n*Math.max(1,Math.log2(n))],['O(n²)',n=>n*n],['O(2ⁿ)',n=>Math.pow(2,n)]];
  el.innerHTML=`<label>Input size n: <b class="mono" data-nv></b><input type="range" min="1" max="7" step="0.5" value="3" data-n aria-label="Input size n (log scale)"></label><div class="tbl"><table><thead><tr><th>Complexity</th><th>Steps</th><th>Time at ~10⁷ steps/s</th><th style="width:38%">Relative (log scale)</th></tr></thead><tbody data-t></tbody></table></div><div class="msg" data-v aria-live="polite"></div>`;
  const fmtN=v=>!isFinite(v)||v>1e300?'astronomical':v>=1e15?v.toExponential(1):v>=1e6?(v/1e6).toFixed(1)+' million':Math.round(v).toLocaleString();
  const fmtT=s=>!isFinite(s)||s>3e15?'longer than the universe':s<1e-3?'< 1 ms':s<1?(s*1000).toFixed(0)+' ms':s<120?s.toFixed(1)+' s':s<7200?(s/60).toFixed(0)+' min':s<172800?(s/3600).toFixed(0)+' hours':s<6.3e7?(s/86400).toFixed(0)+' days':(s/3.15e7).toExponential(1)+' years';
  const draw=()=>{const n=Math.round(Math.pow(10,+el.querySelector('[data-n]').value));el.querySelector('[data-nv]').textContent=n.toLocaleString();
    el.querySelector('[data-t]').innerHTML=F.map(([name,f])=>{const v=f(n),s=v/1e7,w=Math.min(100,Math.max(1,Math.log10(Math.max(1,Math.min(v,1e300)))/12*100));return `<tr><td class="mono">${name}</td><td class="mono">${fmtN(v)}</td><td class="mono" style="color:${s>1?'var(--marker)':'var(--good)'}">${fmtT(s)}</td><td><div class="meter"><i style="width:${w}%;background:${s>1?'var(--marker)':'var(--accent)'}"></i></div></td></tr>`}).join('');
    el.querySelector('[data-v]').innerHTML=n>=1e5?`At n = ${n.toLocaleString()}, O(n²) needs ${fmtN(n*n)} steps (${fmtT(n*n/1e7)}). O(n log n) needs ${fmtN(n*Math.log2(n))} (${fmtT(n*Math.log2(n)/1e7)}). This gap is why algorithm choice matters more than a faster computer.`:'For small n everything is fast. Push the slider right to see where O(n²) and O(2ⁿ) fall apart.'};
  el.addEventListener('input',draw);draw()});

/* ---------- Big-O: growth curves ---------- */
C.addViz('curves',{topic:'bigo',title:'Growth curves',desc:'Plot the six classic complexities side by side. Toggle curves and stretch n to see which ones explode.',ico:'      ╱ 2ⁿ\n    ╱ ╱ n²\n__╱_╱__ n',p:'big-o'},(el)=>{
  const F=[['O(1)',n=>1,'var(--good)'],['O(log n)',n=>Math.log2(Math.max(1,n)),'var(--accent)'],['O(n)',n=>n,'var(--blue)'],['O(n log n)',n=>n*Math.log2(Math.max(1,n)),'var(--lld)'],['O(n²)',n=>n*n,'var(--warn)'],['O(2ⁿ)',n=>Math.pow(2,n),'var(--marker)']];
  const on=F.map(()=>true);
  el.innerHTML=`<div class="viz-ctl">${F.map((f,i)=>`<button class="btn small" type="button" data-f="${i}" aria-pressed="true"><span style="color:${f[2]}">●</span> ${f[0]}</button>`).join('')}</div><label>Largest n: <b class="mono" data-nv></b><input type="range" min="4" max="64" value="16" data-n aria-label="Largest n"></label><div class="svgbox" data-svg></div><div class="msg" aria-live="polite" data-m></div>`;
  const draw=()=>{const N=+el.querySelector('[data-n]').value;el.querySelector('[data-nv]').textContent=N;const W=560,H=280,pad=34;
    const ymax=Math.max(...F.map((f,i)=>on[i]&&i!==5?f[1](N):0),N)*1.05;const X=n=>pad+(n/N)*(W-pad-10),Y=v=>H-pad-Math.min(v,ymax)/ymax*(H-pad-12);
    let s=`<line x1="${pad}" y1="${H-pad}" x2="${W-6}" y2="${H-pad}" class="te"/><line x1="${pad}" y1="8" x2="${pad}" y2="${H-pad}" class="te"/><text class="tw" x="${W-14}" y="${H-pad+16}">n</text><text class="tw" x="${pad-14}" y="16">steps</text>`;
    F.forEach((f,i)=>{if(!on[i])return;let d='';for(let k=0;k<=80;k++){const n=Math.max(0.0001,k/80*N);d+=(k?'L':'M')+X(n).toFixed(1)+' '+Y(f[1](n)).toFixed(1)}s+=`<path d="${d}" fill="none" stroke="${f[2]}" stroke-width="2.5"/><text x="${W-8}" y="${Math.max(14,Y(f[1](N))-4)}" text-anchor="end" font-size="11" fill="${f[2]}" font-family="var(--f-mono)">${f[0]}</text>`});
    el.querySelector('[data-svg]').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Growth curves up to n = ${N}">${s}</svg>`;
    el.querySelector('[data-m]').innerHTML=`At n = ${N}: O(n) = ${N}, O(n log n) ≈ ${Math.round(N*Math.log2(N))}, O(n²) = ${N*N}, O(2ⁿ) = ${Math.pow(2,N).toLocaleString()}. The y-axis is cut at the tallest polynomial curve, so 2ⁿ shoots off the chart almost immediately.`};
  el.addEventListener('input',draw);el.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;on[+b.dataset.f]=!on[+b.dataset.f];b.setAttribute('aria-pressed',String(on[+b.dataset.f]));draw()});draw()});

/* ---------- Big-O: count the steps (predict first, then measure) ---------- */
C.addViz('stepcount',{topic:'bigo',title:'Count the steps',desc:'Pick a loop shape, predict its complexity, then watch the step count as n doubles.',ico:'n=8   → 64\nn=16  → 256  (×4)',p:'big-o'},(el)=>{
  const S=[
   {k:'single',label:'One loop',code:`for i in range(n):\n    work()`,f:n=>n,a:'O(n)',why:'Doubling n doubles the steps: linear.'},
   {k:'two',label:'Two loops in a row',code:`for i in range(n):\n    work()\nfor j in range(n):\n    work()`,f:n=>2*n,a:'O(n)',why:'2n steps. Constants are dropped: still O(n).'},
   {k:'nested',label:'Nested loops',code:`for i in range(n):\n    for j in range(n):\n        work()`,f:n=>n*n,a:'O(n²)',why:'Doubling n multiplies the steps by 4: quadratic.'},
   {k:'tri',label:'Triangle loop',code:`for i in range(n):\n    for j in range(i + 1, n):\n        work()`,f:n=>n*(n-1)/2,a:'O(n²)',why:'n(n−1)/2 pairs: still about ×4 when n doubles, so O(n²).'},
   {k:'half',label:'Halving loop',code:`i = n\nwhile i > 1:\n    work()\n    i //= 2`,f:n=>Math.floor(Math.log2(n)),a:'O(log n)',why:'Doubling n adds just one step: logarithmic.'},
   {k:'nlog',label:'Loop × halving',code:`for i in range(n):\n    j = n\n    while j > 1:\n        work()\n        j //= 2`,f:n=>n*Math.floor(Math.log2(n)),a:'O(n log n)',why:'n outer steps, each doing log n: O(n log n).'}];
  let cur=S[0];
  el.innerHTML=`<div class="viz-ctl">${S.map(s=>`<button class="btn small" type="button" data-s="${s.k}">${s.label}</button>`).join('')}</div><div class="grid2"><div data-code></div><div class="col" style="gap:8px" data-pred></div></div><div data-table></div>`;
  const draw=()=>{U.$$('[data-s]',el).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.s===cur.k)));el.querySelector('[data-code]').innerHTML=U.codeHTML(cur.code,'python',{copy:false});
    const pred=el.querySelector('[data-pred]');pred.innerHTML='<b>Predict first:</b> what is the complexity?';el.querySelector('[data-table]').innerHTML='<p class="muted small">The step counts appear after you answer.</p>';
    C.Q.mini(pred,{opts:C.Q.CX.slice(0,5),a:cur.a,why:cur.why,codeOpts:true},()=>{const ns=[8,16,32,64,128,256,512,1024];let prev=null;
      el.querySelector('[data-table]').innerHTML=U.tableHTML(['n','steps','when n doubled'],ns.map(n=>{const v=Math.round(cur.f(n));const r=prev?(v/prev):null;prev=v;return [`<span class="mono">${n}</span>`,`<span class="mono">${v.toLocaleString()}</span>`,r?`<span class="mono">×${r.toFixed(2)}</span>`:'–']}))})};
  el.addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;cur=S.find(s=>s.k===b.dataset.s);draw()});draw()});
})(COURSE);
