/* Visualizers for topic 20 (dynamic programming): a DP table filled cell by cell, showing which cells each value depends on. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

/* table: {rowHead:[], colHead:[], cells:[[v|null]], cls:{"r,c":cls}} */
V.dpTable=t=>{let h=`<div class="tbl dpt"><table><thead><tr><th scope="col">${esc(t.corner||'')}</th>${t.colHead.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>`;
  t.cells.forEach((row,r)=>{h+=`<tr><th scope="row">${esc(t.rowHead[r])}</th>${row.map((v,c)=>`<td class="${t.cls[r+','+c]||''}${v==null?' empty':''}">${v==null?'·':esc(v===Infinity?'∞':v)}</td>`).join('')}</tr>`});
  return h+'</tbody></table></div>'};
const copy=g=>g.map(r=>r.slice());

const MODES={
 coins:{label:'Coin change',ctl:[['coins','Coins','1 3 4','6em'],['amount','Amount','6','3em']],src:`def coin_change(coins, amount):
    dp = [0] + [inf] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount]`,
  frames(v){const coins=V.parseList(v.coins,6).map(Number).filter(x=>x>0),A=Math.max(0,Math.min(16,+v.amount||0));
    const dp=[[0,...Array(A).fill(Infinity)]],F=[],head=[...Array(A+1).keys()];const T=cls=>({rowHead:['dp'],colHead:head,cells:copy(dp),cls,corner:'amount'});
    F.push({t:T({'0,0':'cur'}),line:2,msg:'dp[a] = fewest coins for amount a. dp[0] = 0 (no coins); everything else starts at ∞ (unknown).'});
    for(let a=1;a<=A;a++){for(const c of coins){if(c>a)continue;const cand=dp[0][a-c]+1,better=cand<dp[0][a];if(better)dp[0][a]=cand;
        F.push({t:T({['0,'+(a-c)]:'dep',['0,'+a]:'cur'}),line:6,msg:`a = ${a}, coin ${c}: dp[${a-c}] + 1 = ${cand===Infinity?'∞':cand}${better?' is better → dp['+a+'] = '+cand:` is not better than ${dp[0][a]===Infinity?'∞':dp[0][a]}`}.`})}}
    const ans=dp[0][A];F.push({t:T({['0,'+A]:'ans'}),line:7,msg:ans===Infinity?`Amount ${A} cannot be made: return −1.`:`Answer: dp[${A}] = ${ans} coins. ${A*coins.length} cell updates: O(amount × coins).`,k:'ok'});return F}},
 lcs:{label:'LCS',ctl:[['a','a','abcde','6em'],['b','b','ace','6em']],src:`def lcs(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[-1][-1]`,
  frames(v){const a=String(v.a).slice(0,8),b=String(v.b).slice(0,8),n=a.length,m=b.length;const dp=[...Array(n+1)].map((_,i)=>[...Array(m+1)].map((_,j)=>i&&j?null:0));
    const T=cls=>({rowHead:['""',...a],colHead:['""',...b],cells:copy(dp),cls,corner:'a \\ b'});const F=[{t:T({}),line:2,msg:'Row i = prefix a[:i], column j = prefix b[:j]. An empty prefix has LCS 0: first row and column are 0.'}];
    for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){if(a[i-1]===b[j-1]){dp[i][j]=dp[i-1][j-1]+1;F.push({t:T({[(i-1)+','+(j-1)]:'dep',[i+','+j]:'cur'}),line:6,msg:`'${esc(a[i-1])}' = '${esc(b[j-1])}': extend the diagonal, ${dp[i-1][j-1]} + 1 = ${dp[i][j]}.`,k:'ok'})}
      else{dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);F.push({t:T({[(i-1)+','+j]:'dep',[i+','+(j-1)]:'dep',[i+','+j]:'cur'}),line:8,msg:`'${esc(a[i-1])}' ≠ '${esc(b[j-1])}': drop one character, max(up ${dp[i-1][j]}, left ${dp[i][j-1]}) = ${dp[i][j]}.`})}}
    F.push({t:T({[n+','+m]:'ans'}),line:9,msg:`LCS length = ${dp[n][m]}. (n + 1)(m + 1) cells, O(1) each: O(n · m).`,k:'ok'});return F}},
 knap:{label:'0/1 knapsack',ctl:[['vals','Values','1 4 5 7','7em'],['wts','Weights','1 3 4 5','7em'],['cap','Capacity','7','3em']],src:`def knapsack(values, weights, capacity):
    dp = [[0] * (capacity + 1) for _ in range(len(values) + 1)]
    for i in range(1, len(values) + 1):
        v, w = values[i - 1], weights[i - 1]
        for c in range(capacity + 1):
            dp[i][c] = dp[i - 1][c]                  # skip item i
            if w <= c:
                dp[i][c] = max(dp[i][c], dp[i - 1][c - w] + v)   # take it
    return dp[-1][-1]`,
  frames(v){const vals=V.parseList(v.vals,5).map(Number),wts=V.parseList(v.wts,5).map(Number),n=Math.min(vals.length,wts.length),cap=Math.max(0,Math.min(10,+v.cap||0));
    const dp=[...Array(n+1)].map((_,i)=>[...Array(cap+1)].map(()=>i?null:0));const T=cls=>({rowHead:['none',...vals.slice(0,n).map((x,i)=>`v${x} w${wts[i]}`)],colHead:[...Array(cap+1).keys()],cells:copy(dp),cls,corner:'item \\ cap'});
    const F=[{t:T({}),line:2,msg:'dp[i][c] = best value using the first i items with capacity c. With no items, every value is 0.'}];
    for(let i=1;i<=n;i++){const vv=vals[i-1],w=wts[i-1];for(let c=0;c<=cap;c++){const skip=dp[i-1][c];if(w<=c&&dp[i-1][c-w]+vv>skip){dp[i][c]=dp[i-1][c-w]+vv;F.push({t:T({[(i-1)+','+c]:'dep',[(i-1)+','+(c-w)]:'dep',[i+','+c]:'cur'}),line:8,msg:`Item ${i} (v ${vv}, w ${w}), capacity ${c}: take it, dp[${i-1}][${c-w}] + ${vv} = ${dp[i][c]} beats skipping (${skip}).`,k:'ok'})}
      else{dp[i][c]=skip;F.push({t:T({[(i-1)+','+c]:'dep',[i+','+c]:'cur'}),line:6,msg:`Item ${i} (v ${vv}, w ${w}), capacity ${c}: ${w>c?"it doesn't fit":'taking it is not better'}, keep ${skip}.`})}}}
    F.push({t:T({[n+','+cap]:'ans'}),line:9,msg:`Best value: ${dp[n][cap]}. O(n × capacity) cells.`,k:'ok'});return F}},
 grid:{label:'Grid paths',ctl:[['g','Grid (rows, # = wall)','.... .#.. ....','12em']],src:`def paths(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "#":
                continue                       # blocked: 0 paths
            if r == 0 and c == 0:
                dp[r][c] = 1
            else:
                up = dp[r - 1][c] if r else 0
                left = dp[r][c - 1] if c else 0
                dp[r][c] = up + left
    return dp[-1][-1]`,
  frames(v){const g=String(v.g).trim().split(/\s+/).slice(0,6).map(r=>r.slice(0,8));const R=g.length,Cn=Math.max(...g.map(r=>r.length));
    const dp=[...Array(R)].map(()=>Array(Cn).fill(null));const blocked={};g.forEach((row,r)=>{for(let c=0;c<Cn;c++)if(row[c]==='#')blocked[r+','+c]='blocked'});
    const T=cls=>({rowHead:[...Array(R).keys()],colHead:[...Array(Cn).keys()],cells:dp.map((row,r)=>row.map((x,c)=>blocked[r+','+c]?'#':x)),cls:Object.assign({},blocked,cls),corner:'r \\ c'});
    const F=[{t:T({}),line:3,msg:'dp[r][c] = number of right/down paths from the top-left to (r, c).'}];
    for(let r=0;r<R;r++)for(let c=0;c<Cn;c++){if(blocked[r+','+c]){dp[r][c]=0;continue}
      if(!r&&!c){dp[0][0]=1;F.push({t:T({'0,0':'cur'}),line:9,msg:'The start: exactly 1 path (stand still).'});continue}
      const up=r?dp[r-1][c]:0,left=c?dp[r][c-1]:0;dp[r][c]=up+left;const dep={};if(r)dep[(r-1)+','+c]='dep';if(c)dep[r+','+(c-1)]='dep';
      F.push({t:T(Object.assign(dep,{[r+','+c]:'cur'})),line:13,msg:`(${r}, ${c}): from above ${up} + from the left ${left} = ${up+left}.`})}
    F.push({t:T({[(R-1)+','+(Cn-1)]:'ans'}),line:14,msg:`${dp[R-1][Cn-1]} paths. Every cell is computed once from two neighbours: O(rows × cols).`,k:'ok'});return F}}};

C.addViz('dp-table',{topic:'dp',title:'Filling a DP table',desc:'Watch coin change, LCS, 0/1 knapsack and grid paths fill their tables cell by cell. Blue cells are what the current (orange) cell depends on.',ico:'0 1 2 1 1\n0 1 1 2 2',p:'dp'},(el,api)=>{
  let mode=api.arg.mode||api.get('mode','coins');
  const ctlHTML=()=>`<div class="row">${V.modeButtons(Object.entries(MODES).map(([k,m])=>[k,m.label]),mode)}</div><div class="row">${MODES[mode].ctl.map(c=>V.input(...c)).join('')}<button class="btn small primary" type="button" data-go>Load</button></div>`;
  const sh=V.shell(el,{controls:ctlHTML(),code:MODES[mode].src,draw(f,pn){pn.stage.innerHTML=V.dpTable(f.t);pn.say(f.msg,f.k)}});
  const load=()=>{const m=MODES[mode],vals={};m.ctl.forEach(([k])=>{const x=sh.$(`[data-in="${k}"]`);vals[k]=x?x.value:''});sh.pl.load(m.frames(vals).map(f=>Object.assign(f,{src:m.src})))};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;api.set('mode',mode);sh.ctl.innerHTML=ctlHTML();load();return}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
