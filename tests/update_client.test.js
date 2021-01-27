const setupMigration = require('./setup');
const client= require("../index");


describe('test suite description update client', () => {

  beforeEach(async() => {

    await setupMigration();

  })
 
  
test("Test that you can update a client", async ()=>{

  let uuid= "5f60f36c-a5e5-4717-b692-cb802550cf08";
  let name= "patricia";

  expect(await client.update_client(uuid, name)).toContain(`client updated for ${name}`);

});

});