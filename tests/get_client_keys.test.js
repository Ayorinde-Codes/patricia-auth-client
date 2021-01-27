const setupMigration = require('./setup');
const client= require("../index");



describe('test suite description get client keys', () => {

  beforeEach(async() => {

    await setupMigration();

  }) 
  

test("Test that you can get client keys", async ()=>{

    expect(await client.get_client_keys(1)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({"id": 1}),
      expect.objectContaining({"type": "admin"}),
      expect.objectContaining({"key": expect.stringMatching(/^pat_privkey-/)})
    ])
  );
});

});