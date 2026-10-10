/* Lesson blocks. A lesson is a list of blocks; explanation blocks are short, and every lesson mixes in DO blocks
   (q = questions from the bank, viz = visualizer, b2o = brute force → optimal walkthrough, quiz = random topic quiz). */
(function(C){
'use strict';
const U=C.U,V=C.V,Q=C.Q,P=C.P;
const B=C.B={};
const node=U.node;

B.text=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="prose">${b.html}</div>`);
B.callout=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="${b.kind==='warn'?'warnbox':'think'}">${b.html}</div>`);
B.diagram=(b,p)=>p.insertAdjacentHTML('beforeend',`<pre class="diagram" role="img" aria-label="${U.esc(b.aria||'Diagram')}">${U.esc(U.clean(b.text))}</pre>${b.note?`<p class="small muted">${b.note}</p>`:''}`);
B.table=(b,p)=>p.insertAdjacentHTML('beforeend',U.tableHTML(b.head,b.rows)+(b.note?`<p class="muted small">${b.note}</p>`:''));
B.grid=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="${b.cols===2?'grid2':'grid3'}">${b.items.map(i=>`<div class="optcard">${i.tag?`<span><span class="tag ${i.tc||''}">${i.tag}</span></span>`:''}<h4>${i.title}</h4><div class="small col" style="gap:6px">${i.body}</div></div>`).join('')}</div>`);
B.task=(b,p)=>p.insertAdjacentHTML('beforeend',`<ul class="clean">${b.items.map(i=>`<li>${i}</li>`).join('')}</ul>`);
B.code=(b,p)=>{p.insertAdjacentHTML('beforeend',U.codeHTML(b.code,b.lang)+(b.note?`<p class="muted small">${b.note}</p>`:''));
  if(b.run===false||(b.lang&&b.lang!=='python'))return;const row=node('div','row','<button class="btn small" type="button">▶ Run this code</button><span class="ex-status"></span>'),out=node('div','ex-out');out.hidden=true;p.append(row,out);
  row.firstChild.addEventListener('click',async()=>{row.firstChild.disabled=true;out.hidden=false;const r=await U.runPy(U.clean(b.code),{prelude:b.prelude?C.PRELUDES[b.prelude]:''},m=>row.lastChild.textContent=m);row.firstChild.disabled=false;row.lastChild.textContent='';U.showRun(out,null,r,false)})};
B.cards=(b,p)=>{let sel=0;const row=node('div','loop'),det=node('div','think');p.append(row,det);
  const draw=()=>{row.innerHTML=b.items.map((s,i)=>`<button type="button" aria-pressed="${i===sel}" data-i="${i}"><span class="loop-num">${s.tag||('Step '+(i+1))}</span><b>${s.title}</b>${s.sub?`<span>${s.sub}</span>`:''}</button>`).join('');det.innerHTML=b.items[sel].body};
  row.addEventListener('click',e=>{const x=e.target.closest('button');if(!x)return;sel=+x.dataset.i;draw()});draw()};
B.reveal=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="${b.cols===3?'grid3':'grid2'}">${b.items.map(i=>`<div class="optcard"><div>${i.q}</div><button class="btn small" type="button" data-reveal>Reveal</button><div class="answer" hidden>${i.a}${i.code?U.codeHTML(i.code):''}</div></div>`).join('')}</div>`);
B.flash=(b,p)=>{const g=node('div','grid3',b.items.map(c=>`<button type="button" class="flash" aria-pressed="false"><span class="fq">${c[0]}</span><span class="fa" hidden>${c[1]}</span><span class="hint2">Say your answer, then flip</span></button>`).join(''));p.appendChild(g);
  g.addEventListener('click',e=>{const x=e.target.closest('.flash');if(!x)return;const on=x.getAttribute('aria-pressed')!=='true';x.setAttribute('aria-pressed',String(on));x.querySelector('.fa').hidden=!on;x.querySelector('.hint2').textContent=on?'Click to hide':'Say your answer, then flip'})};
B.notes=(b,p,key)=>{const id='n'+key.replace(/[^a-z0-9]/gi,'');p.insertAdjacentHTML('beforeend',`<label for="${id}">${b.label||'Your notes'}<textarea id="${id}" placeholder="${U.esc(b.placeholder||'')}" style="min-height:${b.rows?b.rows*22:100}px"></textarea></label><span class="muted small">Saved in this browser only.</span>`);
  const t=U.$('#'+id,p);t.value=U.store.get('notes:'+key,'');t.addEventListener('input',()=>U.store.set('notes:'+key,t.value))};
B.teacher=(b,p)=>p.insertAdjacentHTML('beforeend',`<details class="teacher"><summary>${b.title||'Teacher notes'}</summary><ul class="clean">${b.items.map(x=>`<li>${x}</li>`).join('')}</ul></details>`);

/* questions from the bank, rendered inline */
B.q=(b,p)=>{const box=node('div','col');box.style.gap='12px';p.appendChild(box);b.ids.forEach(id=>{const q=C.qmap[id];if(!q){box.insertAdjacentHTML('beforeend',`<p class="muted">Missing question ${U.esc(id)}</p>`);return}Q.render(q,box,{mode:'inline'})})};

