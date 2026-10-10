/* Visualizers for topics 10 and 11: linear search, binary search (watch it, or drive it yourself), and six sorting algorithms. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;
const nums=(s,max,d)=>{const a=V.parseList(s,max).filter(x=>typeof x==='number');return a.length?a:d};

/* ---------- linear vs binary search ---------- */
C.addViz('linear-search',{topic:'searching',title:'Linear search',desc:'Check every element from left to right until you find the target. Works on any list, costs O(n).',ico:'[7][3][9][1][5]\n →  →  ✓',p:'traversal'},(el)=>{
  const src=`def linear_search(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','7 3 9 1 5 8 2','12em')}${V.input('t','target',5,'4em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,ptr:f.ptr});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{const a=nums(sh.$('[data-in=arr]').value,14,[7,3,9,1,5,8,2]),t=parseInt(sh.$('[data-in=t]').value,10);const F=[];let c=0;
    for(let i=0;i<a.length;i++){c++;if(a[i]===t){F.push({a,line:4,cls:{[i]:'ok'},ptr:{i},msg:`nums[${i}] = ${a[i]} == ${t}: found after ${c} comparison${c>1?'s':''}.`,vars:{i,comparisons:c},k:'ok'});sh.pl.load(F);return}
      F.push({a,line:3,cls:{[i]:'cmp'},ptr:{i},msg:`nums[${i}] = ${a[i]} ≠ ${t}.`,vars:{i,comparisons:c}})}
    F.push({a,line:5,cls:{},ptr:{},msg:`Not found after checking all ${a.length} elements: return −1. Worst case O(n).`,vars:{comparisons:c},k:'bad'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

const BS={
 classic:{label:'Find target',src:`def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`},
 first:{label:'First occurrence',src:`def first_occurrence(nums, target):
    low, high = 0, len(nums) - 1
    answer = -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            answer = mid          # remember it, keep looking left
            high = mid - 1
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return answer`},
 insert:{label:'Insert position',src:`def search_insert(nums, target):
    low, high = 0, len(nums)      # high is exclusive
    while low < high:
        mid = (low + high) // 2
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid
    return low                    # first index with nums[i] >= target`}};
const bsFrames=(a,t,mode)=>{const F=[];const range=(lo,hi)=>{const c={};a.forEach((_,i)=>{if(i<lo||i>hi)c[i]='dim'});return c};let steps=0;
  const f=(line,msg,lo,hi,mid,extra,k,vars)=>F.push({a,line,msg,cls:Object.assign(range(lo,hi),mid!=null?{[mid]:'cmp'}:{},extra||{}),ptr:Object.assign({low:lo,high:hi},mid!=null?{mid}:{}),vars:Object.assign({target:t,low:lo,high:hi,mid:mid==null?'–':mid,steps},vars||{}),k,src:BS[mode].src});
  if(mode==='insert'){let lo=0,hi=a.length;f(2,'low = 0, high = len(nums): the answer can be anywhere from 0 to n.',lo,hi-1);
    while(lo<hi){const mid=(lo+hi)>>1;steps++;f(4,`mid = (${lo} + ${hi}) // 2 = ${mid}; nums[mid] = ${a[mid]}.`,lo,hi-1,mid);
      if(a[mid]<t){lo=mid+1;f(6,`${a[mid]} < ${t}: the answer is to the right of mid. low = ${lo}.`,lo,hi-1)}else{hi=mid;f(8,`${a[mid]} ≥ ${t}: mid could be the answer; keep it. high = ${hi}.`,lo,hi-1)}}
    f(9,`low == high = ${lo}: insert ${t} at index ${lo} to keep the list sorted. ${steps} steps for ${a.length} items.`,lo,lo-1,null,lo<a.length?{[lo]:'ok'}:{},'ok');return F}
  let lo=0,hi=a.length-1,ans=-1;f(2,`Search ${a.length} sorted items for ${t}. The answer, if present, is between low and high.`,lo,hi);
  while(lo<=hi){const mid=(lo+hi)>>1;steps++;f(mode==='first'?5:4,`mid = (${lo} + ${hi}) // 2 = ${mid}. Compare nums[${mid}] = ${a[mid]} with ${t}.`,lo,hi,mid);
    if(a[mid]===t){if(mode==='classic'){f(6,`Found ${t} at index ${mid} after ${steps} step${steps>1?'s':''}.`,lo,hi,mid,{[mid]:'ok'},'ok');return F}
      ans=mid;hi=mid-1;f(8,`Found ${t} at ${mid}. Record it, but an earlier copy may exist: search the left half. high = ${hi}.`,lo,hi,null,{[mid]:'ok'},null,{answer:ans})}
    else if(a[mid]<t){lo=mid+1;f(mode==='first'?10:8,`${a[mid]} < ${t}: everything at or left of mid is too small. Discard it: low = ${lo}.`,lo,hi,null,null,null,mode==='first'?{answer:ans}:null)}
    else{hi=mid-1;f(mode==='first'?12:10,`${a[mid]} > ${t}: everything at or right of mid is too big. Discard it: high = ${hi}.`,lo,hi,null,null,null,mode==='first'?{answer:ans}:null)}}
  if(mode==='first')f(13,ans>=0?`low > high. The first occurrence is index ${ans}.`:`${t} is not present: return −1.`,lo,hi,null,ans>=0?{[ans]:'ok'}:{},ans>=0?'ok':'bad',{answer:ans});
  else f(11,`low (${lo}) > high (${hi}): the range is empty, ${t} is not in the list. ${steps} steps; a linear search might need ${a.length}.`,lo,hi,null,{},'bad');return F};
C.addViz('binary-search',{topic:'searching',title:'Binary search',desc:'Halve the search range every step. Watch low, mid and high, or switch to “You decide” and make every move yourself.',ico:'[2][5][8][12][16][23][38]\n low     mid       high',p:'binary-search'},(el)=>{
  let mode='classic';
  el.insertAdjacentHTML('beforeend',`<div class="viz-ctl">${V.input('arr','sorted nums','2 5 8 12 16 23 38 56 72 91','16em')}${V.input('t','target',23,'4em')}<button class="btn small primary" type="button" data-go>Load</button><span style="width:8px"></span><button class="btn small" type="button" data-you aria-pressed="false">🎮 You decide</button></div>`);
  const watch=U.node('div','viz'),play=U.node('div','viz');play.hidden=true;el.append(watch,play);
  const sh=V.shell(watch,{controls:V.modeButtons(Object.entries(BS).map(([k,m])=>[k,m.label]),mode),code:BS.classic.src,draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,ptr:f.ptr});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars,['mid'])}});
  const get=()=>{let a=nums(el.querySelector('[data-in=arr]').value,16,[2,5,8,12,16,23,38,56,72,91]).sort((x,y)=>x-y);return {a,t:parseInt(el.querySelector('[data-in=t]').value,10)||0}};
  const load=()=>{const {a,t}=get();el.querySelector('[data-in=arr]').value=a.join(' ');U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));sh.pl.load(bsFrames(a,t,mode));if(!play.hidden)startGame()};
  /* "You decide": the student chooses each move */
  let g=null;
  const drawGame=(msg,k)=>{const {a,t,lo,hi,steps,done}=g;const mid=(lo+hi)>>1;const cls={};a.forEach((_,i)=>{if(i<lo||i>hi)cls[i]='dim'});if(!done&&lo<=hi)cls[mid]='cmp';if(done&&g.found!=null)cls[g.found]='ok';
    play.innerHTML=`<div class="stage-box">${V.arr(a,{cls,ptr:done?{}:Object.assign({low:lo,high:hi},lo<=hi?{mid}:{})})}</div><div class="msg ${k||''}" aria-live="polite">${msg}</div>${V.vars({target:t,low:lo,high:hi,mid:lo<=hi?mid:'–','nums[mid]':lo<=hi?a[mid]:'–',steps})}
     ${done?'<div class="row"><button class="btn primary small" type="button" data-again>Play again</button></div>':`<div class="row" role="group" aria-label="Your move"><button class="btn" type="button" data-move="left">◀ Go left (high = mid − 1)</button><button class="btn" type="button" data-move="found">✓ Found it</button><button class="btn" type="button" data-move="right">Go right (low = mid + 1) ▶</button><button class="btn ghost" type="button" data-move="none">✗ Not in the list</button></div>`}`};
  const startGame=()=>{const {a,t}=get();g={a,t,lo:0,hi:a.length-1,steps:0,mistakes:0,done:false};drawGame(`Find <b>${t}</b>. mid = (low + high) // 2 is highlighted. Compare nums[mid] with ${t} and choose your move.`)};
  play.addEventListener('click',e=>{if(e.target.closest('[data-again]')){startGame();return}const b=e.target.closest('[data-move]');if(!b||g.done)return;
    const {a,t}=g,mid=(g.lo+g.hi)>>1,mv=b.dataset.move;const empty=g.lo>g.hi;
    const right=empty?'none':a[mid]===t?'found':a[mid]<t?'right':'left';
    if(mv!==right){g.mistakes++;const why=empty?`low > high: the range is empty, so ${t} is not in the list.`:right==='found'?`nums[mid] = ${a[mid]} equals ${t}!`:right==='right'?`nums[mid] = ${a[mid]} < ${t}, so ${t} can only be to the RIGHT of mid.`:`nums[mid] = ${a[mid]} > ${t}, so ${t} can only be to the LEFT of mid.`;drawGame(`Not quite. ${why} Try again.`,'bad');return}
    g.steps++;if(mv==='found'){g.done=true;g.found=mid;drawGame(`Correct! Found ${t} at index ${mid} in ${g.steps} step${g.steps>1?'s':''}${g.mistakes?` (${g.mistakes} wrong move${g.mistakes>1?'s':''})`:' with no mistakes'}.`,'ok');return}
    if(mv==='none'){g.done=true;drawGame(`Correct: the range is empty, so ${t} is not present. ${g.steps} steps.`,'ok');return}
    if(mv==='right')g.lo=mid+1;else g.hi=mid-1;drawGame(g.lo>g.hi?`Correct. Now low = ${g.lo} > high = ${g.hi}. What does that mean?`:`Correct. Half the range is gone. New mid = ${(g.lo+g.hi)>>1}.`,'ok')});
  el.querySelector('[data-go]').addEventListener('click',load);el.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-in]'))load()});
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;load()}});
  el.querySelector('[data-you]').addEventListener('click',e=>{const on=play.hidden;play.hidden=!on;watch.hidden=on;e.currentTarget.setAttribute('aria-pressed',String(on));if(on)startGame()});
  load()});

