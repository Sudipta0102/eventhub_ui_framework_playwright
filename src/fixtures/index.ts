import { mergeTests } from "@playwright/test";
import { authTest } from './auth.fixture';
import { pomTest } from "./pom.fixture";

export const test = mergeTests(authTest, pomTest);

export { expect } from '@playwright/test';
