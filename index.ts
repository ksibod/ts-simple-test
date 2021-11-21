import chalk from 'chalk';

const log = console.log;
const makeLogger = (color: chalk.Chalk, padding?: number) =>
    (value: string) => log(color(`${''.padStart(padding || 0)}${value}`));
const success = makeLogger(chalk.bold.greenBright, 4);
const error = makeLogger(chalk.bold.red);
const info = makeLogger(chalk.bold.white, 2);
const warning = makeLogger(chalk.bold.yellow);
const test = makeLogger(chalk.blue, 4);

class Matches<T> {

    value: T;

    constructor(actual: T) {
        this.value = actual;
        test(`Expect: ${actual}`);
    }

    toBe = (expected: T) => {
        test(`to be ${expected}`);
        if (expected === this.value) {
            success('Succeeded')
        }
        else {
            throw new Error(`Fail - Actual: ${this.value}, Expected: ${expected}`);
        }
    };

    toBeTruthy = () => {
        test(`to be truthy`);
        if (this.value) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be truthy but got ${this.value}`);
        }
    };

    toBeFalsy = () => {
        test(`to be falsy`);
        if (!this.value) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be falsy but got ${this.value}`);
        }
    };

    toBeGreaterThan = (expected: T) => {
        test(`to be greater than ${expected}`);
        if (this.value > expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be greater than ${expected}`);
        }
    };

    toBeLessThan = (expected: T) => {
        test(`to be less than ${expected}`);
        if (this.value < expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected value to be less than ${expected}`);
        }
    };

    toBeGreaterThanOrEqualTo = (expected: T) => {
        test(`to be greater than or equal to ${expected}`);
        if (this.value >= expected) {
            success('Succeeded');
        }
        else {
            throw new Error(`Fail - Expected ${this.value} to be greater than or equal to ${expected}`);
        }
    };

    toBeLessThanOrEqualTo = (expected: T) => {
        test(`to be less than or equal to ${expected}`);
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
        console.error(err);
        throw new Error(`Test: ${test} failed.`);
    }
};

export const time = (func: Function, label?: string): void => {
    const funcLabel = label ?? 'Function';
    console.time(funcLabel);
    func();
    console.timeEnd(funcLabel);
};