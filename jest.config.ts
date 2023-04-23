import type { Config } from "@jest/types";
import { JSDOM } from "jsdom";

const testHTML = `<!DOCTYPE html><html><head></head><body></body></html>`;
const jsdom = new JSDOM(testHTML);

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  coverageReporters: ["clover", "json", "lcov", "text", "cobertura"],
  //bail: true, // stop after first failing test
  globals: {
    window: {},
  },
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "\\.(css|sass)$": "identity-obj-proxy",
  },
};

export default config;
