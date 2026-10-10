/* Visualizers for topic 3 (algorithmic thinking): brute force over every pair. */
(function(C){
'use strict';
const U=C.U,V=C.V,esc=U.esc;

C.addViz('brute-pairs',{topic:'thinking',title:'Brute force: every pair once',desc:'Two nested loops visit each pair (i, j) with i < j exactly once. Count the checks: n(n − 1) / 2, which is O(n²).',ico:'(0,1) (0,2) (0,3)\n      (1,2) (1,3)',p:'brute-force'},(el)=>{
  const src=`def count_pairs(nums, target):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                count += 1
    return count`;
  const sh=V.shell(el,{controls:`${V.input('a','nums','2 7 4 5 3','10em')}${V.input('t','target','9','3em')}<button class="btn small primary" type="button" data-go>Load</button>`,code:src,
    draw(f,pn){const n=f.a.length;
      let grid=`<div class="tbl"><table><thead><tr><th scope="col">i \\ j</th>${f.a.map((_,j)=>`<th scope="col">${j}</th>`).join('')}</tr></thead><tbody>`;
      for(let i=0;i<n;i++){grid+=`<tr><th scope="row">${i}</th>`;for(let j=0;j<n;j++){const k=i+','+j,st=f.done[k];
        grid+=`<td style="text-align:center;${j<=i?'opacity:.35':''}${f.i===i&&f.j===j?';outline:2px solid var(--warn)':''}">${j<=i?'·':st==='hit'?'✓':st==='miss'?'✗':''}</td>`}grid+='</tr>'}
      pn.stage.innerHTML=V.arr(f.a,{cls:f.i!=null?{[f.i]:'cmp',[f.j]:'cmp'}:{},ptr:f.i!=null?{i:f.i,j:f.j}:{}})+grid+'</tbody></table></div>';
      pn.vars.innerHTML=V.vars({checks:f.checks,count:f.count,'n(n−1)/2':n*(n-1)/2},['checks']);pn.say(f.msg,f.k)}});
  const load=()=>{const a=V.parseList(sh.$('[data-in=a]').value,8).map(Number).filter(x=>!isNaN(x));const t=+sh.$('[data-in=t]').value||0;
    const F=[],done={};let checks=0,count=0;F.push({a,done:{},checks,count,line:2,msg:`${a.length} numbers → ${a.length*(a.length-1)/2} pairs to check. Greyed cells (j ≤ i) are never visited.`});
    for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){checks++;const hit=a[i]+a[j]===t;if(hit)count++;done[i+','+j]=hit?'hit':'miss';
      F.push({a,i,j,done:Object.assign({},done),checks,count,line:hit?6:5,msg:`nums[${i}] + nums[${j}] = ${a[i]} + ${a[j]} = ${a[i]+a[j]}${hit?` = ${t}: count it.`:` ≠ ${t}.`}`,k:hit?'ok':''})}
    F.push({a,done,checks,count,line:7,msg:`${checks} checks for n = ${a.length}: exactly n(n − 1) / 2. Doubling n roughly quadruples the work: O(n²). Found ${count} pair${count===1?'':'s'}.`,k:'ok'});sh.pl.load(F)};
  sh.ctl.addEventListener('click',e=>{if(e.target.closest('[data-go]'))load()});sh.ctl.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input'))load()});load()});
})(COURSE);
