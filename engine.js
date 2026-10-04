(function(){
'use strict';
const $=(s,r)=>(r||document).querySelector(s), $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const store={get(k,d){try{const v=localStorage.getItem('dsa:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('dsa:'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=s=>{s=Math.max(0,Math.round(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')};
const fmtH=s=>{const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return h+':'+String(m).padStart(2,'0')+':'+String(x).padStart(2,'0')};
const hm=min=>Math.floor(min/60)+':'+String(min%60).padStart(2,'0');
const S=COURSE.sessions.slice().sort((a,b)=>a.n-b.n);
const PARTS=[
  {k:'A',name:'Foundations',desc:'Python for DSA, Big-O, recursion, and arrays and strings: the tools every later session uses.'},
  {k:'B',name:'Core data structures',desc:'Linked lists, stacks, queues, hash tables, searching, sorting, trees and heaps, built from scratch and then used from the standard library.'},
  {k:'C',name:'Advanced topics',desc:'Graphs, shortest paths, union-find, tries, greedy algorithms and dynamic programming.'},
  {k:'D',name:'Interview preparation',desc:'The patterns behind most interview problems, backtracking, and timed mock coding rounds.'}];
const sid=n=>'s'+String(n).padStart(2,'0');

/* ---------- live timers (cleared on every route change) ---------- */
let live=[];
const every=(fn,ms)=>{const id=setInterval(fn,ms);live.push(id);return id};
const killAll=()=>{live.forEach(clearInterval);live=[]};

/* ---------- global delegated handlers ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-reveal]');
  if(b){const a=b.nextElementSibling;if(!a)return;if(!b.dataset.label)b.dataset.label=b.textContent;a.hidden=!a.hidden;b.textContent=a.hidden?b.dataset.label:b.dataset.label.replace(/^(Reveal|Show)/,'Hide');return}
  const c=e.target.closest('[data-copy]');
  if(c){const pre=c.closest('.codebox').querySelector('pre');const t=pre.textContent;const ok=()=>{c.textContent='Copied';setTimeout(()=>c.textContent='Copy',1400)};
    const sel=()=>{const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Selected · Ctrl+C'};
    try{navigator.clipboard.writeText(t).then(ok,sel)}catch(err){sel()}}
});

/* ---------- helpers ---------- */
const tableHTML=(head,rows)=>`<div class="tbl"><table>${head?`<thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>`:''}<tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const codeHTML=(c,l)=>`<div class="codebox"><div class="codebar"><span>${esc(l||'python')}</span><button class="btn small" data-copy>Copy</button></div><pre><code>${esc(String(c).replace(/^\n/,'').replace(/\s+$/,''))}</code></pre></div>`;
const node=(tag,cls,html)=>{const d=document.createElement(tag);if(cls)d.className=cls;if(html!=null)d.innerHTML=html;return d};

/* ---------- block renderers ---------- */
const R={};
R.text=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="prose">${b.html}</div>`);
R.table=(b,p)=>p.insertAdjacentHTML('beforeend',tableHTML(b.head,b.rows)+(b.note?`<p class="muted small">${b.note}</p>`:''));
R.grid=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="${b.cols===2?'grid2':'grid3'}">${b.items.map(i=>`<div class="optcard">${i.tag?`<span><span class="tag ${i.tc||''}">${i.tag}</span></span>`:''}<h4>${i.title}</h4><div class="small">${i.body}</div></div>`).join('')}</div>`);
R.code=(b,p)=>p.insertAdjacentHTML('beforeend',codeHTML(b.code,b.lang)+(b.note?`<p class="muted small">${b.note}</p>`:''));
R.task=(b,p)=>p.insertAdjacentHTML('beforeend',`<ul class="clean">${b.items.map(i=>`<li>${i}</li>`).join('')}</ul>`);

R.cards=(b,p)=>{let sel=0;const row=node('div','loop'),det=node('div','think');p.append(row,det);
  const draw=()=>{row.innerHTML=b.items.map((s,i)=>`<button aria-pressed="${i===sel}" data-i="${i}"><span class="loop-num">${s.tag||('Step '+(i+1))}</span><b>${s.title}</b>${s.sub?`<span>${s.sub}</span>`:''}</button>`).join('');det.innerHTML=b.items[sel].body};
  row.addEventListener('click',e=>{const x=e.target.closest('button');if(!x)return;sel=+x.dataset.i;draw()});draw()};

function quiz(b,p,key,optsOf,okWord){let ans=store.get(key,{});const top=node('div','row','<span class="score"></span><button class="btn small">Reset</button>'),g=node('div',b.cols===3?'grid3':'grid2');p.append(top,g);
  const draw=()=>{let r=0,d=0;g.innerHTML=b.items.map((x,i)=>{const a=ans[i],O=optsOf(x);let c='',fb='';if(a!==undefined){d++;const ok=a===x.a;if(ok)r++;c=ok?'right':'wrong';fb=`<p class="fb"><span class="tag ${ok?'green':'red'}">${ok?okWord:'Not quite'}</span> <b>${O[x.a]}.</b> ${x.why||''}</p>`}
    return `<div class="qcard ${c}"><div>${x.q}</div><div class="acts">${O.map((l,j)=>`<button class="btn small" data-i="${i}" data-j="${j}" aria-pressed="${a===j}">${l}</button>`).join('')}</div>${fb}</div>`}).join('');
    top.firstChild.textContent=`${r} / ${d} correct`+(d===b.items.length?' · all answered':` · ${b.items.length-d} left`)};
  g.addEventListener('click',e=>{const x=e.target.closest('[data-j]');if(!x)return;ans[x.dataset.i]=+x.dataset.j;store.set(key,ans);draw()});
  top.lastChild.addEventListener('click',()=>{ans={};store.set(key,ans);draw()});draw()}
R.sort=(b,p,key)=>quiz(b,p,key,()=>b.labels||['Ask it','Skip it'],'Correct');
R.mcq=(b,p,key)=>quiz(b,p,key,x=>x.opts,'Correct');

R.reveal=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="${b.cols===2?'grid2':'grid3'}">${b.items.map(i=>`<div class="optcard"><div>${i.q}</div><button class="btn small" data-reveal>Reveal</button><div class="answer" hidden>${i.a}${i.code?codeHTML(i.code,i.lang):''}</div></div>`).join('')}</div>`);

R.flash=(b,p)=>{const g=node('div','grid3',b.items.map((c,i)=>`<button class="flash" aria-pressed="false"><span class="q">${c[0]}</span><span class="a" hidden>${c[1]}</span><span class="hint">Click to flip</span></button>`).join(''));p.appendChild(g);
  g.addEventListener('click',e=>{const x=e.target.closest('.flash');if(!x)return;const on=x.getAttribute('aria-pressed')!=='true';x.setAttribute('aria-pressed',String(on));x.querySelector('.a').hidden=!on;x.querySelector('.hint').textContent=on?'Click to hide':'Click to flip'})};

R.drill=(b,p)=>{const d=node('div','drill','Press "Draw".');const row=node('div','row',`<button class="btn primary">${b.button||'Draw a scenario'}</button><button class="btn" data-reveal>Show a model answer</button><div class="answer" hidden>Draw first.</div>`);p.append(d,row);let di=-1;
  row.firstChild.addEventListener('click',()=>{let x;do{x=Math.floor(Math.random()*b.items.length)}while(x===di&&b.items.length>1);di=x;d.textContent=(b.prefix||'')+b.items[x][0];row.lastChild.innerHTML=b.items[x][1]})};

R.rubric=(b,p,key)=>{const rv=store.get(key,{});const box=node('div'),tot=node('div','row');p.append(box,tot);const max=b.rows.length*3;
  const draw=()=>{box.innerHTML=b.rows.map((r,i)=>`<div class="rub-row"><div><b>${r[0]}</b><small>3 = ${r[1]}</small></div><div class="row">${[1,2,3].map(s=>`<button class="btn small" data-r="${i}" data-s="${s}" aria-pressed="${rv[i]===s}">${s}</button>`).join('')}</div></div>`).join('');
    const vals=Object.values(rv),t=vals.reduce((a,c)=>a+c,0);
    tot.innerHTML=`<span class="total">${t} / ${max}</span><span class="muted">${vals.length<b.rows.length?`Score each row (${vals.length} of ${b.rows.length}).`:t>=max*.85?'Ready. Keep doing one mock a day.':t>=max*.62?'Close. Repeat the practice problem with a new prompt.':'Redo the guided problem slowly, then try again.'}</span>`};
  box.addEventListener('click',e=>{const x=e.target.closest('[data-r]');if(!x)return;rv[x.dataset.r]=+x.dataset.s;store.set(key,rv);draw()});draw()};

R.checklist=(b,p,key)=>{const cv=store.get(key,{});const id=key.replace(/[^a-z0-9]/gi,'');p.insertAdjacentHTML('beforeend',`<div class="col" style="gap:8px">${b.items.map((c,i)=>`<label class="check" for="${id}c${i}"><input type="checkbox" id="${id}c${i}" data-i="${i}" ${cv[i]?'checked':''}><span>${c}</span></label>`).join('')}</div>`);
  p.addEventListener('change',e=>{if(e.target.dataset.i==null)return;cv[e.target.dataset.i]=e.target.checked;store.set(key,cv)})};

R.notes=(b,p,key)=>{const id=key.replace(/[^a-z0-9]/gi,'')+'n';p.insertAdjacentHTML('beforeend',`<label for="${id}">${b.label||'Your notes'}<textarea id="${id}" placeholder="${esc(b.placeholder||'')}" style="min-height:${b.rows?b.rows*22:110}px"></textarea></label><span class="muted small">Saved in this browser only.</span>`);
  const t=$('#'+id,p);t.value=store.get(key,'');t.addEventListener('input',()=>store.set(key,t.value))};

R.timer=(b,p)=>{const T=b.total||1800;let s=0,run=false,id=null;const unl=b.cards.map(()=>false);
  const w=node('div','grid2',`<div class="panel nested"><div class="row spread"><span class="bigtimer"></span><div class="row"><button class="btn primary" data-a="go">Start</button><button class="btn" data-a="skip">+1 min</button><button class="btn" data-a="reset">Reset</button></div></div><div class="phases"></div></div><div class="col">${b.cards.map((c,i)=>`<div class="card-change" data-c="${i}"><div class="row spread"><span class="tag red">${c.label}</span><button class="btn small" data-u="${i}">Unlock now</button></div><p class="locked muted">Locked. Keep designing.</p><div class="body col" style="gap:6px" hidden><h4>${c.title}</h4><p class="muted">${c.body}</p></div></div>`).join('')}</div>`);
  p.appendChild(w);const go=$('[data-a=go]',w);
  const draw=()=>{$('.bigtimer',w).textContent=fmt(T-s);$('.phases',w).innerHTML=b.phases.map(x=>`<div class="phase ${s>=x[0]&&s<x[1]?'now':s>=x[1]?'past':''}"><span class="mono">${fmt(x[0])}–${fmt(x[1])}</span><span>${x[2]}</span></div>`).join('');
    b.cards.forEach((c,i)=>{if(s>=c.at)unl[i]=true;const el=$(`[data-c="${i}"]`,w);el.classList.toggle('open',unl[i]);$('.locked',el).hidden=unl[i];$('.body',el).hidden=!unl[i];$('[data-u]',el).hidden=unl[i]})};
  w.addEventListener('click',e=>{const a=e.target.closest('[data-a]'),u=e.target.closest('[data-u]');
    if(u){unl[+u.dataset.u]=true;draw();return}if(!a)return;
    if(a.dataset.a==='go'){if(s>=T)return;run=!run;go.textContent=run?'Pause':'Resume';if(run)id=every(()=>{s++;if(s>=T){s=T;run=false;clearInterval(id);go.textContent='Done'}draw()},1000);else clearInterval(id)}
    if(a.dataset.a==='skip'){s=Math.min(T-1,s+60);draw()}
    if(a.dataset.a==='reset'){run=false;clearInterval(id);s=0;unl.fill(false);go.textContent='Start';draw()}});draw()};

R.stepper=(b,p,key,ses)=>{let gi=0;const done=new Set();
  const nav=node('nav','stepper-nav'),bar=node('div','thinkbar','<span>Think time</span><span class="mono tt"></span><button class="btn small primary">Start</button><button class="btn small">Reset</button><span class="muted small msg"></span>'),body=node('div'),foot=node('div','row spread','<button class="btn">← Previous step</button><button class="btn primary">Next step →</button>');
  nav.setAttribute('aria-label','Steps');p.append(nav,bar,body,foot);
  const panes=b.steps.map((s,i)=>{const d=node('div','gstep',`<h3>Step ${i+1} · ${s.title}</h3>${s.think?`<div class="think">${s.think}</div>`:''}${s.body?`<div class="prose">${s.body}</div>`:''}${(s.answer||s.code)?`<button class="btn" data-reveal>Reveal model answer</button><div class="answer" hidden>${s.answer||''}${s.code?codeHTML(s.code,s.lang):''}</div>`:''}`);
    if(s.blocks){const c=node('div','col');d.appendChild(c);renderBlocks(s.blocks,c,key+'.'+i,ses,true)}body.appendChild(d);return d});
  let left=0,run=false,id=null;const tt=$('.tt',bar),go=bar.children[2],rs=bar.children[3],msg=$('.msg',bar);
  const setT=()=>{clearInterval(id);run=false;left=b.steps[gi].secs||120;go.textContent='Start';bar.classList.remove('over');msg.textContent='Answer before you reveal.';tt.textContent=fmt(left)};
  const draw=()=>{panes.forEach((d,i)=>d.hidden=i!==gi);nav.innerHTML=b.steps.map((s,i)=>`<button data-i="${i}" ${i===gi?'aria-current="step"':''} class="${done.has(i)&&i!==gi?'done':''}">${i+1}. ${s.short||s.title}</button>`).join('');foot.children[0].disabled=gi===0;foot.children[1].textContent=gi===b.steps.length-1?'Finish':'Next step →';setT()};
  nav.addEventListener('click',e=>{const x=e.target.closest('button');if(x){gi=+x.dataset.i;draw()}});
  foot.children[0].addEventListener('click',()=>{if(gi>0){gi--;draw()}});
  foot.children[1].addEventListener('click',()=>{done.add(gi);if(gi<b.steps.length-1){gi++;draw()}else{draw();msg.textContent='All steps done. Write your summary.'}});
  go.addEventListener('click',()=>{run=!run;go.textContent=run?'Pause':'Resume';if(run){id=every(()=>{left--;tt.textContent=(left<0?'+':'')+fmt(Math.abs(left));if(left<=0){bar.classList.add('over');msg.textContent='Time. Reveal and compare.'}},1000)}else clearInterval(id)});
  rs.addEventListener('click',setT);draw()};

/* architecture lab: nodes/edges with optional parts (data-o) that toggle, and failure scenarios */
R.arch=(b,p,key)=>{const on={};(b.toggles||[]).forEach(t=>on[t.id]=!!t.on);const mk='ah'+key.replace(/[^a-z0-9]/gi,'');
  const nSVG=n=>{const h=n.h||56,ly=n.sub?n.y+h/2-3:n.y+h/2+4;return `<g class="node" data-n="${n.id}" data-o="${n.opt||''}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${h}" rx="8"/><text class="nl" x="${n.x+n.w/2}" y="${ly}">${n.label}</text>${n.sub!=null?`<text class="sub" x="${n.x+n.w/2}" y="${ly+16}">${n.sub}</text>`:''}</g>`};
  const eSVG=e=>`<path class="edge${e.dash?' dash':''}" data-o="${e.opt||''}" d="${e.d}" ${e.arrow===false?'':`marker-end="url(#${mk})"`}/>`+(e.label?`<text class="elabel" data-o="${e.opt||''}" x="${e.lx}" y="${e.ly}" ${e.anchor?`text-anchor="${e.anchor}"`:''}>${e.label}</text>`:'');
  const svg=`<svg viewBox="0 0 ${b.w} ${b.h}" style="min-width:${Math.round(b.w*.82)}px" role="img" aria-label="${esc(b.aria||b.title||'Architecture')}"><defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrowhead" d="M0 0L10 5L0 10z"/></marker></defs>${b.edges.map(eSVG).join('')}${b.nodes.map(nSVG).join('')}</svg>`;
  const hasSide=(b.toggles&&b.toggles.length)||(b.fails&&b.fails.length);
  const lab=node('div',hasSide?'lab':'',`<div class="svgbox">${svg}</div>${hasSide?`<div class="col" style="gap:14px">${b.toggles&&b.toggles.length?`<div><h4 style="margin-bottom:6px">${b.toggleTitle||'Add a part'}</h4><div class="toggles">${b.toggles.map(t=>`<button class="btn" data-t="${t.id}" aria-pressed="false">${t.label}</button>`).join('')}</div></div>`:''}${b.fails&&b.fails.length?`<div><h4 style="margin-bottom:6px">${b.failTitle||'Break something'}</h4><div class="fails">${b.fails.map((f,i)=>`<button class="btn danger" data-f="${i}">${f.label}</button>`).join('')}</div></div>`:''}</div>`:''}`);
  const out=node('div','outcome',b.start||'Add parts, then break something and read what happens.');out.setAttribute('aria-live','polite');p.append(lab);if(hasSide)p.append(out);
  const draw=()=>{$$('[data-o]',lab).forEach(x=>{const o=x.dataset.o;if(!o){x.classList.remove('off');return}const neg=o[0]==='!',k=neg?o.slice(1):o;x.classList.toggle('off',neg?!!on[k]:!on[k])});
    b.nodes.forEach(n=>{if(!n.swap)return;const g=$(`[data-n="${n.id}"]`,lab),use=on[n.swap.when];$('.nl',g).textContent=use?n.swap.label:n.label;const sb=$('.sub',g);if(sb)sb.textContent=use?(n.swap.sub||''):(n.sub||'')});
    $$('[data-t]',lab).forEach(x=>x.setAttribute('aria-pressed',String(!!on[x.dataset.t])));$$('.node',lab).forEach(x=>x.classList.remove('hit','okhit'))};
  lab.addEventListener('click',e=>{const t=e.target.closest('[data-t]'),f=e.target.closest('[data-f]');
    if(t){on[t.dataset.t]=!on[t.dataset.t];draw();out.className='outcome';const names=(b.toggles||[]).filter(x=>on[x.id]).map(x=>x.label);out.textContent='Parts added: '+(names.join(', ')||'none')+'. '+(b.fails&&b.fails.length?'Now break something.':'')}
    if(f){const r=b.fails[+f.dataset.f].run(on);draw();(r.hits||[]).forEach(id=>{const g=$(`[data-n="${id}"]`,lab);if(g)g.classList.add('hit')});(r.oks||[]).forEach(id=>{const g=$(`[data-n="${id}"]`,lab);if(g)g.classList.add('okhit')});
      out.className='outcome '+r.lvl;out.innerHTML=`<span class="tag ${r.lvl==='bad'?'red':r.lvl==='warn'?'amber':'green'}">${r.lvl==='bad'?'Outage':r.lvl==='warn'?'Degraded':'Handled'}</span> ${r.txt}`}});
  draw()};

/* UML class diagram: auto-sized classes, relationship markers, click a class to read its responsibility */
R.uml=(b,p,key)=>{const id=key.replace(/[^a-z0-9]/gi,'');const C={};
  b.classes.forEach(c=>{const f=c.fields||[],m=c.methods||[];const longest=Math.max(c.name.length*8.6,...f.map(s=>s.length*6.95),...m.map(s=>s.length*6.95),60);const w=c.w||Math.ceil(longest+22);const hh=c.kind?42:30;const fb=f.length?f.length*16+10:8,mb=m.length?m.length*16+10:8;C[c.id]=Object.assign({},c,{w,h:hh+fb+mb,hh,fb})});
  const clip=(c,tx,ty)=>{const cx=c.x+c.w/2,cy=c.y+c.h/2,dx=tx-cx,dy=ty-cy;if(!dx&&!dy)return[cx,cy];const t=Math.min(dx?(c.w/2)/Math.abs(dx):Infinity,dy?(c.h/2)/Math.abs(dy):Infinity);return[cx+dx*t,cy+dy*t]};
  const ctr=c=>[c.x+c.w/2,c.y+c.h/2];
  const rel=r=>{let A=C[r.from],B=C[r.to];if(!A||!B)return'';const owner=r.type==='has'||r.type==='agg';if(owner){const t=A;A=B;B=t}
    const a=clip(A,...ctr(B)),z=clip(B,...ctr(A));const mk={is:'tri',impl:'tri',has:'dia',agg:'diah',uses:'open',assoc:'open'}[r.type]||'open';
    const dash=r.type==='impl'||r.type==='uses';const mx=(a[0]+z[0])/2,my=(a[1]+z[1])/2;
    return `<path class="rel${dash?' dash':''}" d="M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${z[0].toFixed(1)} ${z[1].toFixed(1)}" marker-end="url(#${id}${mk})"/>`+(r.label?`<text class="rlabel" x="${mx+6}" y="${my-6}">${r.label}</text>`:'')};
  const cls=c=>{c=C[c.id];const x=c.x,y=c.y;let s=`<g class="cls" data-c="${c.id}" tabindex="0" role="button" aria-label="${esc(c.name)}"><rect class="box" x="${x}" y="${y}" width="${c.w}" height="${c.h}" rx="6"/>`;
    if(c.kind)s+=`<text class="stereo" x="${x+c.w/2}" y="${y+16}">«${c.kind}»</text>`;
    s+=`<text class="cname" x="${x+c.w/2}" y="${y+(c.kind?33:20)}">${esc(c.name)}</text><line class="div" x1="${x}" x2="${x+c.w}" y1="${y+c.hh}" y2="${y+c.hh}"/>`;
    (c.fields||[]).forEach((f,i)=>s+=`<text class="mem" x="${x+10}" y="${y+c.hh+18+i*16}">${esc(f)}</text>`);
    s+=`<line class="div" x1="${x}" x2="${x+c.w}" y1="${y+c.hh+c.fb}" y2="${y+c.hh+c.fb}"/>`;
    (c.methods||[]).forEach((m,i)=>s+=`<text class="mem" x="${x+10}" y="${y+c.hh+c.fb+18+i*16}">${esc(m)}</text>`);return s+'</g>'};
  const W=b.w||Math.max(...Object.values(C).map(c=>c.x+c.w))+20,H=b.h||Math.max(...Object.values(C).map(c=>c.y+c.h))+20;
  const defs=`<defs><marker id="${id}tri" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto"><path class="mk-hollow" d="M0 0L12 6L0 12z"/></marker><marker id="${id}dia" viewBox="0 0 16 10" refX="16" refY="5" markerWidth="16" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto"><path class="mk-fill" d="M0 5L8 0L16 5L8 10z"/></marker><marker id="${id}diah" viewBox="0 0 16 10" refX="16" refY="5" markerWidth="16" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto"><path class="mk-hollow" d="M0 5L8 0L16 5L8 10z"/></marker><marker id="${id}open" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto"><path class="mk-open" d="M0 0L10 5L0 10"/></marker></defs>`;
  const box=node('div','svgbox',`<svg class="uml" viewBox="0 0 ${W} ${H}" style="min-width:${Math.round(W*.8)}px" role="img" aria-label="${esc(b.title||'Class diagram')}">${defs}${(b.rels||[]).map(rel).join('')}${b.classes.map(cls).join('')}</svg>`);
  const det=node('div','think',b.hint||'Click a class to see what it is responsible for.');
  const leg=node('div','legend','<span>▷ hollow triangle: inherits / implements (dashed)</span><span>◆ filled diamond: owns (composition)</span><span>◇ hollow diamond: has (aggregation)</span><span>→ uses / knows about (dashed = depends on)</span>');
  p.append(box,leg,det);
  const pick=g=>{$$('g.cls',box).forEach(x=>x.classList.toggle('sel',x===g));const c=C[g.dataset.c];det.innerHTML=`<b>${esc(c.name)}</b>${c.kind?` <span class="tag lld">${c.kind}</span>`:''}<div>${c.note||'No note.'}</div>`};
  box.addEventListener('click',e=>{const g=e.target.closest('g.cls');if(g)pick(g)});box.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('g.cls')){e.preventDefault();pick(e.target.closest('g.cls'))}})};

