/**
 * Variable / Constant / Value.
 */
import "./_/utils.js"
import {PI, C} from './_/common.js'

console.log(typeof 123);

console.log('Historical accident:',typeof null);

// Store any value in certain variable:
let greeting = 'hello, js!'
console.log('Type of variable:', typeof greeting)
console.log('DON\'T recommend and wrap primitive types:', '\n',
    typeof new String(greeting))

let version;
console.log(version, typeof version);

// Usage of constant:
console.log(PI, typeof PI);
console.log(C, typeof C);

console.log('\n\nValue is absence: ')
console.log(typeof undefined);
console.log(typeof null);

