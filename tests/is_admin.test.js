const setupMigration = require('./setup');
const client= require("../index");


describe('test suite description user is an admin', () => {

  beforeEach(async() => {

    await setupMigration();

  })
 

test("Test that A user is an admin", async ()=>{

  let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";

  expect(await client.is_admin(uuid)).toBeTruthy()
});

});