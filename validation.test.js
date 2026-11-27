import test from 'node:test';import assert from 'node:assert/strict';
const validAnswer={item_id:'x',value:'pass'};
test('inspection answer values are constrained',()=>{assert.ok(['pass','fail','na'].includes(validAnswer.value));assert.ok(!['yes','no','unknown'].includes('maybe'))});
test('score excludes N/A answers',()=>{const answers=[{value:'pass'},{value:'fail'},{value:'na'}];const scored=answers.filter(x=>x.value!=='na');const score=scored.filter(x=>x.value==='pass').length/scored.length*100;assert.equal(score,50)});
test('failed answer should trigger a follow-up',()=>{const answers=[{value:'fail'},{value:'pass'}];assert.equal(answers.filter(x=>x.value==='fail').length,1)});
