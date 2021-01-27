const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description update client keys', () => {

  beforeEach(async() => {

    await setupMigration();

  })


test("Test that you can update a client key", async ()=>{

  let id=1;

  expect(await client.update_client_key(id)).toContain(`client key updated `)
});

});