/* Pages + router. Routes: #learn · #t/<topic>[/<tab>[/<lesson>]] · #practice · #q/<id> · #today · #visualize · #v/<name>
   · #challenges · #interview · #revision · #progress. Old session links (#s01…) redirect to their topics. */
(function(C){
'use strict';
const U=C.U,P=C.P,Q=C.Q,B=C.B,V=C.V,$=U.$,$$=U.$$,esc=U.esc,node=U.node;
const app=$('#app');
const T=id=>C.tmap[id];
const qsOf=tid=>C.questions.filter(q=>q.topic===tid);
const statusCell=id=>{const s=P.STATUS[P.status(id)];return `<span class="status-dot ${s[2]}" title="${s[1]}">${s[0]}<span class="tiny"> ${s[1]}</span></span>`};
const meter=(frac,cls)=>`<div class="meter ${cls||''}"><i style="width:${Math.round(U.clamp(frac,0,1)*100)}%"></i></div>`;
const blocks=(done,total,n)=>{n=n||Math.min(total,10)||10;const f=total?Math.round(done/total*n):0;return '█'.repeat(f)+'░'.repeat(n-f)};
const lvl=m=>{const l=P.level(m);return `<span class="lv-${l[0]} small"><b>${m}%</b> ${l[1]}</span>`};
const setCtx=(ids,label,back)=>{try{sessionStorage.setItem('dsa:ctx',JSON.stringify({ids,label,back}))}catch(e){}};
const getCtx=()=>{try{return JSON.parse(sessionStorage.getItem('dsa:ctx'))||null}catch(e){return null}};
const page=(html)=>{const p=node('div','page',html||'');app.innerHTML='';app.appendChild(p);return p};
const qRow=(q,opt)=>`<tr class="qrow" data-q="${q.id}"><td>${statusCell(q.id)}</td><td><a href="#q/${q.id}">${q.title}</a></td><td>${U.diffHTML(q.d||1)}</td>${opt&&opt.noTopic?'':`<td>${T(q.topic).short}</td>`}<td>${q.p?`<span class="tag blue">${C.PATTERNS[q.p]||q.p}</span>`:''}</td><td><span class="tag grey">${C.typeLabel(q)}</span></td></tr>`;
const qTable=(list,opt)=>`<div class="tbl"><table class="arena-tbl"><thead><tr><th scope="col">Status</th><th scope="col">Problem</th><th scope="col">Difficulty</th>${opt&&opt.noTopic?'':'<th scope="col">Topic</th>'}<th scope="col">Pattern</th><th scope="col">Type</th></tr></thead><tbody>${list.map(q=>qRow(q,opt)).join('')}</tbody></table></div>`;
app.addEventListener('click',e=>{const r=e.target.closest('tr.qrow');if(r&&!e.target.closest('a'))location.hash='#q/'+r.dataset.q});

/* ---------- header: nav state, today pill, revision badge ---------- */
const header=()=>{const pp=P.planProgress();$('#todayCount').textContent=`${pp.done}/${pp.total}`;$('#todayPill').classList.toggle('done',pp.done>=pp.total&&pp.total>0);
  const due=P.due().length;const b=$('#revBadge');b.hidden=!due;b.textContent=due};
P.on(header);
const setNav=k=>$$('#mainNav a').forEach(a=>{if(a.dataset.nav===k)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});

/* ---------- 60-minute session timer (the original class clock, now per topic) ---------- */
const PHASES=[[0,10,'Learn the concept','learn'],[10,20,'Visualization + dry run','visualize'],[20,35,'Easy exercises','practice'],[35,50,'Medium problems','practice'],[50,55,'Debugging challenge','practice'],[55,60,'Quiz + revision','review']];
let clk=U.store.get('clock',null)||{tid:null,s:0,run:false};clk.run=false;let clkId=null;
const saveClk=()=>U.store.set('clock',{tid:clk.tid,s:clk.s,run:false});
const drawClock=()=>{const box=$('#clock');box.hidden=!clk.tid;if(!clk.tid){$('#clockBar').innerHTML='';return}
  const s=clk.s,T60=3600,ph=PHASES.find(p=>s>=p[0]*60&&s<p[1]*60);$('#clockTime').textContent=U.fmt(s);
  $('#clockNow').innerHTML=s>=T60?'Session complete · well done':ph?`<a href="#t/${clk.tid}/${ph[3]}">${T(clk.tid).short}: ${ph[2]}</a> · ${U.fmt(ph[1]*60-s)} left`:'';
  if($('#clockBar').children.length!==PHASES.length)$('#clockBar').innerHTML=PHASES.map(p=>`<span style="flex:${p[1]-p[0]}"><i></i></span>`).join('');
  $$('#clockBar i').forEach((el,i)=>{const p=PHASES[i];el.style.width=U.clamp((s-p[0]*60)/((p[1]-p[0])*60)*100,0,100)+'%'});
  $('#clockGo').textContent=clk.run?'Pause':s?'Resume':'Start';$$('.phase[data-ph]').forEach(r=>{const p=PHASES[+r.dataset.ph];r.classList.toggle('now',s>=p[0]*60&&s<p[1]*60&&clk.tid===r.dataset.t);r.classList.toggle('past',s>=p[1]*60&&clk.tid===r.dataset.t)})};
const clockRun=on=>{clk.run=on;clearInterval(clkId);if(on)clkId=setInterval(()=>{clk.s++;if(clk.s>=3600){clk.s=3600;clockRun(false)}saveClk();drawClock()},1000);drawClock()};
$('#clockGo').addEventListener('click',()=>clockRun(!clk.run));
$('#clockReset').addEventListener('click',()=>{clk.s=0;clockRun(false);saveClk()});
$('#clockClose').addEventListener('click',()=>{clockRun(false);clk={tid:null,s:0,run:false};saveClk();drawClock()});
const startSession=tid=>{if(clk.tid!==tid){clk={tid,s:0,run:false}}clockRun(true);saveClk();U.toast('60-minute session started: learn first')};

/* projector / larger text */
const big=$('#bigText');const setBig=v=>{document.documentElement.classList.toggle('big',v);big.setAttribute('aria-pressed',String(v));U.store.set('big',v)};
big.addEventListener('click',()=>setBig(big.getAttribute('aria-pressed')!=='true'));setBig(U.store.get('big',false));

/* ================= LEARN (home) ================= */
const nextLesson=()=>{for(const t of C.topics){const l=P.lessons(t.id);const i=t.learn.findIndex((_,j)=>!l[j]);if(i>=0)return {t,i}}return null};
function home(){setNav('learn');document.title='Python DSA Lab';const tot=P.totals(),pp=P.planProgress(),nl=nextLesson(),lc=P.lessonCount();
  const p=page(`<section class="hero"><div class="col" style="gap:12px"><span class="eyebrow">${C.topics.length} topics · ${C.questions.length} practice questions · in-browser Python</span><h1>Learn data structures and algorithms by doing them</h1>
   <p class="muted" style="font-size:1.05rem;max-width:62ch">Short explanations, then you predict, trace, visualize, code, debug and optimize. Every answer feeds your revision queue and mastery map.</p>
   <div class="row">${nl?`<a class="btn primary" href="#t/${nl.t.id}/learn/${nl.i+1}">${lc.done?'Continue':'Start'}: ${nl.t.short} · lesson ${nl.i+1}</a>`:'<a class="btn primary" href="#practice">Open the Practice Arena</a>'}<a class="btn" href="#today">Today's practice <span class="mono">${pp.done}/${pp.total}</span></a></div></div>
   <div class="col" style="gap:12px"><div class="stats"><div><b>${tot.solved}</b><span>problems solved</span></div><div><b>${tot.streak}</b><span>day streak</span></div><div><b>${tot.due}</b><span>due for revision</span></div><div><b>${tot.attempted?tot.accuracy+'%':'–'}</b><span>first-try accuracy</span></div></div>
   <a class="panel nested" href="#today" style="text-decoration:none;color:var(--ink);padding:12px 14px;gap:6px"><span class="row spread"><b>Today's goal: ${pp.total} problems</b><span class="blocks">${blocks(pp.done,pp.total,pp.total)} ${pp.done} / ${pp.total}</span></span><span class="small muted">2 easy · 4 medium · 1 debugging · 1 revision</span></a></div></section>
   <div class="flow" aria-label="The learning loop">${['Learn','Predict','Visualize','Dry run','Code','Debug','Solve','Optimize','Revise'].map(x=>`<span>${x}</span>`).join(' → ')}</div>`);
  C.PARTS.forEach(part=>{const sec=node('section','part',`<div class="part-head"><h2>${part.name}</h2><span class="mono">Topics ${T(part.ids[0]).n}–${T(part.ids[part.ids.length-1]).n}</span></div>`);
    const g=node('div','tgrid');part.ids.forEach(id=>{const t=T(id),st=P.topicStats(id);
      g.insertAdjacentHTML('beforeend',`<a class="tcard" href="#t/${id}"><span class="num"><span>Topic ${String(t.n).padStart(2,'0')}</span>${st.attempted||st.lessonsDone?lvl(st.mastery):'<span class="muted">not started</span>'}</span><h3>${t.title}</h3><p>${t.blurb}</p>${meter(st.mastery/100)}<span class="mono tiny muted">${t.learn.length?`${st.lessonsDone}/${t.learn.length} lessons · `:''}${st.solved}/${st.total} questions</span></a>`)});
    sec.appendChild(g);p.appendChild(sec)})}

/* ================= TOPIC ================= */
const TABS=[['learn','Learn'],['visualize','Visualize'],['practice','Practice'],['challenge','Challenge'],['review','Review']];
function topic(tid,tab,li){const t=T(tid);if(!t)return notFound();tab=TABS.some(x=>x[0]===tab)?tab:'learn';setNav('learn');document.title=t.title+' · Python DSA Lab';
  const st=P.topicStats(tid),part=C.PARTS.find(x=>x.k===t.part);
  const vizN=C.vizMeta.filter(v=>v.topic===tid).length;
  const p=page(`<div class="page-head"><span class="eyebrow">Topic ${t.n} of ${C.topics.length} · ${part.name}</span><h1>${t.title}</h1><p class="lead">${t.goal||t.blurb}</p>
    <div class="row">${lvl(st.mastery)}<span class="muted small">· ${st.lessonsDone}/${t.learn.length} lessons · ${st.solved}/${st.total} questions solved${st.rev?` · <a href="#revision">${st.rev} in revision</a>`:''}</span><button class="btn small" type="button" data-session>⏱ ${clk.tid===tid&&clk.s?'Resume':'Start'} a 60-min session</button></div></div>
    <nav class="subtabs" aria-label="${esc(t.short)} sections">${TABS.map(([k,l])=>`<a href="#t/${tid}/${k}" ${k===tab?'aria-current="page"':''}>${l}${k==='learn'&&t.learn.length?`<small>${st.lessonsDone}/${t.learn.length}</small>`:k==='practice'?`<small>${st.solved}/${st.total}</small>`:k==='visualize'&&vizN?`<small>${vizN}</small>`:''}</a>`).join('')}</nav>`);
  p.querySelector('[data-session]').addEventListener('click',()=>{startSession(tid);location.hash='#t/'+tid+'/learn'});
  const body=node('div','col');p.appendChild(body);
  ({learn:topicLearn,visualize:topicViz,practice:topicPractice,challenge:topicChallenge,review:topicReview})[tab](t,body,li)}

function sessionPlan(t){return `<details class="more" ${clk.tid===t.id?'open':''}><summary>60-minute session plan</summary><div class="col" style="gap:2px">${PHASES.map((ph,i)=>`<a class="phase" data-ph="${i}" data-t="${t.id}" href="#t/${t.id}/${ph[3]}"><span class="mono">${ph[0]}–${ph[1]} min</span><span>${ph[2]}</span></a>`).join('')}</div><p class="small muted">Press “Start a 60-min session” above: the timer in the header tells you when to move on.</p></details>`}

function topicLearn(t,body,li){const L=t.learn;const lessons=P.lessons(t.id);
  if(!L.length){body.innerHTML=`<div class="empty">Lessons for ${t.title} are being written. Its questions and visualizers are ready: <a href="#t/${t.id}/practice">practice now</a> or <a href="#t/${t.id}/visualize">visualize</a>.</div>`;return}
  let i=li?U.clamp(li-1,0,L.length-1):Math.max(0,L.findIndex((_,j)=>!lessons[j]));if(i<0)i=0;const les=L[i];
  body.insertAdjacentHTML('beforeend',sessionPlan(t)+`<nav class="lessonnav" aria-label="Lessons">${L.map((l,j)=>`<a href="#t/${t.id}/learn/${j+1}" class="${lessons[j]?'done':''}" ${j===i?'aria-current="step"':''}>${lessons[j]?'✓ ':''}${j+1}. ${l.short||l.title}</a>`).join('')}</nav>
   <div class="page-head"><span class="eyebrow">Lesson ${i+1} of ${L.length}${les.mins?` · about ${les.mins} min`:''}</span><h2>${les.title}</h2>${les.lead?`<p class="lead">${les.lead}</p>`:''}${les.does?`<div class="row"><span class="small muted">You will:</span>${les.does.map(d=>`<span class="tag">${d}</span>`).join('')}</div>`:''}</div>`);
  drawClock();
  const c=node('div','col');body.appendChild(c);B.render(les.blocks,c,t.id+'.l'+i);
  const done=!!lessons[i];const f=node('div','navfoot',`<div class="row">${i>0?`<a class="btn" href="#t/${t.id}/learn/${i}">← ${L[i-1].short||L[i-1].title}</a>`:''}</div><div class="row"><button class="btn ${done?'':'primary'}" type="button" data-done aria-pressed="${done}">${done?'Lesson complete ✓':'✓ Complete lesson'}${i<L.length-1&&!done?' & continue →':''}</button>${i===L.length-1?`<a class="btn" href="#t/${t.id}/visualize">Next: visualize →</a>`:done?`<a class="btn primary" href="#t/${t.id}/learn/${i+2}">${L[i+1].short||L[i+1].title} →</a>`:''}</div>`);body.appendChild(f);
  f.querySelector('[data-done]').addEventListener('click',()=>{const was=!!P.lessons(t.id)[i];P.lessonDone(t.id,i,!was);if(!was&&i<L.length-1)location.hash=`#t/${t.id}/learn/${i+2}`;else route()})}

function topicViz(t,body){const metas=C.vizMeta.filter(v=>v.topic===t.id);
  if(!metas.length&&!t.visualize.length){body.innerHTML=`<div class="empty">No visualizer for this topic yet. <a href="#visualize">Browse all visualizers</a>.</div>`;return}
  body.insertAdjacentHTML('beforeend',`<p class="muted">Step through each algorithm. Before you press <b>Next</b>, predict what will change. Keyboard: ← → to step, Space to play.</p>`);
  B.render(metas.map(m=>({t:'viz',fn:m.name,title:m.title,intro:m.desc,arg:m.arg})).concat(t.visualize),body,t.id+'.v')}

function topicPractice(t,body){const qs=qsOf(t.id);let f=U.store.get('tp:'+t.id,{d:'',type:'',st:''});
  if(!qs.length){body.innerHTML='<div class="empty">Questions for this topic are on their way.</div>';return}
  const types=[...new Set(qs.map(q=>C.typeLabel(q)))];
  body.insertAdjacentHTML('beforeend',`<div class="panel do"><h3><span class="kind">Practice set</span>10 questions, easiest unsolved first</h3><p class="intro">A mix of predicting, tracing, completing, debugging and coding. Wrong answers go to your revision queue.</p><div class="row"><button class="btn primary" type="button" data-set>Start practice set</button><button class="btn" type="button" data-set="debug">Debugging set</button><button class="btn" type="button" data-set="code">Coding set</button></div><div data-runner></div></div>
   <div class="panel"><div class="row spread"><h3>All ${t.short} questions</h3><span class="mono small muted" data-count></span></div>
   <div class="chips" role="group" aria-label="Filter">${[['d','',`All levels`],['d','1','🟢 Easy'],['d','2','🟡 Medium'],['d','3','🔴 Hard']].map(([k,v,l])=>`<button class="btn small" type="button" data-f="${k}" data-v="${v}">${l}</button>`).join('')}<span style="width:8px"></span>${[['type','','All types'],...types.map(x=>['type',x,x])].map(([k,v,l])=>`<button class="btn small" type="button" data-f="${k}" data-v="${v}">${l}</button>`).join('')}<span style="width:8px"></span>${[['st','','Any status'],['st','new','Unsolved'],['st','solved','Solved'],['st','rev','Needs revision']].map(([k,v,l])=>`<button class="btn small" type="button" data-f="${k}" data-v="${v}">${l}</button>`).join('')}</div><div data-list></div></div>`);
  const draw=()=>{U.$$('[data-f]',body).forEach(b=>b.setAttribute('aria-pressed',String(f[b.dataset.f]===b.dataset.v)));
    const list=qs.filter(q=>(!f.d||String(q.d||1)===f.d)&&(!f.type||C.typeLabel(q)===f.type)&&(!f.st||(f.st==='new'?['new','tried'].includes(P.status(q.id)):P.status(q.id)===f.st)));
    $('[data-list]',body).innerHTML=list.length?qTable(list,{noTopic:true}):'<div class="empty">No questions match.</div>';$('[data-count]',body).textContent=`${list.length} of ${qs.length}`;setCtx(list.map(q=>q.id),t.short+' practice','#t/'+t.id+'/practice')};
  body.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b){f[b.dataset.f]=b.dataset.v;U.store.set('tp:'+t.id,f);draw()}
    const s=e.target.closest('[data-set]');if(s){const k=s.dataset.set;const host=$('[data-runner]',body);host.innerHTML='';const go=()=>{host.innerHTML='';Q.runner(host,Q.pickSet(q=>q.topic===t.id&&(!k||(k==='debug'?q.type==='debug':q.type==='code')),10),{title:t.short+(k?' · '+k:'')+' set',again:go})};go()}});
  draw()}

