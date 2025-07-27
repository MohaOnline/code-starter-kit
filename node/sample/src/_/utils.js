import {TRACKABLE_LOGS} from './common.js';
import bitwise from 'bitwise';

/**
 * Enhance
 *
 * @see https://stackoverflow.com/questions/45395369/how-to-get-console-log-line-numbers-shown-in-nodejs/47296370#47296370
 */
if (TRACKABLE_LOGS) {
    ['log', 'warn', 'error'].forEach((methodName) => {
        const originalMethod = console[methodName];
        console[methodName] = (...args) => {
            let filepath_line_number = 'unknown place';
            try {
                // Inspect with enable
                //     JavaScript and TypeScript | Try statement issues | Exception used for local control-flow inspection
                // in Settings | Editor | Inspections
                throw new Error();
            } catch (e) {
                if (typeof e.stack === 'string') {
                    let secondLine = false;
                    for (const line of e.stack.split('\n')) {

                        const matches = line.match(/^\s+at\s+(.*)/);
                        if (matches) {
                            if (secondLine) {
                                // second line - caller (what we are looking for)
                                filepath_line_number = matches[1].trim();
                                break;
                            }
                            secondLine = true;
                        }
                    }
                }
            }
            originalMethod.apply(console, [`${filepath_line_number}`, '\n ', ...args]);
        };
    });
}

function countBitsInString(str) {
    let bitCount = 0;

    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        let binaryString = charCode.toString(2);
        bitCount += binaryString.length;
    }

    return bitCount;
}

export {countBitsInString};
