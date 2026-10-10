/* Question, Quiz, HintSystem, CodeExercise, DryRun: one renderer per question type, all reporting to the ProgressTracker.
   Question fields: id, type, d (1-3), p (pattern), title, q/prompt (html), code, opts, a, why, hints[], approach, ...
   Types: predict · mcq · complexity · choose · dryrun · blanks · debug · code */
(function(C){
'use strict';
const U=C.U,P=C.P,Q=C.Q={};
const esc=U.esc;
Q.CX=['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(2ⁿ)'];
Q.norm=s=>String(s==null?'':s).replace(/\r/g,'').trim().split('\n').map(l=>l.trim().replace(/\s+/g,' ')).join('\n').replace(/"/g,"'").replace(/\s*([,:;\[\](){}=+\-*/<>])\s*/g,'$1');
Q.cell=s=>Q.norm(s).replace(/^'(.*)'$/,'$1');  /* dry-run cells: quotes around strings optional */
Q.nospace=s=>String(s==null?'':s).replace(/\s+/g,'').replace(/"/g,"'");
const optsOf=q=>q.opts||(q.type==='complexity'?Q.CX:[]);
const ansIdx=q=>typeof q.a==='number'?q.a:optsOf(q).indexOf(q.a);
Q.answerText=q=>{if(['mcq','predict','complexity','choose','debug'].includes(q.type)&&q.opts!==undefined||q.type==='complexity')return optsOf(q)[ansIdx(q)];return q.a};
const codeOpts=q=>q.type==='predict'||q.type==='complexity'||q.codeOpts;
const promptOf=q=>q.q||q.prompt||({predict:'What does this code print?',complexity:'What is the time complexity?',dryrun:'Fill in the values after every iteration.',blanks:'Fill in the blanks so the function works.',debug:'What is wrong with this code?'}[q.type]||'');
const stripMarks=c=>U.clean(c).replace(/\s*#@\s*$/gm,'');
Q.topicName=id=>C.tmap[id]?C.tmap[id].short:id;

/* ---------- header + shared chrome ---------- */
const statusHTML=id=>{const s=P.STATUS[P.status(id)];return `<span class="status-dot ${s[2]}" data-status>${s[0]} ${s[1]}</span>`};
Q.metaHTML=(q,opt)=>`<div class="q-head"><div class="col" style="gap:2px;flex:1 1 240px"><span class="q-kind">${C.typeLabel(q)}${opt.num?` · ${opt.num}`:''}</span><h3>${q.title}</h3></div><div class="row">${U.diffHTML(q.d||1)}${opt.hideMeta?'':`<a class="tag grey" href="#t/${q.topic}">${Q.topicName(q.topic)}</a>${q.p&&!opt.hidePattern?`<span class="tag blue">${C.PATTERNS[q.p]||q.p}</span>`:''}`}${opt.interview?'':statusHTML(q.id)}</div></div>`;

/* Hint ladder: Hint 1 → Hint 2 → Approach → (Show solution). Never reveals the answer on the first click. */
function hintLadder(q,foot,box,opt){const steps=[...(q.hints||[]).map((h,i)=>['Hint '+(i+1),h]),...(q.approach?[['Approach',q.approach]]:[])];let k=0;
  const solBtn=opt.solution?U.node('button','btn small ghost','Show solution'):null;
  if(steps.length){const b=U.node('button','btn small','💡 '+steps[0][0]);b.type='button';foot.appendChild(b);
    b.addEventListener('click',()=>{const s=steps[k++];box.insertAdjacentHTML('beforeend',`<div class="hint"><b>${s[0]}</b>${s[1]}</div>`);P.hint(q.id,k);
      if(k<steps.length)b.textContent=(steps[k][0]==='Approach'?'🧭 ':'💡 ')+steps[k][0];else b.remove()})}
  if(solBtn){solBtn.type='button';foot.appendChild(solBtn);let armed=false;
    solBtn.addEventListener('click',()=>{if(!armed&&!opt.solved()){armed=true;solBtn.textContent='Sure? Click again to reveal';solBtn.classList.add('danger');setTimeout(()=>{if(armed&&solBtn.isConnected){armed=false;solBtn.textContent='Show solution';solBtn.classList.remove('danger')}},4000);return}
      solBtn.remove();opt.solution()})}}

function revToggle(q,foot){const b=U.node('button','btn small ghost');b.type='button';const set=()=>{const r=P.rec(q.id);const on=!!(r&&r.rev);b.textContent=on?'↻ In revision':'☆ Mark for revision';b.setAttribute('aria-pressed',String(on))};
  b.addEventListener('click',()=>{const r=P.rec(q.id);P.flag(q.id,!(r&&r.rev));set();U.toast(P.rec(q.id).rev?'Added to your revision queue':'Removed from revision')});set();foot.appendChild(b);return set}

/* ---------- main renderer ---------- */
Q.render=(q,host,opt)=>{opt=opt||{};const mode=opt.mode||'practice';const iv=mode==='interview';
  const el=U.node('article','q');el.id='q-'+q.id;el.setAttribute('aria-label',q.title);host.appendChild(el);
  el.innerHTML=(opt.showHead===false?'':Q.metaHTML(q,{num:opt.num,hideMeta:opt.hideMeta,hidePattern:iv||opt.hidePattern,interview:iv}))+`<div class="q-prompt">${promptOf(q)}</div>`;
  let recorded=false,solvedNow=false;
  const ctx={q,el,mode,opt,
    head(){const s=el.querySelector('[data-status]');if(s)s.outerHTML=statusHTML(q.id)},
    answer(ok){/* first answer in this view is the one that counts */
      if(!recorded){recorded=true;P.record(q.id,ok,{mode});opt.onAnswer&&opt.onAnswer(ok)}
      else if(ok)P.markSolved(q.id);
      if(ok)solvedNow=true;el.classList.toggle('right',ok);el.classList.toggle('wrong',!ok);ctx.head();ctx.revSet&&ctx.revSet()},
    get recorded(){return recorded},get solved(){return solvedNow}};
  (R[q.type]||R.mcq)(ctx);
  return ctx};

const fbHTML=(ok,body,word)=>`<div class="fb ${ok?'ok':'no'}"><span class="verdict-t">${ok?(word||'Correct!'):'Not quite.'}</span>${body||''}</div>`;
const runBtn=(q,el,code)=>{const row=U.node('div','row','<button class="btn small" type="button">▶ Run it in Python</button><span class="ex-status"></span>'),out=U.node('div','ex-out');out.hidden=true;el.append(row,out);
  row.firstChild.addEventListener('click',async()=>{row.firstChild.disabled=true;out.hidden=false;const r=await U.runPy(code,{prelude:U.prelude(q)},m=>row.lastChild.textContent=m);row.firstChild.disabled=false;row.lastChild.textContent='';U.showRun(out,null,r,false)})};

const R={};
/* multiple choice: predict / mcq / complexity / choose */
R.mcq=ctx=>{const {q,el}=ctx;const O=optsOf(q),A=ansIdx(q);
  if(q.code)el.insertAdjacentHTML('beforeend',U.codeHTML(stripMarks(q.code)));
  if(!O.length){return R.input(ctx)}
  const g=U.node('div','opts');g.setAttribute('role','radiogroup');g.setAttribute('aria-label','Answer options');
  g.innerHTML=O.map((o,j)=>`<button type="button" class="opt" role="radio" aria-checked="false" data-j="${j}" tabindex="${j?-1:0}"><span class="l">${String.fromCharCode(65+j)}</span><span>${codeOpts(q)?`<code>${esc(o)}</code>`:o}</span></button>`).join('');
  const foot=U.node('div','qfoot','<button class="btn primary" type="button" data-check disabled>Check answer</button>'),hints=U.node('div','hints'),fb=U.node('div');fb.setAttribute('aria-live','polite');
  el.append(g,foot,hints,fb);let sel=-1,done=false;const btns=[...g.children];
  const pick=j=>{if(done)return;sel=j;btns.forEach((b,i)=>{b.setAttribute('aria-checked',String(i===j));b.tabIndex=i===j?0:-1});foot.firstChild.disabled=false};
  g.addEventListener('click',e=>{const b=e.target.closest('[data-j]');if(b)pick(+b.dataset.j)});
  g.addEventListener('keydown',e=>{const i=btns.indexOf(document.activeElement);if(i<0)return;let n=null;if(['ArrowDown','ArrowRight'].includes(e.key))n=(i+1)%btns.length;if(['ArrowUp','ArrowLeft'].includes(e.key))n=(i-1+btns.length)%btns.length;
    if(n!=null){e.preventDefault();btns[n].focus();pick(n)}if(e.key==='Enter'&&sel>=0&&!done){e.preventDefault();check()}});
  const check=()=>{if(sel<0||done)return;done=true;const ok=sel===A;btns.forEach((b,i)=>{b.disabled=true;if(i===A)b.classList.add('is-right');else if(i===sel)b.classList.add('is-wrong')});
    foot.firstChild.remove();fb.innerHTML=fbHTML(ok,`<div>${ok?'':`Answer: <b>${codeOpts(q)?`<code>${esc(O[A])}</code>`:O[A]}</b>. `}${q.why||''}</div>`);ctx.answer(ok);
    if(q.fix)fb.insertAdjacentHTML('beforeend',`<div class="col" style="gap:6px"><b class="small">Fixed version</b>${U.codeHTML(q.fix)}</div>`);
    if(q.type==='predict'&&q.code)runBtn(q,fb,stripMarks(q.code));
    if(q.type==='debug'&&q.tests)fixIt(ctx,fb)};
  foot.firstChild.addEventListener('click',check);
  if(ctx.mode!=='interview'){hintLadder(q,foot,hints,{});ctx.revSet=revToggle(q,foot)}};
R.predict=ctx=>ctx.q.opts?R.mcq(ctx):R.input(ctx);
R.complexity=R.mcq;R.choose=R.mcq;R.debug=R.mcq;

/* typed answer (predict-the-output without options) */
R.input=ctx=>{const {q,el}=ctx;if(q.code&&!el.querySelector('.codebox'))el.insertAdjacentHTML('beforeend',U.codeHTML(stripMarks(q.code)));
  const multi=String(q.a).includes('\n');const id='in-'+q.id;
  const wrap=U.node('div','col',`<label for="${id}">Your answer ${multi?'(one line per print)':''}</label>${multi?`<textarea id="${id}" class="ans-in" rows="${String(q.a).split('\n').length+1}" spellcheck="false"></textarea>`:`<input id="${id}" type="text" class="ans-in" spellcheck="false" autocomplete="off" placeholder="Type exactly what is printed">`}`);wrap.style.gap='4px';
  const foot=U.node('div','qfoot','<button class="btn primary" type="button" data-check>Check answer</button>'),hints=U.node('div','hints'),fb=U.node('div');fb.setAttribute('aria-live','polite');
  el.append(wrap,foot,hints,fb);const inp=wrap.querySelector('.ans-in');let shown=false,tries=0;
  const accepted=[q.a,...(q.accept||[])].map(Q.norm);
  const check=()=>{const v=inp.value;if(!v.trim()){inp.focus();return}tries++;const ok=accepted.includes(Q.norm(v));ctx.answer(ok);
    if(ok){foot.querySelector('[data-check]').remove();inp.readOnly=true;fb.innerHTML=fbHTML(true,`<div>${q.why||''}</div>`);runBtn(q,fb,stripMarks(q.code||''))}
    else{fb.innerHTML=fbHTML(false,`<div>Check spacing, brackets and quotes too. Trace it line by line, or use a hint.</div>`);if(!shown){shown=true;const s=U.node('button','btn small ghost','Show answer');s.type='button';foot.appendChild(s);
      s.addEventListener('click',()=>{s.remove();foot.querySelector('[data-check]')?.remove();inp.readOnly=true;fb.innerHTML=`<div class="answer"><b>Answer</b><pre><code>${esc(q.a)}</code></pre><div>${q.why||''}</div></div>`;runBtn(q,fb,stripMarks(q.code||''))})}}};
  foot.firstChild.addEventListener('click',check);inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&(!multi||e.ctrlKey)){e.preventDefault();check()}});
  if(ctx.mode!=='interview'){hintLadder(q,foot,hints,{});ctx.revSet=revToggle(q,foot)}};

/* dry-run table */
R.dryrun=ctx=>{const {q,el}=ctx;el.insertAdjacentHTML('beforeend',U.codeHTML(stripMarks(q.code)));
  if(q.setup)el.insertAdjacentHTML('beforeend',`<p class="small muted">${q.setup}</p>`);
  const given=new Set(q.given||[]);const lab=q.rowLabel||'Iteration';
  const t=U.node('div','tbl dry',`<table><thead><tr><th scope="col">${lab}</th>${q.cols.map(c=>`<th scope="col"><code>${esc(c)}</code></th>`).join('')}</tr></thead><tbody>${q.rows.map((r,i)=>`<tr><th scope="row">${q.rowNames?q.rowNames[i]:i+1}</th>${r.map((v,j)=>given.has(j)?`<td class="given">${esc(v)}</td>`:`<td><input type="text" aria-label="${esc(q.cols[j])} after ${lab.toLowerCase()} ${i+1}" data-r="${i}" data-c="${j}" autocomplete="off" spellcheck="false"></td>`).join('')}</tr>`).join('')}</tbody></table>`);
  const foot=U.node('div','qfoot','<button class="btn primary" type="button" data-check>Check table</button>'),hints=U.node('div','hints'),fb=U.node('div');fb.setAttribute('aria-live','polite');
  el.append(t,foot,hints,fb);const ins=U.$$('input',t);let shown=false;
  const check=()=>{let bad=0,empty=0;ins.forEach(x=>{const exp=q.rows[+x.dataset.r][+x.dataset.c];if(!x.value.trim()){empty++;x.className='';return}const ok=Q.cell(x.value)===Q.cell(exp);x.className=ok?'ok':'no';if(!ok)bad++});
    if(empty){fb.innerHTML=`<p class="small muted">Fill every cell first (${empty} empty).</p>`;return}
    const ok=bad===0;ctx.answer(ok);
    if(ok){foot.querySelector('[data-check]').remove();ins.forEach(x=>x.readOnly=true);fb.innerHTML=fbHTML(true,`<div>${q.why||'Every value matches.'}</div>`)}
    else{fb.innerHTML=fbHTML(false,`<div>${bad} cell${bad>1?'s are':' is'} wrong (red). Fix them and check again.</div>`);
      if(!shown){shown=true;const s=U.node('button','btn small ghost','Show answer');s.type='button';foot.appendChild(s);s.addEventListener('click',()=>{s.remove();foot.querySelector('[data-check]')?.remove();ins.forEach(x=>{x.value=q.rows[+x.dataset.r][+x.dataset.c];x.className='ok';x.readOnly=true});fb.innerHTML=`<div class="answer">${q.why||'Answers filled in.'}</div>`})}}};
  foot.firstChild.addEventListener('click',check);
  t.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const i=ins.indexOf(e.target);if(i>=0&&i<ins.length-1)ins[i+1].focus();else check()}});
  if(ctx.mode!=='interview'){hintLadder(q,foot,hints,{});ctx.revSet=revToggle(q,foot)}};

