/* AlgorithmVisualizer building blocks: a step player (Reset / Prev / Play-Pause / Next / Speed, keyboard ← → Space)
   plus HTML/SVG drawers for arrays, variables, traced code, trees and graphs. Visualizers record frames, then draw them. */
(function(C){
'use strict';
const U=C.U,V=C.V={};

/* ---------- step player ---------- */
V.player=(host,draw,opt)=>{opt=opt||{};
  const bar=U.node('div','player',`<button class="btn small" data-p="reset" title="Back to the first step (Home)">⏮ Reset</button><button class="btn small" data-p="prev" title="Previous step (←)">◀ Prev</button><button class="btn small primary" data-p="play" title="Auto play / pause (Space)">▶ Play</button><button class="btn small" data-p="next" title="Next step (→)">Next ▶</button><button class="btn small ghost" data-p="end" title="Jump to the last step (End)">⏭</button><label class="inline tiny">Speed <select data-p="speed" aria-label="Playback speed"><option value="1500">0.5×</option><option value="850" selected>1×</option><option value="420">2×</option><option value="150">4×</option></select></label><span class="stepn" aria-live="polite"></span>`);
  host.appendChild(bar);
  const $=s=>bar.querySelector(s),play=$('[data-p=play]'),prev=$('[data-p=prev]'),next=$('[data-p=next]'),sp=$('[data-p=speed]'),stepn=$('.stepn');
  if(opt.speed)sp.value=String(opt.speed);
  let frames=[],i=0,timer=null;
  const show=()=>{if(!frames.length){stepn.textContent='';return}draw(frames[i],i,frames);stepn.textContent=`Step ${i+1} / ${frames.length}`;prev.disabled=i===0;next.disabled=i>=frames.length-1};
  const stop=()=>{if(timer){clearInterval(timer);timer=null}play.textContent='▶ Play'};
  const tick=()=>{if(i>=frames.length-1){stop();return}i++;show();if(i>=frames.length-1)stop()};
  const start=()=>{if(!frames.length)return;if(i>=frames.length-1)i=0,show();play.textContent='❚❚ Pause';timer=U.every(tick,+sp.value)};
  bar.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b||b.tagName==='SELECT')return;const k=b.dataset.p;
    if(k==='play'){timer?stop():start();return}stop();
    if(k==='next'&&i<frames.length-1)i++;if(k==='prev'&&i>0)i--;if(k==='reset')i=0;if(k==='end')i=Math.max(0,frames.length-1);show()});
  sp.addEventListener('change',()=>{if(timer){stop();start()}});
  const keys=e=>{const tg=e.target;if(tg.closest('input,textarea,select'))return;
    if(e.key==='ArrowRight'){e.preventDefault();stop();if(i<frames.length-1){i++;show()}}
    else if(e.key==='ArrowLeft'){e.preventDefault();stop();if(i>0){i--;show()}}
    else if(e.key===' '&&!tg.closest('button')){e.preventDefault();timer?stop():start()}
    else if(e.key==='Home'){stop();i=0;show()}else if(e.key==='End'){stop();i=frames.length-1;show()}};
  (opt.keyHost||host).addEventListener('keydown',keys);
  return {load(fs,o){o=o||{};stop();frames=fs||[];i=o.at==='end'?Math.max(0,frames.length-1):(o.at||0);show();if(o.play)start()},
    get index(){return i},get frames(){return frames},stop,play:start,redraw:show};
};