R.lab=(b,p,key,ses)=>{const fn=(ses.labs&&ses.labs[b.fn])||SHARED[b.fn];const c=node('div','col');p.appendChild(c);if(!fn){c.textContent='Lab not found: '+b.fn;return}
  fn(c,{get:(k,d)=>store.get(key+':'+k,d),set:(k,v)=>store.set(key+':'+k,v),every,esc,fmt,$,$$,node,codeHTML,tableHTML,arg:b.arg})};

/* ---------- in-browser Python (Pyodide in a Web Worker, so infinite loops can be stopped) ---------- */
const PYO='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const HARNESS=[
'import json, traceback',
'def __where(e):',
'    frames=[f for f in traceback.extract_tb(e.__traceback__) if f.filename=="your_code.py"]',
'    at=(" (line %d)" % frames[-1].lineno) if frames else ""',
'    return "%s: %s%s" % (type(e).__name__, e, at)',
'def __run():',
'    ns={"__name__":"__main__"}',
'    try:',
'        exec(compile(__user_code,"your_code.py","exec"), ns)',
'    except SyntaxError as e:',
'        return json.dumps({"error":"SyntaxError: %s (line %s)" % (e.msg, e.lineno)})',
'    except Exception as e:',
'        return json.dumps({"error":__where(e)})',
'    results=[]',
'    for call, expected, mode in json.loads(__tests_json):',
'        try:',
'            got=eval(call, ns)',
'            exp=eval(expected, ns)',
'            if mode=="unordered": ok=sorted(map(repr,got))==sorted(map(repr,exp))',
'            elif mode=="float": ok=abs(got-exp)<1e-6',
'            else: ok=(got==exp)',
'            results.append([call, bool(ok), repr(got), repr(exp)])',
'        except Exception as e:',
'            results.append([call, False, __where(e), expected])',
'    return json.dumps({"results":results})',
'__run()'].join('\n');
const WORKER=`importScripts('${PYO}pyodide.js');
let py=null;
const ready=loadPyodide({indexURL:'${PYO}'}).then(p=>{py=p;postMessage({type:'ready'})}).catch(e=>postMessage({type:'fatal',msg:String(e)}));
onmessage=async e=>{await ready;if(!py)return;const d=e.data;let out='';
 py.setStdout({batched:s=>{out+=s+'\\n'}});py.setStderr({batched:s=>{out+=s+'\\n'}});
 try{py.globals.set('__user_code',d.code);py.globals.set('__tests_json',JSON.stringify(d.tests||[]));
  const r=py.runPython(${JSON.stringify(HARNESS)});postMessage({id:d.id,out,res:JSON.parse(r)})}
 catch(err){postMessage({id:d.id,out,res:{error:String(err&&err.message||err)}})}};`;
