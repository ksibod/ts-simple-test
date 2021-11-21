import chalk from 'chalk';

const log = console.log;
const makeLogger = (color: chalk.Chalk, padding?: number) =>
    (value: string) => log(color(value.padStart(padding || 0, '\t')));
const success = makeLogger(chalk.bold.greenBright, 4);
const error = makeLogger(chalk.bold.red);
const info = makeLogger(chalk.bold.white, 2);
const warning = makeLogger(chalk.bold.yellow);

class Matches<T> {

    value: T;

    constructor(actual: T) {
        this.value = actual;
    }

    toBe = (expected: T) => {
        if (expected === this.value) {
            success('Succeeded')
        }
        else {
            throw new Error(`Fail - Actual: ${this.value}, Expected: ${expected}`);
        }
    };

    toBeTruthy = () => {
        if (this.value) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be truthy but got ${this.value}`);
        }
    };

    toBeFalsy = () => {
        if (!this.value) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be falsy but got ${this.value}`);
        }
    };

    toBeGreaterThan = (expected: T) => {
        if (this.value > expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be greater than ${expected}`);
        }
    };

    toBeLessThan = (expected: T) => {
        if (this.value < expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be less than ${expected}`);
        }
    };

    toBeGreaterThanOrEqualTo = (expected: T) => {
        if (this.value >= expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected ${this.value} to be greater than or equal to ${expected}`);
        }
    };

    toBeLessThanOrEqualTo = (expected: T) => {
        if (this.value <= expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected ${this.value} to be less than or equal to ${expected}`);
        }
    };

}

export const expect = <T>(actual: T) => new Matches<T>(actual);

export const describe = (suite: string, callback: Function) => {
    try {
        warning(`\nTest Suite: ${suite}`);
        callback();
    }
    catch (err) {
        error(`[${err.message.toUpperCase()}]`);
    }
};

export const it = (test: string, callback: Function) => {
    info(`Name: ${test}`);
    try {
        callback();
    }
    catch (err) {
        error(err);
        throw new Error(`Test: ${test} failed.`);
    }
};

export const time = (func: Function, label?: string): void => {
    const funcLabel = label ?? 'Function';
    console.time(funcLabel);
    func();
    console.timeEnd(funcLabel);
};