/* ---------- array cells: V.arr(values,{cls:{i:'hl'},ptr:{name:i},win:[l,r],cap,label,idx:false}) ---------- */
V.arr=(vals,o)=>{o=o||{};const n=o.cap!=null?Math.max(o.cap,vals.length):vals.length;const by={};
  Object.entries(o.ptr||{}).forEach(([k,i])=>{if(i==null||i<-1)return;(by[i]=by[i]||[]).push(k)});
  let h=`<div class="arr">${o.label?`<span class="arr-label">${o.label}</span>`:''}`;
  for(let i=0;i<n;i++){const empty=i>=vals.length;let c=typeof o.cls==='function'?o.cls(i):(o.cls&&o.cls[i])||'';
    if(o.win&&i>=o.win[0]&&i<=o.win[1])c+=' win';if(empty)c+=' empty';
    h+=`<div class="acell ${c}"><span class="v">${empty?'':U.esc(o.fmt?o.fmt(vals[i]):vals[i])}</span>${o.idx===false?'':`<span class="i">${i}</span>`}<span class="p">${(by[i]||[]).join('<br>')}</span></div>`}
  if(by[n]||by[-1]){h+=`<div class="acell"><span class="v" style="border:0;background:none"></span><span class="i"></span><span class="p">${(by[n]||by[-1]).join('<br>')}</span></div>`}
  return h+'</div>'};

/* ---------- variable chips: V.vars({low:0,mid:3},['mid']) ---------- */
V.vars=(obj,on)=>`<div class="vars">${Object.entries(obj).map(([k,v])=>`<span class="var ${on&&on.includes(k)?'on':''}"><b>${U.esc(k)}</b>${U.esc(typeof v==='string'?v:JSON.stringify(v))}</span>`).join('')}</div>`;
V.repr=v=>v===null||v===undefined?'None':v===true?'True':v===false?'False':Array.isArray(v)?'['+v.map(V.repr).join(', ')+']':typeof v==='string'?`'${v}'`:String(v);

/* ---------- traced code: highlights the line being executed ---------- */
V.code=(src,line)=>`<div class="trace-code" aria-hidden="true">${U.clean(src).split('\n').map((l,i)=>`<div class="${i+1===line?'on':''}">${U.hl(l)||' '}</div>`).join('')}</div>`;

/* ---------- trees (binary {v,l,r,id} or general {v,kids,id}) ---------- */
V.tree=(root,o)=>{o=o||{};if(!root)return `<div class="empty">${o.empty||'Empty tree'}</div>`;
  const R=o.r||19,DX=o.dx||(R*2+14),DY=o.dy||62;let leaf=0,maxD=0;const pos=[];
  const kids=n=>n.kids?n.kids:[n.l,n.r];
  const lay=(n,d)=>{if(!n)return null;maxD=Math.max(maxD,d);let x;
    if(n.kids){const cs=n.kids.map(k=>lay(k,d+1));if(!cs.length)x=leaf++;else x=(cs[0]+cs[cs.length-1])/2}
    else{lay(n.l,d+1);x=leaf++;lay(n.r,d+1)}  /* binary: in-order column, so left/right children never cross */
    pos.push({n,x,d});n._x=x;n._d=d;return x};
  lay(root,0);const W=Math.max(o.minW||260,leaf*DX+40),H=(maxD+1)*DY+(o.labels?34:20);const X=x=>20+DX/2+x*DX,Y=d=>R+12+d*DY;
  let e='',s='';const ec=o.ecls||{},cl=o.cls||{},lb=o.labels||{};
  pos.forEach(({n})=>kids(n).forEach(k=>{if(!k)return;const id=k.id!=null?k.id:k.v;e+=`<line class="te ${ec[id]||''}" x1="${X(n._x)}" y1="${Y(n._d)}" x2="${X(k._x)}" y2="${Y(k._d)}"/>`;
    if(o.edgeText&&k.edge)e+=`<text class="tw" x="${(X(n._x)+X(k._x))/2+(k._x<n._x?-8:8)}" y="${(Y(n._d)+Y(k._d))/2}">${U.esc(k.edge)}</text>`}));
  pos.forEach(({n})=>{const id=n.id!=null?n.id:n.v;s+=`<g class="tn ${cl[id]||''} ${n.end?'end':''}" data-id="${U.esc(id)}" ${o.clickable?`tabindex="0" role="button" aria-label="Node ${U.esc(n.v)}" style="cursor:pointer"`:''}><circle cx="${X(n._x)}" cy="${Y(n._d)}" r="${R}"/><text x="${X(n._x)}" y="${Y(n._d)}">${U.esc(n.v)}</text>${lb[id]!=null?`<text class="tlabel" x="${X(n._x)}" y="${Y(n._d)+R+12}">${U.esc(lb[id])}</text>`:''}</g>`});
  return `<div class="svgbox"><svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px;min-width:${Math.min(W,o.minPx||W*0.7)}px" role="img" aria-label="${U.esc(o.aria||'Tree diagram')}">${e}${s}</svg></div>`};
