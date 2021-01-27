const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description unblock client key', () => {

  beforeEach(async() => {

    await setupMigration();

  })


  test("Test that you can unblock a client key", async ()=>{

    let id=1;

    expect(await client.unblock_client_key(id)).toContain(`client key unblocked`)
});

});