const { v4: uuidv4 } = require('uuid');
// var generateKey = require('../helper');


exports.up = function(knex, Promise) {
  
return knex("auth_clients")
    .insert({
        uuid: uuidv4(),
        name: 'Admin',
        type: 'admin'
    })
    .then( (res) => {
        knex("auth_client_keys")
            .insert({auth_client_id:res[0], key: generateKey()})
            .then(() => console.log("data inserted"))
            .catch(function () {
              return "transaction failed, data rolled back";
            });
    }).catch(function () {
        return "transaction failed, data rolled back";
      }).finally(() =>  knex.destroy());
      
};

exports.down = function(knex) {
  
};

const generateKey = () => {
  let patriciakey= "pat_privkey-"
  let char = ''
  let charset = 'abcdefghijklmnopqrstuvwxyz'
  let time = new Date().getTime()
  for (let i = 0; i < 7; i++)
    char += charset.charAt(Math.floor(Math.random() * charset.length))
  return patriciakey + char + time
}