const locale = require('../../public/locales/en/translations.json');

/**
 * i18n function mock
 * @param {string} key - locale key
 * @returns {string|object}
 * @private
 */
global.t = key => {
  const path = key.split('.')

  let subObject = locale

  for (const subKey of path) {
    subObject = subObject[subKey]
    if (typeof subObject === 'undefined') {
      return key
    }
  }

  return subObject || key
}