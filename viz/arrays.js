/* Visualizers for topic 3 (arrays): operations on a dynamic array, two pointers, sliding window, prefix sum, Kadane. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;
const num=(s,d)=>{const v=parseInt(s,10);return isNaN(v)?d:v};

/* ---------- array operations with a visible capacity (dynamic array) ---------- */
C.addViz('array-ops',{topic:'arrays',title:'Array operations',desc:'Insert, delete, search and update, and watch every element that has to shift. Grey slots are spare capacity: fill them up to see the array grow.',ico:'[10][20][30][40][50]\n  0   1   2   3   4',p:'traversal'},(el,api)=>{
  let arr=[10,20,30,40,50],cap=8;
  const sh=V.shell(el,{controls:`${V.input('v','Value',99,'5em')}${V.input('i','Index',2,'4em')}
    <button class="btn small" type="button" data-op="get">Get a[i]</button><button class="btn small" type="button" data-op="update">Update a[i] = v</button><button class="btn small primary" type="button" data-op="append">Append v</button><button class="btn small" type="button" data-op="insert">Insert v at i</button><button class="btn small" type="button" data-op="pop">Pop</button><button class="btn small" type="button" data-op="delete">Delete at i</button><button class="btn small" type="button" data-op="search">Search v</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cap:f.cap,cls:f.cls,ptr:f.ptr});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars({len:f.a.length,capacity:f.cap,'elements shifted':f.moves,comparisons:f.cmp})+(f.py?`<p class="codeline" style="margin-top:8px">${U.hl(f.py)}</p>`:'')}});
  const run=op=>{const v=num(sh.$('[data-in=v]').value,0),i=num(sh.$('[data-in=i]').value,0);const F=[];let a=arr.slice(),c=cap,moves=0,cmp=0;
    const snap=(msg,cls,ptr,k,py)=>F.push({a:a.slice(),cap:c,cls:cls||{},ptr:ptr||{},msg,k,moves,cmp,py});
    const grow=()=>{snap(`The array is full (${a.length} of ${c} slots). Python allocates a bigger block (about 2× here) and copies every element across.`,{},{},'warn');c*=2;
      a.forEach((_,j)=>{moves++;snap(`Copy a[${j}] = ${a[j]} into the new block.`,{[j]:'cmp'},{},'')});snap(`Grown to capacity ${c}. This copy is O(n), but it happens rarely, so append is O(1) <b>amortized</b>.`,{},{},'ok')};
    if(op==='reset'){arr=[10,20,30,40,50];cap=8;a=arr.slice();c=cap;snap('Reset to [10, 20, 30, 40, 50] with capacity 8.');sh.pl.load(F);return}
    if(op==='get'){if(i<0||i>=a.length){snap(`IndexError: index ${i} is out of range (0 to ${a.length-1}).`,{},{},'bad',`nums[${i}]`);sh.pl.load(F);return}
      snap(`Address of a[${i}] = start + ${i} × size. One jump, no scanning: <b>O(1)</b>. a[${i}] is ${a[i]}.`,{[i]:'ok'},{i},'ok',`nums[${i}]  # O(1)`);sh.pl.load(F);return}
    if(op==='update'){if(i<0||i>=a.length){snap(`IndexError: index ${i} is out of range.`,{},{},'bad');sh.pl.load(F);return}
      const old=a[i];a[i]=v;snap(`Jump straight to index ${i} and overwrite ${old} with ${v}: <b>O(1)</b>.`,{[i]:'ok'},{i},'ok',`nums[${i}] = ${v}  # O(1)`)}
    if(op==='append'){if(a.length===c)grow();a.push(v);snap(`Write ${v} into the first free slot (index ${a.length-1}). No shifting: <b>O(1)</b> amortized.`,{[a.length-1]:'ok new'},{},'ok',`nums.append(${v})  # O(1) amortized`)}
    if(op==='pop'){if(!a.length){snap('IndexError: pop from empty list.',{},{},'bad');sh.pl.load(F);return}snap(`Remove the last element (${a[a.length-1]}).`,{[a.length-1]:'bad'});const x=a.pop();snap(`Popped ${x}. Nothing shifts: <b>O(1)</b>.`,{},{},'ok','nums.pop()  # O(1)')}
    if(op==='insert'){if(i<0||i>a.length){snap(`Pick an index from 0 to ${a.length}.`,{},{},'bad');sh.pl.load(F);return}
      if(a.length===c)grow();snap(`To insert at index ${i}, every element from index ${i} onward must move one step right, starting from the end.`,{},{i},'');
      a.push(undefined);for(let j=a.length-1;j>i;j--){a[j]=a[j-1];moves++;snap(`Shift a[${j-1}] = ${a[j]} → index ${j}.`,{[j]:'cmp'},{i},'')}
      a[i]=v;snap(`Write ${v} at index ${i}. ${moves} element${moves===1?'':'s'} shifted: insert is <b>O(n)</b> (inserting at the front shifts all n).`,{[i]:'ok new'},{i},'ok',`nums.insert(${i}, ${v})  # O(n)`)}
    if(op==='delete'){if(i<0||i>=a.length){snap(`Pick an index from 0 to ${a.length-1}.`,{},{},'bad');sh.pl.load(F);return}
      snap(`Delete a[${i}] = ${a[i]}. Everything after it must close the gap.`,{[i]:'bad'},{i});for(let j=i;j<a.length-1;j++){a[j]=a[j+1];moves++;snap(`Shift a[${j+1}] = ${a[j]} → index ${j}.`,{[j]:'cmp'},{i})}
      a.pop();snap(`Done. ${moves} element${moves===1?'':'s'} shifted: delete is <b>O(n)</b> in general, O(1) only at the end.`,{},{},'ok',`del nums[${i}]  # O(n)`)}
    if(op==='search'){let found=-1;for(let j=0;j<a.length;j++){cmp++;if(a[j]===v){found=j;snap(`a[${j}] = ${a[j]} == ${v}. Found at index ${j} after ${cmp} comparison${cmp>1?'s':''}.`,{[j]:'ok'},{j},'ok',`nums.index(${v})  # O(n)`);break}
        snap(`a[${j}] = ${a[j]} ≠ ${v}. Keep scanning.`,{[j]:'cmp'},{j})}
      if(found<0)snap(`${v} is not in the array: checked all ${a.length} elements. Unsorted search is <b>O(n)</b>.`,{},{},'bad',`${v} in nums  # O(n)`)}
    arr=a.filter(x=>x!==undefined);cap=c;sh.pl.load(F,{play:true})};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});
  sh.pl.load([{a:arr.slice(),cap,cls:{},ptr:{},msg:'A Python list is a dynamic array: elements sit side by side in memory, with some spare slots at the end. Pick an operation.',moves:0,cmp:0}])});

