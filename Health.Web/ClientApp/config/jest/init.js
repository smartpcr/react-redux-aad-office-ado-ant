import { initializeIcons } from "office-fabric/Icons";
import { setIconOptions } from "office-fabric/Styling";

setIconOptions({
    disableWarnings: true
});
initializeIcons(undefined, { disableWarnings: true });

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

const customGlobal = global;
// tslint:disable-next-line no-require-imports no-var-requires
customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;

jest.mock("react-monaco-editor", () => "MonacoEditor");
