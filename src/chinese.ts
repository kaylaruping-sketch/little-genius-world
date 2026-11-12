import type {Item} from './game';
export type Word = Item & {pinyin:string};
export const words:Word[] = [
 ['cat','猫','Cat','🐱','māo'],['dog','狗','Dog','🐶','gǒu'],['rabbit','兔子','Rabbit','🐰','tù zi'],
 ['bird','鸟','Bird','🐦','niǎo'],['fish','鱼','Fish','🐟','yú'],['apple','苹果','Apple','🍎','píng guǒ'],
 ['banana','香蕉','Banana','🍌','xiāng jiāo'],['water','水','Water','💧','shuǐ'],['sun','太阳','Sun','☀️','tài yáng'],
 ['moon','月亮','Moon','🌙','yuè liang'],['flower','花','Flower','🌼','huā'],['tree','树','Tree','🌳','shù'],
 ['car','车','Car','🚗','chē'],['hand','手','Hand','✋','shǒu'],['foot','脚','Foot','🦶','jiǎo'],['ball','球','Ball','⚽','qiú']
].map(([id,zh,en,icon,pinyin])=>({id,zh,en,icon,pinyin}));
export type Point=[number,number];
export type Character=Word & {strokes:Point[][]};
export const characters:Character[]=[
 {id:'one',zh:'一',en:'One',icon:'1️⃣',pinyin:'yī',strokes:[[[28,100],[172,100]]]},
 {id:'two',zh:'二',en:'Two',icon:'2️⃣',pinyin:'èr',strokes:[[[43,65],[157,65]],[[25,137],[175,137]]]},
 {id:'three',zh:'三',en:'Three',icon:'3️⃣',pinyin:'sān',strokes:[[[38,45],[162,45]],[[50,96],[150,96]],[[25,152],[175,152]]]},
 {id:'ten',zh:'十',en:'Ten',icon:'🔟',pinyin:'shí',strokes:[[[27,80],[173,80]],[[100,25],[100,175]]]},
 {id:'person',zh:'人',en:'Person',icon:'🧒',pinyin:'rén',strokes:[[[107,30],[100,82],[78,132],[35,170]],[[100,87],[129,135],[170,167]]]},
 {id:'big',zh:'大',en:'Big',icon:'🐘',pinyin:'dà',strokes:[[[30,75],[170,75]],[[103,25],[98,95],[79,139],[32,173]],[[100,91],[128,139],[172,173]]]},
 {id:'small',zh:'小',en:'Small',icon:'🐜',pinyin:'xiǎo',strokes:[[[102,27],[102,167],[84,159]],[[61,78],[49,111],[30,137]],[[139,79],[157,112],[170,139]]]},
 {id:'mouth',zh:'口',en:'Mouth',icon:'👄',pinyin:'kǒu',strokes:[[[43,42],[43,160]],[[43,42],[157,42],[157,160]],[[43,153],[157,153]]]},
 {id:'day',zh:'日',en:'Sun / day',icon:'☀️',pinyin:'rì',strokes:[[[48,28],[48,170]],[[48,28],[152,28],[152,170]],[[48,96],[152,96]],[[48,164],[152,164]]]},
 {id:'mountain',zh:'山',en:'Mountain',icon:'⛰️',pinyin:'shān',strokes:[[[100,26],[100,160]],[[38,70],[38,160],[165,160]],[[165,70],[165,168]]]}
];
export function wordInfo(item:Item){return words.find(w=>w.id===item.id)||characters.find(w=>w.id===item.id)}
export function sampleStroke(stroke:Point[]):Point[]{const points:Point[]=[stroke[0]];for(let i=1;i<stroke.length;i++){const a=stroke[i-1],b=stroke[i],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/6));for(let j=1;j<=n;j++)points.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n])}return points}
