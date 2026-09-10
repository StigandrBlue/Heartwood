# Canopy Vanguard — Godot handoff

This folder is a migration workspace for bringing the Canopy Vanguard prototype into Godot.

## What is included

- `project.godot` — opens this folder as a Godot project.
- `assets/audio/goblins/` — the supplied goblin voice lines as WAV files.
- `references/` — visual reference material and art-direction notes.
- `web_prototype/` — the complete playable Three.js version, preserved for reference and browser testing.

## Important limitation

The current game was built for the browser with Three.js. Godot does not execute the JavaScript game as native Godot gameplay. The browser files are included so their systems, tuning, UI behavior, audio mapping, and design decisions can be ported into GDScript rather than lost.

## Suggested Godot migration order

1. Create a `Main.tscn` scene and a `Player` character scene.
2. Rebuild the mobile landscape input using two touch zones: left drag for movement and right drag for camera look; right tap/hold handles snapshot and draw-release shots.
3. Recreate the forest as instanced tree scenes with trunk collision, climb points, canopy visibility, and tree-to-tree traversal points.
4. Port the Goblin state machine: unaware, danger-aware, vicinity-aware, exact-aware, searching, chopping, panicked, and fleeing.
5. Port the bow tech tree and integer health/damage rules from `web_prototype/game.js`.
6. Add the WAV files as `AudioStreamPlayer3D` voices, retaining the existing mappings in `web_prototype/audio.js`.

The Three.js prototype remains the behavior reference until the Godot scenes are implemented.