/* ---------- sorting ---------- */
const SORTS={
 bubble:{label:'Bubble',cx:['O(n)','O(n²)','O(n²)','O(1)','yes'],src:`def bubble_sort(a):
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break`},
 selection:{label:'Selection',cx:['O(n²)','O(n²)','O(n²)','O(1)','no'],src:`def selection_sort(a):
    n = len(a)
    for i in range(n):
        m = i
        for j in range(i + 1, n):
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]`},
 insertion:{label:'Insertion',cx:['O(n)','O(n²)','O(n²)','O(1)','yes'],src:`def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key`},
 merge:{label:'Merge',cx:['O(n log n)','O(n log n)','O(n log n)','O(n)','yes'],src:`def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]`},
 quick:{label:'Quick',cx:['O(n log n)','O(n log n)','O(n²)','O(log n)','no'],src:`def quick_sort(a, lo, hi):
    if lo >= hi:
        return
    pivot = a[hi]                  # Lomuto partition
    i = lo
    for j in range(lo, hi):
        if a[j] < pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]       # pivot lands in place
    quick_sort(a, lo, i - 1)
    quick_sort(a, i + 1, hi)`},
 heap:{label:'Heap',cx:['O(n log n)','O(n log n)','O(n log n)','O(1)','no'],src:`def heap_sort(a):
    n = len(a)
    def sift_down(i, size):
        while True:
            big, l, r = i, 2 * i + 1, 2 * i + 2
            if l < size and a[l] > a[big]: big = l
            if r < size and a[r] > a[big]: big = r
            if big == i:
                return
            a[i], a[big] = a[big], a[i]
            i = big
    for i in range(n // 2 - 1, -1, -1):   # build a max-heap
        sift_down(i, n)
    for end in range(n - 1, 0, -1):       # move the max to the end
        a[0], a[end] = a[end], a[0]
        sift_down(0, end)`}};
