const { v4: uuidv4 } = require('uuid');
var generateKey = require('./helper');

const knex = require('knex');

const knexFile = require('./knexfile').development;
const db = knex(knexFile);




const create = async(name, type='client') => {
try{
  datainfo={
    uuid: uuidv4(),
    name,
    type
  }

  let key= generateKey.generateKey();

return await db("auth_clients")
        .insert(datainfo)
        .then( res => {
            db("auth_client_keys")
                .insert({auth_client_id:res[0], key: key})
                .then(() => console.log("Client Created"+ "  "  + key))
                .catch(function () {
                  return "Client not Created";
                });
        }).catch(function () {
            return "Client Creation failed";
          }).finally(() =>  db.destroy());
          
}
catch (error) {
    return  error;
  }

};


const update_client = (uuid, name) => {

    let id = uuid;
    let data= name;

    try {

      db("auth_clients").where("uuid", id)
      .update({"name": data}).then(function (count) {
     console.log("client updated");
    }).finally(function () {
     db.destroy();
    });

    } catch (err) {

      console.log(err);
      db.destroy()
    }
};


const is_admin= async(uuid) => {

  try{
  
   await db.from('auth_clients')
  .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
  .where({'auth_clients.uuid': uuid})
  .options({nestTables: true})
  .then((results) => {

    if(results[0].auth_clients.type== 'admin'){
      console.log(true);
    }
    else {
      console.log(false);
      return false;
    };
  }).catch( (err) => {
    console.log(false);
    
  }).finally(() =>  db.destroy());

  }
catch(err)
{
  console.log(err);
}
}

const get_client = async(id) =>{
  try{
      return  db.from('auth_clients')
      .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
      .where({'auth_clients.uuid': id})
      .options({nestTables: true})
      .then(results => {
        console.log(JSON.parse(JSON.stringify(results)));
      }).catch( (err) => {
        console.log(err);
      }).finally(() =>  db.destroy());
    }
  catch(err)
  {
    console.log("Client Not Found");
  }
}


const get_client_keys = async(id) => {
  try{

    return  db.from('auth_clients')
    .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
    .options({nestTables: true})
    .where({'auth_client_keys.auth_client_id': id})
    .then(results => {
      console.log(JSON.parse(JSON.stringify(results)));

    }).catch( (err) => {
      console.log(err);
    }).finally(() =>  db.destroy());

    }
  catch(err)
  {
    console.log("Client Not Found");
  }
}

const is_autenticate = async(apikey) => {

  try{  
    await db.from('auth_clients')
   .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
   .where({'auth_client_keys.key': apikey})
   .options({nestTables: true})
   .then((results) => {
 

    if(!(results== '' || null)){
      console.log(true);
    }
    else {
      console.log(false);
    }

   }).catch( (err) => {
 
     console.log("Client not found");
     
   }).finally(() =>  db.destroy());
 
    }
 catch(err)
 {
   console.log("error");
 }
}


const create_client_keys = async(uuid) => {

  try{

  let key= generateKey.generateKey();

  return await db.select("id").from("auth_clients")
                 .where({'uuid': uuid}).first()
                 .then( res => { console.log(res.id)
            db("auth_client_keys")
                .insert({auth_client_id:res.id, key: key})
                .then(() => console.log("Client key Created"+ " " + key))
                .catch(function () {
                  return "Client key not Created";
                });
        }).catch(function () {
            return "Client key Creation failed";
          }).finally(() =>  db.destroy());

    }
 catch(err)
 {
   console.log("error");
 }

}


const delete_client_keys = (id) => {

  try{
      return db("auth_client_keys")
      .where({'id': id}).del().then( () => {
      console.log("client key deleted");
    }).finally( () => {
      db.destroy();
    });
  }
  catch(err)
  {
    console.log("error");
  }

}

const update_client_key= (id) => {
  try{
    let key= generateKey.generateKey();

        return db("auth_client_keys")
        .where({'id': id}).update({'key':key}).then( () => {
        console.log("client key updated" + " " + key);
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      console.log("error");
    }
}

const delete_client= (uuid) => {
try{
    return db("auth_clients")
                 .where({'uuid': uuid}).del().then(function (count) {
                  console.log("client deleted");
                }).finally(function () {
                  db.destroy();
                });
    }
  catch(err)
  {
    console.log("error");
  }

}

const block_client_key= (id) => {
  try{

        return db("auth_client_keys")
        .where({'id': id}).update({'is_blocked': true}).then( () => {
        console.log("client key blocked");
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      console.log("error");
    }
}


const unblock_client_key= (id) => {
  try{
        return db("auth_client_keys")
        .where({'id': id}).update({'is_blocked': false}).then( () => {
        console.log("client key unblocked");
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      console.log("error");
    }
}


const block_client= (uuid) => {
  try{
        return db("auth_clients")
        .where({'uuid': uuid}).update({'is_blocked': true}).then( () => {
        console.log("client blocked");
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      console.log("error");
    }
}


const unblock_client= (uuid) => {
  try{
        return db("auth_clients")
        .where({'uuid': uuid}).update({'is_blocked': false}).then( () => {
        console.log("client unblocked");
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      console.log("error");
    }
}


  exports.create = create;
  exports.update_client = update_client;
  exports.is_admin= is_admin;
  exports.get_client= get_client;
  exports.get_client_keys= get_client_keys;
  exports.delete_client= delete_client;
  exports.is_autenticate= is_autenticate;
  exports.create_client_keys= create_client_keys;
  exports.delete_client_keys= delete_client_keys;
  exports.update_client_key= update_client_key;
  exports.block_client_key= block_client_key;
  exports.unblock_client_key= unblock_client_key;
  exports.block_client= block_client;
  exports.unblock_client= unblock_client;

