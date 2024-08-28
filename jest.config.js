module.exports = {
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js"
    },
    transform: {
      "^.+\\.(js|jsx)?$": "babel-jest"
    },
    testEnvironment: "jsdom",
  };
  