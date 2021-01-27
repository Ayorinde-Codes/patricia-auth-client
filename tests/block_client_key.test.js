const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description block client keys', () => {

  beforeEach(async() => {

    await setupMigration();

  })

test("Test that you can block a client key", async ()=>{

    let id=1;

    expect(await client.block_client_key(id)).toContain(`client key blocked`)
});

});