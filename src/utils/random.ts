/**
 * Takes either 0, 1 or 2 parameters.
 *
 * If no arguments given returns a random number in range from 0 up to 1.
 *
 * If one argument is given and it's a number returns a random number in range from 0 up to the number.
 *
 * If two arguments are given returns a random number from first number to the second number.

 * @method random
 * @returns random floating point number in range from 0 up to 1
 * @example
 * const r = ranom()
 *  */
function random(): number;
/**
 * Return a random float point number
 * @method random
 * @param {Number} [max] max bound
 * @returns random floating point number in range from 0 up to passes max boud
 * @example
 * const r = ranom(20)
 *  */
function random(limit: number): number;
/**
 * Return a random float point number
 * @method random
 * @param {Number} [min] min bound
 * @param {Number} [max] max bound
 * @returns random floating point number in range from min bound up to max boud
 * @example
 * const r = ranom(20, 100)
 *  */
function random(min: number, max: number): number;
/**
 * @method random
 * @param {Array} [arr] Array with any values
 * @returns random element from given array
 * @example
 * const name = ranom(['Ann', 'Bob', 'Jake', 'Luigi'])
 *  */
function random<T>(arr: Array<T>): T;
function random<T>(prop?: number | Array<T>, max?: number) {
    if (prop === undefined) {
        return Math.random();
    }

    else if (Array.isArray(prop)) {
        if (prop.length === 0) {
            return undefined;
        }
        const randIdx = Math.random() * prop.length;
        return prop[randIdx] as T;
    }

    else if (typeof prop === "number" && max === undefined) {
        return Math.random() * prop;
    }

    else if (typeof prop === "number" && typeof max === "number") {
        return Math.random() * (max - prop + 1) + prop;
    }

}

export default random;