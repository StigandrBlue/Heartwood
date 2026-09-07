const FILES = {
  selected: ["Selected1.wav", "Selected2.wav"],
  move: ["Move1.wav", "Move2.wav"],
  attack: ["Attack1.wav", "Attack2.wav"],
  deathStealth: ["Death1.wav"],
  deathAlert: ["Death2.wav"],
  special: ["Special1.wav", "Special2.wav"],
  taunt: ["Taunt1.wav", "Taunt2.wav"],
};

export class GoblinVoices {
  constructor(camera, onPlay = null) {
    this.camera = camera;
    this.onPlay = onPlay;
    this.context = null;
    this.buffers = new Map();
    this.loading = null;
    this.lastGlobal = 0;
    this.lastByKind = new Map();
    this.active = 0;
    this.variant = 0;
  }

  async unlock() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    this.context ||= new AudioContext();
    if (this.context.state === "suspended") await this.context.resume();
    this.loading ||= Promise.all(
      Object.entries(FILES).flatMap(([kind, names]) =>
        names.map(async (name) => {
          const response = await fetch(`audio/goblins/${name}`);
          if (!response.ok) throw new Error(`Unable to load ${name}`);
          const buffer = await this.context.decodeAudioData(await response.arrayBuffer());
          const list = this.buffers.get(kind) || [];
          list.push(buffer);
          this.buffers.set(kind, list);
        }),
      ),
    ).catch(() => false);
    await this.loading;
    return this.buffers.size > 0;
  }

  play(kind, model, { urgent = false } = {}) {
    if (!this.context || this.context.state !== "running" || this.active >= 3) return false;
    const choices = this.buffers.get(kind);
    if (!choices?.length) return false;
    const now = performance.now();
    const kindGap = kind.startsWith("death") ? 260 : kind === "attack" ? 900 : 1500;
    if (!urgent && (now - this.lastGlobal < 420 || now - (this.lastByKind.get(kind) || 0) < kindGap)) return false;

    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    const pan = this.context.createStereoPanner?.();
    source.buffer = choices[this.variant++ % choices.length];
    source.playbackRate.value = 0.97 + ((model?.id || 0) % 7) * 0.01;

    let distance = 20;
    if (model) {
      const dx = model.position.x - this.camera.position.x;
      const dy = model.position.y - this.camera.position.y;
      const dz = model.position.z - this.camera.position.z;
      distance = Math.hypot(dx, dy, dz);
      if (pan) {
        const rightX = this.camera.matrixWorld.elements[0];
        const rightZ = this.camera.matrixWorld.elements[2];
        pan.pan.value = Math.max(-0.85, Math.min(0.85, (dx * rightX + dz * rightZ) / Math.max(distance, 1)));
      }
    }
    gain.gain.value = Math.max(0.08, Math.min(0.72, 1 - distance / 92));
    source.connect(gain);
    if (pan) { gain.connect(pan); pan.connect(this.context.destination); }
    else gain.connect(this.context.destination);
    source.onended = () => { this.active = Math.max(0, this.active - 1); };
    this.active++;
    this.lastGlobal = now;
    this.lastByKind.set(kind, now);
    source.start();
    this.onPlay?.({ kind, model });
    return true;
  }
}
