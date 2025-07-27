/**
 * Variable / Constant / Value.
 */
import "./_/utils.js"
import {PI, C} from './_/common.js'

console.log(typeof 123);

console.log('Historical type design issue:', typeof null);

// Store any value in certain variable:
let greeting = 'hello, js!'
console.log('Type of String variable:', typeof greeting)
console.log('DON\'T recommend:\n' +
    `\twrap primitive types: ${typeof new String(greeting)}`
)

let version;
console.log(version, typeof version);

// Usage of constant:
console.log(PI, typeof PI);
console.log(C, typeof C);

