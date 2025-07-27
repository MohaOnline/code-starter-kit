/**
 * Operations of Object.
 */
import "./_/utils.js"

let propertyName = "Computed Property";
let shortcut = "Shortcut of shortcut:shortcut";
let obj = {
    'Object Characters': [
        'No Class, only JSON Strings',
    ],
    shortcut,
    [propertyName.toLowerCase()]: "Use brackets to calculate the property name through expression.",
};
console.log(`Declared Object:
`, obj);

// Add properties on fly.
obj["Not identifier property"] = 'Need brackets to add this kind of property.';
obj.property = 'Add another new property with dot.';
console.log(`Operated Object:
`, obj);

// Delete properties
delete obj['Object Characters'];
console.log(`Remove property 'Object Character':
`, obj);