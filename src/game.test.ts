import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRound,modes,parseSave,fresh} from './game';
for(const mode of modes)test(`${mode}: 10 valid randomized questions with unique options`,()=>{const signatures=new Set();for(let i=0;i<50;i++){const round=makeRound(mode);assert.equal(round.length,10);for(const q of round){assert.equal(new Set(q.options.map(o=>o.id)).size,4);assert.equal(q.options.filter(o=>o.id===q.answer.id).length,1)}signatures.add(round.map(q=>q.answer.id).join(','))}assert.ok(signatures.size>1)});
test('storage: corrupt data falls back safely',()=>{for(const bad of [null,'{}','oops','null',JSON.stringify({...fresh(),stars:-1}),JSON.stringify({...fresh(),rounds:{numbers:{index:50}}})])assert.deepEqual(parseSave(bad),fresh())});
test('storage: progress and solved state survive reload',()=>{const s=fresh();s.stars=3;s.rounds.animals={questions:makeRound('animals'),index:2,solved:true};assert.deepEqual(parseSave(JSON.stringify(s)),s)});
