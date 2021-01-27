const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description unblock a client', () => {

  beforeEach(async() => {

    await setupMigration();

  })


test("Test that you can unblock a client", async ()=>{

  let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";

    expect(await client.unblock_client(uuid)).toContain(`client unblocked`)
});

});