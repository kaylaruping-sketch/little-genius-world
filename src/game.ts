export type Lang = 'zh'|'en';
export type Mode = 'numbers'|'shapes'|'colors'|'animals';
export type Item = {id:string;zh:string;en:string;icon:string};
export const shapes:Item[]=[['circle','圆形','Circle','●'],['square','正方形','Square','■'],['triangle','三角形','Triangle','▲'],['star','星形','Star','★'],['heart','爱心','Heart','♥'],['diamond','菱形','Diamond','◆']].map(([id,zh,en,icon])=>({id,zh,en,icon}));
export const colors:Item[]=[['#ed777b','红色','Red',''],['#efb24f','橙色','Orange',''],['#ecd45c','黄色','Yellow',''],['#83b88b','绿色','Green',''],['#7cabe0','蓝色','Blue',''],['#b49ad5','紫色','Purple','']].map(([id,zh,en,icon])=>({id,zh,en,icon}));
export const animals:Item[]=[['cat','小猫','Cat','🐱'],['dog','小狗','Dog','🐶'],['rabbit','兔子','Rabbit','🐰'],['lion','狮子','Lion','🦁'],['panda','熊猫','Panda','🐼'],['frog','青蛙','Frog','🐸'],['pig','小猪','Pig','🐷'],['monkey','猴子','Monkey','🐵'],['elephant','大象','Elephant','🐘'],['duck','鸭子','Duck','🦆'],['cow','奶牛','Cow','🐮'],['tiger','老虎','Tiger','🐯']].map(([id,zh,en,icon])=>({id,zh,en,icon}));
export const modes:Mode[]=['numbers','shapes','colors','animals'];
export const titles={zh:['数字乐园','形状配对','颜色世界','动物乐园'],en:['Number Garden','Shape Buddies','Color Magic','Animal Friends']};
export function shuffle<T>(a:T[]):T[]{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
export type Question={answer:Item;options:Item[];object:string};
export function makeRound(mode:Mode):Question[]{const pool=mode==='numbers'?Array.from({length:10},(_,i)=>({id:String(i+1),zh:String(i+1),en:String(i+1),icon:String(i+1)})):mode==='shapes'?shapes:mode==='colors'?colors:animals;let targets=shuffle(pool);while(targets.length<10)targets.push(...shuffle(pool));return targets.slice(0,10).map(answer=>({answer,options:shuffle([answer,...shuffle(pool.filter(x=>x.id!==answer.id)).slice(0,3)]),object:shuffle(['🍎','🍓','🌼','🦋','🥕'])[0]}))}
export type Round={questions:Question[];index:number;solved:boolean};
export type Save={stars:number;completed:Record<Mode,number>;rounds:Partial<Record<Mode,Round>>;lang:Lang;sound:boolean};
export function fresh():Save{return {stars:0,completed:{numbers:0,shapes:0,colors:0,animals:0},rounds:{},lang:'zh',sound:true}}
export const KEY='little-genius-world-v1';
export function parseSave(raw:string|null):Save{try{if(!raw)return fresh();const s=JSON.parse(raw);if(!Number.isSafeInteger(s.stars)||s.stars<0||!['zh','en'].includes(s.lang)||typeof s.sound!=='boolean')return fresh();for(const m of modes){if(!Number.isSafeInteger(s.completed[m])||s.completed[m]<0) return fresh();const r=s.rounds[m];if(r&&(!Array.isArray(r.questions)||r.questions.length!==10||!Number.isInteger(r.index)||r.index<0||r.index>9||typeof r.solved!=='boolean'||r.questions.some((q:Question)=>!q.answer?.id||!Array.isArray(q.options)||q.options.length!==4||!q.options.some(o=>o.id===q.answer.id))))return fresh()}return s}catch{return fresh()}}