const PY={w:null,ready:null,seq:0,pending:{},loaded:false};
function pyStart(){if(PY.w)return PY.ready;const url=URL.createObjectURL(new Blob([WORKER],{type:'text/javascript'}));PY.w=new Worker(url);
  PY.ready=new Promise((res,rej)=>{PY.w.onmessage=e=>{const d=e.data;if(d.type==='ready'){PY.loaded=true;res()}else if(d.type==='fatal'){rej(new Error(d.msg))}else{const p=PY.pending[d.id];if(p){clearTimeout(p.t);delete PY.pending[d.id];p.res(d)}}};PY.w.onerror=ev=>rej(new Error(ev.message||'worker error'))});
  PY.ready.catch(()=>{PY.w=null});return PY.ready}
async function runPy(code,tests,status){if(!PY.loaded&&status)status('Loading Python in your browser (first time ≈ 10 MB, then cached)…');
  try{await pyStart()}catch(err){return {res:{error:'Could not load Python: '+err.message+'. Check your internet connection, or run the code in your own editor.'}}}
  if(status)status('Running…');
  return new Promise(res=>{const id=++PY.seq;const t=setTimeout(()=>{delete PY.pending[id];PY.w.terminate();PY.w=null;PY.loaded=false;res({timeout:true})},8000);PY.pending[id]={res,t};PY.w.postMessage({id,code,tests})})}

