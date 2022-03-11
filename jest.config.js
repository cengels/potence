module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  resolver: "jest-ts-webcompat-resolver",
  coverageProvider: "babel",
  collectCoverageFrom: [
      "src/{!(fluent),}/*.ts",
      "!src/arrays/List.ts",
      "!src/**/Readonly*.ts"
  ]
};
