/* Core: course registry, shared helpers, syntax highlighting, editor and the in-browser Python runner.
   Data files register content with COURSE.topic(), COURSE.qs(), COURSE.addViz(). No build step. */
window.COURSE=(function(){
'use strict';
const C={topics:[],tmap:{},questions:[],qmap:{},viz:{},vizMeta:[]};

/* ---------- curriculum map (topic files add lessons to these) ---------- */
C.PARTS=[
  {k:'A',name:'Foundations',ids:['python','bigo','arrays','strings']},
  {k:'B',name:'Core data structures',ids:['hashing','stack','queue','linkedlist','recursion']},
  {k:'C',name:'Searching and sorting',ids:['searching','sorting']},
  {k:'D',name:'Trees',ids:['trees','bst','heap','trie']},
  {k:'E',name:'Graphs',ids:['graphs','advgraphs']},
  {k:'F',name:'Interview patterns',ids:['patterns']}];
const T=[
  ['python','Python for DSA','Python','The Python you need for algorithms: lists, dicts, sets, loops, functions, classes, references, comprehensions.'],
  ['bigo','Big-O Complexity','Big-O','Predict how running time grows with input size, and know what Python operations cost.'],
  ['arrays','Arrays / Python Lists','Arrays','Indexing, traversal, insert and delete costs, dynamic arrays, then two pointers, prefix sums, sliding windows and Kadane.'],
  ['strings','Strings','Strings','Immutability, slicing, frequency counting, palindromes and string windows.'],
  ['hashing','Hash Tables','Hashing','dict, set, Counter and defaultdict: how hashing gives O(1) lookups, and the problems it unlocks.'],
  ['stack','Stack','Stack','Last in, first out: matching brackets, undo, expression evaluation and monotonic stacks.'],
  ['queue','Queue & Deque','Queue','First in, first out with collections.deque, circular queues and sliding-window maximum.'],
  ['linkedlist','Linked Lists','Linked Lists','Nodes and pointers: insert, delete, reverse, dummy nodes and fast/slow pointers.'],
  ['recursion','Recursion & Backtracking','Recursion','Base cases, the call stack, the return path, memoization and basic backtracking.'],
  ['searching','Searching','Searching','Linear search, binary search and its variations: first/last position, rotated arrays, search on the answer.'],
  ['sorting','Sorting','Sorting','Bubble, selection, insertion, merge, quick and heap sort, step by step, with their costs.'],
  ['trees','Trees','Trees','Root, child, leaf, depth, height; preorder, inorder, postorder and level order traversals.'],
  ['bst','Binary Search Trees','BST','Insert, search and delete using the BST property; validating and using sorted order.'],
  ['heap','Heap / Priority Queue','Heap','Min and max heaps, bubble-up and bubble-down, heapq, and top-K problems.'],
  ['trie','Trie','Trie','Prefix trees for words: insert, search, prefix search and autocomplete.'],
  ['graphs','Graphs','Graphs','Adjacency lists and matrices, BFS and DFS, connected components and grids.'],
  ['advgraphs','Advanced Graphs','Adv. Graphs','Topological sort, cycle detection, union-find, Dijkstra, Prim and Kruskal.'],
  ['patterns','Problem-Solving Patterns','Patterns','Recognise the pattern behind a problem: when to use it, a template, then easy → interview problems.']];
T.forEach(([id,title,short,blurb],i)=>{const t={id,n:i+1,title,short,blurb,learn:[],visualize:[],challenge:[],review:[]};C.topics.push(t);C.tmap[id]=t});
C.PARTS.forEach(p=>p.ids.forEach(id=>C.tmap[id].part=p.k));
C.topic=t=>{const x=C.tmap[t.id];if(!x){console.warn('Unknown topic',t.id);return}Object.assign(x,t)};
C.qs=(topic,list)=>list.forEach(q=>{q.topic=q.topic||topic;if(C.qmap[q.id])console.warn('Duplicate question id',q.id);C.qmap[q.id]=q;C.questions.push(q)});
C.addViz=(name,meta,fn)=>{C.viz[name]=fn;C.vizMeta.push(Object.assign({name},meta))};

C.PATTERNS={python:'Python basics','big-o':'Complexity',traversal:'Traversal',simulation:'Simulation',
  'two-pointers':'Two Pointers','sliding-window':'Sliding Window','prefix-sum':'Prefix Sum',hashing:'Hashing',kadane:'Kadane',
  'fast-slow':'Fast/Slow Pointers','binary-search':'Binary Search','monotonic-stack':'Monotonic Stack',stack:'Stack',queue:'Queue / Deque',
  'linked-list':'Pointer Manipulation',recursion:'Recursion',backtracking:'Backtracking',dp:'Memoization / DP','divide-conquer':'Divide & Conquer',
  sorting:'Sorting',tree:'Tree Recursion',bst:'BST Property',bfs:'BFS',dfs:'DFS','heap-topk':'Heap / Top-K',trie:'Trie',matrix:'Matrix / Grid',
  intervals:'Intervals',greedy:'Greedy','union-find':'Union-Find','topo-sort':'Topological Sort','shortest-path':'Shortest Path',mst:'Min Spanning Tree',
  design:'Design / Build',math:'Math'};
C.TYPES={predict:'Predict',mcq:'Concept',complexity:'Complexity',choose:'Choose',dryrun:'Dry run',blanks:'Complete',debug:'Debug',code:'Code'};
C.typeLabel=q=>q.type==='code'?(q.build?'Build':q.kind==='optimize'?'Optimize':'Code'):C.TYPES[q.type]||q.type;
C.DIFF={1:['🟢','Easy'],2:['🟡','Medium'],3:['🔴','Hard']};

/* Helper classes that some exercises get for free (shown to the student under "Provided helpers"). */
C.PRELUDES={
list:`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build(values):
    """build([1, 2, 3]) -> head of 1 -> 2 -> 3"""
    dummy = ListNode()
    cur = dummy
    for v in values:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head, limit=10000):
    """to_list(head) -> [1, 2, 3]"""
    out = []
    while head is not None and len(out) < limit:
        out.append(head.val)
        head = head.next
    return out`,
tree:`from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(values):
    """Level-order list -> tree. None means 'no child'. build_tree([2, 1, 3])"""
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while queue and i < len(values):
        node = queue.popleft()
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root

def tree_to_list(root):
    """Tree -> level-order list (trailing Nones removed)."""
    out, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            out.append(None)
            continue
        out.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out`};

/* ---------- utilities ---------- */
const U={};
C.U=U;
U.$=(s,r)=>(r||document).querySelector(s);
U.$$=(s,r)=>Array.from((r||document).querySelectorAll(s));
U.esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
U.node=(tag,cls,html)=>{const d=document.createElement(tag);if(cls)d.className=cls;if(html!=null)d.innerHTML=html;return d};
U.store={get(k,d){try{const v=localStorage.getItem('dsa:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem('dsa:'+k,JSON.stringify(v))}catch(e){}},
  del(k){try{localStorage.removeItem('dsa:'+k)}catch(e){}}};
U.fmt=s=>{s=Math.max(0,Math.round(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(x).padStart(2,'0')};
U.day=(t)=>Math.floor(((t||Date.now())-new Date(t||Date.now()).getTimezoneOffset()*60000)/86400000);
U.dayLabel=d=>{const t=U.day();return d<=t?'today':d===t+1?'tomorrow':'in '+(d-t)+' days'};
U.rng=seed=>{let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
U.shuffle=(arr,r)=>{const a=arr.slice();r=r||Math.random;for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
U.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
U.dedent=s=>{s=String(s).replace(/^\n/,'').replace(/\s+$/,'');const ls=s.split('\n');const ind=Math.min(...ls.filter(l=>l.trim()).map(l=>l.match(/^ */)[0].length));return ls.map(l=>l.slice(ind)).join('\n')};

/* live timers, cleared on every route change */
let live=[];
U.every=(fn,ms)=>{const id=setInterval(fn,ms);live.push(id);return id};
U.later=(fn,ms)=>{const id=setTimeout(fn,ms);live.push(id);return id};
U.killAll=()=>{live.forEach(id=>{clearInterval(id);clearTimeout(id)});live=[]};

let toastT=null;
U.toast=msg=>{const t=U.$('#toast');if(!t)return;t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2600)};

/* ---------- tiny Python syntax highlighter ---------- */
const KW=new Set('def return if elif else for while in not and or is None True False class import from as with try except finally raise pass break continue lambda yield global nonlocal del assert'.split(' '));
const BI=new Set('print len range enumerate zip sorted sum min max abs list dict set tuple str int float bool isinstance map filter reversed any all super self iter next ord chr divmod round hash type input heapq deque Counter defaultdict OrderedDict'.split(' '));
const TOK=/(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|[fbr]?"(?:\\.|[^"\\\n])*"|[fbr]?'(?:\\.|[^'\\\n])*')|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b/g;
U.hl=code=>{let out='',last=0,m;code=String(code);TOK.lastIndex=0;
  while((m=TOK.exec(code))){out+=U.esc(code.slice(last,m.index));const t=U.esc(m[0]);
    if(m[1])out+=`<span class="c">${t}</span>`;else if(m[2])out+=`<span class="s">${t}</span>`;else if(m[3])out+=`<span class="n">${t}</span>`;
    else if(KW.has(m[4]))out+=`<span class="k">${t}</span>`;else if(BI.has(m[4]))out+=`<span class="b">${t}</span>`;else out+=t;last=TOK.lastIndex}
  return out+U.esc(code.slice(last))};
U.clean=c=>String(c).replace(/^\n/,'').replace(/\s+$/,'');
U.codeHTML=(c,label,opts)=>{opts=opts||{};return `<div class="codebox"><div class="codebar"><span>${U.esc(label||'python')}</span>${opts.copy===false?'':'<button class="btn small ghost" data-copy>Copy</button>'}</div><pre><code>${opts.plain?U.esc(U.clean(c)):U.hl(U.clean(c))}</code></pre></div>`};
U.tableHTML=(head,rows)=>`<div class="tbl"><table>${head?`<thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead>`:''}<tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
U.diffHTML=d=>{const x=C.DIFF[d]||C.DIFF[1];return `<span class="diff d${d}">${x[0]} ${x[1]}</span>`};

/* global delegated: copy buttons + simple reveal toggles */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-reveal]');
  if(b){const a=b.nextElementSibling;if(!a)return;if(!b.dataset.label)b.dataset.label=b.textContent;a.hidden=!a.hidden;b.setAttribute('aria-expanded',String(!a.hidden));b.textContent=a.hidden?b.dataset.label:b.dataset.label.replace(/^(Reveal|Show)/,'Hide');return}
  const c=e.target.closest('[data-copy]');
  if(c){const pre=c.closest('.codebox').querySelector('pre');const t=pre.textContent;const ok=()=>{c.textContent='Copied';setTimeout(()=>c.textContent='Copy',1400)};
    const sel=()=>{const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);c.textContent='Selected · Ctrl+C'};
    try{navigator.clipboard.writeText(t).then(ok,sel)}catch(err){sel()}}
});

/* ---------- in-browser Python: Pyodide in a Web Worker, so infinite loops can be stopped ---------- */
const PYO='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const HARNESS=[
'import json, traceback',
'def __where(e):',
'    frames=[f for f in traceback.extract_tb(e.__traceback__) if f.filename=="your_code.py"]',
'    at=(" (line %d)" % frames[-1].lineno) if frames else ""',
'    return "%s: %s%s" % (type(e).__name__, e, at)',
'def __same(got, exp, mode):',
'    if mode=="unordered": return sorted(map(repr,got))==sorted(map(repr,exp))',
'    if mode=="groups": return sorted(sorted(map(repr,g)) for g in got)==sorted(sorted(map(repr,g)) for g in exp)',
'    if mode=="float": return abs(got-exp)<1e-6',
'    if mode=="check": return bool(exp(got))',
'    return got==exp',
'def __run():',
'    ns={"__name__":"__main__"}',
'    try:',
'        if __prelude: exec(compile(__prelude,"helpers.py","exec"), ns)',
'        exec(compile(__user_code,"your_code.py","exec"), ns)',
'        if __post: exec(compile(__post,"tests.py","exec"), ns)',
'    except SyntaxError as e:',
'        return json.dumps({"error":"SyntaxError: %s (line %s)" % (e.msg, e.lineno)})',
'    except Exception as e:',
'        return json.dumps({"error":__where(e)})',
'    results=[]',
'    for call, expected, mode in json.loads(__tests_json):',
'        try:',
'            got=eval(call, ns)',
'            exp=eval(expected, ns)',
'            ok=__same(got, exp, mode)',
'            results.append([call, bool(ok), repr(got)[:300], expected if mode=="check" else repr(exp)[:300]])',
'        except Exception as e:',
'            results.append([call, False, __where(e), expected])',
'    return json.dumps({"results":results})',
'__run()'].join('\n');
const WORKER=`importScripts('${PYO}pyodide.js');
let py=null;
const ready=loadPyodide({indexURL:'${PYO}'}).then(p=>{py=p;postMessage({type:'ready'})}).catch(e=>postMessage({type:'fatal',msg:String(e)}));
onmessage=async e=>{await ready;if(!py)return;const d=e.data;let out='';
 const add=s=>{if(out.length<20000)out+=s+'\\n'};
 py.setStdout({batched:add});py.setStderr({batched:add});
 try{py.globals.set('__user_code',d.code);py.globals.set('__prelude',d.prelude||'');py.globals.set('__post',d.post||'');py.globals.set('__tests_json',JSON.stringify(d.tests||[]));
  const r=py.runPython(${JSON.stringify(HARNESS)});postMessage({id:d.id,out,res:JSON.parse(r)})}
 catch(err){postMessage({id:d.id,out,res:{error:String(err&&err.message||err)}})}};`;
const PY={w:null,ready:null,seq:0,pending:{},loaded:false};
function pyStart(){if(PY.w)return PY.ready;const url=URL.createObjectURL(new Blob([WORKER],{type:'text/javascript'}));PY.w=new Worker(url);
  PY.ready=new Promise((res,rej)=>{PY.w.onmessage=e=>{const d=e.data;if(d.type==='ready'){PY.loaded=true;res()}else if(d.type==='fatal'){rej(new Error(d.msg))}else{const p=PY.pending[d.id];if(p){clearTimeout(p.t);delete PY.pending[d.id];p.res(d)}}};PY.w.onerror=ev=>rej(new Error(ev.message||'worker error'))});
  PY.ready.catch(()=>{PY.w=null});return PY.ready}
U.prelude=q=>q&&q.prelude?(C.PRELUDES[q.prelude]||q.prelude):'';
/* runPy(code,{tests:[[call,expected,mode]],prelude,post}, statusFn) -> {out,res:{error}|{results}} | {timeout:true} */
U.runPy=async(code,opt,status)=>{opt=opt||{};if(!PY.loaded&&status)status('Loading Python in your browser (first time ≈ 10 MB, then cached)…');
  try{await pyStart()}catch(err){return {res:{error:'Could not load Python: '+err.message+'. Check your internet connection, or run the code in your own editor.'}}}
  if(status)status('Running…');
  return new Promise(res=>{const id=++PY.seq;const t=setTimeout(()=>{delete PY.pending[id];PY.w.terminate();PY.w=null;PY.loaded=false;res({timeout:true})},opt.timeout||9000);
    PY.pending[id]={res,t};PY.w.postMessage({id,code,tests:opt.tests||[],prelude:opt.prelude||'',post:opt.post||''})})};
U.testsOf=q=>(q.tests||[]).map(t=>[t[0],t[1],t[2]||'']);
/* paints run output; returns true/false when tests ran, null otherwise */
U.showRun=(out,resEl,r,withTests,labels)=>{out.textContent='';if(resEl)resEl.innerHTML='';
  if(r.timeout){out.textContent='Stopped after 9 seconds. Is there an infinite loop (or a very slow approach)?';out.style.color='var(--marker)';return withTests?false:null}
  const res=r.res||{};let txt=(r.out||'').replace(/\s+$/,'');if(res.error)txt+=(txt?'\n':'')+res.error;out.textContent=txt||(withTests?'(no printed output)':'(no output: use print() to see values)');
  out.style.color=res.error?'var(--marker)':'';
  if(!withTests)return null;if(!res.results)return false;const pass=res.results.filter(x=>x[1]).length;
  if(resEl)resEl.innerHTML=`<b>${pass} / ${res.results.length} tests passed</b>`+res.results.map((x,i)=>{const lab=labels&&labels[i]?labels[i]:x[0];return `<span class="${x[1]?'p':'f'}">${x[1]?'✓':'✗'} ${U.esc(lab)}${x[1]?'':`  → got ${U.esc(x[2])}, expected ${U.esc(x[3])}`}</span>`}).join('');
  return pass===res.results.length};

/* ---------- code editor: textarea + line numbers, Tab indents, Enter keeps indentation, Ctrl+Enter runs ---------- */
U.editor=(value,opt)=>{opt=opt||{};const w=U.node('div','ed-wrap');const g=U.node('div','ed-gutter');g.setAttribute('aria-hidden','true');
  const ta=U.node('textarea','ex-ed');ta.spellcheck=false;ta.setAttribute('autocapitalize','off');ta.setAttribute('autocomplete','off');ta.setAttribute('aria-label',opt.label||'Code editor');
  ta.value=value;const lines=()=>{const n=ta.value.split('\n').length;g.textContent=Array.from({length:n},(_,i)=>i+1).join('\n');g.scrollTop=ta.scrollTop};
  ta.style.minHeight=Math.max(opt.min||150,(value.split('\n').length+2)*21)+'px';
  ta.addEventListener('scroll',()=>g.scrollTop=ta.scrollTop);
  ta.addEventListener('input',()=>{lines();opt.onChange&&opt.onChange(ta.value)});
  ta.addEventListener('keydown',e=>{const ins=t=>{if(!document.execCommand('insertText',false,t))ta.setRangeText(t,ta.selectionStart,ta.selectionEnd,'end');lines()};
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();opt.onRun&&opt.onRun();return}
    if(e.key==='Escape'){ta.blur();return}
    if(e.key==='Tab'&&!e.shiftKey&&!e.ctrlKey){e.preventDefault();ins('    ')}
    else if(e.key==='Tab'&&e.shiftKey){e.preventDefault();const v=ta.value,s=ta.selectionStart,ls=v.lastIndexOf('\n',s-1)+1;if(v.slice(ls,ls+4)==='    '){ta.setRangeText('',ls,ls+4,'end');lines()}}
    else if(e.key==='Enter'){const v=ta.value,s=ta.selectionStart,ls=v.lastIndexOf('\n',s-1)+1,line=v.slice(ls,s);let ind=(line.match(/^[ ]*/)||[''])[0];if(/:\s*$/.test(line))ind+='    ';e.preventDefault();ins('\n'+ind)}});
  w.append(g,ta);lines();w.ta=ta;w.set=v=>{ta.value=v;lines()};return w};

return C;
})();