const solvedAll=()=>store.get('solved',{});
function editorKeys(ta,onRun){ta.addEventListener('keydown',e=>{const ins=t=>{if(!document.execCommand('insertText',false,t))ta.setRangeText(t,ta.selectionStart,ta.selectionEnd,'end')};
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();onRun();return}
  if(e.key==='Tab'&&!e.shiftKey){e.preventDefault();ins('    ')}
  else if(e.key==='Enter'){const v=ta.value,s=ta.selectionStart,ls=v.lastIndexOf('\n',s-1)+1,line=v.slice(ls,s);let ind=(line.match(/^[ ]*/)||[''])[0];if(/:\s*$/.test(line))ind+='    ';e.preventDefault();ins('\n'+ind)}})}
function showRun(out,resEl,r,tests){out.textContent='';resEl.innerHTML='';
  if(r.timeout){out.textContent='Stopped after 8 seconds. Is there an infinite loop?';return null}
  const res=r.res||{};let txt=(r.out||'').replace(/\s+$/,'');if(res.error)txt+=(txt?'\n':'')+res.error;out.textContent=txt||(tests?'':'(no output: use print() to see values)');
  out.style.color=res.error?'var(--marker)':'';
  if(!tests||!res.results)return null;const pass=res.results.filter(x=>x[1]).length;
  resEl.innerHTML=`<b>${pass} / ${res.results.length} tests passed</b>`+res.results.map(x=>`<span class="${x[1]?'p':'f'}">${x[1]?'✓':'✗'} ${esc(x[0])}${x[1]?'':`  → got ${esc(x[2])}, expected ${esc(x[3])}`}</span>`).join('');
  return pass===res.results.length}

