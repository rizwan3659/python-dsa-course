/* Visualizers for topic 5 (hashing): a chained hash table, and Two Sum with a dict. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

/* teaching hash: ints hash to themselves, strings to the sum of their character codes */
const H=k=>typeof k==='number'?k:[...String(k)].reduce((s,c)=>s+c.charCodeAt(0),0);
const Hdesc=k=>typeof k==='number'?`hash(${k}) = ${k}`:`hash('${esc(k)}') = ${[...String(k)].map(c=>c.charCodeAt(0)).join(' + ')} = ${H(k)}`;
const parseKey=s=>{s=String(s).trim();return /^-?\d+$/.test(s)?+s:s.slice(0,10)};

C.addViz('hash-table',{topic:'hashing',title:'Hash table: key → hash → bucket → value',desc:'Put, get and delete keys in a chained hash table. Watch collisions share a bucket, and the table double when it gets too full.',ico:'key → hash() → bucket\n"cat"  → 312  → [0]',p:'hashing'},(el)=>{
  let m=8,B=Array.from({length:m},()=>[]);
  const draw=f=>{let h='<div class="col" style="gap:4px;min-width:max-content">';
    f.B.forEach((ch,i)=>{const on=f.bucket===i;h+=`<div class="row" style="gap:6px;flex-wrap:nowrap"><span class="var ${on?'on':''}" style="min-width:52px;text-align:center"><b>bucket</b>${i}</span><span class="mono muted">→</span>${ch.length?ch.map((e,j)=>{const c=f.hit&&f.hit[0]===i&&f.hit[1]===j?f.hitc:'';return `<span class="qitem ${c==='ok'?'front':c==='cmp'?'rear':''}" style="${c==='bad'?'border-color:var(--marker);background:var(--marker-soft)':''}">${esc(typeof e[0]==='string'?`'${e[0]}'`:e[0])}: ${esc(e[1])}</span>`}).join('<span class="mono muted">→</span>'):'<span class="mono tiny muted">empty</span>'}</div>`});
    return h+'</div>'};
  const sh=V.shell(el,{controls:`${V.input('k','Key','cat','6em')}${V.input('v','Value',3,'4em')}<button class="btn small primary" type="button" data-op="put">Put</button><button class="btn small" type="button" data-op="get">Get</button><button class="btn small" type="button" data-op="del">Delete</button><button class="btn small" type="button" data-op="collide">Add colliding keys</button><button class="btn small" type="button" data-op="fill">Fill until it resizes</button><button class="btn small ghost" type="button" data-op="reset">Reset</button>`,
    draw(f,pn){pn.stage.innerHTML=draw(f);pn.say(f.msg,f.k);const n=f.B.reduce((s,c)=>s+c.length,0);pn.vars.innerHTML=V.vars(Object.assign({buckets:f.B.length,keys:n,'load factor':(n/f.B.length).toFixed(2)},f.vars||{}))+(f.py?`<p class="codeline" style="margin-top:8px">${U.hl(f.py)}</p>`:'')}});
  const snapB=()=>B.map(c=>c.map(e=>e.slice()));
  const resize=F=>{const old=B;m*=2;F.push({B:snapB(),msg:`Load factor is above 0.75: too many keys per bucket would make lookups slow. Allocate ${m} buckets and re-insert every key (each key's bucket can change because we now take % ${m}).`,k:'warn'});
    B=Array.from({length:m},()=>[]);old.forEach(c=>c.forEach(([k,v])=>{const b=H(k)%m;B[b].push([k,v]);F.push({B:snapB(),bucket:b,hit:[b,B[b].length-1],hitc:'ok',msg:`${Hdesc(k)} → ${H(k)} % ${m} = ${b}.`})}));
    F.push({B:snapB(),msg:`Resized to ${m} buckets. That rehash was O(n), but it happens rarely, so put stays O(1) on average.`,k:'ok'})};
  const put=(k,v,F)=>{const h=H(k),b=h%m;F.push({B:snapB(),bucket:b,msg:`${Hdesc(k)}. Bucket = ${h} % ${m} = <b>${b}</b>.`,vars:{key:typeof k==='string'?`'${k}'`:k,'hash % m':b}});
    const ch=B[b];for(let j=0;j<ch.length;j++){F.push({B:snapB(),bucket:b,hit:[b,j],hitc:'cmp',msg:`Compare with the key already here: ${esc(ch[j][0])} ${ch[j][0]===k?'==':'≠'} ${esc(k)}.`});
      if(ch[j][0]===k){ch[j][1]=v;F.push({B:snapB(),bucket:b,hit:[b,j],hitc:'ok',msg:`Same key: overwrite the value with ${esc(v)}.`,k:'ok',py:`d[${JSON.stringify(k)}] = ${JSON.stringify(v)}`});return}}
    ch.push([k,v]);F.push({B:snapB(),bucket:b,hit:[b,ch.length-1],hitc:'ok',msg:ch.length>1?`<b>Collision:</b> bucket ${b} already had ${ch.length-1} key${ch.length>2?'s':''}. Chain the new pair on the end.`:`Store (${esc(k)}: ${esc(v)}) in bucket ${b}.`,k:ch.length>1?'warn':'ok',py:`d[${JSON.stringify(k)}] = ${JSON.stringify(v)}`});
    const n=B.reduce((s,c)=>s+c.length,0);if(n/m>0.75)resize(F)};
  const run=op=>{const k=parseKey(sh.$('[data-in=k]').value),vr=sh.$('[data-in=v]').value.trim(),v=/^-?\d+$/.test(vr)?+vr:vr;const F=[];
    if(op==='reset'){m=8;B=Array.from({length:m},()=>[]);['cat','dog','owl'].forEach((x,i)=>{const b=H(x)%m;B[b].push([x,i+1])});F.push({B:snapB(),msg:'A table with 8 buckets and three keys. Each bucket holds a small list (a chain) of key-value pairs.'});sh.pl.load(F);return}
    if(op==='put')put(k,v,F);
    if(op==='collide'){const base=['ab','ba'];base.forEach((x,i)=>put(x,i+10,F));F.push({B:snapB(),msg:"'ab' and 'ba' have the same character sum, so they always land in the same bucket. Real hash functions mix bits much better, but collisions still happen, so every hash table must handle them.",k:'warn'})}
    if(op==='fill'){let i=0;const before=m;while(m===before&&i<20){put('k'+i,i,F);i++}}
    if(op==='get'||op==='del'){const h=H(k),b=h%m;F.push({B:snapB(),bucket:b,msg:`${Hdesc(k)} → bucket ${h} % ${m} = <b>${b}</b>. Only this bucket is searched, not the whole table.`});
      const ch=B[b];let found=-1;for(let j=0;j<ch.length;j++){const same=ch[j][0]===k;F.push({B:snapB(),bucket:b,hit:[b,j],hitc:same?'ok':'cmp',msg:`${esc(ch[j][0])} ${same?'==':'≠'} ${esc(k)}.`});if(same){found=j;break}}
      if(found<0)F.push({B:snapB(),bucket:b,msg:`Key ${esc(k)} is not in bucket ${b}, so it is not in the table${op==='get'?': KeyError (or None with d.get)':''}.`,k:'bad',py:op==='get'?`d.get(${JSON.stringify(k)})  # None`:`del d[${JSON.stringify(k)}]  # KeyError`});
      else if(op==='get')F.push({B:snapB(),bucket:b,hit:[b,found],hitc:'ok',msg:`Found: value ${esc(ch[found][1])}. Average O(1): a short chain in one bucket.`,k:'ok',py:`d[${JSON.stringify(k)}]  # ${ch[found][1]}`});
      else{F.push({B:snapB(),bucket:b,hit:[b,found],hitc:'bad',msg:`Remove (${esc(ch[found][0])}: ${esc(ch[found][1])}) from the chain.`});ch.splice(found,1);F.push({B:snapB(),bucket:b,msg:'Deleted.',k:'ok',py:`del d[${JSON.stringify(k)}]`})}}
    sh.pl.load(F,{play:true})};
  sh.ctl.addEventListener('click',e=>{const b=e.target.closest('[data-op]');if(b)run(b.dataset.op)});
  run('reset')});

