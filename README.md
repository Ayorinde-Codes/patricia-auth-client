## Installation Guide

Using npm:
Dependencies
```bash
$ npm install dotenv knex uuid mysql --save
```

## Env file
In your root directory create a .env file OR Run command:

```bash
$ touch .env
```
Add the following content and update with the correct informations

```bash

CLIENT_DB_CONNECTION=mysql
CLIENT_DB_HOST=127.0.0.1
CLIENT_DB_PORT=3306
CLIENT_DB_DATABASE=your_db_name
CLIENT_DB_USERNAME=your_username
CLIENT_DB_PASSWORD=your_password
```

## COMMAND

- Run The Following Commands

Generate Migration Files
- Run 

```bash
$ patricia-auth-init
```

Run Migrations but ensure you have the .env files are correct database details. 
- Run 

Before migration runs check that .env data are correct.
```bash
$ patricia-auth-migrate
```

## Avalable Methods 

```bash
  create(name), 
  update_client(uuid, name),
  get_client(uuid),
  get_client_keys(id),
  delete_client(uuid),
  is_authenticate(apikey),
  create_client_keys(uuid),
  delete_client_keys(id),
  update_client_key(id),
  block_client_key(id),
  unblock_client_key(id),
  block_client(uuid),
  unblock_client(uuid),
  is_admin(uuid),

```
if type is admin use  create(name, type='admin'), 

## Avalable Helpers 
```bash
  is_admin(uuid),
  is_authenticate(apikey),
```

Happy coding!
