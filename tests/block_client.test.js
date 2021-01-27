const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description block client', () => {

  beforeEach(async() => {

    await setupMigration();

  })


test("Test that you can block a client", async ()=>{

  let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";

    expect(await client.block_client(uuid)).toContain(`client blocked`)
});

});