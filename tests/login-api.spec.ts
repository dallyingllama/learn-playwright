// Using https://reqres.in/,can request a free API key

import { test, expect, request } from '@playwright/test';
import { loginData } from '../data/loginData';

test('API Login with x-api-key header returns a token', async () => {
  const context = await request.newContext({
    baseURL: process.env.API_BASE_URL, 
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json'
    }
  });

  const response = await context.post('/api/login', {
    data: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.token).toBeDefined();
  console.log('✅ Received token:', body.token);
});
