/* Visualizers for topic 18 (patterns): merging intervals on a timeline, and greedy reach (jump game). */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

C.addViz('intervals',{topic:'patterns',title:'Intervals: sort, then merge',desc:'Sort intervals by start. Each new interval either overlaps the last merged one (extend it) or starts a new block.',ico:'[1──3]\n  [2────6]   [8─10]\n[1──────6]   [8─10]',p:'intervals'},(el)=>{
  const src=`def merge(intervals):
    intervals.sort()                       # by start
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)   # overlap: extend
        else:
            merged.append([start, end])               # gap: new block
    return merged`;
  const sh=V.shell(el,{controls:`${V.input('iv','Intervals','1-3 8-10 2-6 15-18 9-12','15em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){const lo=Math.min(...f.all.map(x=>x[0])),hi=Math.max(...f.all.map(x=>x[1]));const W=520,X=v=>20+(v-lo)/(hi-lo||1)*(W-40);let s='',y=14;
      f.all.forEach((iv,i)=>{const c=i===f.cur?'var(--warn)':i<f.done?'var(--line)':'var(--accent)';s+=`<rect x="${X(iv[0])}" y="${y}" width="${Math.max(4,X(iv[1])-X(iv[0]))}" height="14" rx="4" fill="${c}"/><text x="${X(iv[0])-4}" y="${y+11}" text-anchor="end" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">[${iv[0]}, ${iv[1]}]</text>`;y+=20});
      y+=8;s+=`<text x="20" y="${y}" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">merged</text>`;y+=6;f.merged.forEach((iv,i)=>{s+=`<rect x="${X(iv[0])}" y="${y}" width="${Math.max(4,X(iv[1])-X(iv[0]))}" height="16" rx="4" fill="${i===f.merged.length-1&&f.hl?'var(--good)':'var(--blue)'}" opacity=".85"/>`});
      pn.stage.innerHTML=`<div class="svgbox"><svg viewBox="0 0 ${W} ${y+26}" role="img" aria-label="Intervals on a timeline">${s}</svg></div>`;pn.say(f.msg,f.k);pn.vars.innerHTML=`<div class="row"><span class="eyebrow">merged</span><span class="mono">${JSON.stringify(f.merged)}</span></div>`}});
  const load=()=>{let all=sh.$('[data-in=iv]').value.split(/[\s,;]+/).map(p=>p.split(/[-:]/).map(Number)).filter(p=>p.length===2&&p.every(n=>!isNaN(n))&&p[0]<=p[1]).slice(0,10);if(!all.length)all=[[1,3],[8,10],[2,6],[15,18]];
    const F=[];const orig=all.map(x=>x.slice());F.push({all:orig,merged:[],line:1,msg:'Unsorted intervals. Overlaps are hard to see until they are sorted by start.',done:0});
    all.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);F.push({all,merged:[],line:2,msg:'Sorted by start: now any interval can only overlap the block just before it.',done:0});
    const merged=[];all.forEach((iv,i)=>{if(merged.length&&iv[0]<=merged[merged.length-1][1]){const last=merged[merged.length-1];const old=last[1];last[1]=Math.max(last[1],iv[1]);F.push({all,merged:merged.map(x=>x.slice()),cur:i,done:i,line:6,hl:true,msg:`[${iv}] starts at ${iv[0]} ≤ ${old} (end of the last block): overlap. Extend the block to end at ${last[1]}.`})}
      else{merged.push(iv.slice());F.push({all,merged:merged.map(x=>x.slice()),cur:i,done:i,line:8,hl:true,msg:merged.length>1?`[${iv}] starts after the last block ends: a gap. Start a new block.`:`The first interval starts the first block.`})}});
    F.push({all,merged,done:all.length,line:9,msg:`Merged into ${merged.length} block${merged.length>1?'s':''}. Sorting dominates: O(n log n).`,k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

C.addViz('greedy-reach',{topic:'patterns',title:'Greedy: how far can you reach?',desc:'Jump Game: nums[i] is the maximum jump from i. Track the farthest index reachable so far; one pass decides the answer.',ico:'[2][3][1][1][4]\nreach → → → → ✓',p:'greedy'},(el)=>{
  const src=`def can_jump(nums):
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach:
            return False          # stuck before i
        reach = max(reach, i + jump)
    return True`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','2 3 1 1 4','10em')}<button class="btn small primary" type="button" data-go>Load</button><button class="btn small" type="button" data-ex="3 2 1 0 4">3 2 1 0 4</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,ptr:f.ptr});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars({i:f.i==null?'–':f.i,reach:f.reach})}});
  const load=raw=>{let a=V.parseList(raw||sh.$('[data-in=arr]').value,12).filter(x=>typeof x==='number'&&x>=0);if(!a.length)a=[2,3,1,1,4];let reach=0;const F=[];
    const cls=i=>{const c={};a.forEach((_,j)=>{if(j<=reach)c[j]='hl'});if(i!=null)c[i]='cmp';return c};
    F.push({a,i:null,reach,cls:cls(null),ptr:{},line:2,msg:'reach = 0: so far only index 0 is reachable (shaded).'});
    for(let i=0;i<a.length;i++){if(i>reach){F.push({a,i,reach,cls:Object.assign(cls(null),{[i]:'bad'}),ptr:{i},line:5,msg:`Index ${i} is beyond reach (${reach}): we can never get here. Return False.`,k:'bad'});sh.pl.load(F);return}
      const old=reach;reach=Math.max(reach,i+a[i]);F.push({a,i,reach,cls:cls(i),ptr:{i,reach:Math.min(reach,a.length-1)},line:6,msg:`From index ${i} we can jump up to ${i} + ${a[i]} = ${i+a[i]}. reach = max(${old}, ${i+a[i]}) = ${reach}.`})}
    F.push({a,i:null,reach,cls:cls(null),ptr:{},line:7,msg:'Every index was reachable, including the last: True. Greedy works because only the farthest reach matters, not which jumps you took.',k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load();const x=e.target.closest('[data-ex]');if(x){sh.$('[data-in=arr]').value=x.dataset.ex;load(x.dataset.ex)}});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