function topicChallenge(t,body){const qs=qsOf(t.id);const builds=qs.filter(q=>q.build),hard=qs.filter(q=>q.type==='code'&&!q.build&&(q.d||1)>=2);
  if(t.challenge.length)B.render(t.challenge,body,t.id+'.c');
  if(builds.length)body.insertAdjacentHTML('beforeend',`<section class="panel do"><h3><span class="kind">Build it from scratch</span>Implement the data structure yourself</h3>${qTable(builds,{noTopic:true})}</section>`);
  body.insertAdjacentHTML('beforeend',`<section class="panel"><h3>Challenge problems</h3><p class="intro">Medium and hard coding problems. Try each without hints first, then use the hint ladder.</p>${hard.length?qTable(hard,{noTopic:true}):'<div class="empty">Coming soon.</div>'}<div class="row"><a class="btn" href="#interview">Try a timed interview →</a></div></section>`);
  setCtx(builds.concat(hard).map(q=>q.id),t.short+' challenges','#t/'+t.id+'/challenge')}

function topicReview(t,body){const due=P.due().filter(id=>C.qmap[id].topic===t.id),st=P.topicStats(t.id);
  body.insertAdjacentHTML('beforeend',`<div class="grid2"><section class="panel do"><h3><span class="kind">Revision</span>${due.length} due in ${t.short}</h3><p class="intro">${st.rev} ${t.short} question${st.rev===1?'':'s'} in your revision queue. Due ones come back on a 1 → 2 → 4 → 8 day schedule.</p><div class="row"><button class="btn primary" type="button" data-rev ${due.length?'':'disabled'}>Revise ${due.length} now</button><a class="btn" href="#revision">Full queue</a></div><div data-rh></div></section>
   <section class="panel"><h3>Your ${t.short} mastery</h3><div class="row">${lvl(st.mastery)}</div>${meter(st.mastery/100)}<p class="small muted">${st.solved}/${st.total} solved · first-try accuracy ${st.firstN?Math.round(st.firstOk/st.firstN*100)+'%':'–'} · ${st.ch}/${st.chT} challenge problems · ${st.lessonsDone}/${st.lessonsTotal} lessons. A rough guide, not a precise measurement.</p></section></div>`);
  body.querySelector('[data-rev]').addEventListener('click',()=>{const h=$('[data-rh]',body);h.innerHTML='';Q.runner(h,due,{title:'Revision',mode:'revision'})});
  B.render([{t:'quiz',topic:t.id,n:8,title:'Topic quiz'}].concat(t.review),body,t.id+'.r')}

