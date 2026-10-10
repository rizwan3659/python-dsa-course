/* Visualizers for topic 4 (strings): character frequency and two-pointer palindrome check. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

C.addViz('char-freq',{topic:'strings',title:'Counting characters',desc:'Walk through a string and build a frequency table one character at a time: the most common string pattern of all.',ico:'"banana"\na:3 n:2 b:1',p:'hashing'},(el)=>{
  const src=`counts = {}
for ch in s:
    counts[ch] = counts.get(ch, 0) + 1`;
  const sh=V.shell(el,{controls:`${V.input('s','String','mississippi','11em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){const mx=Math.max(1,...Object.values(f.counts));pn.stage.innerHTML=V.arr(f.s,{cls:f.i!=null?{[f.i]:'cmp'}:{},ptr:f.i!=null?{ch:f.i}:{}})+`<div class="col" style="gap:4px;margin-top:10px;min-width:260px">${Object.entries(f.counts).map(([k,v])=>`<div class="row" style="gap:8px;flex-wrap:nowrap"><span class="mono" style="width:2.5em">'${esc(k)}'</span><div class="meter" style="flex:1 1 160px;${k===f.cur?'outline:2px solid var(--warn)':''}"><i style="width:${v/mx*100}%"></i></div><span class="mono" style="width:2em">${v}</span></div>`).join('')}</div>`;pn.say(f.msg,f.k)}});
  const load=()=>{const s=sh.$('[data-in=s]').value.slice(0,18).split('');const counts={},F=[];F.push({s,counts:{},line:1,msg:'counts starts empty.'});
    s.forEach((ch,i)=>{const old=counts[ch]||0;counts[ch]=old+1;F.push({s,i,cur:ch,counts:Object.assign({},counts),line:3,msg:`'${esc(ch)}': ${old?`seen ${old} time${old>1?'s':''} before`:'first time (get returns 0)'} → ${old+1}.`})});
    const top=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];F.push({s,counts,line:3,msg:top?`Done in one O(n) pass. Most common: '${esc(top[0])}' (${top[1]}). <code>collections.Counter(s)</code> does exactly this.`:'Empty string.',k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});

C.addViz('palindrome',{topic:'strings',title:'Palindrome check with two pointers',desc:'Compare characters from both ends, skipping anything that is not a letter or digit, ignoring case.',ico:'r a c e c a r\n→           ←',p:'two-pointers'},(el)=>{
  const src=`def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if not s[left].isalnum():
            left += 1
        elif not s[right].isalnum():
            right -= 1
        elif s[left].lower() != s[right].lower():
            return False
        else:
            left += 1
            right -= 1
    return True`;
  const sh=V.shell(el,{controls:`${V.input('s','String','A man, a plan, a canal: Panama','15em')}<button class="btn small primary" type="button" data-go>Load</button><button class="btn small" type="button" data-ex="race a car">race a car</button>`,code:src,
    draw(f,pn){pn.stage.innerHTML=V.arr(f.s.map(c=>c===' '?'␣':c),{cls:f.cls,ptr:f.ptr});pn.say(f.msg,f.k)}});
  const load=raw=>{const s=(raw||sh.$('[data-in=s]').value).slice(0,30).split('');const F=[];let l=0,r=s.length-1;const ok={};
    const f=(line,msg,cls,k)=>F.push({s,line,msg,cls:Object.assign({},ok,cls||{}),ptr:{left:l,right:r},k});f(2,'One pointer at each end.');
    while(l<r){if(!/[a-z0-9]/i.test(s[l])){f(4,`'${esc(s[l])}' is not a letter or digit: skip it.`,{[l]:'dim'});l++;continue}
      if(!/[a-z0-9]/i.test(s[r])){f(6,`'${esc(s[r])}' is not a letter or digit: skip it.`,{[r]:'dim'});r--;continue}
      if(s[l].toLowerCase()!==s[r].toLowerCase()){f(8,`'${esc(s[l])}' ≠ '${esc(s[r])}' (ignoring case): <b>not a palindrome</b>.`,{[l]:'bad',[r]:'bad'},'bad');sh.pl.load(F);return}
      f(10,`'${esc(s[l])}' matches '${esc(s[r])}'. Move both inward.`,{[l]:'ok',[r]:'ok'});ok[l]=ok[r]='ok';l++;r--}
    f(12,'The pointers met with no mismatch: <b>palindrome</b>. O(n) time, O(1) extra space (no cleaned copy needed).',{},'ok');sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load();const x=e.target.closest('[data-ex]');if(x){sh.$('[data-in=s]').value=x.dataset.ex;load(x.dataset.ex)}});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
