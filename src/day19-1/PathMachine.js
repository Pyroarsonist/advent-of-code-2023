import { APPROVED, LESS, MORE, REJECTED } from "./constants";

export class PathMachine {
  paths = new Map();

  constructor(workflows) {
    this.workflows = workflows;

    for (const workflow of workflows) {
      this.paths.set(workflow.name, workflow.rules);
    }
  }

  processPath(name, part) {
    if (name === APPROVED) {
      return true;
    }

    if (name === REJECTED) {
      return false;
    }

    const rules = this.paths.get(name);

    for (const rule of rules) {
      if (rule.simple) {
        return this.processPath(rule.path, part);
      }

      if (rule.sign === MORE) {
        if (part[rule.category] > rule.value) {
          return this.processPath(rule.path, part);
        }
      }

      if (rule.sign === LESS) {
        if (part[rule.category] < rule.value) {
          return this.processPath(rule.path, part);
        }
      }
    }

    return null;
  }
}