/* ================= PRACTICE ARENA ================= */
function arena(){setNav('practice');document.title='Practice Arena · Python DSA Lab';let f=Object.assign({topic:'',d:'',p:'',type:'',st:'',text:''},U.store.get('arena',{}));let shown=60;
  const pats=[...new Set(C.questions.map(q=>q.p).filter(Boolean))].sort((a,b)=>(C.PATTERNS[a]||a).localeCompare(C.PATTERNS[b]||b));const types=[...new Set(C.questions.map(q=>C.typeLabel(q)))];
  const tot=P.totals(),pp=P.planProgress();
  const p=page(`<div class="page-head"><span class="eyebrow">Practice</span><h1>Practice Arena</h1><p class="lead">${C.questions.length} questions across ${C.topics.length} topics. Filter, pick one, solve it. Wrong answers come back in your revision queue.</p></div>
   <div class="grid3"><a class="panel do" href="#today" style="text-decoration:none;color:var(--ink)"><h3><span class="kind">Daily</span>Today's practice</h3><span class="blocks">${blocks(pp.done,pp.total,pp.total)} ${pp.done} / ${pp.total}</span></a><a class="panel" href="#revision" style="text-decoration:none;color:var(--ink)"><h3><span class="kind">Revision</span>${tot.due} due today</h3><span class="small muted">${tot.revTotal} in the queue</span></a><a class="panel" href="#interview" style="text-decoration:none;color:var(--ink)"><h3><span class="kind">Interview</span>Timed mock interview</h3><span class="small muted">No hints, a clock, then a debrief</span></a></div>
   <section class="panel"><div class="filters">
    <label>Topic<select data-k="topic"><option value="">All topics</option>${C.topics.map(t=>`<option value="${t.id}">${t.n}. ${t.short}</option>`).join('')}</select></label>
    <label>Difficulty<select data-k="d"><option value="">Any</option><option value="1">🟢 Easy</option><option value="2">🟡 Medium</option><option value="3">🔴 Hard</option></select></label>
    <label>Pattern<select data-k="p"><option value="">Any pattern</option>${pats.map(x=>`<option value="${x}">${C.PATTERNS[x]||x}</option>`).join('')}</select></label>
    <label>Type<select data-k="type"><option value="">Any type</option>${types.map(x=>`<option>${x}</option>`).join('')}</select></label>
    <label>Status<select data-k="st"><option value="">Any status</option><option value="new">Unsolved</option><option value="solved">Solved</option><option value="rev">Needs revision</option></select></label>
    <label>Search<input type="search" data-k="text" placeholder="e.g. two sum"></label></div>
    <div class="row spread"><span class="mono small muted" data-count></span><div class="row"><button class="btn small" type="button" data-clear>Clear filters</button><button class="btn small primary" type="button" data-set>▶ Practice 10 from these</button></div></div><div data-runner></div><div data-list></div><div class="row" data-more></div></section>`);
  U.$$('[data-k]',p).forEach(x=>x.value=f[x.dataset.k]||'');
  const match=q=>(!f.topic||q.topic===f.topic)&&(!f.d||String(q.d||1)===f.d)&&(!f.p||q.p===f.p)&&(!f.type||C.typeLabel(q)===f.type)&&(!f.st||(f.st==='new'?['new','tried'].includes(P.status(q.id)):P.status(q.id)===f.st))&&(!f.text||(q.title+' '+(q.p||'')).toLowerCase().includes(f.text.toLowerCase()));
  const draw=()=>{const list=C.questions.filter(match);$('[data-count]',p).textContent=`Showing ${Math.min(shown,list.length)} of ${list.length} matching · ${tot.solved} solved overall`;
    $('[data-list]',p).innerHTML=list.length?qTable(list.slice(0,shown)):'<div class="empty">No questions match these filters.</div>';
    $('[data-more]',p).innerHTML=list.length>shown?`<button class="btn" type="button" data-showmore>Show ${Math.min(60,list.length-shown)} more</button>`:'';setCtx(list.map(q=>q.id),'Practice Arena','#practice')};
  p.addEventListener('input',e=>{const k=e.target.dataset.k;if(k==null)return;f[k]=e.target.value;U.store.set('arena',f);shown=60;draw()});
  p.addEventListener('click',e=>{if(e.target.closest('[data-showmore]')){shown+=60;draw()}if(e.target.closest('[data-clear]')){f={topic:'',d:'',p:'',type:'',st:'',text:''};U.store.set('arena',f);U.$$('[data-k]',p).forEach(x=>x.value='');draw()}
    if(e.target.closest('[data-set]')){const h=$('[data-runner]',p);const go=()=>{h.innerHTML='';Q.runner(h,Q.pickSet(match,10),{title:'Practice set',again:go,empty:'No questions match these filters.'})};go()}});
  draw()}

