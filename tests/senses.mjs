import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const game = await readFile(new URL('../dist/game.js', import.meta.url), 'utf8');
const audio = await readFile(new URL('../dist/audio.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const minimalUi = await readFile(new URL('../dist/minimal-ui.css', import.meta.url), 'utf8');

assert.doesNotMatch(game, /drawEnemyClues|DANGER STIRRING|DISTANT VOICES/, 'directional hearing clues and labels are absent');
assert.match(game, /trail:\[\],trailClock:/, 'each Goblin owns a sampled path');
assert.match(game, /g\.trail\.push\(\{position:.*heading:.*born:elapsed.*side:/, 'moving Goblins leave timestamped alternating tracks');
assert.match(game, /function drawTracks/, 'tracks have a dedicated visual pass');
assert.match(game, /currentTree\|\|jump\|\|player\.position\.y>\.25\|\|pitch>-\.08/, 'tracks require the player to be on the floor and looking downward');
assert.match(game, /forward\.dot\(toward\.normalize\(\)\)<\.93/, 'tracks require the player to inspect their path directly');
assert.match(game, /Math\.pow\(1-age\/28,1\.35\)/, 'track brightness fades with age');
assert.match(game, /function drawSoundRipples/, 'footstep and voice ripples share a through-cover overlay pass');
assert.match(game, /lineWidth=3-progress\*1\.4/, 'voice ripples are thicker than footstep ripples');
assert.match(game, /progress\*82/, 'voice ripples travel farther than footstep ripples');
assert.match(audio, /this\.onPlay\?\.\(\{ kind, model \}\)/, 'successful voice playback emits a visual event');
assert.ok(html.includes('minimal-ui.css'), 'the reduced live HUD stylesheet is loaded');
for (const selector of ['#mission', '#context', '#zonehints', '#controls']) assert.ok(minimalUi.includes(selector), `${selector} is hidden during play`);

console.log('Inspectable fading tracks, through-cover sound ripples, and reduced live text: OK');
