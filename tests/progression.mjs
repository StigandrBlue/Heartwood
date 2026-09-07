import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const game = await readFile(new URL('../dist/game.js', import.meta.url), 'utf8');
const minimalUi = await readFile(new URL('../dist/minimal-ui.css', import.meta.url), 'utf8');

assert.match(game, /const trainingTargets=\[\]/, 'the village has a dedicated hanging-target range');
assert.match(game, /trainingTargets\.forEach\(other=>\{other\.active=other===t;other\.g\.visible=other===t\}\)/, 'choosing one trial withdraws the alternatives');
assert.match(game, /phase==='village'.*villageTarget.*chooseUpgrade/, 'village arrows select the aimed upgrade');
assert.match(game, /lockedTarget=phase==='play'&&upgradeState\.leading/, 'automatic target leading must be earned');
assert.match(game, /function drawDuration\(\)/, 'draw-speed ranks alter the full-draw timing');
assert.match(game, /===u\.rank-1/, 'rank-two trials cannot appear before rank one is learned');
assert.match(game, /requires:\[\['trajectory',1\]\].*FALCON’S EYE/, 'trajectory sight unlocks predictive leading');
assert.match(game, /requires:\[\['leading',1\]\].*MULTISHOT I/, 'predictive leading unlocks Multishot');
assert.match(game, /branches=\['skill','snapshot','full','craft'\]/, 'the hidden tree rotates offers across four bow disciplines');
assert.match(game, /multiTargets\.length<upgradeState\.multishot\+1/, 'Multishot ranks cap marking at two and three targets');
assert.match(game, /for\(const g of multiTargets\).*arc/, 'marked Multishot targets receive visible circles');
assert.match(game, /maxHp=leader\?3:2/, 'standard Goblins have two health and leaders have three');
assert.match(game, /function arrowDamage/, 'draw strength resolves through discrete damage tiers');
assert.match(game, /drawFraction>=\.995\?3:drawFraction>=2\/3\?2:1/, 'base draw damage is one, two, or three');
assert.match(game, /drawFraction>=\.995\?4:drawFraction>=2\/3\?3:drawFraction>=1\/3\?2:1/, 'Measured Draw I shifts the thresholds to the requested scale');
assert.match(game, /drawFraction>=\.995\?5:drawFraction>=\.75\?4:drawFraction>=\.5\?3:drawFraction>=\.25\?2:1/, 'Measured Draw II introduces finer damage divisions');
assert.match(game, /minimumDamage\?2:1/, 'Barbed Heads raises minimum arrow damage');
assert.match(game, /function drawTrajectoryCue/, 'Sightline reveals the predicted arrow arc');
assert.match(game, /function tryRicochet/, 'snapshot ricochets acquire a farther nearby target');
assert.match(game, /b\.full&&upgradeState\.piercing/, 'fatal full-draw arrows can continue through their target');
assert.match(game, /upgradeState\.silent\?15:28/, 'Whispered Release reduces firing exposure');
assert.match(game, /upgradeState\.quiver\*6/, 'Wayfarer’s Quiver increases wave ammunition');
assert.match(minimalUi, /body\.village #reticle/, 'the aiming reticle remains visible at the village range');

console.log('Village target choices and earned bow progression: OK');