/* single question page with prev/next through the current list */
function questionPage(id){const q=C.qmap[id];if(!q)return notFound();setNav(q.build?'challenges':'practice');document.title=q.title+' · Python DSA Lab';const ctx=getCtx();
  const ids=ctx&&ctx.ids.includes(id)?ctx.ids:null,i=ids?ids.indexOf(id):-1;const t=T(q.topic);
  const p=page(`<div class="row spread"><div class="row"><a class="btn small" href="${ids?ctx.back:'#practice'}">← ${ids?esc(ctx.label):'Practice Arena'}</a><a class="btn small ghost" href="#t/${t.id}">${t.title}</a></div>${ids?`<div class="row"><span class="mono small muted">${i+1} / ${ids.length}</span><a class="btn small" ${i>0?`href="#q/${ids[i-1]}"`:'aria-disabled="true" style="opacity:.45;pointer-events:none"'}>← Prev</a><a class="btn small" ${i<ids.length-1?`href="#q/${ids[i+1]}"`:'aria-disabled="true" style="opacity:.45;pointer-events:none"'}>Next →</a></div>`:''}</div>`);
  Q.render(q,p,{mode:'practice'});
  const viz=C.vizMeta.filter(v=>v.topic===q.topic).slice(0,3);
  if(viz.length||t.learn.length)p.insertAdjacentHTML('beforeend',`<div class="row small muted">Stuck? ${t.learn.length?`<a href="#t/${t.id}/learn">Review the ${t.short} lessons</a>`:''}${viz.length?` · Visualize: ${viz.map(v=>`<a href="#v/${v.name}">${v.title}</a>`).join(', ')}`:''}</div>`)}

