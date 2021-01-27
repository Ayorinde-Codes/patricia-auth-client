const { v4: uuidv4 } = require('uuid');
var generateKey = require('./helpers/helper');
const db = require("./config/db-config");



const create = async(name, type='client') => {
try{
  datainfo={
    uuid: uuidv4(),
    name,
    type
  }

  let key= generateKey.generateKey();

  return db.transaction(trx => {
    
        return trx('auth_clients')
          .insert(datainfo)
          .then((res) => {

            return trx('auth_client_keys').insert({auth_client_id:res[0], key: key});
          }).catch(err => {

            return err;
          });
      })
      .then((result) => {

        return (JSON.parse(JSON.stringify({'message':'client created', 'key': key, 'uuid' : datainfo.uuid })));

      })
      .catch(err => {

        return err;
      });

    }

    catch (error) {
        return  error;
      }

};


const update_client = (uuid, name) => {

  let data= name;

  try {

    return db("auth_clients").where("uuid", uuid)
    .update({"name": data}).then(()=> {

      return `client updated for ${name}`;
    })
    .catch( (err) => {
      return err;
      
    })
    .finally(() =>{
    db.destroy();
    });

  } catch (err) {

    return (err);
  }
};


const is_admin= async(uuid) => {

  try{
  
   return db.from('auth_clients')
  .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
  .where({'auth_clients.uuid': uuid})
  .options({nestTables: true})
  .then((results) => {

    if(results[0].type== 'admin'){
      return true;
    }
    else {

      return false;
    };
  }).catch( (err) => {
    return err;
    
  }).finally(() =>  db.destroy());

  }
  catch(err)
  {
    return (err);
  }
}

const get_client = async(uuid) =>{
  try{
      return  db.from('auth_clients')
      .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
      .where({'auth_clients.uuid': uuid})
      .options({nestTables: true})
      .then(results => {

        return (JSON.parse(JSON.stringify(results)));
      }).catch( (err) => {
        return err;
      }).finally(() =>  db.destroy());
    }
  catch(err)
  {
    return "Client Not Found";
  }
}


const get_client_keys = async(id) => {
  
  try{
    return db.from('auth_clients')
    .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
    .where({'auth_client_keys.auth_client_id': id})
    .options({nestTables: true})
    .then(results => {

      return (JSON.parse(JSON.stringify(results)));

    }).catch( (err) => {
      return (err);
    }).finally(() =>  db.destroy());

    }
  catch(err)
  {
    return ("Client Not Found");
  }
}

const is_authenticate = async(apikey) => {

  try{  
    return await db.from('auth_clients')
   .leftJoin('auth_client_keys', 'auth_clients.id', '=', 'auth_client_keys.auth_client_id')
   .where({'auth_client_keys.key': apikey})
   .options({nestTables: true})
   .then((results) => {
 
    if(!(results== '' || null)){
      return true;
    }
    else {
      return false;
    }

   }).catch( (err) => {
 
     return "Client not found";
     
   }).finally(() =>  db.destroy());
 
    }
 catch(err)
 {
   return "error";
 }
}


const create_client_keys = async(uuid) => {

  try{

  let key= generateKey.generateKey();

    return db.transaction(trx => {
      
      return trx.select("id").from("auth_clients")
        .where({'uuid': uuid}).first()
        .then((res) => {

          return trx('auth_client_keys').insert({auth_client_id:res.id, key: key});
        }).catch(err => {

          return err;
        });
    })
    .then((result) => {
      return (`client key created key: ${key}`);

    })
    .catch(err => {

      return err;
    });


  }
 catch(err)
 {
   return "error";
 }

}


const delete_client_keys = (id) => {

  try{
      return db("auth_client_keys")
      .where({'id': id}).del().then( (res) => {
      return `client key deleted with id ${res}`;
    }).finally( () => {
      db.destroy();
    });
  }
  catch(err)
  {
    return "error";
  }

}

const update_client_key= async(id) => {
  try{
    
    let key= generateKey.generateKey();

    return await db("auth_client_keys")
        .where({'id': id}).update({'key':key}).then( () => {
        return "client key updated" + " " + key;
      }).catch(err =>
      {
        return "unable to update key";
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      return "error";
    }
}

const delete_client= async(uuid) => {
try{
    return db("auth_clients")
              .where({'uuid': uuid}).del().then(function (count) {
              return "client deleted";
            }).catch(err =>
              {
                return "unable to delete client";
              }).finally(function () {
              db.destroy();
            });
    }
  catch(err)
  {
    return "error";
  }

}

const block_client_key= async(id) => {
  try{

      return db("auth_client_keys")
        .where({'id': id}).update({'is_blocked': true}).then( (res) => {
        return "client key blocked";
      }).catch(err =>
        {
          return "unable to block client key";
        }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
     return "error";
    }
}


const unblock_client_key= (id) => {
  try{
        return db("auth_client_keys")
        .where({'id': id}).update({'is_blocked': false}).then( () => {
          return "client key unblocked";
        }).catch(err =>
          {
            return "unable to unblock client key";
          }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      return "error";
    }
}


const block_client= async(uuid) => {
  try{
        return db("auth_clients")
        .where({'uuid': uuid}).update({'is_blocked': true}).then( () => {
        return "client blocked";
      }).catch(err =>
        {
          return "unable to block client";
        }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      return "error";
    }
}


const unblock_client= async(uuid) => {
  try{
        return db("auth_clients")
        .where({'uuid': uuid}).update({'is_blocked': false}).then( () => {
        return "client unblocked";
      }).finally(function () {
        db.destroy();
      });
    }
    catch(err)
    {
      return "error";
    }
}


  exports.create = create;
  exports.update_client = update_client;
  exports.is_admin= is_admin;
  exports.get_client= get_client;
  exports.get_client_keys= get_client_keys;
  exports.delete_client= delete_client;
  exports.is_authenticate= is_authenticate;
  exports.create_client_keys= create_client_keys;
  exports.delete_client_keys= delete_client_keys;
  exports.update_client_key= update_client_key;
  exports.block_client_key= block_client_key;
  exports.unblock_client_key= unblock_client_key;
  exports.block_client= block_client;
  exports.unblock_client= unblock_client;

