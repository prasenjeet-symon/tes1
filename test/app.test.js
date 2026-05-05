const { test } = require('node:test');
const assert = require('node:assert');
const { buildApp } = require('../src/app');

test('GET / returns 200 and hello world', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/'
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { hello: 'world' });
});

test('GET /health returns 200 and status ok', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/health'
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { status: 'ok' });
});

test('GET /ping returns 200 and a valid ISO timestamp', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/ping'
  });

  assert.strictEqual(response.statusCode, 200);
  const body = response.json();
  assert.ok(body.serverTime, 'Response should contain serverTime');
  
  // Verify it's a valid ISO timestamp
  const date = new Date(body.serverTime);
  assert.ok(!isNaN(date.getTime()), 'serverTime should be a valid date');
  assert.strictEqual(date.toISOString(), body.serverTime, 'serverTime should be in ISO format');
});
