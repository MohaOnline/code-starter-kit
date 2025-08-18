

/**
 * Extracts the file name from the stack trace where the given function is invoked.
 *
 * @param {Function} fn - The function whose stack trace will be used to find the file name.
 * @return {string|null} The file name as a string if available, otherwise null.
 */
function getFileNameFromStack(fn) {
  try {
    const originalPrepare = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };

    const err = new Error();
    const stack = err.stack;

    Error.prepareStackTrace = originalPrepare;

    if (stack && stack[1]) {
      return stack[1].getFileName();
    }
  } catch (e) {
    // 在某些环境下可能不支持
  }
  return null;
}
