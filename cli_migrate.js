#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const spawn = require('child_process').spawn;

const ls = spawn('npx', ['knex', 'migrate:latest', '']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  
  console.log(
  chalk.green(
    figlet.textSync('Patricia Client Migrated',{
      horizontalLayout: "fitted",
      verticalLayout: "default"
    })
  )
);

});

