/**
* Shows an error message to the user
* @param {string} message The message to show
*/
function showError(message) {
  document.getElementById('error_message').innerText = message;
  document.getElementById('errors').hidden = false;
}

/**
 * @template T
 * @typedef {{
 *   data: T|null;
 *   error: Error|null;
 * }} TryCatchResult
 */

/**
 * Wraps a promise in a try/catch block and returns standardised result
 * @template T
 * @param {Promise<T>} promise - Promise to handle
 * @returns {Promise<TryCatchResult<T>>} Standardised result with data/error
 */
async function tryCatch(promise) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

/**
 * Same as tryCatch but with no async
 * @template T
 * @param {Promise<T>} promise - Promise to handle
 * @returns {Promise<TryCatchResult<T>>} Standardised result with data/error
 */
function noSyncTryCatch(func) {
  try {
    const data = func();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}


function updateLoadingStatus(text, output = false) {
  document.querySelector("[tag='status']").innerHTML = text;
  if (output) console.log(text);
}
