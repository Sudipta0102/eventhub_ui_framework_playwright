import { mergeTests } from "@playwright/test";
import { authTest } from './auth.fixture';
import { pomTest } from "./pom.fixture";
import { networkTest } from "./network.fixture";

export const test = mergeTests(authTest, pomTest, networkTest);

export { expect } from '@playwright/test';