R.exercise=(b,p,key)=>{const id=key.replace(/[^a-z0-9]/gi,'');const saved=store.get('code:'+key,null);const solved=()=>!!solvedAll()[key];
  p.insertAdjacentHTML('beforeend',`<div class="prose">${b.prompt}</div><textarea class="ex-ed" id="${id}e" aria-label="Your code" spellcheck="false" autocapitalize="off" autocomplete="off" style="min-height:${Math.max(160,(b.starter.split('\n').length+3)*22)}px"></textarea>
   <div class="row"><button class="btn" data-x="run">Run</button><button class="btn primary" data-x="check">Check (${b.tests.length} tests)</button><button class="btn small" data-x="reset">Reset</button>${b.hint?'<button class="btn small" data-reveal>Show hint</button><div class="answer" hidden>'+b.hint+'</div>':''}<button class="btn small" data-reveal>Show solution</button><div class="answer" hidden>${codeHTML(b.solution)}${b.explain?'<p>'+b.explain+'</p>':''}</div><span class="ex-status" data-x="st">${solved()?'<span class="solved-badge">✓ Solved</span>':'Ctrl+Enter runs'}</span></div>
   <div class="ex-out" data-x="out" aria-live="polite">Output appears here.</div><div class="ex-res" data-x="res"></div>`);
  const ta=$('#'+id+'e',p),out=$('[data-x=out]',p),resEl=$('[data-x=res]',p),st=$('[data-x=st]',p);
  ta.value=saved!=null?saved:b.starter.replace(/^\n/,'');ta.addEventListener('input',()=>store.set('code:'+key,ta.value));
  const go=async check=>{$$('[data-x=run],[data-x=check]',p).forEach(x=>x.disabled=true);const r=await runPy(ta.value,check?b.tests.map(t=>[t[0],t[1],t[2]||'']):null,m=>st.textContent=m);
    $$('[data-x=run],[data-x=check]',p).forEach(x=>x.disabled=false);const all=showRun(out,resEl,r,check);
    if(check&&all){const s=solvedAll();s[key]=true;store.set('solved',s)}st.innerHTML=solved()?'<span class="solved-badge">✓ Solved</span>':(check&&all===false?'Not yet: read the failing test.':'Ctrl+Enter runs')};
  editorKeys(ta,()=>go(false));
  p.addEventListener('click',e=>{const x=e.target.closest('[data-x]');if(!x)return;if(x.dataset.x==='run')go(false);if(x.dataset.x==='check')go(true);if(x.dataset.x==='reset'){ta.value=b.starter.replace(/^\n/,'');store.set('code:'+key,ta.value);out.textContent='Output appears here.';out.style.color='';resEl.innerHTML=''}})};