/* ================= TODAY ================= */
function today(){setNav('practice');document.title="Today's practice · Python DSA Lab";const plan=P.plan(),pp=P.planProgress();const ROLE={easy:['🟢','Easy'],medium:['🟡','Medium'],debug:['🐞','Debugging'],revision:['↻','Revision'],practice:['➕','Extra practice']};
  const p=page(`<div class="page-head"><span class="eyebrow">Daily practice · ${new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</span><h1>Today's Practice</h1><p class="lead">Today's goal: ${plan.items.length} problems. 2 easy, 4 medium, 1 debugging, 1 revision, picked from the topics you are working on.</p></div>
   <section class="panel"><div class="row spread"><span class="blocks" style="font-size:1.4rem">${blocks(pp.done,pp.total,pp.total)}</span><b class="mono">${pp.done} / ${pp.total}</b></div>${meter(pp.total?pp.done/pp.total:0,pp.done>=pp.total?'good':'')}
   ${pp.done>=pp.total?'<p class="st-solved"><b>Goal reached. Nice work.</b> Keep going in the Practice Arena, or come back tomorrow for a fresh set.</p>':''}
   ${U.tableHTML(['','Problem','Difficulty','Topic','Done'],plan.items.map(x=>{const q=C.qmap[x.id];const r=ROLE[x.role]||ROLE.practice;return [`<span title="${r[1]}">${r[0]} <span class="tiny muted">${r[1]}</span></span>`,`<a href="#q/${x.id}">${q.title}</a> <span class="tag grey">${C.typeLabel(q)}</span>`,U.diffHTML(q.d||1),T(q.topic).short,plan.done[x.id]?'<span class="st-solved">✓</span>':'<span class="muted">–</span>']}))}
   <div class="row"><button class="btn primary" type="button" data-go ${pp.done>=pp.total?'disabled':''}>▶ Start (${pp.total-pp.done} left)</button><span class="small muted">Streak: <b>${P.streak()}</b> day${P.streak()===1?'':'s'}. Answer anything correctly today to keep it.</span></div></section><div data-runner></div>`);
  setCtx(plan.items.map(x=>x.id),"Today's practice",'#today');
  p.querySelector('[data-go]').addEventListener('click',()=>{const h=$('[data-runner]',p);h.innerHTML='';Q.runner(h,plan.items.filter(x=>!plan.done[x.id]).map(x=>x.id),{title:"Today's practice",onFinish:()=>U.toast('Set finished')});h.scrollIntoView({behavior:'smooth'})})}

/* ================= VISUALIZE ================= */
function vizGallery(){setNav('visualize');document.title='Visualize · Python DSA Lab';const p=page(`<div class="page-head"><span class="eyebrow">Visualize</span><h1>Algorithm visualizers</h1><p class="lead">${C.vizMeta.length} interactive visualizers. Change the input, step forward and back, and predict each step before it happens.</p></div>`);
  C.topics.forEach(t=>{const vs=C.vizMeta.filter(v=>v.topic===t.id);if(!vs.length)return;p.insertAdjacentHTML('beforeend',`<section class="part"><div class="part-head"><h2>${t.title}</h2><a class="mono small" href="#t/${t.id}/visualize">open on topic page</a></div><div class="grid3">${vs.map(v=>`<a class="vcard" href="#v/${v.name}">${v.ico?`<span class="ico" aria-hidden="true">${esc(v.ico)}</span>`:''}<b>${v.title}</b><span class="small muted">${v.desc||''}</span></a>`).join('')}</div></section>`)})}
