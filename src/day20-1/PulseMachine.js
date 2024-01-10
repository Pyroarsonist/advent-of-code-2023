import { CONJUCTION_PREFIX, FLIP_FLOP_PREFIX } from "./constants";

export class PulseMachine {
  flipFlops = new Map();

  conjunctions = new Map();

  modules = new Map();

  broadcast = [];

  pulses = [];

  lowCount = 0;

  highCount = 0;

  constructor({ flipFlops, conjunctions, broadcast }) {
    for (const flipFlop of flipFlops) {
      this.flipFlops.set(flipFlop.name, {
        groups: flipFlop.groups,
        enabled: false,
      });
      this.modules.set(flipFlop.name, FLIP_FLOP_PREFIX);
    }

    for (const conjunction of conjunctions) {
      this.conjunctions.set(conjunction.name, {
        groups: conjunction.groups,
        // types: Object.fromEntries(
        //   conjunction.groups.map((group) => [group, false]),
        // ),
        inputs: new Map(),
      });

      this.modules.set(conjunction.name, CONJUCTION_PREFIX);
    }

    for (const [name, { groups }] of [
      ...this.flipFlops.entries(),
      ...this.conjunctions.entries(),
    ]) {
      for (const group of groups) {
        const type = this.modules.get(group);
        if (type === CONJUCTION_PREFIX) {
          const c = this.conjunctions.get(group);

          c.inputs.set(name, false);
        }
      }
    }

    this.broadcast = broadcast;
  }

  processFlipFlop(name, _high) {
    if (_high) return [];
    const f = this.flipFlops.get(name);

    f.enabled = !f.enabled;

    const high = f.enabled;

    return f.groups.map((group) => ({ name: group, high, from: name }));
  }

  processConjunction(name) {
    const c = this.conjunctions.get(name);

    const high = [...c.inputs.values()].some((i) => !i);

    return c.groups.map((group) => ({ name: group, high, from: name }));
  }

  pushPulses(pulses) {
    this.pulses.push(...pulses);
  }

  updateConjunctionMemory(name, from, high) {
    const c = this.conjunctions.get(name);
    c.inputs.set(from, high);
  }

  processPulse() {
    this.lowCount++;
    const initialPulses = this.broadcast.map((name) => ({
      name,
      high: false,
      from: null,
    }));

    this.pushPulses(initialPulses);

    while (this.pulses.length) {
      const pulse = this.pulses.shift();

      this.incrementCount(pulse.high);

      const type = this.modules.get(pulse.name);

      if (type === FLIP_FLOP_PREFIX) {
        const newPulses = this.processFlipFlop(pulse.name, pulse.high);
        this.pushPulses(newPulses);
      } else if (type === CONJUCTION_PREFIX) {
        this.updateConjunctionMemory(pulse.name, pulse.from, pulse.high);
        const newPulses = this.processConjunction(pulse.name, pulse.high);
        this.pushPulses(newPulses);
      }
    }
  }

  processPulses(times) {
    for (let i = 0; i < times; i++) {
      this.processPulse();
    }
  }

  getCounts() {
    return {
      lowCount: this.lowCount,
      highCount: this.highCount,
    };
  }

  incrementCount(high) {
    if (high) this.highCount++;
    else this.lowCount++;
  }
}
