import chalk from 'chalk';

const log = console.log;
const success = chalk.bold.greenBright;
const error = chalk.bold.red;
const info = chalk.bold.white;
const warning = chalk.bold.yellow;

class Matches<T> {

    value: T;

    constructor(actual: T) {
        this.value = actual;
    }

    toBe = (expected: T) => {
        if (expected === this.value) {
            log(success('Succeeded'.padStart(4)))
        }
        else {
            throw new Error(`Fail - Actual: ${this.value}, Expected: ${expected}`);
        }
    };

    toBeTruthy = () => {
        if (this.value) {
            log(success('Succeeded'.padStart(4)));
        }
        else {
            throw new Error(`Fail - Expected value to be truthy but got ${this.value}`);
        }
    };

    toBeFalsy = () => {
        if (!this.value) {
            log(success('Succeeded'.padStart(4)));
        }
        else {
            throw new Error(`Fail - Expected value to be falsy but got ${this.value}`);
        }
    };

    toBeGreaterThan = (expected: T) => {
        if (this.value > expected) {
            log(success('Succeeded'.padStart(4)));
        }
        else {
            throw new Error(`Fail - Expected value to be greater than ${expected}`);
        }
    };

    toBeLessThan = (expected: T) => {
        if (this.value < expected) {
            log(success('Succeeded'.padStart(4)));
        }
        else {
            throw new Error(`Fail - Expected value to be less than ${expected}`);
        }
    };

    toBeGreaterThanOrEqualTo = (expected: T) => {
        if (this.value >= expected) {
            log(success('Succeeded'.padStart(4)));
        }
        else {
            throw new Error(`Fail - Expected ${this.value} to be greater than or equal to ${expected}`);
        }
    };

    toBeLessThanOrEqualTo = (expected: T) => {
        if (this.value <= expected) {
            log(success('Succeeded'.padStart(4)));
        }
        else {
            throw new Error(`Fail - Expected ${this.value} to be less than or equal to ${expected}`);
        }
    };

}

export const expect = <T>(actual: T) => {
    return new Matches<T>(actual);
};

export const describe = (suite: string, callback: Function) => {
    try {
        log('\n');
        log(`Test Suite: ${success(suite)}`);
        callback();
    }
    catch (err) {
        log(error(`[${err.message.toUpperCase()}]`));
    }
};

export const it = (test: string, callback: Function) => {
    log(`Test Name: ${info(test)}`.padStart(4));
    try {
        callback();
    }
    catch (err) {
        log(error(err).padStart(4));
        throw new Error(`Test: ${test} failed.`);
    }
};


export const time = (func: Function, label?: string): void => {
    const funcLabel = label ?? 'Function';
    console.time(funcLabel)

        func()

    console.timeEnd(funcLabel);
};