function vizPage(name){const m=C.vizMeta.find(v=>v.name===name);if(!m)return notFound();setNav('visualize');document.title=m.title+' · Python DSA Lab';
  const p=page(`<div class="row"><a class="btn small" href="#visualize">← All visualizers</a><a class="btn small ghost" href="#t/${m.topic}">${T(m.topic).title}</a></div><div class="page-head"><h1>${m.title}</h1><p class="lead">${m.desc||''}</p></div>`);
  B.render([{t:'viz',fn:name,arg:m.arg,title:'',kind:'Visualize'}],p,'v.'+name);
  const rel=C.questions.filter(q=>q.topic===m.topic&&(!m.p||q.p===m.p)).slice(0,6);
  if(rel.length){p.insertAdjacentHTML('beforeend',`<section class="panel"><h3>Practice what you just watched</h3>${qTable(rel)}</section>`);setCtx(rel.map(q=>q.id),m.title,'#v/'+name)}}

/* ================= CHALLENGES ================= */
function challenges(){setNav('challenges');document.title='Challenges · Python DSA Lab';const builds=C.questions.filter(q=>q.build),hard=C.questions.filter(q=>q.type==='code'&&!q.build&&q.d===3);
  const walks=[];C.topics.forEach(t=>t.challenge.forEach(b=>{if(b.t==='b2o')walks.push([t,b])}));const solvedB=builds.filter(q=>P.status(q.id)==='solved').length;
  page(`<div class="page-head"><span class="eyebrow">Challenges</span><h1>Challenges</h1><p class="lead">Build the classic data structures yourself, see how brute force becomes optimal, and tackle the hard problems.</p></div>
   <section class="panel do"><div class="row spread"><h3><span class="kind">Build it from scratch</span>${builds.length} data structures</h3><span class="mono small">${solvedB} / ${builds.length} built</span></div><p class="intro">Requirements → starter code → implement → run the tests → debug → hints → reference solution.</p>${qTable(builds)}</section>
   <section class="panel"><h3>Brute force → optimal walkthroughs</h3><p class="intro">Write the slow version, measure it, find the repeated work, and pick a better tool.</p>${walks.length?`<div class="grid3">${walks.map(([t,b])=>`<a class="vcard" href="#t/${t.id}/challenge"><span class="tag grey">${t.short}</span><b>${b.title}</b><span class="small muted">${b.brute.cx} → ${b.optimal.cx}</span></a>`).join('')}</div>`:'<div class="empty">Coming soon.</div>'}</section>
   <section class="panel"><h3>Hard problems</h3>${hard.length?qTable(hard):'<div class="empty">Coming soon.</div>'}</section>`);
  setCtx(builds.concat(hard).map(q=>q.id),'Challenges','#challenges')}

/* ================= INTERVIEW ================= */
const IVT={1:20,2:35,3:45};
function interview(){setNav('interview');document.title='Interview practice · Python DSA Lab';const hist=P.ivList();
  const p=page(`<div class="page-head"><span class="eyebrow">Interview</span><h1>Interview Practice</h1><p class="lead">A random problem, a clock, and no hints or pattern labels. Solve it on your own, then get a debrief: correctness, approach, complexity and the reference solution.</p></div>
   <section class="panel do"><h3>Choose a round</h3><div class="grid3">${[[1,'Easy interview','Warm-up problems. 20 minutes.'],[2,'Medium interview','Typical phone-screen problems. 35 minutes.'],[3,'Hard interview','Onsite-level problems. 45 minutes.']].map(([d,t,s])=>`<button class="vcard" type="button" data-d="${d}" style="text-align:left;font:inherit;cursor:pointer"><span>${U.diffHTML(d)}</span><b>${t}</b><span class="small muted">${s}</span></button>`).join('')}</div>
   <label class="inline small"><input type="checkbox" data-studied ${U.store.get('iv:studied',false)?'checked':''}> Only topics I have started</label>
   <ul class="clean small muted"><li>Talk through your approach out loud (or write it down) before coding.</li><li>State the complexity of your solution.</li><li>Test with your own examples using <b>Run</b> before you <b>Submit</b>.</li></ul></section>
   <section class="panel"><h3>History</h3>${hist.length?U.tableHTML(['Date','Problem','Level','Result','Time'],hist.slice(0,15).map(h=>[new Date(h.at).toLocaleDateString(),C.qmap[h.id]?`<a href="#q/${h.id}">${C.qmap[h.id].title}</a>`:h.id,U.diffHTML(h.d),h.ok?'<span class="st-solved">✓ passed</span>':'<span class="st-rev">✗ not yet</span>',U.fmt(h.secs)])):'<div class="empty">No interviews yet.</div>'}</section>`);
  p.querySelector('[data-studied]').addEventListener('change',e=>U.store.set('iv:studied',e.target.checked));
  p.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;const d=+b.dataset.d;const only=U.store.get('iv:studied',false);
    const started=new Set(C.topics.filter(t=>{const s=P.topicStats(t.id);return s.attempted||s.lessonsDone}).map(t=>t.id));
    const seen=new Set(hist.map(h=>h.id));let pool=C.questions.filter(q=>q.type==='code'&&!q.build&&(q.d||1)===d&&(!only||started.has(q.topic)));
    if(!pool.length)pool=C.questions.filter(q=>q.type==='code'&&!q.build&&(q.d||1)===d);
    const fresh=pool.filter(q=>!seen.has(q.id)&&P.status(q.id)!=='solved');const q=U.shuffle(fresh.length?fresh:pool)[0];if(q)interviewRound(q,d)})}
