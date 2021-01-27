const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description get client', () => {

  beforeEach(async() => {

    await setupMigration();

  })
 
  
test("Test that you can get a client get_client(uuid)", async ()=>{

  let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";

  expect(await client.get_client(uuid)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({"uuid": uuid}),
      expect.objectContaining({"type": "admin"})
    ])
  );
});

});