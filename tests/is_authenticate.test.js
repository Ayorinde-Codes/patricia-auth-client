const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description is authenticated', () => {

  beforeEach(async() => {

    await setupMigration();

  })


test("Test that a client is authenticated", async ()=>{

  let key= 'pat_privkey-wrongkey';

  expect(await client.is_authenticate(key)).toBeFalsy();
});

});