const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description delete client keys', () => {

  beforeEach(async() => {

    await setupMigration();

  })


  

test("Test that you can delete a client key", async ()=>{

  let id=1;

  expect(await client.delete_client_keys(id)).toContain(`client key deleted with id ${id}`)
});

});