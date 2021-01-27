const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description create client keys', () => {

  beforeEach(async() => {

    await setupMigration();

  })
  

test("Test that a client create client keys", async ()=>{

  let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";

  expect(await client.create_client_keys(uuid)).toMatch('client key created key: pat_privkey-');
});

});