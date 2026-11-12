import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRound,modes,parseSave,fresh,rememberRound,questionKey,contentPool,type DeckHistory} from './game';
for(const mode of modes)test(`${mode}: 10 valid randomized questions with unique options`,()=>{const signatures=new Set();for(let i=0;i<50;i++){const round=makeRound(mode);assert.equal(round.length,10);for(const q of round){assert.equal(new Set(q.options.map(o=>o.id)).size,4);assert.equal(q.options.filter(o=>o.id===q.answer.id).length,1)}signatures.add(round.map(q=>q.answer.id).join(','))}assert.ok(signatures.size>1)});
test('storage: corrupt data falls back safely',()=>{for(const bad of [null,'{}','oops','null',JSON.stringify({...fresh(),stars:-1}),JSON.stringify({...fresh(),rounds:{numbers:{index:50}}})])assert.deepEqual(parseSave(bad),fresh())});
test('storage: progress and solved state survive reload',()=>{const s=fresh();s.stars=3;s.rounds.animals={questions:makeRound('animals'),index:2,solved:true};assert.deepEqual(parseSave(JSON.stringify(s)),s)});

test('upgrading four-game saves preserves stars, settings and existing progress',()=>{
 const old={stars:27,completed:{numbers:2,shapes:0,colors:0,animals:0},rounds:{numbers:{questions:makeRound('numbers'),index:4,solved:true}},lang:'en',sound:false};
 const restored=parseSave(JSON.stringify(old));assert.equal(restored.stars,27);assert.equal(restored.lang,'en');assert.equal(restored.sound,false);assert.deepEqual(restored.rounds,old.rounds);assert.equal(restored.completed.numbers,2);
 for(const mode of ['listen','hanzi','reading','tracing'] as const)assert.equal(restored.completed[mode],0);
});

import {characters,words,sampleStroke,wordInfo} from './chinese';
test('Chinese lessons have pinyin, concrete pictures and unique labels',()=>{
 for(const pool of [characters,words]){assert.equal(new Set(pool.map(w=>w.id)).size,pool.length);assert.equal(new Set(pool.map(w=>w.zh)).size,pool.length);for(const w of pool){assert.ok(w.pinyin&&w.zh&&w.icon&&w.en);assert.equal(wordInfo(w)?.pinyin,w.pinyin)}}
});
test('tracing lessons sample every stroke continuously in the board bounds',()=>{
 assert.equal(characters.length,20);for(const c of characters)for(const stroke of c.strokes){const sampled=sampleStroke(stroke);assert.deepEqual(sampled[0],stroke[0]);assert.deepEqual(sampled.at(-1),stroke.at(-1));for(let i=0;i<sampled.length;i++){const [x,y]=sampled[i];assert.ok(x>=0&&x<=200&&y>=0&&y<=200);if(i)assert.ok(Math.hypot(x-sampled[i-1][0],y-sampled[i-1][1])<=6.001)}}
});
test('tracing introduces one, two, three before more complex characters',()=>{assert.deepEqual(makeRound('tracing').slice(0,3).map(q=>q.answer.zh),['一','二','三'])});

for(const mode of modes){
 test(`${mode}: full rounds use unplayed content before recycling`,()=>{
  let history:DeckHistory={seen:[]};const played=new Set<string>();
  const capacity=mode==='numbers'?200:mode==='shapes'||mode==='colors'?60:contentPool(mode).length;
  for(let i=0;i<capacity/10;i++){
   const round=makeRound(mode,history);assert.equal(new Set(round.map(q=>q.answer.id)).size,10);
   for(const q of round){const key=questionKey(mode,q);assert.ok(!played.has(key),`repeated ${key} in round ${i+1}`);played.add(key)}
   history=rememberRound(mode,history,round);
  }
  assert.equal(played.size,capacity);
 });
 test(`${mode}: no consecutive repeated content across exhaustion and reload`,()=>{
  const originalRandom=Math.random;Math.random=()=>0;try{
   let history:DeckHistory={seen:[]},previous:string[]=[];
   for(let i=0;i<35;i++){
    const round=makeRound(mode,history),keys=round.map(q=>questionKey(mode,q));
    assert.ok(keys.every(key=>!previous.includes(key)),`same content in consecutive round ${i+1}`);
    const save=fresh();save.history[mode]=rememberRound(mode,history,round);history=parseSave(JSON.stringify(save)).history[mode]!;previous=keys;
   }
  }finally{Math.random=originalRandom}
 });
}
test('old completed Chinese lessons unlock new vocabulary and tracing characters',()=>{
 const s=fresh();s.stars=100;s.completed.tracing=1;s.completed.listen=1;s.completed.reading=1;s.completed.hanzi=1;
 const raw={...s,history:undefined},restored=parseSave(JSON.stringify(raw));
 assert.equal(restored.stars,100);
 for(const mode of ['hanzi','tracing','listen','reading'] as const){const oldIds=(mode==='hanzi'||mode==='tracing'?characters.slice(0,10):words.slice(0,16)).map(x=>x.id);assert.ok(makeRound(mode,restored.history[mode]).every(q=>!oldIds.includes(q.answer.id)))}
});
test('completed history does not change while resuming an unfinished round',()=>{
 const s=fresh();const first=makeRound('reading');s.history.reading=rememberRound('reading',undefined,first);s.rounds.reading={questions:makeRound('reading',s.history.reading),index:4,solved:true};
 const restored=parseSave(JSON.stringify(s));assert.deepEqual(restored.rounds.reading,s.rounds.reading);assert.deepEqual(restored.history,s.history);
});
