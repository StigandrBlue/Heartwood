import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const game = await readFile(new URL('../dist/game.js', import.meta.url), 'utf8');

assert.match(game, /player\.userData\.bow\.localToWorld/, 'arrows launch from the bow rather than a generic player offset');
assert.match(game, /ConeGeometry\(\.075,\.18,6\)/, 'arrows carry a visible head');
assert.match(game, /for\(const side of \[-1,1\]\).*feather/, 'arrows carry readable fletching');
assert.match(game, /new THREE\.Line\(.*opacity:\.62/, 'arrows carry a short visible flight streak');
assert.match(game, /function clearGoblinSight/, 'Goblin sight has its own foliage-aware line test');
assert.match(game, /Math\.abs\(y-canopyY\)<5\.4/, 'tree crowns occlude Goblin sight');
assert.match(game, /if\(g\.awareness===0&&\(above\|\|distance>7\.5\)\)continue/, 'calm Goblins usually miss arrows arriving from above');
assert.match(game, /function observeArrowFlight/, 'aware Goblins inspect visible arrow trajectories');
assert.match(game, /g\.trajectoryTree=b\.sourceTree/, 'a witnessed trajectory is connected to its firing tree');
assert.match(game, /if\(g\.trajectoryTree\?\.hp>0\)g\.last=g\.trajectoryTree/, 'vicinity search attacks the trajectory-linked tree');
assert.match(game, /function reactToWound/, 'surviving a wound starts a dedicated threat reaction');
assert.match(game, /g\.startle=Math\.max\(g\.startle\|\|0,1\.45\)/, 'a wounded Goblin stops to look around');
assert.match(game, /const seesPlayer=canSeePlayer/, 'exposure cannot reveal the Elf through foliage');
assert.match(game, /function visibleThroughTrunks/, 'the Elf retains leaf-penetrating target vision');

console.log('Visible bow-fired arrows, foliage asymmetry, and trajectory awareness: OK');
