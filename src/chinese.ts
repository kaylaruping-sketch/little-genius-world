import type {Item} from './game';
export type Word = Item & {pinyin:string};
export const words:Word[] = [
 ['cat','猫','Cat','🐱','māo'],['dog','狗','Dog','🐶','gǒu'],['rabbit','兔子','Rabbit','🐰','tù zi'],
 ['bird','鸟','Bird','🐦','niǎo'],['fish','鱼','Fish','🐟','yú'],['apple','苹果','Apple','🍎','píng guǒ'],
 ['banana','香蕉','Banana','🍌','xiāng jiāo'],['water','水','Water','💧','shuǐ'],['sun','太阳','Sun','☀️','tài yáng'],
 ['moon','月亮','Moon','🌙','yuè liang'],['flower','花','Flower','🌼','huā'],['tree','树','Tree','🌳','shù'],
 ['car','车','Car','🚗','chē'],['hand','手','Hand','✋','shǒu'],['foot','脚','Foot','🦶','jiǎo'],['ball','球','Ball','⚽','qiú'],
 ['pear','梨','Pear','🍐','lí'],['orange','橙子','Orange','🍊','chéng zi'],['grape','葡萄','Grapes','🍇','pú tao'],
 ['strawberry','草莓','Strawberry','🍓','cǎo méi'],['watermelon','西瓜','Watermelon','🍉','xī guā'],['peach','桃子','Peach','🍑','táo zi'],
 ['lemon','柠檬','Lemon','🍋','níng méng'],['carrot','胡萝卜','Carrot','🥕','hú luó bo'],['corn','玉米','Corn','🌽','yù mǐ'],
 ['egg','鸡蛋','Egg','🥚','jī dàn'],['milk','牛奶','Milk','🥛','niú nǎi'],['bread','面包','Bread','🍞','miàn bāo'],
 ['rice','米饭','Rice','🍚','mǐ fàn'],['duck','鸭子','Duck','🦆','yā zi'],['panda','熊猫','Panda','🐼','xióng māo'],
 ['elephant','大象','Elephant','🐘','dà xiàng'],['monkey','猴子','Monkey','🐵','hóu zi'],['tiger','老虎','Tiger','🐯','lǎo hǔ'],
 ['butterfly','蝴蝶','Butterfly','🦋','hú dié'],['bee','蜜蜂','Bee','🐝','mì fēng'],['star','星星','Star','⭐','xīng xing'],
 ['rain','雨','Rain','🌧️','yǔ'],['snow','雪','Snow','❄️','xuě'],['book','书','Book','📖','shū']
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
 {id:'mountain',zh:'山',en:'Mountain',icon:'⛰️',pinyin:'shān',strokes:[[[100,26],[100,160]],[[38,70],[38,160],[165,160]],[[165,70],[165,168]]]},
 {id:'wood',zh:'木',en:'Tree / wood',icon:'🌳',pinyin:'mù',strokes:[[[28,70],[172,70]],[[100,25],[100,175]],[[100,75],[76,121],[30,163]],[[103,79],[129,127],[173,163]]]},
 {id:'earth',zh:'土',en:'Soil',icon:'🪴',pinyin:'tǔ',strokes:[[[45,77],[155,77]],[[100,28],[100,157]],[[25,160],[175,160]]]},
 {id:'work',zh:'工',en:'Work',icon:'👷',pinyin:'gōng',strokes:[[[37,40],[163,40]],[[100,40],[100,157]],[[25,160],[175,160]]]},
 {id:'king',zh:'王',en:'King',icon:'👑',pinyin:'wáng',strokes:[[[40,38],[160,38]],[[48,93],[152,93]],[[100,38],[100,160]],[[25,160],[175,160]]]},
 {id:'up',zh:'上',en:'Up',icon:'⬆️',pinyin:'shàng',strokes:[[[100,25],[100,160]],[[100,84],[166,84]],[[25,160],[175,160]]]},
 {id:'down',zh:'下',en:'Down',icon:'⬇️',pinyin:'xià',strokes:[[[25,40],[175,40]],[[100,40],[100,175]],[[122,82],[154,111]]]},
 {id:'thousand',zh:'千',en:'Thousand',icon:'🔢',pinyin:'qiān',strokes:[[[146,28],[101,42],[54,49]],[[25,85],[175,85]],[[100,43],[100,175]]]},
 {id:'dry',zh:'干',en:'Dry',icon:'🏜️',pinyin:'gān',strokes:[[[46,45],[154,45]],[[25,95],[175,95]],[[100,45],[100,175]]]},
 {id:'sky',zh:'天',en:'Sky',icon:'🌤️',pinyin:'tiān',strokes:[[[48,30],[152,30]],[[25,69],[175,69]],[[100,30],[100,91],[78,137],[30,174]],[[103,92],[129,139],[172,174]]]},
 {id:'field',zh:'田',en:'Field',icon:'🌾',pinyin:'tián',strokes:[[[40,28],[40,174]],[[40,28],[160,28],[160,174]],[[40,99],[160,99]],[[100,28],[100,170]],[[40,169],[160,169]]]}

];
export function wordInfo(item:Item){return words.find(w=>w.id===item.id)||characters.find(w=>w.id===item.id)}
export function sampleStroke(stroke:Point[]):Point[]{const points:Point[]=[stroke[0]];for(let i=1;i<stroke.length;i++){const a=stroke[i-1],b=stroke[i],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/6));for(let j=1;j<=n;j++)points.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n])}return points}
