const { describe, test, after } = require('node:test');
const assert = require('node:assert/strict');
const { buildApp } = require('../src/app');

describe('Christmas route', () => {
  const app = buildApp();

  after(() => app.close());

  test('Valid simple name: GET /christmas/John returns 200 with correct message', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/John'
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), {
      message: '🎄 Merry Christmas, John! Wishing you joy and peace!'
    });
  });

  test('Valid hyphenated name: GET /christmas/Jean-Luc returns 200 with correct message', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/Jean-Luc'
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), {
      message: '🎄 Merry Christmas, Jean-Luc! Wishing you joy and peace!'
    });
  });

  test('Valid name with space: GET /christmas/Mary%20Jane returns 200 with message containing Mary Jane', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/Mary%20Jane'
    });

    assert.strictEqual(response.statusCode, 200);
    const body = response.json();
    assert.ok(body.message.includes('Mary Jane'));
  });

  test('Valid Unicode name: GET /christmas/Ren%C3%A9 returns 200 with correct message', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/Ren%C3%A9'
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), {
      message: '🎄 Merry Christmas, René! Wishing you joy and peace!'
    });
  });

  test('Missing name param: GET /christmas returns 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas'
    });

    assert.strictEqual(response.statusCode, 404);
  });

  test('Invalid name with numbers: GET /christmas/John123 returns 400', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/John123'
    });

    assert.strictEqual(response.statusCode, 400);
  });

  test('Invalid name with symbols: GET /christmas/John@Doe returns 400', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/John@Doe'
    });

    assert.strictEqual(response.statusCode, 400);
  });

  test('Invalid leading space: GET /christmas/%20John returns 400', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/%20John'
    });

    assert.strictEqual(response.statusCode, 400);
  });

  test('Invalid standalone hyphen: GET /christmas/- returns 400', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/christmas/-'
    });

    assert.strictEqual(response.statusCode, 400);
  });

  test('Invalid over-long name (51+ chars) returns 400', async () => {
    const longName = 'A'.repeat(51);
    const response = await app.inject({
      method: 'GET',
      url: `/christmas/${longName}`
    });

    assert.strictEqual(response.statusCode, 400);
  });
});