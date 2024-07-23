import { lcm } from "~/day20-2/utils";
import {
  CONJUCTION_PREFIX,
  FLIP_FLOP_PREFIX,
  RESET_MACHINE_NAME,
} from "./constants";

export class PulseMachine {
  flipFlops = new Map();

  conjunctions = new Map();

  modules = new Map();

  broadcast = [];

  pulses = [];

  count = 0;

  ansestors = [];

  ansestorsMap = new Map();

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

    const firstLevelAncestor = [...this.conjunctions.entries()].find(([, v]) =>
      v.groups.some((x) => x === RESET_MACHINE_NAME),
    )[0];

    // harcoded for conjunctions
    this.ansestors = [...this.conjunctions.entries()]
      .filter(([, v]) => v.groups.some((x) => x === firstLevelAncestor))
      .map(([k]) => k);
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

    if (high && this.ansestors.includes(name)) {
      const has = this.ansestorsMap.has(name);
      if (!has) {
        this.ansestorsMap.set(name, this.count);
      }
    }

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
    const initialPulses = this.broadcast.map((name) => ({
      name,
      high: false,
      from: null,
    }));

    this.pushPulses(initialPulses);

    while (this.pulses.length) {
      const pulse = this.pulses.shift();

      if (pulse.name === RESET_MACHINE_NAME && !pulse.high) {
        return true;
      }

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

    return false;
  }

  processPulses() {
    while (true) {
      this.count++;
      const ok = this.processPulse();
      if (ok) break;
      if (this.ansestorsMap.size === this.ansestors.length) {
        const counts = [...this.ansestorsMap.values()];
        return lcm(...counts);
      }
    }
  }
}
