const { test } = require('node:test');
const assert = require('node:assert');
const { buildApp } = require('../src/app');

test('GET /birthday/:name - valid name John', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/birthday/John'
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { message: '🎂 Happy Birthday, John! Have a wonderful day!' });
});

test('GET /birthday/:name - name with space', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/birthday/Mary Jane'
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { message: '🎂 Happy Birthday, Mary Jane! Have a wonderful day!' });
});

test('GET /birthday/:name - name with hyphen', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/birthday/Jean-Luc'
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { message: '🎂 Happy Birthday, Jean-Luc! Have a wonderful day!' });
});

test('GET /birthday/:name - name with Unicode characters', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: `/birthday/${encodeURIComponent('René')}`
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { message: '🎂 Happy Birthday, René! Have a wonderful day!' });
});

test('GET /birthday/:name - name with Greek characters', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: `/birthday/${encodeURIComponent('Ελένη')}`
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(response.json(), { message: '🎂 Happy Birthday, Ελένη! Have a wonderful day!' });
});

test('GET /birthday/:name - invalid name (numbers)', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/birthday/John123'
  });

  assert.strictEqual(response.statusCode, 400);
});

test('GET /birthday/:name - invalid name (symbols)', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/birthday/John@Doe'
  });

  // If we decide symbols are invalid
  assert.strictEqual(response.statusCode, 400);
});
