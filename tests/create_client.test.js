const setupMigration = require('./setup');
const client= require("../index");


describe('test suite description create client', () => {

  beforeEach(async() => {

    await setupMigration();
  })


test("Test that you can create a client", async ()=>{

  let name= "patricia";

  expect(await client.create(name)).toEqual(
      expect.objectContaining({"message": "client created"}),
      expect.objectContaining({"key": expect.stringMatching(/^pat_privkey-/)}),
      );

});


});
