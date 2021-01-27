const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description delete client', () => {

  beforeEach(async() => {

    await setupMigration();

  })


test("Test that you can delete a client", async ()=>{

    let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";

  expect(await client.delete_client(uuid)).toContain(`client deleted`)
});

});