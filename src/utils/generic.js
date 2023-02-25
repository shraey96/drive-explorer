/**
 * @function isEmpty
 * @param {any} value
 *
 * @description Returns boolean depending on if value is empty or not
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (typeof value === "undefined" || value === null) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  if (typeof value === "string" && value === "") return true;
  return false;
};

/**
 * @function debounce
 * @param {Function} func
 * @param {number} delay
 *
 * @description Returns function in debounced form
 * @returns {Function}
 */
export const debounce = (func, delay) => {
  let timeout = null;
  function cancel() {
    clearTimeout(timeout);
  }
  function executedFunction(...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay || 500);
  }
  executedFunction.cancel = cancel;
  return executedFunction;
};

/**
 * @function isValidFileName
 * @param {string} fileName
 *
 * @description Returns if fileName is valid or not
 * @returns {Boolean}
 */
export const isValidFileName = (fileNameStr = "") => {
  const splitFileName = fileNameStr.split(".");
  const fileName = splitFileName[0];
  const fileExtension = splitFileName[1];

  if (!fileName || !fileExtension) return false;

  return true;
};
