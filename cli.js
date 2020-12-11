#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const fs = require('fs-extra');
var path = require('path');
const fss = require('fs');


var sourceDir = './node_modules/patricia-auth-client/migrations';
var destinationDir = path.join('migrations');


if (!fs.existsSync(destinationDir)){
    fs.mkdirSync(destinationDir, { recursive: true });
}

fs.copy(sourceDir, destinationDir, err =>{
  if(err) return console.error(err);
  console.log("Successfully Created Migration Files!")
}); 

  const pathToFile = path.join('./node_modules/patricia-auth-client', "knexfile.js")
  const pathToNewDestination = path.join('knexfile.js')
  

fss.copyFile(pathToFile, pathToNewDestination, err=> {
    if (err) {
        return console.error(err);
        } else {
      console.log("Successfully Created Migration Files!")
    }
  })

console.log(
  chalk.green(
    figlet.textSync('Patricia Client Setup', {
        horizontalLayout: "fitted",
        verticalLayout: "default"
      })
  )
);

