/* Visualizers for topics 6 and 7: stack, bracket matching, monotonic stack, queue/deque, circular queue, sliding-window maximum. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc,node=U.node;
const val=(el,k,d)=>{const s=el.querySelector(`[data-in=${k}]`).value.trim();return s===''?d:(/^-?\d+$/.test(s)?+s:s.slice(0,6))};

/* ---------- stack: push / pop / peek with animation ---------- */
C.addViz('stack',{topic:'stack',title:'Stack: push, pop, peek',desc:'Last in, first out. Push values on top, pop them off, peek without removing.',ico:'TOP → │ 40 │\n       │ 30 │\n       │ 20 │',p:'stack'},(el)=>{
  let st=[10,20,30,40],next=50,last='';
  el.innerHTML=`<div class="viz-ctl">${V.input('v','Value',50,'4em')}<button class="btn small primary" type="button" data-op="push">Push</button><button class="btn small" type="button" data-op="pop">Pop</button><button class="btn small" type="button" data-op="peek">Peek</button><button class="btn small ghost" type="button" data-op="reset">Reset</button></div>
   <div class="grid2"><div class="stage-box"><div class="stackviz" data-s aria-live="polite"></div></div><div class="col" style="gap:10px"><div class="msg" data-m aria-live="polite"></div><div data-vars></div><div><span class="eyebrow">Python</span><pre class="trace-code" data-log style="padding:8px 12px;min-height:120px"></pre></div></div></div>`;
  const $=s=>el.querySelector(s);const log=[];
  const draw=(anim,peek)=>{$('[data-s]').innerHTML=st.map((x,i)=>`<div class="sitem ${i===st.length-1?'top':''} ${anim==='in'&&i===st.length-1?'in':''} ${peek&&i===st.length-1?'peek':''}">${esc(x)}</div>`).join('')||'<span class="muted small" style="margin:auto">empty stack</span>';
    $('[data-vars]').innerHTML=V.vars({'len(stack)':st.length,'stack[-1]':st.length?st[st.length-1]:'—'});$('[data-log]').innerHTML=log.slice(-8).map(l=>U.hl(l)).join('\n')};
  const say=(t,k)=>{const m=$('[data-m]');m.className='msg'+(k?' '+k:'');m.innerHTML=t};
  el.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(!b)return;const op=b.dataset.op;
    if(op==='push'){if(st.length>=9){say('This demo stack holds 9 items. Pop something first.','warn');return}const v=val(el,'v',next);st.push(v);next=(typeof v==='number'?v:next)+10;$('[data-in=v]').value=next;log.push(`stack.append(${JSON.stringify(v)})`);say(`Pushed ${esc(v)} on top. O(1): nothing else moves.`,'ok');draw('in')}
    if(op==='pop'){if(!st.length){log.push('stack.pop()  # IndexError');say('Pop from an empty stack: <b>IndexError</b>. Always check <code>if stack:</code> first.','bad');draw();return}
      const top=$('[data-s]').lastElementChild;top.classList.add('ghost-out');const x=st[st.length-1];b.disabled=true;
      setTimeout(()=>{st.pop();log.push(`stack.pop()  # ${JSON.stringify(x)}`);say(`Popped ${esc(x)}: the <b>last</b> item pushed is the first out (LIFO). O(1).`,'ok');draw();b.disabled=false},matchMedia('(prefers-reduced-motion: reduce)').matches?0:380)}
    if(op==='peek'){if(!st.length){say('Nothing to peek at: the stack is empty.','bad');return}log.push(`stack[-1]  # ${JSON.stringify(st[st.length-1])}`);say(`Peek: the top is ${esc(st[st.length-1])}. It stays on the stack.`);draw(null,true)}
    if(op==='reset'){st=[10,20,30,40];next=50;log.length=0;$('[data-in=v]').value=50;say('Reset. A Python list is a perfect stack: the end of the list is the top.');draw()}});
  say('A Python list is a perfect stack: the end of the list is the top. Try Push, Pop and Peek.');draw()});