/* Two Sum with a dict: the complement lookup pattern */
C.addViz('two-sum-hash',{topic:'hashing',title:'Two Sum with a hash map',desc:'For each number, look up its complement in a dict of numbers already seen. One pass, O(n).',ico:'need = target − x\nneed in seen?',p:'hashing'},(el)=>{
  const src=`def two_sum(nums, target):
    seen = {}                      # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i`;
  const sh=V.shell(el,{controls:`${V.input('arr','nums','3 8 11 5 2 7','12em')}${V.input('t','target',9,'4em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.a,{cls:f.cls,ptr:f.ptr})+`<div class="row" style="margin-top:10px"><span class="eyebrow">seen</span>${Object.keys(f.seen).length?Object.entries(f.seen).map(([k,v])=>`<span class="var ${String(f.look)===k?'on':''}"><b>${k}</b>→ ${v}</span>`).join(''):'<span class="mono tiny muted">{}</span>'}</div>`;pn.say(f.msg,f.k);pn.vars.innerHTML=V.vars(f.vars)}});
  const load=()=>{let a=V.parseList(sh.$('[data-in=arr]').value,12).filter(x=>typeof x==='number');if(!a.length)a=[3,8,11,5,2,7];const t=parseInt(sh.$('[data-in=t]').value,10)||9;
    const F=[],seen={};const s=(line,msg,cls,ptr,vars,look,k)=>F.push({a,line,msg,cls:cls||{},ptr:ptr||{},seen:Object.assign({},seen),vars:vars||{},look,k});
    s(2,'Empty dict: no numbers seen yet.');
    for(let i=0;i<a.length;i++){const x=a[i],need=t-x;s(4,`x = ${x}. Its partner would be need = ${t} − ${x} = ${need}.`,{[i]:'cmp'},{i},{i,x,need});
      if(need in seen){s(6,`${need} is in seen (at index ${seen[need]}): answer [${seen[need]}, ${i}]. One dict lookup instead of a scan.`,{[i]:'ok',[seen[need]]:'ok'},{i},{i,x,need},need,'ok');sh.pl.load(F);return}
      s(5,`${need} is not in seen (O(1) check).`,{[i]:'cmp'},{i},{i,x,need},need);seen[x]=i;s(7,`Remember ${x} → index ${i}.`,{[i]:'hl'},{i},{i,x,need},x)}
    s(7,`No pair adds up to ${t}.`,{},{},{},null,'bad');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
