export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  testEnvironment: "jest-environment-node",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  resolver: "jest-ts-webcompat-resolver",
  coverageProvider: "v8",
  collectCoverageFrom: [
      "src/**/*.ts",
      "!src/arrays/List.ts",
      "!src/**/Readonly*.ts"
  ]
};