const record=(a0,kind)=>{const a=a0.slice(),F=[],sorted=new Set();let cmp=0,swp=0;
  const snap=(line,msg,cls,ptr,k)=>{const c={};sorted.forEach(i=>c[i]='ok');F.push({a:a.slice(),line,msg,cls:Object.assign(c,cls||{}),ptr:ptr||{},cmp,swp,k})};
  const sw=(i,j)=>{[a[i],a[j]]=[a[j],a[i]];swp++};
  snap(0,`Unsorted: [${a.join(', ')}].`);
  if(kind==='bubble'){const n=a.length;for(let i=0;i<n;i++){let s=false;for(let j=0;j<n-1-i;j++){cmp++;
      if(a[j]>a[j+1]){snap(6,`${a[j]} > ${a[j+1]} → SWAP`,{[j]:'cmp',[j+1]:'cmp'},{j,'j+1':j+1});sw(j,j+1);s=true;snap(7,`[${a.join(', ')}]`,{[j]:'hl',[j+1]:'hl'},{j,'j+1':j+1})}
      else snap(6,`${a[j]} ≤ ${a[j+1]}: no swap.`,{[j]:'cmp',[j+1]:'cmp'},{j,'j+1':j+1})}
    sorted.add(n-1-i);if(!s){for(let k=0;k<n;k++)sorted.add(k);snap(10,'A full pass with no swaps: the list is sorted. Stop early (best case O(n)).',{},{},'ok');break}snap(9,`Pass ${i+1} done: ${a[n-1-i]} has bubbled to its final place.`)}}
  if(kind==='selection'){const n=a.length;for(let i=0;i<n;i++){let m=i;for(let j=i+1;j<n;j++){cmp++;snap(6,`Is ${a[j]} < current minimum ${a[m]}?${a[j]<a[m]?' Yes: new minimum.':''}`,{[j]:'cmp',[m]:'hl'},{i,j,min:m});if(a[j]<a[m])m=j}
      if(m!==i){snap(8,`Smallest remaining is ${a[m]}: swap it into position ${i}.`,{[i]:'cmp',[m]:'cmp'},{i,min:m});sw(i,m)}sorted.add(i);snap(8,`Position ${i} is final.`,{},{i})}}
  if(kind==='insertion'){sorted.add(0);for(let i=1;i<a.length;i++){const key=a[i];let j=i-1;snap(3,`key = ${key}. Insert it into the sorted part on its left.`,{[i]:'cmp'},{i});
      while(j>=0){cmp++;if(a[j]>key){a[j+1]=a[j];swp++;snap(6,`${a[j]} > ${key}: shift ${a[j]} right.`,{[j]:'cmp',[j+1]:'hl'},{j});j--}else{snap(5,`${a[j]} ≤ ${key}: stop.`,{[j]:'cmp'},{j});break}}
      a[j+1]=key;for(let k=0;k<=i;k++)sorted.add(k);snap(8,`Place ${key} at index ${j+1}. The first ${i+1} items are sorted (relative to each other).`,{[j+1]:'hl'})}sorted.clear();a.forEach((_,i)=>sorted.add(i))}
  if(kind==='merge'){const ms=(lo,hi)=>{if(hi-lo<1)return;const mid=(lo+hi)>>1;snap(4,`Split [${a.slice(lo,hi+1).join(', ')}] into [${a.slice(lo,mid+1).join(', ')}] and [${a.slice(mid+1,hi+1).join(', ')}].`,range(lo,hi,'hl'));ms(lo,mid);ms(mid+1,hi);
      const L=a.slice(lo,mid+1),R=a.slice(mid+1,hi+1);let i=0,j=0,k=lo;while(i<L.length&&j<R.length){cmp++;const lv=L[i],rv=R[j],take=lv<=rv;const v=take?L[i++]:R[j++];a[k]=v;swp++;snap(9,`Merge: left front ${lv} vs right front ${rv}: take ${v}.`,Object.assign(range(lo,hi,'hl'),{[k]:'cmp'}));k++}
      while(i<L.length){a[k++]=L[i++];swp++}while(j<R.length){a[k++]=R[j++];swp++}snap(13,`Merged: [${a.slice(lo,hi+1).join(', ')}].`,range(lo,hi,'ok'))};
    const range=(lo,hi,c)=>{const o={};for(let x=lo;x<=hi;x++)o[x]=c;return o};ms(0,a.length-1);a.forEach((_,i)=>sorted.add(i))}
  if(kind==='quick'){const qs=(lo,hi)=>{if(lo>=hi){if(lo===hi)sorted.add(lo);return}const pv=a[hi];let i=lo;snap(4,`Partition indexes ${lo}..${hi} around pivot ${pv} (the last element).`,{[hi]:'bad'},{lo,hi});
      for(let j=lo;j<hi;j++){cmp++;if(a[j]<pv){snap(7,`${a[j]} < pivot ${pv}: swap it into the "small" region at i = ${i}.`,{[j]:'cmp',[i]:'hl',[hi]:'bad'},{i,j});sw(i,j);i++}else snap(7,`${a[j]} ≥ pivot ${pv}: leave it.`,{[j]:'cmp',[hi]:'bad'},{i,j})}
      sw(i,hi);sorted.add(i);snap(10,`Swap the pivot into index ${i}: everything left is smaller, everything right is bigger. ${pv} is final.`,{[i]:'ok'},{i});qs(lo,i-1);qs(i+1,hi)};qs(0,a.length-1)}
  if(kind==='heap'){const n=a.length;const sd=(i,size)=>{while(true){let b=i;const l=2*i+1,r=2*i+2;if(l<size){cmp++;if(a[l]>a[b])b=l}if(r<size){cmp++;if(a[r]>a[b])b=r}
        if(b===i)return;snap(10,`Sift down: child ${a[b]} > ${a[i]}, swap.`,{[i]:'cmp',[b]:'cmp'},{i,child:b});sw(i,b);i=b}};
    for(let i=(n>>1)-1;i>=0;i--)sd(i,n);snap(13,`Max-heap built: the largest value (${a[0]}) is at index 0.`,{0:'hl'});
    for(let end=n-1;end>0;end--){snap(15,`Swap the max (${a[0]}) with the last unsorted slot (${end}).`,{0:'cmp',[end]:'cmp'});sw(0,end);sorted.add(end);sd(0,end)}sorted.add(0)}
  snap(0,`Sorted! ${cmp} comparisons, ${swp} ${kind==='merge'||kind==='insertion'?'writes':'swaps'}.`,{},{},'ok');return F};