R.code=(b,p)=>{p.insertAdjacentHTML('beforeend',codeHTML(b.code,b.lang)+(b.note?`<p class="muted small">${b.note}</p>`:''));
  if(b.run===false||(b.lang&&b.lang!=='python'))return;const row=node('div','row','<button class="btn small">▶ Run this code</button><span class="ex-status"></span>'),out=node('div','ex-out');out.hidden=true;p.append(row,out);
  row.firstChild.addEventListener('click',async()=>{row.firstChild.disabled=true;out.hidden=false;const r=await runPy(String(b.code).replace(/^\n/,''),null,m=>row.lastChild.textContent=m);row.firstChild.disabled=false;row.lastChild.textContent='';showRun(out,node('div'),r,false)})};


function renderBlocks(blocks,container,kp,ses,nested){blocks.forEach((b,i)=>{const key=kp+'.'+i;
  if(b.t==='teacher'){container.appendChild(node('details','teacher',`<summary>${b.title||'Teacher notes'}</summary><ul class="clean">${b.items.map(x=>`<li>${x}</li>`).join('')}</ul>`));return}
  const pnl=node('div','panel'+(nested?' nested':''),(b.title?`<h3>${b.title}</h3>`:'')+(b.intro?`<p class="intro">${b.intro}</p>`:''));container.appendChild(pnl);
  if(R[b.t])R[b.t](b,pnl,key,ses);else pnl.insertAdjacentHTML('beforeend','<p>Unknown block: '+esc(b.t)+'</p>')})}

/* ---------- shared labs ---------- */
const SHARED={};
/* ---------- shared lab: sorting visualizer (sessions 9 and 10) ---------- */
SHARED.sorter=(el,api)=>{const algs=api.arg||['bubble','selection','insertion','merge','quick'];const NAMES={bubble:'Bubble',selection:'Selection',insertion:'Insertion',merge:'Merge',quick:'Quick (Lomuto)'};
  let alg=algs[0],frames=[],fi=0,timer=null,arr=[];
  el.innerHTML=`<div class="row">${algs.map(a=>`<button class="btn small" data-a="${a}" aria-pressed="${a===alg}">${NAMES[a]}</button>`).join('')}<span class="muted small" style="margin-left:8px">Input:</span><button class="btn small" data-in="random">Random</button><button class="btn small" data-in="nearly">Nearly sorted</button><button class="btn small" data-in="reversed">Reversed</button></div>
   <div class="svgbox"><svg viewBox="0 0 640 200" data-svg role="img" aria-label="Bars being sorted"></svg></div>
   <div class="row"><button class="btn" data-c="back">◀ Step</button><button class="btn primary" data-c="play">▶ Play</button><button class="btn" data-c="step">Step ▶</button><button class="btn small" data-c="end">Skip to end</button><span class="mono small" data-info></span></div>
   <div class="verdict small" data-msg></div>`;
  const gen=kind=>{let a=Array.from({length:16},(_,i)=>i+1);if(kind==='reversed')a.reverse();else if(kind==='nearly'){[[2,3],[9,10],[13,14]].forEach(([i,j])=>{[a[i],a[j]]=[a[j],a[i]]})}else{let s=11;for(let i=a.length-1;i>0;i--){s=(s*9301+49297)%233280;const j=Math.floor(s/233280*(i+1));[a[i],a[j]]=[a[j],a[i]]}}return a};
  const record=(a0,kind)=>{const a=a0.slice(),F=[];let cmp=0,mv=0;const snap=(hl,msg,sorted)=>F.push({a:a.slice(),hl:hl||[],msg,cmp,mv,sorted:sorted||[]});snap([],'Start');
    if(kind==='bubble'){for(let i=0;i<a.length;i++){let sw=false;for(let j=0;j<a.length-1-i;j++){cmp++;snap([j,j+1],`Compare ${a[j]} and ${a[j+1]}`);if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];mv++;sw=true;snap([j,j+1],'Swap')}}if(!sw){snap([],'No swaps in a full pass: sorted early');break}}}
    if(kind==='selection'){for(let i=0;i<a.length;i++){let m=i;for(let j=i+1;j<a.length;j++){cmp++;if(a[j]<a[m])m=j}snap([i,m],`Smallest of the rest is ${a[m]}`);if(m!==i){[a[i],a[m]]=[a[m],a[i]];mv++;snap([i],'Swap it into place')}}}
    if(kind==='insertion'){for(let i=1;i<a.length;i++){let j=i;snap([i],`Insert ${a[i]} into the sorted left part`);while(j>0){cmp++;if(a[j-1]>a[j]){[a[j-1],a[j]]=[a[j],a[j-1]];mv++;j--;snap([j],'Shift left')}else break}}}
    if(kind==='merge'){const ms=(lo,hi)=>{if(hi-lo<1)return;const mid=(lo+hi)>>1;ms(lo,mid);ms(mid+1,hi);const L=a.slice(lo,mid+1),Rr=a.slice(mid+1,hi+1);let i=0,j=0,k=lo;while(i<L.length&&j<Rr.length){cmp++;a[k++]=L[i]<=Rr[j]?L[i++]:Rr[j++];mv++}while(i<L.length){a[k++]=L[i++];mv++}while(j<Rr.length){a[k++]=Rr[j++];mv++}snap(Array.from({length:hi-lo+1},(_,x)=>lo+x),`Merged positions ${lo}–${hi}`)};ms(0,a.length-1)}
    if(kind==='quick'){const qs=(lo,hi)=>{if(lo>=hi)return;const pv=a[hi];let i=lo;snap([hi],`Pivot ${pv}`);for(let j=lo;j<hi;j++){cmp++;if(a[j]<pv){[a[i],a[j]]=[a[j],a[i]];mv++;i++}}[a[i],a[hi]]=[a[hi],a[i]];mv++;snap([i],`Pivot ${pv} is now in its final place`);qs(lo,i-1);qs(i+1,hi)};qs(0,a.length-1)}
    snap([],'Sorted',a.map((_,i)=>i));return F};
  const draw=()=>{const f=frames[fi],n=f.a.length,w=600/n;api.$('[data-svg]',el).innerHTML=f.a.map((v,i)=>{const h=v/16*170,on=f.hl.includes(i),done=f.sorted.includes(i);return `<rect x="${20+i*w+2}" y="${190-h}" width="${w-4}" height="${h}" rx="3" fill="${done?'var(--good)':on?'var(--warn)':'var(--accent)'}" opacity="${on||done?1:.55}"/><text x="${20+i*w+w/2}" y="${186-h}" text-anchor="middle" font-size="11" fill="var(--muted)">${v}</text>`}).join('');
    api.$('[data-info]',el).textContent=`step ${fi}/${frames.length-1} · comparisons ${f.cmp} · moves ${f.mv}`;api.$('[data-msg]',el).textContent=f.msg};
  const reset=kind=>{arr=gen(kind||'random');frames=record(arr,alg);fi=0;stop();draw()};
  const stop=()=>{clearInterval(timer);timer=null;api.$('[data-c=play]',el).textContent='▶ Play'};
  el.addEventListener('click',e=>{const a=e.target.closest('[data-a]'),i=e.target.closest('[data-in]'),c=e.target.closest('[data-c]');
    if(a){alg=a.dataset.a;api.$$('[data-a]',el).forEach(x=>x.setAttribute('aria-pressed',String(x===a)));frames=record(arr,alg);fi=0;stop();draw()}
    if(i)reset(i.dataset.in);
    if(c){const k=c.dataset.c;if(k==='step'&&fi<frames.length-1){fi++;draw()}if(k==='back'&&fi>0){fi--;draw()}if(k==='end'){stop();fi=frames.length-1;draw()}
      if(k==='play'){if(timer)stop();else{if(fi>=frames.length-1)fi=0;c.textContent='❚❚ Pause';timer=api.every(()=>{if(fi>=frames.length-1){stop();return}fi++;draw()},180)}}}});
  reset('random')};


