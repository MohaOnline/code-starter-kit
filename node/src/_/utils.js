// https://stackoverflow.com/questions/45395369/how-to-get-console-log-line-numbers-shown-in-nodejs/47296370#47296370
['log', 'warn', 'error'].forEach((methodName) => {
    const originalMethod = console[methodName];
    console[methodName] = (...args) => {
        let initiator = 'unknown place';
        try {
            throw new Error();
        } catch (e) {
            if (typeof e.stack === 'string') {
                let secondLine = false;
                for (const line of e.stack.split('\n')) {

                    const matches = line.match(/^\s+at\s+(.*)/);
                    if (matches) {
                        if (secondLine) {
                            // second line - caller (what we are looking for)
                            initiator = matches[1].trim();
                            break;
                        }
                        secondLine = true;
                    }
                }
            }
        }
        originalMethod.apply(console, [`${initiator}`, ' : \n', ...args]);
    };
});


