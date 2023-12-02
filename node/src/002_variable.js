/**
 * Variable / Constant / Value.
 */
import "./_/utils.js"


// Declare and initialize a variable.
let name = "Javascript";


console.log('\n\nValue is absent(2 types, need settle on one): ')
console.log(typeof undefined);  // Declared but not initialized.
                                // Readonly property of global object.
console.log(typeof null);       // Intentional absence.

let no_value;
console.log('Uninitialized variable:', no_value, `(type: ${typeof no_value})`);