/* visualizer */
B.viz=(b,p,key)=>{const fn=C.viz[b.fn];const c=node('div','viz');c.tabIndex=-1;p.appendChild(c);if(!fn){c.textContent='Visualizer not found: '+b.fn;return}
  try{fn(c,{arg:b.arg||{},get:(k,d)=>U.store.get('viz:'+b.fn+':'+k,d),set:(k,v)=>U.store.set('viz:'+b.fn+':'+k,v)})}catch(err){console.error(err);c.textContent='Visualizer error: '+err.message}};

/* random quiz from a topic's bank (non-coding questions) */
B.quiz=(b,p)=>{const host=node('div','col');p.appendChild(host);
  const start=()=>{host.innerHTML='';const pool=C.questions.filter(q=>(!b.topic||q.topic===b.topic)&&q.type!=='code'&&(!b.types||b.types.includes(q.type)));
    const ids=U.shuffle(pool).slice(0,b.n||8).map(q=>q.id);Q.runner(host,ids,{title:b.label||'Quiz',mode:'quiz',again:start,againLabel:'New quiz'})};
  host.innerHTML=`<div class="row"><button class="btn primary" type="button">Start a ${b.n||8}-question quiz</button><span class="muted small">Random questions from this topic. Wrong answers go to your revision queue.</span></div>`;
  host.querySelector('button').addEventListener('click',start)};

/* brute force → optimal walkthrough */
B.b2o=(b,p)=>{const FLOW=['Problem','Brute force','Analyze','Why slow?','Better tool','Optimal','Analyze again'];
  const flow=node('div','flow',FLOW.map((f,i)=>`<span data-f="${i}">${f}</span>`).join(' → '));const st=node('div','stages');p.append(flow,st);let at=0;
  const mark=i=>{at=i;U.$$('[data-f]',flow).forEach((s,j)=>{s.className=j<i?'done':j===i?'on':''})};
  const stage=(label,html)=>{const s=node('div','stage',`<span class="stage-t">${label}</span>${html||''}`);st.appendChild(s);return s};
  const cont=(s,fn,txt)=>{const b2=node('button','btn primary small',txt||'Continue →');b2.type='button';s.appendChild(b2);b2.addEventListener('click',()=>{b2.remove();fn()})};
  const cxQ=(s,code,cx,why,next)=>Q.mini(s,{q:'What is the time complexity?',opts:b.cxOpts||Q.CX,a:cx,why,codeOpts:true},()=>cont(s,next));
  const s1=()=>{mark(0);const s=stage('1 · Problem',`<div class="prose">${b.problem}</div>${b.qid&&C.qmap[b.qid]?`<p class="small">Try it yourself first: <a href="#q/${b.qid}">open “${C.qmap[b.qid].title}” in the editor</a>. Then come back.</p>`:''}`);cont(s,s2,'I have tried it → show brute force')};
  const s2=()=>{mark(1);const s=stage('2 · Brute force',`${b.brute.note?`<p>${b.brute.note}</p>`:''}${U.codeHTML(b.brute.code)}`);mark(2);cxQ(s,b.brute.code,b.brute.cx,b.brute.why,s3)};
  const s3=()=>{mark(3);const s=stage('3 · Why is it slow? Look for repeated work');Q.mini(s,b.slow,()=>cont(s,s4))};
  const s4=()=>{mark(4);const s=stage('4 · Choose a better data structure or pattern');Q.mini(s,b.better,()=>cont(s,s5))};
  const s5=()=>{mark(5);const s=stage('5 · Optimized solution',`${b.optimal.note?`<p>${b.optimal.note}</p>`:''}${U.codeHTML(b.optimal.code)}`);mark(6);cxQ(s,b.optimal.code,b.optimal.cx,b.optimal.why,s6)};
  const s6=()=>{mark(7);stage('Takeaway',`<div class="prose">${b.takeaway||''}</div>`)};
  s1()};

/* checklist of what to do in a lesson */
B.dolist=(b,p)=>p.insertAdjacentHTML('beforeend',`<div class="dolist">${b.items.map(x=>`<span class="tag">${x}</span>`).join('')}</div>`);

/* ---------- render a list of blocks into a container ---------- */
const DO={q:'Your turn',viz:'Visualize',b2o:'Brute force → optimal',quiz:'Quiz'};
B.render=(blocks,container,kp)=>{blocks.forEach((b,i)=>{const key=kp+'.'+i;
  if(b.t==='teacher'){B.teacher(b,container);return}
  const isDo=!!DO[b.t]||b.do;const pnl=node('section','panel'+(isDo?' do':''));
  const kind=b.kind||DO[b.t];pnl.innerHTML=(b.title||isDo?`<h3>${kind&&isDo?`<span class="kind">${kind}</span>`:''}${b.title||''}</h3>`:'')+(b.intro?`<p class="intro">${b.intro}</p>`:'');
  if(b.t==='q'&&!b.title)pnl.querySelector('h3').innerHTML=`<span class="kind">${kind}</span>${b.ids.length>1?b.ids.length+' quick questions':'Try this'}`;
  container.appendChild(pnl);if(B[b.t])B[b.t](b,pnl,key);else pnl.insertAdjacentHTML('beforeend','<p>Unknown block: '+U.esc(b.t)+'</p>')})};
})(COURSE);
