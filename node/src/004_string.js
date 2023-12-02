import "./_/utils.js"
import {countBitsInString} from "./_/utils.js"

console.log('String + Number:', "00" + 7);  // ' " are both fine to enclose string.

console.log(`Newlines are allowed
in Template literals.`);

let greeting = '🤗';
console.log(`The length and bit number of ${greeting}: 
    ${greeting.length}, ${countBitsInString(greeting)}`);


let name = 'JavaScript';
console.log(`${(greeting.length !== 0) ? `Template literal` : name} is allowed in \${}.`);
