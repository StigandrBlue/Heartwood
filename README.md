# Canopy Vanguard

Mobile-first Three.js forest stealth archery prototype. Serve `dist/` with a static HTTP server. Three.js 0.170.0 is vendored with its MIT license.

## Mobile controls
- Starting a run requests fullscreen landscape and locks orientation when the mobile browser supports it. Unsupported browsers show a rotate-device screen until the viewport is landscape.
- Drag on the left half: analog movement from the initial touch position.
- Tap left near a tree: climb the marked trunk.
- Tap left in a tree: leap to the nearby perch in view; no leap if no eligible tree is indicated.
- Look steeply down and tap left: descend.
- Drag on the right half: look. Look drags never fire on release.
- Tap right near a target: quick assisted shot.
- Hold still on the right for 260 ms: draw the bow. Release to shoot. Falcon's Eye later unlocks automatic target leading; deliberate drag while drawing breaks its tracking for manual aim.
- Movement and aiming accept simultaneous independent touches. Cancelled pointers and backgrounding stop input without firing.
- Between waves, the same left drag walks through the village and the same right drag looks around. Follow the garden lights to the marked home threshold and tap left to rest and begin the next wave.

## Goblin voices
The twelve user-supplied goblin performances are preserved as mono 44.1 kHz PCM WAV files. The game unlocks and loads them after the start gesture, then positions them by distance and stereo direction with cooldowns that prevent a crowd from becoming an unintelligible wall of sound.

- `Selected`: a goblin notices the elf and changes to hunting or chopping the revealed perch.
- `Move`: a goblin commits to advancing, fleeing or panicking in a new direction; one also acknowledges the initial warband movement.
- `Attack`: a goblin begins a village raid or performs its first axe/melee strike.
- `Special`: a captain rallies a panicked goblin, or announces a wave already carrying the village's location.
- `Taunt`: the warband exposes the elf's position.
- `Death1`: a full-health goblin dies to one arrow while calm and unseen by every surviving goblin—a stealth kill.
- `Death2`: a goblin dies after being wounded, while already alert, or where another goblin can witness it. The surviving warband begins a coordinated or panicked search.

Desktop fallback: WASD, mouse look, hold/release left mouse, E or Space for contextual traversal, Escape to pause.

## Visuals and passive senses
Individual instanced leaves replace opaque crown clumps. A dithered elliptical viewing window opens through foliage at the center of the screen. The minimap and directional hearing arrows are absent. Each moving Goblin records a fading physical trail: while the Elf is on the forest floor and looking closely along that route, paired tracks emerge, with fresh prints glowing more clearly than old ones. Footfalls generate restrained ripples visible through intervening foliage and trunks. A successfully played voice line generates three much thicker rings that travel substantially farther from its speaker. Senses are always available and do not recolor the world.

The persistent mission, traversal, contextual, and control text is hidden during live play. Traversable trees still carry a subtle visual mark, but climbing and canopy movement are left for the player to discover. The playable forest is roughly two-and-a-half times its original footprint, with more than three hundred traversable trees and a deeper outer woodland continuing into the haze. The ground is visibly brown, procedurally varied soil beneath overlapping moss patches, ivy leaves, grass, ferns, low leafy bushes, stones, light shafts, and floating motes. Tree timber is merged per tree and foliage and ground cover are instanced to control draw calls; mobile pixel ratio is capped at 1.25.

## Game systems
Goblins enter without knowing the village location and explore through a leader-led, forward-biased random walk instead of following a direct route. Followers loosely maintain irregular positions around their squad boss, but some begin lost, can stray during the search, and become disorganized when their boss dies. Solitary alerted Goblins suffer a major morale penalty and are much likelier to panic or flee.

Awareness has three escalating levels. At level one, a Goblin merely senses danger and moves nervously. At level two, it has an approximate vicinity; when the Elf is aloft, it chooses and chops plausible trees around that area while deliberately excluding the exact occupied tree. At level three, direct sight or heavy exposure reveals the precise position and sends Goblins to the correct tree or directly after the Elf on the ground. Awareness decays from exact knowledge to a broad suspicion when the Elf breaks contact. Group confidence, captains, panic, falling-tree damage, raids, escaping scouts carrying village intelligence into future waves, village rest, wave advancement, defeat, and restart are preserved.

Arrows now emerge from the bow itself with a readable shaft, head, fletching, and short flight streak. Calm Goblins usually miss arrows descending from the canopy; a wound or observed collapse instead startles them into the first awareness stage, where they stop and search their surroundings. Already-wary Goblins can notice a visible arrow in flight and trace it back to its connected tree, promoting a focused vicinity search. Tree crowns occlude Goblin sight—including exposure checks—while the Elf's passive canopy window continues to see targets through leaves but not solid trunks.

Between waves, the village is a walkable downtime space with collision around its homes, a lit path, and a contextual rest point at the player's home. Goblins have trunk collision with radial sliding, use each tree's real collision radius when chopping, and are scaled to about 70% of the Elf's height. Walking, running, nervous searching, panic, axe strikes, leaping, climbing, and gradual death poses drive the character rigs.

The village training bough presents three hanging Elven targets after every successful defense. Each target names a bow technique; shooting one learns it and withdraws the other two until the next downtime. Its invisible prerequisite tree rotates eligible choices among four disciplines. Skill advances from a visible trajectory to leading and then two ranks of Multishot. Snapshot advances through one and two automatic skips before raising minimum arrow damage. Full-draw mastery refines damage thresholds before unlocking lethal piercing. Craft improves draw speed, stealth, and quiver capacity.

Enemy health and arrow damage use small integers. Goblins have 2 health and leaders have 3. Initially, snapshots and draws below two-thirds deal 1 damage, a two-thirds draw deals 2, and a full draw deals 3. Measured Draw I changes the useful thresholds to one-third/2, two-thirds/3, and full/4. Measured Draw II adds quarter divisions scaling from 1 to 5. Barbed Heads raises every arrow's minimum to 2. Willow Skip redirects a snapshot from terrain—or from a nonfatal first victim—toward a nearby enemy farther from the launch point. Heartwood Pierce lets a fatal full-draw arrow continue into enemies behind its first target.

The settlement uses an original Art Nouveau-inspired design language: pale stone, dark wood, verdigris copper, botanical window shapes, branch-like arches, leaf roofs, and warm glass. The supplied archer image and the synthesis notes used for future original model work are recorded in `references/ART_DIRECTION.md`.

## Boundaries and validation
Traversal still uses authored transitions between generated perches rather than free climbing. Goblins use local collision sliding rather than full navigation meshes, so dense crowds can still jostle around narrow passages. The village currently supports exploration, bow progression, and wave advancement but not NPC conversations or interiors. Progression lasts for the current run rather than being saved between sessions. Six emergency arrows replenish on ammunition exhaustion to avoid a soft lock.

Headless checks cover simultaneous touch ownership, gesture classification, hold/release, cancellation, contextual climbing and jumping, predictive aim, empty-target taps, village rest, intelligence across waves, forest expansion, goblin scale, trunk collision, sliding stability, strikes, death classification, and death animation. Rendering and real-device touch feel have not been browser/playtested.