/* ---------- valid parentheses ---------- */
C.addViz('brackets',{topic:'stack',title:'Valid parentheses tracer',desc:'Push every opening bracket; every closing bracket must match the top of the stack.',ico:'( [ { } ] )\nstack: ( [',p:'stack'},(el)=>{
  const src=`def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack`;
  const sh=V.shell(el,{controls:`${V.input('s','String','{[()()]}','11em')}<button class="btn small primary" type="button" data-go>Load</button><button class="btn small" type="button" data-ex="([)]">([)]</button><button class="btn small" type="button" data-ex="((()">((()</button><button class="btn small" type="button" data-ex="())">())</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.s,{cls:f.cls,idx:true,ptr:f.i!=null?{ch:f.i}:{}})+`<div class="row" style="margin-top:12px"><span class="eyebrow">stack (top at right)</span>${V.arr(f.st,{idx:false,cls:f.stc||{}})}</div>`;pn.say(f.msg,f.k)}});
  const load=s=>{s=(s||sh.$('[data-in=s]').value).replace(/[^()[\]{}]/g,'').slice(0,16);const P={')':'(',']':'[','}':'{'};const a=s.split(''),st=[],F=[];
    const f=(line,msg,i,cls,stc,k)=>F.push({s:a,line,msg,i,cls:cls||{},st:st.slice(),stc,k});f(3,'Empty stack.');
    for(let i=0;i<a.length;i++){const ch=a[i];
      if('([{'.includes(ch)){st.push(ch);f(6,`'${ch}' opens: push it.`,i,{[i]:'cmp'},{[st.length-1]:'ok'})}
      else{if(!st.length){f(7,`'${ch}' closes, but the stack is empty: nothing to match. <b>Invalid.</b>`,i,{[i]:'bad'},{},'bad');sh.pl.load(F);return}
        const top=st[st.length-1];if(top!==P[ch]){f(7,`'${ch}' needs '${P[ch]}' on top, but the top is '${top}'. <b>Invalid.</b>`,i,{[i]:'bad'},{[st.length-1]:'bad'},'bad');sh.pl.load(F);return}
        f(7,`'${ch}' matches the top '${top}': pop it.`,i,{[i]:'ok'},{[st.length-1]:'ok'});st.pop();f(4,'Matched pair removed.',i,{[i]:'ok'})}}
    f(9,st.length?`End of string, but ${st.length} bracket${st.length>1?'s are':' is'} still open. <b>Invalid.</b>`:'End of string and the stack is empty. <b>Valid!</b>',null,{},{},st.length?'bad':'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load();const x=e.target.closest('[data-ex]');if(x){sh.$('[data-in=s]').value=x.dataset.ex;load(x.dataset.ex)}});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- monotonic stack: next greater element ---------- */
C.addViz('monotonic-stack',{topic:'stack',title:'Monotonic stack: next greater element',desc:'Keep a stack of indexes whose values decrease. A bigger number pops everyone it beats, and becomes their answer.',ico:'[2][1][2][4][3]\n→ 4  2  4 -1 -1',p:'monotonic-stack'},(el)=>{
  const src=`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []                      # indexes, values decreasing
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','2 1 2 4 3 1 5','13em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{label:'nums',cls:f.cls,ptr:f.i!=null?{i:f.i}:{}})+V.arr(f.r,{label:'result',cls:f.rc||{}})+`<div class="row" style="margin-top:10px"><span class="eyebrow">stack (indexes)</span>${f.st.length?V.arr(f.st.map(j=>`${j}:${f.a[j]}`),{idx:false}):'<span class="mono tiny muted">[]</span>'}</div>`;pn.say(f.msg,f.k)}});
  const load=()=>{let a=V.parseList(sh.$('[data-in=arr]').value,12).filter(x=>typeof x==='number');if(!a.length)a=[2,1,2,4,3,1,5];const r=a.map(()=>-1),st=[],F=[];
    const f=(line,msg,i,cls,rc,k)=>F.push({a,r:r.slice(),st:st.slice(),line,msg,i,cls:cls||{},rc,k});f(2,'Every answer starts as −1 (no greater element to the right).');
    a.forEach((x,i)=>{f(4,`x = ${x} at index ${i}.`,i,{[i]:'cmp'});
      while(st.length&&a[st[st.length-1]]<x){const j=st[st.length-1];f(5,`nums[${j}] = ${a[j]} < ${x}: ${x} is the first greater element to its right.`,i,{[i]:'cmp',[j]:'ok'});st.pop();r[j]=x;f(6,`result[${j}] = ${x}. Pop index ${j}.`,i,{[i]:'cmp'},{[j]:'ok'})}
      st.push(i);f(7,`Push index ${i}: it is still waiting for something bigger.`,i,{[i]:'hl'})});
    f(8,`Done. Indexes left on the stack never found a bigger value. Each index is pushed and popped at most once: O(n).`,null,{},{},'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- queue / deque with cost comparison ---------- */
C.addViz('queue',{topic:'queue',title:'Queue and deque',desc:'First in, first out. Compare a list (pop(0) shifts everything) with collections.deque (O(1) at both ends).',ico:'FRONT → [10][20][30][40] ← REAR',p:'queue'},(el)=>{
  let q=[10,20,30,40],impl='deque',next=50,shifts=0;const log=[];
  el.innerHTML=`<div class="viz-ctl"><span class="small muted">Implementation:</span><button class="btn small" type="button" data-impl="deque">collections.deque</button><button class="btn small" type="button" data-impl="list">list with pop(0)</button></div>
   <div class="viz-ctl">${V.input('v','Value',50,'4em')}<button class="btn small primary" type="button" data-op="enq">Enqueue (append)</button><button class="btn small" type="button" data-op="deq">Dequeue (popleft)</button><button class="btn small" type="button" data-op="peek">Peek front</button><button class="btn small" type="button" data-op="appendleft" data-dq>appendleft</button><button class="btn small" type="button" data-op="pop" data-dq>pop (right end)</button><button class="btn small ghost" type="button" data-op="reset">Reset</button></div>
   <div class="stage-box"><div class="qviz" data-q></div></div><div class="msg" data-m aria-live="polite"></div><div data-vars></div><div><span class="eyebrow">Python</span><pre class="trace-code" data-log style="padding:8px 12px;min-height:80px"></pre></div>`;
  const $=s=>el.querySelector(s);
  const say=(t,k)=>{const m=$('[data-m]');m.className='msg'+(k?' '+k:'');m.innerHTML=t};
  const draw=(inAt,peek)=>{U.$$('[data-impl]',el).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.impl===impl)));U.$$('[data-dq]',el).forEach(b=>b.hidden=impl!=='deque');
    $('[data-q]').innerHTML=`<span class="qlabel">FRONT →</span>${q.map((x,i)=>`<div class="qitem ${i===0?'front':''} ${i===q.length-1?'rear':''} ${i===inAt?'in':''}" ${peek&&i===0?'style="border-color:var(--warn);background:var(--warn-soft)"':''}>${esc(x)}</div>`).join('')||'<span class="mono tiny muted">empty</span>'}<span class="qlabel">← REAR</span>`;
    $('[data-vars]').innerHTML=V.vars({len:q.length,'elements shifted so far':shifts});$('[data-log]').innerHTML=log.slice(-6).map(l=>U.hl(l)).join('\n')};
  el.addEventListener('click',e=>{const im=e.target.closest('[data-impl]');if(im){impl=im.dataset.impl;shifts=0;log.length=0;say(impl==='list'?'Now using a plain list. Dequeue with <code>q.pop(0)</code> and watch the shift counter.':'Now using <code>collections.deque</code>: O(1) at both ends.');draw();return}
    const b=e.target.closest('[data-op]');if(!b)return;const op=b.dataset.op,name=impl==='deque'?'q':'q';
    if(op==='enq'||op==='appendleft'){if(q.length>=10){say('This demo queue holds 10 items.','warn');return}const v=val(el,'v',next);next=(typeof v==='number'?v:next)+10;$('[data-in=v]').value=next;
      if(op==='enq'){q.push(v);log.push(`${name}.append(${JSON.stringify(v)})`);say(`Enqueued ${esc(v)} at the rear. O(1).`,'ok');draw(q.length-1)}else{q.unshift(v);log.push(`q.appendleft(${JSON.stringify(v)})`);say(`appendleft(${esc(v)}): added at the front in O(1). (On a list, insert(0, x) would shift everything.)`,'ok');draw(0)}}
    if(op==='deq'){if(!q.length){say('Dequeue from an empty queue: IndexError.','bad');return}const x=q.shift();
      if(impl==='list'){shifts+=q.length;log.push(`q.pop(0)  # ${JSON.stringify(x)}, shifted ${q.length}`);say(`Removed ${esc(x)} from the front. The list had to shift all ${q.length} remaining element${q.length===1?'':'s'} left: <b>O(n)</b> per dequeue, O(n²) to drain the queue.`,'warn')}
      else{log.push(`q.popleft()  # ${JSON.stringify(x)}`);say(`Removed ${esc(x)} from the front: FIFO, first in is first out. A deque does this in <b>O(1)</b>, no shifting.`,'ok')}draw()}
    if(op==='pop'){if(!q.length)return;const x=q.pop();log.push(`q.pop()  # ${JSON.stringify(x)}`);say(`Removed ${esc(x)} from the rear. O(1) on a deque.`,'ok');draw()}
    if(op==='peek'){if(!q.length){say('Empty queue.','bad');return}log.push(`q[0]  # ${JSON.stringify(q[0])}`);say(`The front is ${esc(q[0])}. It stays in the queue.`);draw(null,true)}
    if(op==='reset'){q=[10,20,30,40];next=50;shifts=0;log.length=0;$('[data-in=v]').value=50;say('Reset.');draw()}});
  say('Enqueue at the rear, dequeue from the front. Switch the implementation to see why <code>list.pop(0)</code> is a trap.');draw()});