/* list -> binary tree (level order with None) for drawing */
V.buildTree=vals=>{if(!vals.length||vals[0]==null)return null;let id=0;const mk=v=>({v,l:null,r:null,id:id++});const root=mk(vals[0]);const q=[root];let i=1;
  while(q.length&&i<vals.length){const n=q.shift();if(i<vals.length&&vals[i]!=null){n.l=mk(vals[i]);q.push(n.l)}i++;if(i<vals.length&&vals[i]!=null){n.r=mk(vals[i]);q.push(n.r)}i++}return root};

/* ---------- graphs: V.graph({nodes:[{id,x,y}],edges:[{u,v,w}],directed,cls,ecls,labels,W,H}) ---------- */
V.ekey=(u,v,dir)=>dir?`${u}>${v}`:[u,v].map(String).sort().join('~');
V.graph=g=>{const R=g.r||19,W=g.W||520,H=g.H||300,cl=g.cls||{},ec=g.ecls||{},lb=g.labels||{};const N={};g.nodes.forEach(n=>N[n.id]=n);const mk='gm'+Math.random().toString(36).slice(2,7);
  let e='';g.edges.forEach(ed=>{const a=N[ed.u],b=N[ed.v];if(!a||!b)return;const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1;const ux=dx/L,uy=dy/L;
    const bend=g.directed&&g.edges.some(o=>o.u===ed.v&&o.v===ed.u)?14:0;const x1=a.x+ux*R,y1=a.y+uy*R,x2=b.x-ux*(R+(g.directed?3:0)),y2=b.y-uy*(R+(g.directed?3:0));
    const mx=(x1+x2)/2-uy*bend,my=(y1+y2)/2+ux*bend;const k=V.ekey(ed.u,ed.v,g.directed);
    e+=`<path class="te ${ec[k]||''}" d="M${x1.toFixed(1)} ${y1.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" ${g.directed?`marker-end="url(#${mk})"`:''}/>`;
    if(ed.w!=null)e+=`<text class="tw" x="${(mx-uy*9).toFixed(1)}" y="${(my+ux*9).toFixed(1)}">${ed.w}</text>`});
  const s=g.nodes.map(n=>`<g class="tn ${cl[n.id]||''}" data-node="${U.esc(n.id)}"><circle cx="${n.x}" cy="${n.y}" r="${R}"/><text x="${n.x}" y="${n.y}">${U.esc(n.label!=null?n.label:n.id)}</text>${lb[n.id]!=null?`<text class="tlabel" x="${n.x}" y="${n.y+R+12}">${U.esc(lb[n.id])}</text>`:''}</g>`).join('');
  return `<div class="svgbox"><svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px;min-width:${Math.round(W*.62)}px" role="img" aria-label="${U.esc(g.aria||'Graph diagram')}"><defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0L10 5L0 10z"/></marker></defs>${e}${s}</svg></div>`};

/* parse "1 5 3" or "[1, 5, 3]" into numbers (or strings if not numeric) */
V.parseList=(s,max)=>{const parts=String(s).replace(/[\[\]]/g,' ').split(/[\s,]+/).filter(Boolean).slice(0,max||14);return parts.map(x=>isNaN(+x)?x:+x)};
/* standard frame panel: stage + message + vars, returns {stage,msg,vars} */
V.panel=el=>{const stage=U.node('div','stage-box'),msg=U.node('div','msg'),vars=U.node('div');msg.setAttribute('aria-live','polite');el.append(stage,msg,vars);return {stage,msg,vars,
  say(t,k){msg.className='msg'+(k?' '+k:'');msg.innerHTML=t}}};
})(COURSE);