C.addViz('sorting',{topic:'sorting',title:'Sorting algorithms',desc:'Bubble, selection, insertion, merge, quick and heap sort, one comparison at a time. Compare their comparisons, swaps and complexity.',ico:'[5][3][8][1][2]\n 5 > 3 → SWAP',p:'sorting'},(el,api)=>{
  let alg=api.arg.alg||'bubble';
  const sh=V.shell(el,{controls:V.modeButtons(Object.entries(SORTS).map(([k,s])=>[k,s.label]),alg)+`<span style="width:6px"></span>${V.input('arr','Input','5 3 8 1 9 2 7','12em')}<button class="btn small primary" type="button" data-go>Load</button><button class="btn small" type="button" data-in2="random">Random</button><button class="btn small" type="button" data-in2="sorted">Sorted</button><button class="btn small" type="button" data-in2="reversed">Reversed</button>`,code:SORTS.bubble.src,
    draw(f,pn){const mx=Math.max(...f.a.map(Math.abs),1);pn.stage.innerHTML=`<div class="row" style="align-items:flex-end;gap:4px;height:90px;min-width:max-content;padding-left:2px">${f.a.map((v,i)=>`<div style="width:46px;height:${Math.max(4,Math.abs(v)/mx*80)}px;border-radius:3px 3px 0 0;background:${f.cls[i]==='cmp'?'var(--warn)':f.cls[i]==='ok'?'var(--good)':f.cls[i]==='bad'?'var(--marker)':f.cls[i]==='hl'?'var(--accent)':'var(--line)'}"></div>`).join('')}</div>`+V.arr(f.a,{cls:f.cls,ptr:f.ptr});
      pn.say(f.msg,f.k);const c=SORTS[f.alg].cx;pn.vars.innerHTML=V.vars({comparisons:f.cmp,[f.alg==='merge'||f.alg==='insertion'?'writes':'swaps']:f.swp,...Object.fromEntries(Object.entries(f.ptr).map(([k,v])=>[k,v]))})+`<div class="tbl" style="margin-top:8px">${U.tableHTML(['Best','Average','Worst','Extra space','Stable'],[c])}</div>`}});
  const load=raw=>{const s=SORTS[alg];U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===alg)));const a=nums(raw||sh.$('[data-in=arr]').value,10,[5,3,8,1,9,2,7]);sh.$('[data-in=arr]').value=a.join(' ');
    sh.pl.load(record(a,alg).map(f=>Object.assign(f,{alg,src:s.src})))};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){alg=b.dataset.mode;load()}if(e.target.closest('[data-go]'))load();
    const g=e.target.closest('[data-in2]');if(g){const n=8;let a=Array.from({length:n},()=>1+Math.floor(Math.random()*20));if(g.dataset.in2==='sorted')a.sort((x,y)=>x-y);if(g.dataset.in2==='reversed')a.sort((x,y)=>y-x);load(a.join(' '))}});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