/* fill in the blanks (code completion) */
const BL=/_{4,}/g;
R.blanks=ctx=>{const {q,el}=ctx;const parts=U.clean(q.code).split(BL);const ans=q.blanks.map(a=>Array.isArray(a)?a:[a]);
  const box=U.node('div','blankcode');box.innerHTML=parts.map((p,i)=>U.hl(p)+(i<parts.length-1?`<input type="text" data-b="${i}" aria-label="Blank ${i+1}" size="${Math.max(6,Math.max(...ans[i].map(a=>a.length))+1)}" autocomplete="off" spellcheck="false">`:'')).join('');
  const foot=U.node('div','qfoot','<button class="btn primary" type="button" data-check>Check</button>'),hints=U.node('div','hints'),fb=U.node('div');fb.setAttribute('aria-live','polite');
  el.append(box,foot,hints,fb);const ins=U.$$('input',box);let shown=false;
  const filled=()=>{let i=0;return U.clean(q.code).replace(BL,()=>ins[i++].value)};
  const finish=(ok,extra)=>{ctx.answer(ok);if(ok){foot.querySelector('[data-check]')?.remove();ins.forEach(x=>{x.readOnly=true;x.className='ok'});fb.innerHTML=fbHTML(true,`<div>${extra||''}${q.why||''}</div>`)}};
  const check=async()=>{if(ins.some(x=>!x.value.trim())){fb.innerHTML='<p class="small muted">Fill every blank first.</p>';return}
    let bad=0;ins.forEach((x,i)=>{const ok=ans[i].some(a=>Q.nospace(a)===Q.nospace(x.value));x.className=ok?'ok':'no';if(!ok)bad++});
    if(!bad)return finish(true);
    if(q.tests){fb.innerHTML='<p class="small muted">Not the expected text: running the tests to see if your version works anyway…</p>';
      const r=await U.runPy(filled(),{tests:U.testsOf(q),prelude:U.prelude(q)},m=>fb.innerHTML=`<p class="small muted">${m}</p>`);
      if(r.res&&r.res.results&&r.res.results.every(x=>x[1]))return finish(true,'<p>Different from the reference, but all tests pass. </p>');}
    ctx.answer(false);fb.innerHTML=fbHTML(false,`<div>${bad} blank${bad>1?'s need':' needs'} another look (red).</div>`);
    if(!shown){shown=true;const s=U.node('button','btn small ghost','Show answer');s.type='button';foot.appendChild(s);s.addEventListener('click',()=>{s.remove();foot.querySelector('[data-check]')?.remove();ins.forEach((x,i)=>{x.value=ans[i][0];x.className='ok';x.readOnly=true});fb.innerHTML=`<div class="answer">${q.why||''}</div>`})}};
  foot.firstChild.addEventListener('click',check);box.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const i=ins.indexOf(e.target);if(i<ins.length-1)ins[i+1].focus();else check()}});
  if(ctx.mode!=='interview'){hintLadder(q,foot,hints,{});ctx.revSet=revToggle(q,foot)}};

