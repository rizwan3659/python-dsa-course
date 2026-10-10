/* Visualizers for topic 21 (bit manipulation): bitwise operators column by column, and n & (n - 1). */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

/* rows of bits: [{label, value, on:[bit indexes highlighted], res}] drawn most significant bit first */
V.bitRows=(rows,nb)=>`<div class="bits" style="--nb:${nb}" role="img" aria-label="${esc(rows.map(r=>r.label+' = '+r.value).join(', '))}"><span class="lab"></span>${[...Array(nb)].map((_,k)=>`<span class="lab" style="text-align:center;padding:0">${nb-1-k}</span>`).join('')}${rows.map(r=>`<span class="lab">${esc(r.label)}</span>${[...Array(nb)].map((_,k)=>{const i=nb-1-k;const known=r.upto==null||i<=r.upto;const bit=known?(r.value>>i)&1:null;
  return `<span class="b ${bit?'one':''} ${(r.on||[]).includes(i)?'on':''}" ${r.res&&bit?'style="background:var(--good-soft);border-color:var(--good)"':''}>${bit==null?'':bit}</span>`}).join('')}`).join('')}</div>`;

const OPS={and:['&','AND: 1 only if both bits are 1',(x,y)=>x&y],or:['|','OR: 1 if either bit is 1',(x,y)=>x|y],xor:['^','XOR: 1 if the bits differ',(x,y)=>x^y]};

C.addViz('bitwise',{topic:'bits',title:'Bitwise operators, bit by bit',desc:'Compute a & b, a | b and a ^ b one column at a time, shift left and right, and watch n & (n − 1) strip the lowest 1 bit.',ico:'0110\n0011\n──── ^\n0101',p:'bits'},(el,api)=>{
  let mode=api.arg.mode||api.get('mode','xor');
  const MODES=[['and','a & b'],['or','a | b'],['xor','a ^ b'],['shift','a << k, a >> k'],['kern','n & (n − 1)']];
  const sh=V.shell(el,{controls:`<div class="row">${V.modeButtons(MODES,mode)}</div><div class="row">${V.input('a','a / n','44','4em')}${V.input('b','b / k','27','4em')}<button class="btn small primary" type="button" data-go>Load</button></div>`,
    draw(f,pn){pn.stage.innerHTML=V.bitRows(f.rows,f.nb);pn.vars.innerHTML=V.vars(f.vars||{},f.hot||[]);pn.say(f.msg,f.k)}});
  const load=()=>{const a=Math.max(0,Math.min(255,parseInt(sh.$('[data-in=a]').value)||0)),b=Math.max(0,Math.min(255,parseInt(sh.$('[data-in=b]').value)||0));const F=[];
    if(OPS[mode]){const [sym,desc,fn]=OPS[mode];const r=fn(a,b),nb=8;F.push({nb,rows:[{label:'a',value:a},{label:'b',value:b},{label:'a '+sym+' b',value:r,upto:-1,res:1}],vars:{a,b},msg:`${desc}. Columns are computed independently, right to left.`});
      for(let i=0;i<nb;i++){const x=(a>>i)&1,y=(b>>i)&1;F.push({nb,rows:[{label:'a',value:a,on:[i]},{label:'b',value:b,on:[i]},{label:'a '+sym+' b',value:r,upto:i,on:[i],res:1}],vars:{bit:i,a_bit:x,b_bit:y,result_bit:fn(x,y)},hot:['result_bit'],msg:`Bit ${i}: ${x} ${sym} ${y} = ${fn(x,y)}.`})}
      F.push({nb,rows:[{label:'a',value:a},{label:'b',value:b},{label:'a '+sym+' b',value:r,res:1}],vars:{[`${a} ${sym} ${b}`]:r},msg:`${a} ${sym} ${b} = <b>${r}</b> (0b${r.toString(2)}). One machine instruction, O(1).`,k:'ok'})}
    else if(mode==='shift'){const k=Math.min(4,b),nb=12;F.push({nb,rows:[{label:'a',value:a}],vars:{a,k},msg:`a = ${a} = 0b${a.toString(2)}.`});
      for(let s=1;s<=k;s++)F.push({nb,rows:[{label:'a',value:a},{label:`a << ${s}`,value:a<<s,res:1}],vars:{[`a << ${s}`]:a<<s,[`a * 2**${s}`]:a*2**s},msg:`Shift left by ${s}: every bit moves ${s} place${s>1?'s':''} up, zeros come in on the right. Same as × 2^${s}.`});
      for(let s=1;s<=k;s++)F.push({nb,rows:[{label:'a',value:a},{label:`a >> ${s}`,value:a>>s,res:1}],vars:{[`a >> ${s}`]:a>>s,[`a // 2**${s}`]:Math.floor(a/2**s)},msg:`Shift right by ${s}: the lowest ${s} bit${s>1?'s':''} fall off. Same as // 2^${s}.`,k:s===k?'ok':''})}
    else{let n=a,c=0;const nb=8;F.push({nb,rows:[{label:'n',value:n}],vars:{n,count:c},msg:`n = ${n} = 0b${n.toString(2)}. Count its 1 bits by clearing the lowest one each step.`});
      while(n){const low=n&-n,i=Math.log2(low);F.push({nb,rows:[{label:'n',value:n,on:[i]},{label:'n − 1',value:n-1,on:[i]}],vars:{n,'n - 1':n-1,count:c},msg:`n − 1 flips bit ${i} (the lowest 1) and every 0 below it.`});
        n&=n-1;c++;F.push({nb,rows:[{label:'n & (n−1)',value:n,res:1}],vars:{n,count:c},hot:['count'],msg:`AND clears exactly that bit: n = ${n}. count = ${c}.`})}
      F.push({nb,rows:[{label:'n',value:0}],vars:{count:c},msg:`n is 0 after ${c} steps: ${a} has ${c} one bit${c===1?'':'s'}. The loop runs once per 1 bit, not once per bit.`,k:'ok'})}
    sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{const m=e.target.closest('[data-mode]');if(m){mode=m.dataset.mode;api.set('mode',mode);U.$$('[data-mode]',sh.ctl).forEach(x=>x.setAttribute('aria-pressed',String(x===m)));load();return}if(e.target.closest('[data-go]'))load()});
  sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
