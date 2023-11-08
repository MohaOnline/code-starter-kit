import "./_/utils.js"

let number = 0;
console.log(123);

console.log(Number.MIN_VALUE);
console.log(Number.MAX_VALUE);

// Safe & Unsafe Range.
console.log(Number.MIN_SAFE_INTEGER);       // -2^53 + 1
console.log(Number.MAX_SAFE_INTEGER);       //  2^53 - 1
console.log(Number.MAX_SAFE_INTEGER * 10);  // Rounding off.

// Useful Math Utils.
console.log('Discard 3.5 fractional part: ', Math.trunc(3.5));
console.log('Discard 3.6 fractional part: ', Math.floor(3.6));
console.log('Round 3.4 to the nearest integer: ', Math.round(3.4));
console.log('Round 3.5 to the nearest integer: ', Math.round(3.5));
console.log('Round 3.4 to the next integer: ', Math.ceil(3.4));
console.log('Round 3.5 to the next integer: ', Math.ceil(3.5));

console.log('Random:', Math.random());

number = 100;
console.log('100 + 1:', ++number);
number += 2;
console.log('100 + 1 + 2: ', number);
console.log('100 + 1 + 2 - 1: ', --number);

// Arithmetic Operations
console.log(typeof (12 / 3), 12 / 3, 1 / 2);
console.log('Remainder of Division:', 12 % 3, 12 % 5);
console.log('Division by Zero:', -2 / 0, 1 / 0);
console.log('2**16', 2 ** 16, 2 ** 32, 2 ** 64);
console.log('The square root of 2:', 2 ** 0.5);


console.warn('\n\nAbnormal cases:')
console.log('parseInt a string:', parseInt('Hello'));
number = Number.MAX_SAFE_INTEGER;
console.log('MAX_SAFE_INTEGER + 1:', ++number);
number += 10;
console.log('MAX_SAFE_INTEGER + 1 + 2: ', number);
console.log('MAX_SAFE_INTEGER + 1 + 2 - 1: ', --number);