/* ---------- class clock (per session) ---------- */
let clk={sid:null,s:0,run:false,id:null,blocks:[]};
function clockFor(ses){if(clk.sid===ses.id)return;clearInterval(clk.id);let acc=0;clk={sid:ses.id,s:store.get('clock:'+ses.id,0),run:false,id:null,blocks:ses.modules.map((m,i)=>{const b=[acc*60,(acc+m.mins)*60,m.title,i];acc+=m.mins;return b})};
  $('#clockBar').innerHTML=clk.blocks.map(b=>`<span style="flex:${b[1]-b[0]}"><i></i></span>`).join('');$('#clockGo').textContent=clk.s>0?'Resume':'Start class';drawClock()}
function drawClock(){if(!clk.sid)return;const T=clk.blocks.length?clk.blocks[clk.blocks.length-1][1]:7200,s=clk.s;$('#clockTime').textContent=fmtH(s);
  const bi=clk.blocks.findIndex(b=>s>=b[0]&&s<b[1]);const started=s>0||clk.run;
  $('#clockNow').textContent=s>=T?'Time is up · well done':!started?'Not started · '+fmtH(T)+' planned':'Now: '+clk.blocks[bi][2]+' · '+fmt(clk.blocks[bi][1]-s)+' left';
  $$('#clockBar i').forEach((el,i)=>{const b=clk.blocks[i];el.style.width=Math.min(100,Math.max(0,(s-b[0])/(b[1]-b[0])*100))+'%'});
  $$('#modTabs .tab').forEach(t=>t.classList.toggle('live',started&&bi>=0&&+t.dataset.m===bi));$$('.agenda-row').forEach(r=>r.classList.toggle('now',started&&+r.dataset.b===bi))}
$('#clockGo').addEventListener('click',()=>{clk.run=!clk.run;$('#clockGo').textContent=clk.run?'Pause':'Resume';const T=clk.blocks[clk.blocks.length-1][1];
  if(clk.run){clk.id=setInterval(()=>{clk.s++;store.set('clock:'+clk.sid,clk.s);drawClock();if(clk.s>=T){clk.run=false;clearInterval(clk.id);$('#clockGo').textContent='Done'}},1000)}else clearInterval(clk.id);drawClock()});
$('#clockReset').addEventListener('click',()=>{clk.run=false;clearInterval(clk.id);clk.s=0;store.set('clock:'+clk.sid,0);$('#clockGo').textContent='Start class';drawClock()});

/* projector text */
const big=$('#bigText');const setBig=v=>{document.documentElement.classList.toggle('big',v);big.setAttribute('aria-pressed',String(v));store.set('big',v)};
big.addEventListener('click',()=>setBig(big.getAttribute('aria-pressed')!=='true'));setBig(store.get('big',false));

/* ---------- views ---------- */
const doneSet=()=>new Set(store.get('done',[]));
const hoursOf=s=>`Hours ${s.n*2-1}–${s.n*2}`;
const trackTag=s=>({A:'<span class="tag">Foundations</span>',B:'<span class="tag green">Core</span>',C:'<span class="tag lld">Advanced</span>',D:'<span class="tag amber">Interview</span>'})[s.part]||'';