/* debugging: after diagnosing, optionally fix the bug and run the tests */
function fixIt(ctx,fb){const {q}=ctx;const wrap=U.node('div','col');wrap.style.gap='8px';wrap.innerHTML=`<b class="small">Now fix it: edit the code and run the tests</b>`;fb.appendChild(wrap);
  codeArea(ctx,wrap,{starter:q.code,tests:q.tests,key:'fix:'+q.id,onPass(){U.toast('Bug fixed: all tests pass')}})}

/* shared editor + run/check used by code questions and debug fixes */
function codeArea(ctx,host,o){const {q}=ctx;const saved=U.store.get(o.key,null);const start=U.dedent(o.starter||'');
  const ed=U.editor(saved!=null?saved:start,{onRun:()=>go(false),onChange:v=>U.store.set(o.key,v),label:'Python code for '+q.title});
  const bar=U.node('div','row',`<button class="btn" type="button" data-x="run">▶ Run</button><button class="btn primary" type="button" data-x="check">Check (${o.tests.length} tests)</button><button class="btn small ghost" type="button" data-x="reset">Reset code</button><span class="ex-status" data-x="st">Ctrl+Enter runs · Esc leaves the editor</span>`);
  const out=U.node('div','ex-out','Output appears here.'),res=U.node('div','ex-res');out.setAttribute('aria-live','polite');host.append(ed,bar,out,res);
  const st=bar.querySelector('[data-x=st]');const btns=U.$$('[data-x=run],[data-x=check]',bar);
  const go=async check=>{btns.forEach(b=>b.disabled=true);const r=await U.runPy(ed.ta.value,{tests:check?U.testsOf({tests:o.tests}):[],prelude:U.prelude(q),post:q.post},m=>st.textContent=m);
    btns.forEach(b=>b.disabled=false);const all=U.showRun(out,res,r,check,o.tests.map(t=>t[3]||t[0]));st.textContent=check?(all?'✓ All tests pass':'Not yet: read the first failing test.'):'Ctrl+Enter runs';
    if(check)o.onCheck&&o.onCheck(!!all);if(check&&all)o.onPass&&o.onPass()};
  bar.addEventListener('click',e=>{const x=e.target.closest('[data-x]');if(!x)return;if(x.dataset.x==='run')go(false);if(x.dataset.x==='check')go(true);
    if(x.dataset.x==='reset'){if(!confirm('Replace your code with the starter code?'))return;ed.set(start);U.store.set(o.key,start);out.textContent='Output appears here.';out.style.color='';res.innerHTML=''}});
  return {ed,go,out}}