/* ---------- circular queue ---------- */
C.addViz('circular-queue',{topic:'queue',title:'Circular queue',desc:'A fixed array where the rear wraps around to index 0. head and count, with % k, replace all shifting.',ico:'[30][40][  ][10][20]\n      ↑rear  ↑head',p:'queue'},(el)=>{
  const K=6;let data=Array(K).fill(null),head=0,count=0,next=10;
  el.innerHTML=`<div class="viz-ctl">${V.input('v','Value',10,'4em')}<button class="btn small primary" type="button" data-op="enq">Enqueue</button><button class="btn small" type="button" data-op="deq">Dequeue</button><button class="btn small ghost" type="button" data-op="reset">Reset</button></div><div class="stage-box" data-s></div><div class="msg" data-m aria-live="polite"></div><div data-vars></div>`;
  const $=s=>el.querySelector(s);const say=(t,k)=>{const m=$('[data-m]');m.className='msg'+(k?' '+k:'');m.innerHTML=t};
  const draw=hl=>{const cls={},ptr={};for(let j=0;j<count;j++)cls[(head+j)%K]='hl';if(hl!=null)cls[hl]='ok';ptr.head=head;if(count)ptr.rear=(head+count-1)%K;
    $('[data-s]').innerHTML=V.arr(data.map((x,i)=>{let inside=false;for(let j=0;j<count;j++)if((head+j)%K===i)inside=true;return inside?x:'·'}),{cls,ptr});
    $('[data-vars]').innerHTML=V.vars({k:K,head,count,'next slot = (head + count) % k':(head+count)%K})};
  el.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(!b)return;const op=b.dataset.op;
    if(op==='enq'){if(count===K){say(`Full: count == k (${K}). enqueue returns False.`,'bad');return}const t=(head+count)%K;const v=val(el,'v',next);data[t]=v;count++;next=(typeof v==='number'?v:next)+10;$('[data-in=v]').value=next;
      say(`Write ${esc(v)} at (head + count) % k = (${head} + ${count-1}) % ${K} = ${t}.${t<head?' <b>Wrapped around</b> to the start of the array.':''}`,'ok');draw(t)}
    if(op==='deq'){if(!count){say('Empty: dequeue returns False.','bad');return}const x=data[head];const old=head;head=(head+1)%K;count--;say(`Remove ${esc(x)} at index ${old} by moving head to (${old} + 1) % ${K} = ${head}. Nothing shifts.`,'ok');draw()}
    if(op==='reset'){data=Array(K).fill(null);head=0;count=0;next=10;$('[data-in=v]').value=10;say('Empty circular queue of capacity 6.');draw()}});
  say('Enqueue a few values, dequeue a few, then keep enqueuing: watch the rear wrap to index 0.');draw()});

