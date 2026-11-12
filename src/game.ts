import {words,characters} from './chinese';
export type Lang = 'zh'|'en';
export type Mode = 'numbers'|'shapes'|'colors'|'animals'|'listen'|'hanzi'|'reading'|'tracing';
export type Item = {id:string;zh:string;en:string;icon:string};
export const shapes:Item[]=[['circle','圆形','Circle','●'],['square','正方形','Square','■'],['triangle','三角形','Triangle','▲'],['star','星形','Star','★'],['heart','爱心','Heart','♥'],['diamond','菱形','Diamond','◆'],['oval','椭圆形','Oval','⬭'],['rectangle','长方形','Rectangle','▰'],['pentagon','五边形','Pentagon','⬟'],['hexagon','六边形','Hexagon','⬢']].map(([id,zh,en,icon])=>({id,zh,en,icon}));
export const colors:Item[]=[['#ed777b','红色','Red',''],['#efb24f','橙色','Orange',''],['#ecd45c','黄色','Yellow',''],['#83b88b','绿色','Green',''],['#7cabe0','蓝色','Blue',''],['#b49ad5','紫色','Purple',''],['#eaa4bd','粉色','Pink',''],['#a47b5b','棕色','Brown',''],['#4f5350','黑色','Black',''],['#fafaf4','白色','White','']].map(([id,zh,en,icon])=>({id,zh,en,icon}));
export const animals:Item[]=[['cat','小猫','Cat','🐱'],['dog','小狗','Dog','🐶'],['rabbit','兔子','Rabbit','🐰'],['lion','狮子','Lion','🦁'],['panda','熊猫','Panda','🐼'],['frog','青蛙','Frog','🐸'],['pig','小猪','Pig','🐷'],['monkey','猴子','Monkey','🐵'],['elephant','大象','Elephant','🐘'],['duck','鸭子','Duck','🦆'],['cow','奶牛','Cow','🐮'],['tiger','老虎','Tiger','🐯'],['bird','小鸟','Bird','🐦'],['fish','小鱼','Fish','🐟'],['horse','小马','Horse','🐴'],['sheep','绵羊','Sheep','🐑'],['goat','山羊','Goat','🐐'],['chicken','小鸡','Chicken','🐥'],['mouse','小老鼠','Mouse','🐭'],['bear','小熊','Bear','🐻'],['fox','狐狸','Fox','🦊'],['giraffe','长颈鹿','Giraffe','🦒'],['zebra','斑马','Zebra','🦓'],['penguin','企鹅','Penguin','🐧'],['turtle','乌龟','Turtle','🐢'],['whale','鲸鱼','Whale','🐳'],['dolphin','海豚','Dolphin','🐬'],['butterfly','蝴蝶','Butterfly','🦋'],['bee','蜜蜂','Bee','🐝'],['deer','小鹿','Deer','🦌']].map(([id,zh,en,icon])=>({id,zh,en,icon}));
export const modes:Mode[]=['numbers','shapes','colors','animals','listen','hanzi','reading','tracing'];
export const titles={zh:['数字乐园','形状配对','颜色世界','动物乐园','听音找图','汉字配对','看图识字','汉字描红'],en:['Number Garden','Shape Buddies','Color Magic','Animal Friends','Listen & Find','Character Buddies','Picture to Chinese','Trace a Character']};
export function shuffle<T>(a:T[]):T[]{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
export type Question={answer:Item;options:Item[];object:string;style?:string};
export type DeckHistory={seen:string[]};
export const countingObjects=['🍎','🍓','🌼','🦋','🥕','🍐','🍊','🍇','🍌','🍉','🍒','⭐','🎈','🧸','🚗','⚽','🐟','🐢','🌻','🐥'];
const shapeColors=['#9cae8d','#aa96ba','#d7a76a','#7cabe0','#d8979d','#7fada6'];
const colorStyles=['circle','square','diamond','oval','triangle','star'];
export function contentPool(mode:Mode):Item[]{
 if(mode==='numbers')return Array.from({length:10},(_,i)=>({id:String(i+1),zh:String(i+1),en:String(i+1),icon:String(i+1)}));
 return mode==='shapes'?shapes:mode==='colors'?colors:mode==='animals'?animals:mode==='listen'||mode==='reading'?words:characters;
}
// An identity describes what the child sees, not the answer button order.
export function questionKey(mode:Mode,q:Pick<Question,'answer'|'object'|'style'>):string{
 return mode==='numbers'?`${q.answer.id}:${q.object}`:mode==='shapes'||mode==='colors'?`${q.answer.id}:${q.style||(mode==='shapes'?shapeColors[0]:'circle')}`:q.answer.id;
}
export function rememberRound(mode:Mode,previous:DeckHistory|undefined,questions:Question[]):DeckHistory{
 const latest=questions.map(q=>questionKey(mode,q));
 return {seen:[...(previous?.seen||[]).filter(key=>!latest.includes(key)),...latest]};
}
export function makeRound(mode:Mode,history:DeckHistory={seen:[]}):Question[]{
 const pool=contentPool(mode);
 const candidates:Question[]=pool.flatMap(answer=>{
  const variants=mode==='numbers'?countingObjects:mode==='shapes'?shapeColors:mode==='colors'?colorStyles:[''];
  return variants.map(variant=>({answer,options:[],object:mode==='numbers'?variant:'',...(mode==='shapes'||mode==='colors'?{style:variant}:{})}));
 });
 const age=new Map(history.seen.map((key,i)=>[key,i]));
 // Unseen content first. Once everything has been played, revisit the oldest content.
 const ranked=shuffle(candidates).sort((a,b)=>(age.get(questionKey(mode,a))??-1)-(age.get(questionKey(mode,b))??-1));
 const selected:Question[]=[];
 if(mode==='tracing'&&history.seen.length===0){
  // Only the very first lesson starts with one, two, three and the original simple characters.
  selected.push(...[...characters.slice(0,3),...shuffle(characters.slice(3,10))].map(answer=>({answer,options:[],object:''})));
 }else{
  const used=new Set<string>();
  for(const q of ranked){if(used.has(q.answer.id))continue;selected.push(q);used.add(q.answer.id);if(selected.length===10)break;}
 }
 return selected.map(q=>({...q,options:shuffle([q.answer,...shuffle(pool.filter(x=>x.id!==q.answer.id)).slice(0,3)])}));
}
export type Round={questions:Question[];index:number;solved:boolean};
export type Save={stars:number;completed:Record<Mode,number>;rounds:Partial<Record<Mode,Round>>;history:Partial<Record<Mode,DeckHistory>>;lang:Lang;sound:boolean};
export function fresh():Save{return {stars:0,completed:{numbers:0,shapes:0,colors:0,animals:0,listen:0,hanzi:0,reading:0,tracing:0},rounds:{},history:{},lang:'zh',sound:true}}
export const KEY='little-genius-world-v1';
function legacyHistory(mode:Mode):DeckHistory{
 // Previous releases did not keep completed question IDs. Prioritize the newly added content.
 if(mode==='listen'||mode==='reading')return {seen:words.slice(0,16).map(w=>w.id)};
 if(mode==='hanzi'||mode==='tracing')return {seen:characters.slice(0,10).map(c=>c.id)};
 if(mode==='animals')return {seen:animals.slice(0,12).map(a=>a.id)};
 if(mode==='numbers')return {seen:contentPool(mode).flatMap(a=>countingObjects.slice(0,5).map(o=>`${a.id}:${o}`))};
 if(mode==='colors')return {seen:colors.slice(0,6).map(c=>`${c.id}:circle`)};
 return {seen:shapes.slice(0,6).map(s=>`${s.id}:${shapeColors[0]}`)};
}
export function parseSave(raw:string|null):Save{
 try{
  if(!raw)return fresh();const s=JSON.parse(raw);
  if(!Number.isSafeInteger(s.stars)||s.stars<0||!['zh','en'].includes(s.lang)||typeof s.sound!=='boolean')return fresh();
  if(!s.history||typeof s.history!=='object'||Array.isArray(s.history))s.history={};
  for(const m of modes){
   if(s.completed[m]===undefined&&['listen','hanzi','reading','tracing'].includes(m))s.completed[m]=0;
   if(!Number.isSafeInteger(s.completed[m])||s.completed[m]<0)return fresh();
   const r=s.rounds[m];
   if(r&&(!Array.isArray(r.questions)||r.questions.length!==10||!Number.isInteger(r.index)||r.index<0||r.index>9||typeof r.solved!=='boolean'||r.questions.some((q:Question)=>!q.answer?.id||!Array.isArray(q.options)||q.options.length!==4||!q.options.some(o=>o.id===q.answer.id))))return fresh();
   const history=s.history[m];
   if(history){s.history[m]={seen:Array.isArray(history.seen)?[...new Set(history.seen.filter((key:unknown)=>typeof key==='string'&&key.length<100))].slice(-500):[]};}
   else if(s.completed[m]>0)s.history[m]=legacyHistory(m);
  }
  return s;
 }catch{return fresh()}
}