Q.codeArea=codeArea;

/* coding problem */
R.code=ctx=>{const {q,el,mode}=ctx;const iv=mode==='interview';
  if(q.req)el.insertAdjacentHTML('beforeend',`<div class="col" style="gap:4px"><b class="small">Requirements</b><ul class="req">${q.req.map(r=>`<li>${r}</li>`).join('')}</ul></div>`);
  if(q.prelude)el.insertAdjacentHTML('beforeend',`<details class="more"><summary>Provided helpers (already defined for you)</summary>${U.codeHTML(U.prelude(q))}</details>`);
  const area=U.node('div','col');area.style.gap='10px';el.appendChild(area);
  const foot=U.node('div','qfoot'),hints=U.node('div','hints'),fb=U.node('div');fb.setAttribute('aria-live','polite');el.append(foot,hints,fb);
  const solHTML=()=>`<div class="answer"><b>Reference solution</b>${q.brute?`<p class="small">Brute force first (${q.brute.cx||''}):</p>${U.codeHTML(q.brute.code)}<p class="small">Optimized:</p>`:''}${U.codeHTML(q.solution)}${q.cx?`<p><b>Complexity:</b> ${q.cx}</p>`:''}${q.explain?`<p>${q.explain}</p>`:''}</div>`;
  const a=codeArea(ctx,area,{starter:q.starter||'',tests:q.tests,key:'code:'+q.id,onCheck(ok){if(iv)return;if(ok){if(!ctx.recorded||!ctx.solved)ctx.answer(true);fb.innerHTML=fbHTML(true,`<div>All ${q.tests.length} tests pass.${q.cx?` Target complexity: <b>${q.cx}</b>.`:''} Compare your code with the reference below.</div><button class="btn small" type="button" data-reveal>Show reference solution</button><div hidden>${solHTML()}</div>`,'Solved!')}else P.tried(q.id),ctx.head()}});
  ctx.codeArea=a;
  if(!iv){hintLadder(q,foot,hints,{solved:()=>P.status(q.id)==='solved'||ctx.solved,solution(){if(P.status(q.id)!=='solved')P.revealed(q.id);ctx.head();ctx.revSet&&ctx.revSet();fb.innerHTML=solHTML()}});ctx.revSet=revToggle(q,foot)}};

