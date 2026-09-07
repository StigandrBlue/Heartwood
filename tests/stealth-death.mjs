import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const game = await readFile(new URL('../dist/game.js', import.meta.url), 'utf8');
const audio = await readFile(new URL('../dist/audio.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

assert.doesNotMatch(html, /id="map"/, 'the minimap surface is removed');
assert.doesNotMatch(game, /drawMap|\$\('map'\)/, 'minimap rendering is removed');
assert.doesNotMatch(game, /function drawEnemyClues/, 'directional hearing pointers are removed');
assert.match(game, /function drawSoundRipples/, 'sound is represented by world-positioned ripples');
assert.match(audio, /deathStealth:\s*\["Death1\.wav"\]/, 'Death1 is reserved for stealth kills');
assert.match(audio, /deathAlert:\s*\["Death2\.wav"\]/, 'Death2 is reserved for alert kills');
assert.match(game, /healthBefore===g\.maxHp&&!wasAlert&&witnesses\.length===0/, 'stealth requires one hit, a calm victim, and no witnesses');
assert.match(game, /canWitnessDeath\(other,g\)/, 'surviving goblins test line of sight to a death');
assert.match(game, /alertWarbandToDeath\(g,witnesses\)/, 'non-stealth deaths trigger a search response');
assert.match(game, /level=g\.awareness>0&&relayed\?2:1/, 'a newly startled witness begins at danger awareness rather than gaining perfect knowledge');

console.log('Minimap removal, directional clues, exact death vocals, and alert propagation: OK');