function interviewRound(q,d){U.killAll();const total=IVT[d]*60;let left=total,submitted=false;const t0=Date.now();
  const p=page(`<div class="row spread"><div class="col" style="gap:4px"><span class="eyebrow">${U.diffHTML(d)} interview · no hints</span><h1>${q.title}</h1></div><div class="col" style="align-items:flex-end;gap:6px"><span class="bigtimer" data-t aria-live="off">${U.fmt(left)}</span><span class="small muted">of ${IVT[d]}:00</span></div></div>`);
  const host=node('div');p.appendChild(host);const ctx=Q.render(q,host,{mode:'interview',showHead:false});
  const bar=node('div','row','<button class="btn primary" type="button" data-sub>Submit solution</button><button class="btn ghost" type="button" data-give>I\'m stuck: end and show the debrief</button><a class="btn ghost" href="#interview">Quit</a>');p.appendChild(bar);const out=node('div','col');p.appendChild(out);
  const tEl=p.querySelector('[data-t]');U.every(()=>{if(submitted)return;left--;tEl.textContent=(left<0?'+':'')+U.fmt(Math.abs(left));tEl.classList.toggle('over',left<0);if(left===0)U.toast('Time is up: submit what you have')},1000);
  const debrief=async give=>{if(submitted)return;submitted=true;bar.remove();const secs=Math.round((Date.now()-t0)/1000);
    let pass=0,n=q.tests.length,res=null;if(!give){out.innerHTML='<p class="muted">Running the hidden tests…</p>';const r=await U.runPy(ctx.codeArea.ed.ta.value,{tests:U.testsOf(q),prelude:U.prelude(q),post:q.post});res=r.res&&r.res.results;pass=res?res.filter(x=>x[1]).length:0}
    const ok=!give&&pass===n;
    out.innerHTML=`<section class="panel do"><h3><span class="kind">Debrief</span>${ok?'✓ Correct solution':'Not passing yet'}</h3>
     <div class="stats"><div><b>${pass} / ${n}</b><span>tests passed</span></div><div><b>${U.fmt(secs)}</b><span>time used of ${IVT[d]}:00</span></div><div><b>${C.PATTERNS[q.p]||'–'}</b><span>pattern</span></div></div>
     <label>What time complexity does your solution have?<select data-mycx><option value="">Choose…</option>${Q.CX.concat(['O(n·m)','O(V + E)','O(k log n)','O(n·k)']).map(x=>`<option>${x}</option>`).join('')}</select></label><div data-cxfb></div>
     ${res&&!ok?`<div class="ex-res">${res.map(x=>`<span class="${x[1]?'p':'f'}">${x[1]?'✓':'✗'} ${esc(x[0])}${x[1]?'':`  → got ${esc(x[2])}, expected ${esc(x[3])}`}</span>`).join('')}</div>`:''}
     <div class="think"><b>Approach</b><div>${q.approach||'See the reference solution.'}</div>${q.hints?`<details class="more"><summary>The hints you would have had</summary><ol>${q.hints.map(h=>`<li>${h}</li>`).join('')}</ol></details>`:''}</div>
     <div class="answer"><b>Reference solution</b>${U.codeHTML(q.solution)}${q.cx?`<p><b>Complexity:</b> ${q.cx}</p>`:''}${q.explain?`<p>${q.explain}</p>`:''}</div>
     <div class="row"><a class="btn primary" href="#interview">Another interview</a><a class="btn" href="#q/${q.id}">Keep working on this problem</a></div></section>`;
    out.querySelector('[data-mycx]').addEventListener('change',e=>{const mine=e.target.value,ref=(q.cx||'').split(/ time|,/)[0].trim();out.querySelector('[data-cxfb]').innerHTML=!mine?'':mine.replace(/\s/g,'')===ref.replace(/\s/g,'')?`<p class="st-solved">Matches the reference: ${esc(ref)}.</p>`:`<div class="warnbox small">The reference solution runs in <b>${esc(q.cx||'?')}</b>. ${q.improve||'If yours is slower, look for repeated work: can a hash map, two pointers, sorting or a heap remove an inner loop?'}</div>`});
    P.record(q.id,ok,{mode:'interview'});P.ivAdd({id:q.id,d,ok,secs,at:Date.now()});out.scrollIntoView({behavior:'smooth'})};
  bar.querySelector('[data-sub]').addEventListener('click',()=>debrief(false));bar.querySelector('[data-give]').addEventListener('click',()=>{if(confirm('End the interview and see the debrief?'))debrief(true)})}

/* ================= REVISION ================= */
function revision(){setNav('revision');document.title='Revision · Python DSA Lab';const due=P.due(),all=P.revAll(),D=P.data();
  const by={};due.forEach(id=>{const t=C.qmap[id].topic;by[t]=(by[t]||0)+1});const up=all.filter(id=>!P.isDue(id));
  const p=page(`<div class="page-head"><span class="eyebrow">Revision</span><h1>Revision Queue</h1><p class="lead">Questions you got wrong (or marked) come back after 1, 2, 4 and 8 days. Answer one correctly four times in a row and it leaves the queue.</p></div>
   <div class="grid2"><section class="panel do"><div class="row spread"><h2>Due today: ${due.length}</h2></div>${due.length?U.tableHTML(null,Object.entries(by).sort((a,b)=>b[1]-a[1]).map(([t,n])=>[T(t).title,`<b class="mono">${n}</b>`])):'<p class="muted">Nothing due right now.</p>'}
    <div class="row"><button class="btn primary" type="button" data-start ${due.length?'':'disabled'}>▶ Start revision (${due.length})</button>${!due.length&&up.length?`<button class="btn" type="button" data-early>Practise ${Math.min(10,up.length)} early</button>`:''}</div></section>
    <section class="panel"><h3>How it works</h3><div class="flow"><span>✗ wrong</span>→<span>1 day</span>→<span>2 days</span>→<span>4 days</span>→<span>8 days</span>→<span class="done">✓ learned</span></div><p class="small muted">A wrong answer during revision resets the item to 1 day. Use <b>☆ Mark for revision</b> on any question to add it yourself.</p><p class="small"><b>${all.length}</b> in the queue · <b>${up.length}</b> coming up later.</p></section></div>
   <div data-runner></div>
   <section class="panel"><h3>Everything in your queue</h3>${all.length?U.tableHTML(['Question','Topic','Type','Due','Step',''],all.map(id=>{const q=C.qmap[id],r=D.q[id];return [`<a href="#q/${id}">${q.title}</a>`,T(q.topic).short,C.typeLabel(q),U.dayLabel(r.due||0),`<span class="mono">${(r.box||0)+1} / 4</span>`,`<button class="btn small ghost" type="button" data-rm="${id}">Remove</button>`]})):'<div class="empty">Your revision queue is empty. Wrong answers will appear here.</div>'}</section>`);
  setCtx(all,'Revision queue','#revision');
  const run=ids=>{const h=$('[data-runner]',p);h.innerHTML='';Q.runner(h,U.shuffle(ids),{title:'Revision',mode:'revision',onFinish:()=>U.toast('Revision done')});h.scrollIntoView({behavior:'smooth'})};
  p.addEventListener('click',e=>{if(e.target.closest('[data-start]'))run(due);if(e.target.closest('[data-early]'))run(up.slice(0,10));const rm=e.target.closest('[data-rm]');if(rm){P.flag(rm.dataset.rm,false);revision()}})}

