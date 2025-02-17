import type { Config } from "@jest/types";

const BASE_DIR = "<rootDir>/src/app/server_app";
const BASE_TEST_DIR = "<rootDir>/src/test/";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${BASE_DIR}/**/*.ts`],
  testMatch: [
    `${BASE_TEST_DIR}/server_app/**/*test.ts`,
    `${BASE_TEST_DIR}/server_app2/**/*test.ts`,
  ],
  setupFiles: ["<rootDir>/src/test/server_app3/utils/config.ts"],
};

export default config;
