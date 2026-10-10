/* Visualizers for topic 19 (greedy): activity selection on a timeline. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

/* intervals drawn as bars: rows [{s,e,cls,label}], time axis 0..T */
V.timeline=(rows,o)=>{o=o||{};const T=Math.max(1,...rows.map(r=>r.e),o.mark||0);const W=520,RH=26,H=rows.length*RH+30,X=t=>20+t/T*(W-40);
  let s='';for(let t=0;t<=T;t++)if(T<=24||t%Math.ceil(T/24)===0)s+=`<line class="te" x1="${X(t)}" y1="0" x2="${X(t)}" y2="${H-18}" style="opacity:.25"/><text class="tw" x="${X(t)}" y="${H-4}">${t}</text>`;
  if(o.mark!=null)s+=`<line class="te on" x1="${X(o.mark)}" y1="0" x2="${X(o.mark)}" y2="${H-18}" style="stroke-dasharray:4 3"/>`;
  rows.forEach((r,i)=>{const y=i*RH+4;s+=`<g class="tn ${r.cls||''}"><rect x="${X(r.s)}" y="${y}" width="${Math.max(4,X(r.e)-X(r.s))}" height="${RH-8}" rx="4"/><text x="${(X(r.s)+X(r.e))/2}" y="${y+(RH-8)/2}">${esc(r.label||`[${r.s}, ${r.e}]`)}</text></g>`});
  return `<div class="svgbox"><svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px;min-width:${Math.round(W*.62)}px" role="img" aria-label="${esc(o.aria||'Intervals on a timeline')}">${s}</svg></div>`};

C.addViz('activity',{topic:'greedy',title:'Activity selection',desc:'Sort by end time, then keep every activity that starts after the last kept one ends. Watch why the earliest finish leaves the most room.',ico:'▬▬   ▬▬▬\n  ▬▬▬▬▬▬',p:'intervals'},(el)=>{
  const src=`def max_activities(intervals):
    intervals.sort(key=lambda x: x[1])
    count, last_end = 0, float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`;
  const sh=V.shell(el,{controls:`${V.input('a','Intervals','1-3 2-4 3-5 0-6 5-7 8-9 5-9','16em')}<button class="btn small primary" type="button" data-go>Load</button><button class="btn small" type="button" data-ex="1-10 2-3 4-5 6-7">One long interval</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.timeline(f.rows.map((r,i)=>({s:r[0],e:r[1],cls:f.st[i]==='take'?'ok':f.st[i]==='skip'?'dim':i===f.at?'cmp':''})),{mark:f.last>-1?f.last:null});
      pn.vars.innerHTML=V.vars({count:f.count,last_end:f.last>-1?f.last:'-inf'},['count']);pn.say(f.msg,f.k)}});
  const load=raw=>{const rows=(raw||sh.$('[data-in=a]').value).split(/[\s,]+/).map(x=>x.split('-').map(Number)).filter(p=>p.length===2&&p.every(n=>!isNaN(n))&&p[0]<p[1]).slice(0,10);
    const F=[],st={};let count=0,last=-1;F.push({rows,st:{},count,last,line:1,msg:`${rows.length} activities, in input order.`});
    rows.sort((a,b)=>a[1]-b[1]);F.push({rows,st:{},count,last,line:2,msg:'Sorted by <b>end</b> time: the one that frees the room first is on top.'});
    rows.forEach((r,i)=>{if(r[0]>=last){count++;last=r[1];st[i]='take';F.push({rows,st:Object.assign({},st),at:i,count,last,line:6,msg:`[${r[0]}, ${r[1]}] starts at ${r[0]} ≥ last end: <b>take it</b>. The room is busy until ${r[1]}.`,k:'ok'})}
      else{st[i]='skip';F.push({rows,st:Object.assign({},st),at:i,count,last,line:5,msg:`[${r[0]}, ${r[1]}] starts at ${r[0]}, before ${last}: it overlaps, <b>skip</b>.`})}});
    F.push({rows,st,count,last,line:8,msg:`${count} activities. Any optimal plan can swap its first activity for the earliest-ending one without losing anything, so greedy is optimal. O(n log n) for the sort.`,k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load();const x=e.target.closest('[data-ex]');if(x){sh.$('[data-in=a]').value=x.dataset.ex;load(x.dataset.ex)}});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
