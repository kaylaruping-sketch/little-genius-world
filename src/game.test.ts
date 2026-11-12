import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRound,modes,parseSave,fresh} from './game';
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
 assert.equal(characters.length,10);for(const c of characters)for(const stroke of c.strokes){const sampled=sampleStroke(stroke);assert.deepEqual(sampled[0],stroke[0]);assert.deepEqual(sampled.at(-1),stroke.at(-1));for(let i=0;i<sampled.length;i++){const [x,y]=sampled[i];assert.ok(x>=0&&x<=200&&y>=0&&y<=200);if(i)assert.ok(Math.hypot(x-sampled[i-1][0],y-sampled[i-1][1])<=6.001)}}
});
test('tracing introduces one, two, three before more complex characters',()=>{assert.deepEqual(makeRound('tracing').slice(0,3).map(q=>q.answer.zh),['一','二','三'])});
