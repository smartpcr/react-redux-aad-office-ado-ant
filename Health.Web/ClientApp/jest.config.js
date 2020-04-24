const config = {
  snapshotSerializers: [
      "enzyme-to-json/serializer"
  ],
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!*.d.ts",
      "!src/Scenarios/Temp/**"
  ],
  coverageThreshold: {
      "global": {
          "statements": 0,
          "branches": 0,
          "functions": 0,
          "lines": 0
      }
  },
  coverageReporters: [
      "cobertura"
  ],
  resolver: "jest-pnp-resolver",
  setupFiles: [
      "react-app-polyfill/jsdom",
      "<rootDir>/config/jest/init.js"
  ],
  testMatch: [
      "<rootDir>/__tests__/**/*.(j|t)s?(x)"
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
      "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.(ts|tsx)$": "<rootDir>/config/jest/typescriptTransform.js",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\](?!azure-devops-ui).+\\.(js|jsx|mjs|ts|tsx)$"
  ],
  testPathIgnorePatterns: [
      "<rootDir>/__tests__/jestTools/",
      "<rootDir>/__tests__/.*/__testData__/"
  ],
  testResultsProcessor: "./node_modules/jest-junit-reporter",
  moduleNameMapper: {
      "^react-native$": "react-native-web",
      "^.+\\.(css|scss)$": "identity-obj-proxy",
      "^~/(.*)": "<rootDir>/src/$1",
      "^office-fabric/(.*)": "office-ui-fabric-react/lib-commonjs/$1"
  },
  moduleFileExtensions: [
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "web.js",
      "js",
      "web.jsx",
      "jsx",
      "json",
      "node",
      "mjs"
  ],
  globals: {
      "ts-jest": {
          "tsConfig": "tsconfig.test.json"
      }
  }
};

module.exports = config;