/* ---------- inline mini-quiz (not tracked) used by walkthroughs ---------- */
Q.mini=(host,m,cb)=>{const box=U.node('div','col');box.style.gap='8px';host.appendChild(box);
  box.innerHTML=`${m.q?`<div>${m.q}</div>`:''}${m.code?U.codeHTML(m.code):''}<div class="opts" role="radiogroup">${m.opts.map((o,j)=>`<button type="button" class="opt" role="radio" aria-checked="false" data-j="${j}"><span class="l">${String.fromCharCode(65+j)}</span><span>${m.codeOpts?`<code>${esc(o)}</code>`:o}</span></button>`).join('')}</div><div class="fb-host" aria-live="polite"></div>`;
  const A=typeof m.a==='number'?m.a:m.opts.indexOf(m.a);let done=false;
  box.querySelector('.opts').addEventListener('click',e=>{const b=e.target.closest('[data-j]');if(!b||done)return;done=true;const j=+b.dataset.j,ok=j===A;
    U.$$('.opt',box).forEach((x,i)=>{x.disabled=true;if(i===A)x.classList.add('is-right');else if(i===j)x.classList.add('is-wrong')});
    box.querySelector('.fb-host').innerHTML=fbHTML(ok,`<div>${m.why||''}</div>`);cb&&cb(ok)});return box};

