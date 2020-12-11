exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('auth_clients', function (table) {
        table.increments('id').primary()
        table.string('uuid');
        table.string('name');
        table.boolean('is_blocked').notNullable().defaultTo(false);
        table.enum('type', ['admin', 'client']).defaultTo('client')
        table.timestamps();
    }).createTable('auth_client_keys', function (table) {
        table.increments('id').primary();
        table.string('name').nullable();
        table.integer('auth_client_id',11).unsigned().references('id').inTable('auth_clients').onUpdate('CASCADE').onDelete('cascade');
        table.string('key');        
        table.boolean('is_blocked').notNullable().defaultTo(false);
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable("auth_clients")
    .dropTable("auth_client_keys")
};