/* ================= PROGRESS ================= */
function progress(){setNav('progress');document.title='Progress · Python DSA Lab';const tot=P.totals(),lc=P.lessonCount();const qN=C.questions.length;
  const overall=Math.round(((lc.total?lc.done/lc.total:0)*0.5+(qN?tot.solved/qN:0)*0.5)*100);
  const days=P.activity(),td=U.day();let heat='';for(let i=83;i>=0;i--){const n=days[td-i]||0;heat+=`<i class="${n>=15?'l3':n>=5?'l2':n?'l1':''}" title="${n} actions"></i>`}
  const p=page(`<div class="page-head"><span class="eyebrow">Progress</span><h1>Your progress</h1></div>
   <section class="panel"><div class="row spread"><h3>Overall progress</h3><b class="mono">${overall}%</b></div><span class="blocks" style="font-size:1.3rem">${blocks(overall,100,10)}</span>
    <div class="stats"><div><b>${lc.done} / ${lc.total}</b><span>lessons completed</span></div><div><b>${tot.solved}</b><span>problems solved of ${qN}</span></div><div><b>${tot.attempted?tot.accuracy+'%':'–'}</b><span>correct on first try</span></div><div><b>${tot.due}</b><span>revision due</span></div></div></section>
   <div class="stats"><div><b>${tot.solved}</b><span>Problems solved</span></div><div><b>${tot.streak} day${tot.streak===1?'':'s'}</b><span>Current streak</span></div><div><b>${tot.mastered}</b><span>Topics mastered</span></div><div><b>${tot.challenges}</b><span>Challenges completed</span></div></div>
   <section class="panel"><div class="row spread"><h3>Topic mastery</h3><span class="small muted">A rough guide from quiz accuracy, problems solved, repeated mistakes and challenges. Not a precise measurement.</span></div>
    <div>${C.topics.map(t=>{const s=P.topicStats(t.id);return `<a class="mrow" href="#t/${t.id}"><span>${t.short}</span>${meter(s.mastery/100)}<span class="lbl">${s.attempted||s.lessonsDone?lvl(s.mastery):'<span class="muted small">not started</span>'}</span></a>`}).join('')}</div></section>
   <div class="grid2"><section class="panel"><h3>Activity · last 12 weeks</h3><div class="heat" aria-label="Activity heatmap">${heat}</div><p class="small muted">Each square is a day; darker means more practice.</p></section>
    <section class="panel"><h3>Achievements</h3><div class="ach">${P.achievements().map(a=>`<div class="${a.got?'':'off'}"><b>${a.got?'🏅 ':''}${a.name}</b><span class="muted tiny">${a.desc}</span></div>`).join('')}</div></section></div>
   <section class="panel"><h3>Your data</h3><p class="small muted">Progress is saved in this browser only (localStorage). Export a backup to move it to another device.</p><div class="row"><button class="btn" type="button" data-exp>Export progress</button><label class="btn" style="flex-direction:row">Import<input type="file" accept="application/json" data-imp hidden></label><button class="btn danger" type="button" data-reset>Reset all progress</button></div></section>`);
  p.querySelector('[data-exp]').addEventListener('click',()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([P.exportJSON()],{type:'application/json'}));a.download='dsa-progress.json';a.click()});
  p.querySelector('[data-imp]').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;f.text().then(s=>{try{P.importJSON(s);U.toast('Progress imported');progress()}catch(err){alert('Could not import: '+err.message)}})});
  p.querySelector('[data-reset]').addEventListener('click',()=>{if(confirm('Delete all progress in this browser? This cannot be undone.')){P.reset();progress()}})}

function notFound(){setNav('');document.title='Not found · Python DSA Lab';page(`<div class="empty">Page not found. <a href="#learn">Go to the course map</a>.</div>`)}

/* ================= router ================= */
const LEGACY={s01:'python',s02:'bigo',s03:'recursion'};
function route(){U.killAll();const h=decodeURIComponent((location.hash||'').slice(1));const seg=h.split('/');
  const m=h.match(/^(s\d\d)(?:-m\d+)?$/);if(m&&LEGACY[m[1]]){location.replace('#t/'+LEGACY[m[1]]);return}
  try{switch(seg[0]){
    case '':case 'learn':home();break;
    case 't':topic(seg[1],seg[2],seg[3]?+seg[3]:0);break;
    case 'practice':arena();break;
    case 'q':questionPage(seg[1]);break;
    case 'today':today();break;
    case 'visualize':vizGallery();break;
    case 'v':vizPage(seg[1]);break;
    case 'challenges':challenges();break;
    case 'interview':interview();break;
    case 'revision':revision();break;
    case 'progress':progress();break;
    default:notFound()}}catch(err){console.error(err);app.innerHTML=`<div class="empty">Something went wrong rendering this page: ${esc(err.message)}</div>`}
  header();drawClock();window.scrollTo(0,0);if(route.n++)app.focus({preventScroll:true})}
route.n=0;
window.addEventListener('hashchange',route);
if(clk.tid)drawClock();
route();
})(COURSE);