/* ---------- Runner: one question at a time (quiz, daily practice, revision, practice sets) ---------- */
Q.runner=(host,ids,opt)=>{opt=opt||{};ids=ids.filter(id=>C.qmap[id]);const res={};let i=0;
  const top=U.node('div','runner-top'),slot=U.node('div'),nav=U.node('div','navfoot');host.append(top,slot,nav);
  if(!ids.length){slot.innerHTML=`<div class="empty">${opt.empty||'Nothing here yet.'}</div>`;return}
  const draw=()=>{const done=Object.keys(res).length;top.innerHTML=`<b>${opt.title||'Practice set'}</b><span class="mono small muted">${Math.min(i+1,ids.length)} / ${ids.length}</span><div class="meter ${done===ids.length?'good':''}" role="progressbar" aria-valuemin="0" aria-valuemax="${ids.length}" aria-valuenow="${done}"><i style="width:${done/ids.length*100}%"></i></div><span class="mono small">${Object.values(res).filter(Boolean).length} correct</span>`;
    slot.innerHTML='';if(i>=ids.length)return summary();
    const q=C.qmap[ids[i]];Q.render(q,slot,{mode:opt.mode||'practice',num:`${i+1} of ${ids.length}`,onAnswer(ok){res[q.id]=ok;draw2()}});
    nav.innerHTML=`<button class="btn" type="button" data-n="prev" ${i?'':'disabled'}>← Previous</button><button class="btn primary" type="button" data-n="next">${i===ids.length-1?'Finish':'Next →'}</button>`};
  const draw2=()=>{const done=Object.keys(res).length;const m=top.querySelector('.meter i');if(m)m.style.width=done/ids.length*100+'%';const c=top.lastChild;if(c)c.textContent=Object.values(res).filter(Boolean).length+' correct'};
  const summary=()=>{const ok=Object.values(res).filter(Boolean).length;nav.innerHTML='';
    slot.innerHTML=`<div class="panel"><h3>Set complete: ${ok} / ${Object.keys(res).length} correct${Object.keys(res).length<ids.length?` (${ids.length-Object.keys(res).length} skipped)`:''}</h3>${U.tableHTML(['Question','Result','Topic'],ids.map(id=>{const q=C.qmap[id];return [`<a href="#q/${id}">${q.title}</a>`,res[id]===undefined?'<span class="muted">skipped</span>':res[id]?'<span class="st-solved">✓ correct</span>':'<span class="st-rev">✗ → revision</span>',Q.topicName(q.topic)]}))}<div class="row">${opt.again?`<button class="btn primary" type="button" data-again>${opt.againLabel||'Another set'}</button>`:''}<a class="btn" href="#revision">Revision queue</a><a class="btn" href="#progress">Progress</a></div></div>`;
    const a=slot.querySelector('[data-again]');if(a)a.addEventListener('click',opt.again);opt.onFinish&&opt.onFinish(res)};
  nav.addEventListener('click',e=>{const b=e.target.closest('[data-n]');if(!b)return;i+=b.dataset.n==='next'?1:-1;i=Math.max(0,i);draw();host.scrollIntoView({block:'start',behavior:'smooth'})});
  draw()};

/* pick n practice questions for a topic: unsolved first, easy → hard */
Q.pickSet=(filter,n,opt)=>{opt=opt||{};const qs=C.questions.filter(filter);const st=q=>P.status(q.id);
  const order=q=>(st(q)==='solved'?100:0)+(q.d||1)*10+(q.type==='code'?3:0)+Math.random()*4;
  return qs.map(q=>[order(q),q.id]).sort((a,b)=>a[0]-b[0]).slice(0,n).map(x=>x[1])};
})(COURSE);
