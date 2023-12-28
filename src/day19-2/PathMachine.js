import {
  APPROVED,
  INITIAL_PATH,
  LESS,
  MAX_NUM,
  MIN_NUM,
  MORE,
  REJECTED,
} from "./constants";

const countCombinations = (range) =>
  Object.values(range).reduce((m, val) => {
    const diff = val[1] - val[0] + 1;

    return m * diff;
  }, 1);

export class PathMachine {
  paths = new Map();

  constructor(workflows) {
    this.workflows = workflows;

    for (const workflow of workflows) {
      this.paths.set(workflow.name, workflow.rules);
    }
  }

  getSum() {
    const initialRanges = {
      x: [MIN_NUM, MAX_NUM],
      m: [MIN_NUM, MAX_NUM],
      a: [MIN_NUM, MAX_NUM],
      s: [MIN_NUM, MAX_NUM],
    };

    const sum = this.sumPath(INITIAL_PATH, initialRanges);

    return sum;
  }

  sumPath(name, _range) {
    if (name === APPROVED) {
      const additionalCombinations = countCombinations(_range);
      return additionalCombinations;
    }

    if (name === REJECTED) {
      return 0;
    }

    const rules = this.paths.get(name);

    let sum = 0;

    for (const rule of rules) {
      if (rule.simple) {
        const range = JSON.parse(JSON.stringify(_range));
        sum += this.sumPath(rule.path, range);
      }

      if (rule.sign === MORE) {
        const range = JSON.parse(JSON.stringify(_range));
        const category = range[rule.category];

        category[0] = rule.value + 1;

        if (category[0] > category[1]) {
          continue;
        }

        sum += this.sumPath(rule.path, range);

        const rootCategory = _range[rule.category];
        rootCategory[1] = rule.value;

        if (rootCategory[0] > rootCategory[1]) {
          continue;
        }
      }

      if (rule.sign === LESS) {
        const range = JSON.parse(JSON.stringify(_range));
        const category = range[rule.category];

        category[1] = rule.value - 1;

        if (category[0] > category[1]) {
          continue;
        }

        sum += this.sumPath(rule.path, range);

        const rootCategory = _range[rule.category];
        rootCategory[0] = rule.value;

        if (rootCategory[0] > rootCategory[1]) {
          continue;
        }
      }
    }

    return sum;
  }
}
