import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const game = await readFile(new URL('../dist/game.js', import.meta.url), 'utf8');
const forest = await readFile(new URL('../dist/forest.js', import.meta.url), 'utf8');

assert.match(game, /row<18.*col<19/, 'the playable tree grid is significantly larger');
assert.match(game, /PlaneGeometry\(700,700/, 'the dirt ground covers the expanded forest');
for (const layer of ['bushes', 'moss', 'ivy', 'ferns', 'grass']) {
  assert.ok(forest.includes(layer), `forest ground cover includes ${layer}`);
}
assert.match(forest, /vec3\(\.22,\.14,\.075\)/, 'soil is shaded from a brown earth base');
assert.match(game, /state:knownVillage\?'advance':'wander'/, 'unaware warbands begin by wandering');
assert.match(game, /function chooseWander/, 'leaders and lost followers choose exploratory destinations');
assert.match(game, /boss\.m\.position\.clone\(\)\.add\(g\.offset\)/, 'followers loosely follow their boss');
assert.match(game, /g\.lost=9\+rand\(\)\*18/, 'followers can become lost');
assert.match(game, /alone&&g\.awareness\?12\+g\.awareness\*6/, 'isolated alert Goblins receive a fear penalty');
assert.match(game, /g\.awareness===3/, 'exact awareness is modeled separately');
assert.match(game, /g\.awareness===2/, 'vicinity awareness is modeled separately');
assert.match(game, /g\.awareness===1/, 'danger awareness is modeled separately');
assert.match(game, /pickSearchTree\(g\.suspect\|\|player\.position,36,currentTree\)/, 'vicinity searches exclude the occupied tree');
assert.match(game, /g\.state=currentTree\?'chop':'hunt';g\.last=currentTree/, 'exact awareness selects the occupied tree');

console.log('Expanded forest, layered ground cover, wandering squads, morale, and graded awareness: OK');