/* ---------- sliding window maximum (monotonic deque) ---------- */
C.addViz('window-max',{topic:'queue',title:'Sliding window maximum (monotonic deque)',desc:'Keep a deque of indexes whose values decrease. The front is always the maximum of the window.',ico:'[1 3 -1] -3 5 3 6 7\n max 3',p:'queue'},(el)=>{
  const src=`from collections import deque

def max_sliding_window(nums, k):
    dq, out = deque(), []           # indexes, values decreasing
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()                # smaller values can never be max again
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()            # front slid out of the window
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','1 3 -1 -3 5 3 6 7','13em')}${V.input('k','k',3,'3em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,win:f.win,ptr:f.i!=null?{i:f.i}:{}})+`<div class="row" style="margin-top:10px"><span class="eyebrow">deque (indexes)</span>${f.dq.length?V.arr(f.dq.map(j=>`${j}:${f.a[j]}`),{idx:false,cls:{0:'ok'}}):'<span class="mono tiny muted">[]</span>'}</div><div class="row" style="margin-top:6px"><span class="eyebrow">out</span><span class="mono">[${f.out.join(', ')}]</span></div>`;pn.say(f.msg,f.k)}});
  const load=()=>{let a=V.parseList(sh.$('[data-in=arr]').value,12).filter(x=>typeof x==='number');if(!a.length)a=[1,3,-1,-3,5,3,6,7];const k=Math.max(1,Math.min(a.length,parseInt(sh.$('[data-in=k]').value,10)||3));
    const dq=[],out=[],F=[];const f=(line,msg,i,cls,k2)=>F.push({a,dq:dq.slice(),out:out.slice(),line,msg,i,cls:cls||{},win:i!=null?[Math.max(0,i-k+1),i]:null,k:k2});
    f(4,'Empty deque.');a.forEach((x,i)=>{f(5,`x = ${x} enters the window.`,i,{[i]:'cmp'});
      while(dq.length&&a[dq[dq.length-1]]<=x){const j=dq.pop();f(7,`nums[${j}] = ${a[j]} ≤ ${x}: it can never be the maximum while ${x} is in the window. Drop it from the back.`,i,{[i]:'cmp',[j]:'dim'})}
      dq.push(i);f(8,`Append index ${i}. Values in the deque are decreasing.`,i,{[i]:'hl'});
      if(dq[0]<=i-k){const j=dq.shift();f(10,`Index ${j} has slid out of the window: popleft.`,i,{[j]:'dim'})}
      if(i>=k-1){out.push(a[dq[0]]);f(12,`Window full: its maximum is the front, nums[${dq[0]}] = ${a[dq[0]]}.`,i,{[dq[0]]:'ok'})}});
    f(13,`out = [${out.join(', ')}]. Each index enters and leaves the deque once: O(n), not O(n·k).`,null,{},'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
