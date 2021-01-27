const db = require("../config/db-config");

async function setupMigration() {

  await db.migrate.latest();
  
  // insert dummy records to in:memory db
  let datainfo={
    id: 2,
    uuid: '5f60f36c-a5e5-4717-b692-cb802550cf08',
    name: 'patricia',
    type: 'admin'
  }
  
  let key= 'pat_privkey-exhkqrr1611650267637';

  db("auth_clients")
      .insert(datainfo)
      .then( res => {
          db("auth_client_keys")
              .insert({auth_client_id:res[0], key: key})
              .then((res) => { return (JSON.stringify("Client Created"+ "  "  + key)) })
              .catch( () => {
                return "Client not Created";
              });
      }).catch( ()=> {
          return "Client Creation failed";
        }).finally(() =>  db.destroy());
  }
  module.exports = setupMigration;