/* ---------- two pointers ---------- */
const TP={
 reverse:{label:'Reverse in place',input:'1 2 3 4 5 6',src:`def reverse(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    return nums`,run(a){const F=[];let l=0,r=a.length-1;const s=(line,msg,cls,k)=>F.push({a:a.slice(),line,msg,cls:cls||{},ptr:{left:l,right:r},vars:{left:l,right:r},k});
   s(2,'Start one pointer at each end.');while(l<r){s(3,`left (${l}) < right (${r}): keep going.`,{[l]:'cmp',[r]:'cmp'});[a[l],a[r]]=[a[r],a[l]];s(4,`Swap ${a[r]} and ${a[l]}.`,{[l]:'ok',[r]:'ok'});l++;r--;s(5,'Move both pointers toward the middle.')}
   s(3,`left (${l}) ≥ right (${r}): the pointers met. Reversed in n/2 swaps: O(n) time, O(1) extra space.`,{},'ok');return F}},
 pair:{label:'Pair sum (sorted)',input:'1 3 4 6 8 11',extra:{target:10},src:`def pair_sum(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return [left, right]
        if total < target:
            left += 1
        else:
            right -= 1
    return None`,run(a,x){const t=x.target;a.sort((p,q)=>p-q);const F=[];let l=0,r=a.length-1,total=null;const s=(line,msg,cls,k)=>F.push({a:a.slice(),line,msg,cls:cls||{},ptr:{left:l,right:r},vars:{left:l,right:r,total:total==null?'–':total,target:t},k});
   s(2,'The array is sorted. Start at both ends.');while(l<r){total=a[l]+a[r];s(4,`total = ${a[l]} + ${a[r]} = ${total}.`,{[l]:'cmp',[r]:'cmp'});
     if(total===t){s(6,`${total} == ${t}: found the pair at indices [${l}, ${r}].`,{[l]:'ok',[r]:'ok'},'ok');return F}
     if(total<t){s(8,`${total} < ${t}: we need a bigger sum. Every pair using nums[left] = ${a[l]} with a smaller right is even smaller, so drop it: left += 1.`,{[l]:'dim'});l++}
     else{s(10,`${total} > ${t}: too big. nums[right] = ${a[r]} cannot be in the answer, so right -= 1.`,{[r]:'dim'});r--}}
   s(11,`Pointers met: no pair adds up to ${t}. Each step discards one element, so this is O(n), not O(n²).`,{},'bad');return F}},
 water:{label:'Container with most water',input:'1 8 6 2 5 4 8 3 7',src:`def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        best = max(best, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,bars:true,run(a){const F=[];let l=0,r=a.length-1,best=0,area=null,bl=0,br=0;const s=(line,msg,cls,k)=>F.push({a:a.slice(),line,msg,cls:cls||{},ptr:{left:l,right:r},vars:{left:l,right:r,area:area==null?'–':area,best},water:[l,r],bestw:[bl,br],k});
   s(2,'Widest container first: one pointer at each end.');s(3,'best = 0');while(l<r){area=Math.min(a[l],a[r])*(r-l);s(5,`area = min(${a[l]}, ${a[r]}) × (${r} − ${l}) = ${area}.`,{[l]:'cmp',[r]:'cmp'});
     if(area>best){best=area;bl=l;br=r}s(6,`best = ${best}.`);
     if(a[l]<a[r]){s(8,`The left wall (${a[l]}) is shorter. Moving the taller wall can never help (width shrinks, height stays capped by ${a[l]}), so move left.`,{[l]:'dim'});l++}
     else{s(10,`The right wall (${a[r]}) is shorter or equal: move right.`,{[r]:'dim'});r--}}
   s(11,`Done: the best area is ${best}, between indices ${bl} and ${br}. O(n) instead of checking all O(n²) pairs.`,{[bl]:'ok',[br]:'ok'},'ok');return F}},
 dedupe:{label:'Remove duplicates (sorted)',input:'1 1 2 3 3 3 4 5 5',src:`def remove_duplicates(nums):
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write`,run(a){a.sort((p,q)=>p-q);const F=[];let w=1,rd=1;const keep=()=>{const c={};for(let j=0;j<w;j++)c[j]='ok';return c};
   const s=(line,msg,extra,k)=>F.push({a:a.slice(),line,msg,cls:Object.assign(keep(),extra||{}),ptr:{read:rd<a.length?rd:null,write:w},vars:{read:rd,write:w},k});
   s(4,'Index 0 is always kept. <b>write</b> marks where the next unique value goes; <b>read</b> scans ahead.');
   for(rd=1;rd<a.length;rd++){if(a[rd]!==a[rd-1]){s(6,`nums[${rd}] = ${a[rd]} ≠ ${a[rd-1]}: a new value.`,{[rd]:'cmp'});a[w]=a[rd];s(7,`Copy it to index ${w}.`,{[w]:'hl'});w++;s(8,`write = ${w}.`)}
     else s(6,`nums[${rd}] = ${a[rd]} equals the previous value: skip it.`,{[rd]:'dim'})}
   rd=a.length;s(9,`The first ${w} slots hold the unique values. O(n) time, O(1) extra space.`,{},'ok');return F}}};
const bars=(f)=>{const n=f.a.length,mx=Math.max(...f.a,1),W=Math.max(320,n*44+20),H=170,bw=30,X=i=>16+i*44,Y=v=>H-24-v/mx*(H-40);
  let s='';const [l,r]=f.water||[];if(f.water&&l<r){const h=Math.min(f.a[l],f.a[r]);s+=`<rect x="${X(l)+bw}" y="${Y(h)}" width="${X(r)-X(l)-bw}" height="${H-24-Y(h)}" fill="var(--blue-soft)"/>`}
  f.a.forEach((v,i)=>{const c=f.cls[i];s+=`<rect x="${X(i)}" y="${Y(v)}" width="${bw}" height="${H-24-Y(v)}" rx="3" fill="${c==='cmp'?'var(--warn)':c==='ok'?'var(--good)':c==='dim'?'var(--line)':'var(--accent)'}" opacity="${c?1:.6}"/><text x="${X(i)+bw/2}" y="${Y(v)-4}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">${v}</text><text x="${X(i)+bw/2}" y="${H-10}" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">${i}</text>`});
  return `<div class="svgbox"><svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px" role="img" aria-label="Wall heights">${s}</svg></div>`};
C.addViz('two-pointers',{topic:'arrays',title:'Two pointers',desc:'Two indices that move toward each other (or one chasing the other). Reverse, pair sum, container with most water, remove duplicates.',ico:'L →          ← R\n[1][3][4][6][8][11]',p:'two-pointers'},(el,api)=>{
  let mode=api.arg.mode||'reverse';
  const sh=V.shell(el,{controls:V.modeButtons(Object.entries(TP).map(([k,m])=>[k,m.label]),mode)+`<span style="width:6px"></span>${V.input('arr','Array',TP[mode].input,'14em')}${V.input('target','Target',10,'4em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:TP[mode].src,
    draw(f,pn){const m=TP[f.mode];pn.stage.innerHTML=(m.bars?bars(f):'')+V.arr(f.a,{cls:f.cls,ptr:f.ptr});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{const m=TP[mode];sh.$('[data-in=target]').closest('label').hidden=mode!=='pair';const a=V.parseList(sh.$('[data-in=arr]').value,12).filter(x=>typeof x==='number');
    U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    sh.pl.load(m.run(a.length?a:V.parseList(m.input),{target:num(sh.$('[data-in=target]').value,10)}).map(f=>Object.assign(f,{mode,src:m.src})))};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;sh.$('[data-in=arr]').value=TP[mode].input;load()}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- sliding window ---------- */
const SW={
 fixed:{label:'Max sum of k in a row',input:'2 1 5 1 3 2 7 1',k:3,src:`def max_sum_k(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right] - nums[right - k]
        best = max(best, window)
    return best`,run(a,o){const k=Math.max(1,Math.min(o.k,a.length));const F=[];let win=a.slice(0,k).reduce((x,y)=>x+y,0),best=win,bl=0;
   const s=(line,msg,l,r,extra,kk)=>F.push({a:a.slice(),line,msg,win:[l,r],cls:extra||{},ptr:{left:l,right:r},vars:{left:l,right:r,window:win,best,k},k:kk});
   s(2,`First window: sum(nums[0:${k}]) = ${win}.`,0,k-1);s(3,`best = ${best}.`,0,k-1);
   for(let r=k;r<a.length;r++){const out=a[r-k];win+=a[r]-out;s(5,`Slide right: add nums[${r}] = ${a[r]}, drop nums[${r-k}] = ${out}. window = ${win}. One add and one subtract, not a new sum of k numbers.`,r-k+1,r,{[r-k]:'bad',[r]:'cmp'});
     if(win>best){best=win;bl=r-k+1}s(6,`best = max(best, window) = ${best}.`,r-k+1,r)}
   s(7,`Answer: ${best} (window starting at ${bl}). O(n) instead of O(n·k).`,bl,bl+k-1,{},'ok');return F}},
 unique:{label:'Longest substring without repeats',input:'abcabcbb',str:true,src:`def longest_unique(s):
    seen = set()
    left = best = 0
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        best = max(best, right - left + 1)
    return best`,run(a){const F=[];const seen=new Set();let l=0,best=0,bl=0;
   const s=(line,msg,r,extra,kk)=>F.push({a:a.slice(),line,msg,win:r>=l?[l,r]:null,cls:extra||{},ptr:{left:l,right:r},vars:{left:l,right:r,seen:'{'+[...seen].map(x=>`'${x}'`).join(', ')+'}',best},k:kk});
   s(3,'Empty window: left = 0, best = 0.',-1);
   for(let r=0;r<a.length;r++){s(4,`Extend: right = ${r} brings in '${a[r]}'.`,r,{[r]:'cmp'});
     while(seen.has(a[r])){s(5,`'${a[r]}' is already in the window: shrink from the left.`,r,{[r]:'bad'});seen.delete(a[l]);l++;s(7,`Removed '${a[l-1]}', left = ${l}.`,r)}
     seen.add(a[r]);if(r-l+1>best){best=r-l+1;bl=l}s(9,`Window "${a.slice(l,r+1).join('')}" has no repeats. best = ${best}.`,r)}
   s(10,`Answer: ${best} ("${a.slice(bl,bl+best).join('')}"). Each character enters and leaves the window at most once: O(n).`,bl+best-1,{},'ok');F[F.length-1].win=[bl,bl+best-1];F[F.length-1].ptr={};return F}},
 minlen:{label:'Shortest subarray with sum ≥ target',input:'2 3 1 2 4 3',target:7,src:`def min_len(nums, target):
    left = total = 0
    best = float("inf")
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best == float("inf") else best`,run(a,o){const t=o.target;const F=[];let l=0,total=0,best=Infinity,bl=-1;
   const s=(line,msg,r,extra,kk)=>F.push({a:a.slice(),line,msg,win:r>=l?[l,r]:null,cls:extra||{},ptr:{left:l,right:r},vars:{left:l,right:r,total,target:t,best:best===Infinity?'inf':best},k:kk});
   s(3,'Start with an empty window.',-1);
   for(let r=0;r<a.length;r++){total+=a[r];s(5,`Grow: add nums[${r}] = ${a[r]}, total = ${total}.`,r,{[r]:'cmp'});
     while(total>=t){if(r-l+1<best){best=r-l+1;bl=l}s(7,`total ${total} ≥ ${t}: window length ${r-l+1} works. best = ${best}. Try shrinking.`,r,{},'ok');total-=a[l];l++;s(9,`Drop nums[${l-1}] = ${a[l-1]}: total = ${total}, left = ${l}.`,r,{[l-1]:'bad'})}}
   s(10,best===Infinity?'No window reaches the target: return 0.':`Answer: ${best}. O(n): left and right each move at most n times.`,bl<0?-1:bl+best-1,{},best===Infinity?'bad':'ok');if(bl>=0){F[F.length-1].win=[bl,bl+best-1]}F[F.length-1].ptr={};return F}}};
C.addViz('sliding-window',{topic:'arrays',title:'Sliding window',desc:'Grow the window on the right, shrink it on the left, and reuse the work in between. Fixed and variable-size windows.',ico:'   ┌────────┐\n[2][1][5][1][3][2]',p:'sliding-window'},(el,api)=>{
  let mode=api.arg.mode||'fixed';
  const sh=V.shell(el,{controls:V.modeButtons(Object.entries(SW).map(([k,m])=>[k,m.label]),mode)+`<span style="width:6px"></span>${V.input('arr','Input',SW[mode].input,'12em')}${V.input('k','k',3,'3em')}${V.input('target','Target',7,'4em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:SW[mode].src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,ptr:f.ptr,win:f.win});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{const m=SW[mode];sh.$('[data-in=k]').closest('label').hidden=mode!=='fixed';sh.$('[data-in=target]').closest('label').hidden=mode!=='minlen';
    U.$$('[data-mode]',sh.ctl).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));const raw=sh.$('[data-in=arr]').value;
    let a=m.str?raw.replace(/\s/g,'').slice(0,16).split(''):V.parseList(raw,14).filter(x=>typeof x==='number'&&x>=0);if(!a.length)a=m.str?m.input.split(''):V.parseList(m.input);
    sh.pl.load(m.run(a,{k:num(sh.$('[data-in=k]').value,3),target:num(sh.$('[data-in=target]').value,7)}).map(f=>Object.assign(f,{src:m.src})))};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){mode=b.dataset.mode;sh.$('[data-in=arr]').value=SW[mode].input;load()}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- prefix sums ---------- */
C.addViz('prefix-sum',{topic:'arrays',title:'Prefix sums',desc:'Build the running totals once in O(n), then answer any range-sum question in O(1).',ico:'nums   [3][1][4][1][5]\nprefix [0][3][4][8][9][14]',p:'prefix-sum'},(el)=>{
  const src=`prefix = [0] * (len(nums) + 1)
for i in range(len(nums)):
    prefix[i + 1] = prefix[i] + nums[i]

# sum of nums[l..r], both ends included:
answer = prefix[r + 1] - prefix[l]`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','3 1 4 1 5 9 2 6','13em')}${V.input('l','l',2,'3em')}${V.input('r','r',5,'3em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{label:'nums',cls:f.ca,win:f.win})+V.arr(f.p,{label:'prefix',cls:f.cp,cap:f.a.length+1});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{let a=V.parseList(sh.$('[data-in=arr]').value,12).filter(x=>typeof x==='number');if(!a.length)a=[3,1,4,1,5];const n=a.length;
    let l=U.clamp(num(sh.$('[data-in=l]').value,0),0,n-1),r=U.clamp(num(sh.$('[data-in=r]').value,n-1),0,n-1);if(l>r)[l,r]=[r,l];
    const p=[0],F=[];F.push({a,p:p.slice(),line:1,ca:{},cp:{0:'ok'},msg:'prefix[0] = 0: the sum of nothing.',vars:{}});
    for(let i=0;i<n;i++){p.push(p[i]+a[i]);F.push({a,p:p.slice(),line:3,ca:{[i]:'cmp'},cp:{[i]:'hl',[i+1]:'ok'},msg:`prefix[${i+1}] = prefix[${i}] + nums[${i}] = ${p[i]} + ${a[i]} = ${p[i+1]}: the sum of the first ${i+1} numbers.`,vars:{i}})}
    const ans=p[r+1]-p[l];F.push({a,p:p.slice(),line:6,ca:{},win:[l,r],cp:{[r+1]:'ok',[l]:'bad'},msg:`Sum of nums[${l}..${r}] = prefix[${r+1}] − prefix[${l}] = ${p[r+1]} − ${p[l]} = <b>${ans}</b>. Everything before index ${l} cancels out.`,vars:{l,r,answer:ans},k:'ok'});
    F.push({a,p:p.slice(),line:6,ca:{},win:[l,r],cp:{[r+1]:'ok',[l]:'bad'},msg:`Check: ${a.slice(l,r+1).join(' + ')} = ${ans}. Building prefix is O(n) once; every query after that is O(1).`,vars:{l,r,answer:ans},k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

/* ---------- Kadane ---------- */
C.addViz('kadane',{topic:'arrays',title:"Kadane's algorithm",desc:'Maximum subarray sum in one pass: at each number, either extend the current run or start fresh.',ico:'cur = max(x, cur + x)\nbest = max(best, cur)',p:'kadane'},(el)=>{
  const src=`def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','-2 1 -3 4 -1 2 1 -5 4','15em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,win:f.win,ptr:f.ptr});pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{let a=V.parseList(sh.$('[data-in=arr]').value,14).filter(x=>typeof x==='number');if(!a.length)a=[-2,1,-3,4,-1,2,1,-5,4];
    let cur=a[0],best=a[0],st=0,bs=0,be=0;const F=[];const best_=()=>{const c={};for(let j=bs;j<=be;j++)c[j]='ok';return c};
    F.push({a,line:2,cls:{0:'ok'},win:[0,0],ptr:{i:0},msg:`Start: cur = best = nums[0] = ${a[0]}.`,vars:{cur,best}});
    for(let i=1;i<a.length;i++){const x=a[i],ext=cur+x;F.push({a,line:4,cls:Object.assign(best_(),{[i]:'cmp'}),win:[st,i-1],ptr:{i},msg:`x = ${x}. Extend the run (cur + x = ${cur} + ${x} = ${ext}) or restart at x (${x})?`,vars:{x,cur,best}});
      if(x>ext){cur=x;st=i;F.push({a,line:4,cls:Object.assign(best_(),{[i]:'hl'}),win:[i,i],ptr:{i},msg:`${x} > ${ext}: the run so far only drags us down. Restart here: cur = ${cur}.`,vars:{x,cur,best},k:'warn'})}
      else{cur=ext;F.push({a,line:4,cls:best_(),win:[st,i],ptr:{i},msg:`${ext} ≥ ${x}: extend. cur = ${cur}.`,vars:{x,cur,best}})}
      if(cur>best){best=cur;bs=st;be=i}F.push({a,line:5,cls:best_(),win:[st,i],ptr:{i},msg:`best = max(best, cur) = ${best}${bs<=be?` (indices ${bs}..${be}, green)`:''}.`,vars:{x,cur,best}})}
    F.push({a,line:6,cls:best_(),win:null,ptr:{},msg:`Maximum subarray sum = <b>${best}</b>: [${a.slice(bs,be+1).join(', ')}]. One pass: O(n) time, O(1) space.`,vars:{best},k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