const exKeys=ses=>{const keys=[];const walk=(blocks,kp)=>blocks.forEach((b,i)=>{const k=kp+'.'+i;if(b.t==='exercise')keys.push(k);if(b.t==='stepper')b.steps.forEach((s,j)=>s.blocks&&walk(s.blocks,k+'.'+j))});ses.modules.forEach((m,mi)=>walk(m.blocks,ses.id+'.m'+mi));return keys};
function hub(){const app=$('#app');const done=doneSet();const next=S.find(s=>!done.has(s.id))||S[0];const sv=solvedAll();
  $('#clock').hidden=true;$('#homeBtn').hidden=true;$('#clockBar').innerHTML='';$('#modTabs').innerHTML='';$('#brandEye').textContent=`${S.length*2} hours · Python · data structures and algorithms`;
  const allEx=S.flatMap(exKeys),solvedN=allEx.filter(k=>sv[k]).length;
  app.innerHTML=`<div class="mod">
   <section class="hero"><div class="col" style="gap:10px"><span class="eyebrow">Course map · ${S.length} sessions × 2 hours</span><h2>Data structures and algorithms in Python</h2><p class="lead muted" style="font-size:1.06rem;max-width:62ch">Each session is a full class: a timed plan, short lessons, a visual lab, coding exercises you run right here in the browser, and a review. Teacher notes sit at the end of each module.</p>
     <div class="row"><a class="btn primary" href="#${next.id}">${done.size?'Continue':'Start'}: Session ${next.n}</a><span class="muted small">${done.size} of ${S.length} sessions complete · ${solvedN} of ${allEx.length} exercises solved</span></div></div>
     <div class="col" style="gap:12px"><div class="stats"><div><b>${allEx.length}</b><span>coding exercises with tests</span></div><div><b>${S.length}</b><span>two-hour sessions</span></div><div><b>${S.length*2}h</b><span>of class time</span></div></div><div class="meter" aria-label="Exercises solved"><i style="width:${allEx.length?solvedN/allEx.length*100:0}%"></i></div></div></section>
   <div class="panel"><h3>How every session runs</h3>${tableHTML(['Part of the session','What happens','Typical time'],[['Plan + warm-up','Session goals, a recall quiz from last time','10 min'],['Lessons','Short explanations, runnable examples, quick quizzes','30–40 min'],['Visual lab','Step through the data structure or algorithm and watch it work','15–25 min'],['Coding exercises','Write Python, press Check, and see which tests pass','30–40 min'],['Review','Flashcards, exit quiz, homework, teacher notes','10–15 min']])}<p class="muted small">Exercises run real Python (Pyodide) inside your browser: no install needed. The first run downloads about 10 MB, then it is cached. Progress, code and quiz answers are saved in this browser only.</p></div>
   ${PARTS.map(P=>{const list=S.filter(s=>s.part===P.k);if(!list.length)return'';return `<section class="part"><div class="part-head"><h3>Part ${P.k} · ${P.name}</h3><span class="mono">Hours ${list[0].n*2-1}–${list[list.length-1].n*2} · ${list.length} sessions</span></div><p class="muted small" style="max-width:70ch">${P.desc}</p><div class="sgrid">${list.map(s=>{const ks=exKeys(s),n=ks.filter(k=>sv[k]).length;return `<a class="scard ${done.has(s.id)?'done':''}" href="#${s.id}"><span class="num"><span>Session ${String(s.n).padStart(2,'0')} · ${hoursOf(s)}</span>${done.has(s.id)?'<b>Done</b>':trackTag(s)}</span><h4>${s.title}</h4><p>${s.goal}</p>${ks.length?`<span class="mono small ${n===ks.length?'solved-badge':'muted'}">${n} / ${ks.length} exercises solved</span>`:''}</a>`}).join('')}</div></section>`}).join('')}
  </div>`}


function sessionView(ses,mi){const app=$('#app');mi=Math.max(0,Math.min(ses.modules.length-1,mi||0));$('#clock').hidden=false;$('#homeBtn').hidden=false;clockFor(ses);
  $('#brandEye').textContent=`Session ${String(ses.n).padStart(2,'0')} · ${hoursOf(ses)} · Part ${ses.part}`;
  let acc=0;const starts=ses.modules.map(m=>{const s=acc;acc+=m.mins;return s});
  $('#modTabs').innerHTML=ses.modules.map((m,i)=>`<button class="tab" role="tab" data-m="${i}" aria-selected="${i===mi}"><small>${hm(starts[i])}</small>${m.tab||m.title}</button>`).join('');
  const m=ses.modules[mi];const mod=node('section','mod');
  mod.innerHTML=`<div class="mod-head"><div class="crumb"><span class="eyebrow">Module ${mi+1} of ${ses.modules.length} · ${hm(starts[mi])} – ${hm(starts[mi]+m.mins)} · ${m.mins} min</span>${trackTag(ses)}</div><h2>${m.title}</h2>${m.lead?`<p class="lead">${m.lead}</p>`:''}</div>`;
  if(mi===0){const ag=node('div','grid2');ag.innerHTML=`<div class="panel"><h3>Session ${ses.n}: ${ses.title}</h3><p class="intro">${ses.goal}</p><h4>By the end, students can</h4><ul class="clean">${ses.outcomes.map(o=>`<li>${o}</li>`).join('')}</ul></div><div class="panel"><h3>Session plan</h3><div>${ses.modules.map((x,i)=>`<div class="agenda-row" data-b="${i}"><span class="t">${hm(starts[i])} – ${hm(starts[i]+x.mins)}</span><div><h4>${x.title}</h4>${x.out?`<p class="muted small"><b>Output:</b> ${x.out}</p>`:''}</div></div>`).join('')}</div></div>`;mod.appendChild(ag)}
  renderBlocks(m.blocks,mod,ses.id+'.m'+mi,ses,false);
  const last=mi===ses.modules.length-1,idx=S.indexOf(ses),nx=S[idx+1],pv=S[idx-1],done=doneSet();
  const foot=node('div','navfoot');
  foot.innerHTML=`<div class="row">${mi>0?`<a class="btn" href="#${ses.id}-m${mi}">← ${ses.modules[mi-1].tab||ses.modules[mi-1].title}</a>`:pv?`<a class="btn" href="#${pv.id}">← Session ${pv.n}</a>`:''}</div><div class="row">${last?`<button class="btn" data-done aria-pressed="${done.has(ses.id)}">${done.has(ses.id)?'Session complete ✓':'Mark session complete'}</button>${nx?`<a class="btn primary" href="#${nx.id}">Session ${nx.n}: ${nx.title} →</a>`:`<a class="btn primary" href="#home">Back to course map</a>`}`:`<a class="btn primary" href="#${ses.id}-m${mi+2}">${ses.modules[mi+1].tab||ses.modules[mi+1].title} →</a>`}</div>`;
  mod.appendChild(foot);app.innerHTML='';app.appendChild(mod);
  const db=$('[data-done]',foot);if(db)db.addEventListener('click',()=>{const d=doneSet();d.has(ses.id)?d.delete(ses.id):d.add(ses.id);store.set('done',[...d]);db.setAttribute('aria-pressed',String(d.has(ses.id)));db.textContent=d.has(ses.id)?'Session complete ✓':'Mark session complete'});
  drawClock()}

$('#modTabs').addEventListener('click',e=>{const t=e.target.closest('.tab');if(!t||!clk.sid)return;location.hash='#'+clk.sid+'-m'+(+t.dataset.m+1)});

function route(){killAll();const h=(location.hash||'').slice(1);const m=h.match(/^(s\d\d)(?:-m(\d+))?$/);
  if(m){const ses=S.find(s=>s.id===m[1]);if(ses){sessionView(ses,m[2]?(+m[2]-1):0);store.set('last',h);window.scrollTo(0,0);return}}
  if(clk.sid){clearInterval(clk.id);clk={sid:null,s:0,run:false,id:null,blocks:[]}}hub();window.scrollTo(0,0)}
window.addEventListener('hashchange',route);route();
})();
