/* ProgressTracker + RevisionQueue + mastery + daily plan + achievements. Everything lives in localStorage ('dsa:progress'). */
(function(C){
'use strict';
const U=C.U,store=U.store;
const P={};C.P=P;
const fresh=()=>({v:2,q:{},days:{},lessons:{},iv:[],plan:null});
let D=store.get('progress',null)||fresh();
['q','days','lessons'].forEach(k=>{if(!D[k]||typeof D[k]!=='object')D[k]={}});if(!Array.isArray(D.iv))D.iv=[];

/* one-time migration from the original session-based course (exercise keys like "s01.m3.0") */
(function migrate(){if(D.migrated)return;const old=store.get('solved',null);const map={
  's01.m3.0':'py-count-vowels','s01.m3.1':'arr-second-largest','s01.m3.2':'py-word-freq','s01.m3.3':'py-dedupe',
  's02.m4.0':'bigo-has-duplicate','s02.m4.1':'bigo-has-pair','s02.m4.2':'bigo-first-repeat',
  's03.m4.0':'rec-sum-digits','s03.m4.1':'rec-power','s03.m4.2':'rec-is-pal','s03.m4.3':'rec-flatten'};
  Object.entries(map).forEach(([k,id])=>{if(old&&old[k])D.q[id]=Object.assign({a:1,c:1,w:0,f:1,s:1,t:Date.now()},D.q[id]||{});
    const code=store.get('code:'+k,null);if(code!=null&&store.get('code:'+id,null)==null)store.set('code:'+id,code)});
  D.migrated=1;store.set('progress',D)})();

const subs=[];
P.on=fn=>subs.push(fn);
const save=()=>{store.set('progress',D);subs.forEach(f=>{try{f()}catch(e){console.error(e)}})};
P.data=()=>D;
const today=()=>U.day();
const touch=()=>{const t=today();D.days[t]=(D.days[t]||0)+1};

/* ---------- per-question records ----------
   a attempts · c correct · w wrong · f first-try result (1/0) · s solved · rev needs revision · box (0-3) · due (day) · tries (failed code checks) · h hints used */
P.rec=id=>D.q[id]||null;
P.status=id=>{const r=D.q[id];if(!r)return 'new';if(r.rev)return 'rev';if(r.s)return 'solved';return (r.a||r.tries)?'tried':'new'};
P.STATUS={new:['○','Unsolved','st-new'],tried:['◐','Attempted','st-try'],solved:['✓','Solved','st-solved'],rev:['↻','Needs revision','st-rev']};
const INTERVAL=[1,2,4,8];
P.record=(id,ok,opt)=>{opt=opt||{};const r=D.q[id]||(D.q[id]={a:0,c:0,w:0});const t=today();
  if(!r.a)r.f=ok?1:0;r.a++;r.t=Date.now();
  if(ok){r.c++;r.s=1;
    if(r.rev&&(opt.mode==='revision'||(r.due||0)<=t)){r.box=(r.box||0)+1;if(r.box>=4){r.rev=0;delete r.due;delete r.box;r.grad=1}else r.due=t+INTERVAL[r.box]}}
  else{r.w++;r.rev=1;r.box=0;r.due=t+1}
  touch();
  if(ok&&D.plan&&D.plan.day===t&&D.plan.items.some(x=>x.id===id))D.plan.done[id]=1;
  save();return r};
/* correct on a retry in the same view: solved, but the first (wrong) answer still decides revision */
P.markSolved=id=>{const r=D.q[id]||(D.q[id]={a:0,c:0,w:0});r.s=1;r.t=Date.now();const t=today();if(D.plan&&D.plan.day===t&&D.plan.items.some(x=>x.id===id))D.plan.done[id]=1;save()};
/* failed code check: counts as practice, not as a wrong answer */
P.tried=id=>{const r=D.q[id]||(D.q[id]={a:0,c:0,w:0});r.tries=(r.tries||0)+1;r.t=Date.now();touch();save()};
/* revealing a solution before solving sends the problem to revision */
P.revealed=id=>{const r=D.q[id]||(D.q[id]={a:0,c:0,w:0});if(r.s&&!r.rev)return;if(!r.a){r.f=0}r.a++;r.w++;r.rev=1;r.box=0;r.due=today()+1;r.t=Date.now();touch();save()};
P.hint=(id,level)=>{const r=D.q[id]||(D.q[id]={a:0,c:0,w:0});r.h=Math.max(r.h||0,level);store.set('progress',D)};
P.flag=(id,on)=>{const r=D.q[id]||(D.q[id]={a:0,c:0,w:0});if(on){r.rev=1;r.box=0;r.due=today()}else{r.rev=0;delete r.due;delete r.box}save()};
P.isDue=id=>{const r=D.q[id];return !!(r&&r.rev&&(r.due||0)<=today())};
P.due=()=>Object.keys(D.q).filter(id=>C.qmap[id]&&P.isDue(id));
P.revAll=()=>Object.keys(D.q).filter(id=>C.qmap[id]&&D.q[id].rev).sort((a,b)=>(D.q[a].due||0)-(D.q[b].due||0));
P.solvedIds=()=>Object.keys(D.q).filter(id=>C.qmap[id]&&D.q[id].s);

/* ---------- lessons ---------- */
P.lessons=tid=>D.lessons[tid]||[];
P.lessonDone=(tid,i,on)=>{const l=(D.lessons[tid]||(D.lessons[tid]=[]));l[i]=on?1:0;if(on)touch();save()};
P.lessonCount=()=>{let done=0,total=0;C.topics.forEach(t=>{total+=t.learn.length;done+=t.learn.filter((_,i)=>P.lessons(t.id)[i]).length});return {done,total}};

/* ---------- streak + activity ---------- */
P.streak=()=>{const t=today();let d=D.days[t]?t:t-1,n=0;while(D.days[d]){n++;d--}return n};
P.activity=()=>D.days;

/* ---------- mastery (a rough guide, not a measurement) ---------- */
P.topicStats=tid=>{const qs=C.questions.filter(q=>q.topic===tid);let solved=0,att=0,first=0,firstN=0,rev=0,ch=0,chT=0;
  qs.forEach(q=>{const r=D.q[q.id];const isCh=q.type==='code'&&(q.d||1)>=2;if(isCh)chT++;if(!r)return;if(r.s)solved++;if(r.a||r.tries)att++;if(r.a){firstN++;first+=r.f?1:0}if(r.rev)rev++;if(isCh&&r.s)ch++});
  const L=C.tmap[tid].learn.length,Ld=C.tmap[tid].learn.filter((_,i)=>P.lessons(tid)[i]).length;
  const coverage=qs.length?Math.min(1,solved/Math.min(qs.length,25)):0;
  const acc=(first+1)/(firstN+2),conf=Math.min(1,firstN/8);
  const chal=chT?Math.min(1,ch/Math.min(chT,5)):coverage;
  const lessons=L?Ld/L:0;
  let m=100*(0.38*coverage+0.32*acc*conf+0.2*chal+0.1*lessons)-Math.min(20,rev*3);
  m=Math.round(U.clamp(att||Ld?m:0,0,100));
  return {total:qs.length,solved,attempted:att,firstOk:first,firstN,rev,ch,chT,lessonsDone:Ld,lessonsTotal:L,mastery:m,level:P.level(m)}};
P.level=m=>m>=80?['strong','Strong']:m>=65?['good','Good']:m>=50?['practice','Practice more']:m>=30?['work','Needs work']:['learning','Learning'];
P.totals=()=>{let a=0,f=0;Object.entries(D.q).forEach(([id,r])=>{if(C.qmap[id]&&r.a){a++;f+=r.f?1:0}});
  const solved=P.solvedIds().length;const ch=P.solvedIds().filter(id=>{const q=C.qmap[id];return q.type==='code'&&((q.d||1)>=2||q.build)}).length;
  const mastered=C.topics.filter(t=>P.topicStats(t.id).mastery>=80).length;
  return {solved,attempted:a,accuracy:a?Math.round(f/a*100):0,challenges:ch,mastered,streak:P.streak(),due:P.due().length,revTotal:P.revAll().length}};

/* ---------- today's practice: 2 easy · 4 medium · 1 debugging · 1 revision ---------- */
const activeTopics=()=>{const order=C.topics.map(t=>t.id);const act=order.filter(id=>C.questions.some(q=>q.topic===id&&D.q[q.id])||P.lessons(id).some(Boolean));
  if(!act.length)return order.slice(0,3);const last=order.indexOf(act[act.length-1]);if(order[last+1]&&!act.includes(order[last+1]))act.push(order[last+1]);return act};
P.plan=()=>{const t=today();if(D.plan&&D.plan.day===t&&D.plan.items)return D.plan;
  const r=U.rng(t*7919+13),act=activeTopics(),used=new Set();
  const avail=q=>!used.has(q.id)&&!(D.q[q.id]&&D.q[q.id].s)&&!q.build;
  const pick=(pred,n)=>{const out=[];const tiers=[C.questions.filter(q=>act.includes(q.topic)),C.questions];
    for(const tier of tiers){const c=U.shuffle(tier.filter(q=>avail(q)&&pred(q)),r);for(const q of c){if(out.length>=n)break;if(used.has(q.id))continue;used.add(q.id);out.push(q.id)}if(out.length>=n)break}return out};
  const items=[];
  const due=U.shuffle(P.due(),r);const revId=due[0]||U.shuffle(P.revAll(),r)[0];
  pick(q=>q.d===1&&q.type==='code',1).forEach(id=>items.push({id,role:'easy'}));
  pick(q=>q.d===1&&q.type!=='debug'&&q.type!=='code',2-items.length).forEach(id=>items.push({id,role:'easy'}));
  pick(q=>q.d===2&&q.type==='code',2).forEach(id=>items.push({id,role:'medium'}));
  pick(q=>q.d===2&&q.type!=='debug',6-items.length).forEach(id=>items.push({id,role:'medium'}));
  pick(q=>q.type==='debug',1).forEach(id=>items.push({id,role:'debug'}));
  if(revId){used.add(revId);items.push({id:revId,role:'revision'})}else pick(q=>(q.d||1)<=2,1).forEach(id=>items.push({id,role:'practice'}));
  D.plan={day:t,items,done:{}};store.set('progress',D);return D.plan};
P.planProgress=()=>{const p=P.plan();const done=p.items.filter(x=>p.done[x.id]).length;return {done,total:p.items.length}};

/* ---------- interview history ---------- */
P.ivAdd=e=>{D.iv.unshift(e);D.iv=D.iv.slice(0,50);touch();save()};
P.ivList=()=>D.iv;

/* ---------- achievements (light) ---------- */
P.achievements=()=>{const T=P.totals();const st=id=>P.topicStats(id);const solvedOf=f=>P.solvedIds().filter(id=>f(C.qmap[id])).length;
  return [
   ['First steps','Solve 10 problems',T.solved>=10],
   ['Fifty','Solve 50 problems',T.solved>=50],
   ['Century','Solve 100 problems',T.solved>=100],
   ['Marathon','Solve 250 problems',T.solved>=250],
   ['On a roll','3-day streak',T.streak>=3],
   ['Habit','7-day streak',T.streak>=7],
   ['Bug hunter','Solve 10 debugging questions',solvedOf(q=>q.type==='debug')>=10],
   ['Tracer','Complete 10 dry runs',solvedOf(q=>q.type==='dryrun')>=10],
   ['Array Master','Arrays mastery: Strong',st('arrays').mastery>=80],
   ['Hash Hero','Hashing mastery: Strong',st('hashing').mastery>=80],
   ['Tree Explorer','Solve 15 tree problems',solvedOf(q=>['trees','bst'].includes(q.topic))>=15],
   ['Graph Explorer','Solve 15 graph problems',solvedOf(q=>['graphs','advgraphs'].includes(q.topic))>=15],
   ['Builder','Build 3 data structures from scratch',solvedOf(q=>q.build)>=3],
   ['Interview ready','Pass 3 timed interviews',D.iv.filter(x=>x.ok).length>=3]].map(([name,desc,got])=>({name,desc,got}))};

/* ---------- backup ---------- */
P.exportJSON=()=>JSON.stringify(D);
P.importJSON=s=>{const x=JSON.parse(s);if(!x||typeof x.q!=='object')throw new Error('Not a progress file');D=Object.assign(fresh(),x);save()};
P.reset=()=>{D=fresh();D.migrated=1;save()};
})(COURSE);
