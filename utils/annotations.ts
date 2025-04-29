// utils/annotations.ts
import { TestInfo } from '@playwright/test';

export function checkForBlankCredentials(username: string, password: string, testInfo: TestInfo) {
  // 🟡 Only logs if username or password is actually blank
  if (!username || !password) {
    const message = `🟡 Info: Blank input detected – username: "${username}", password: "${password}"`;
    console.log(message);
    testInfo.annotations.push({
      type: 'warning',
      description: message,
    });
  }
}