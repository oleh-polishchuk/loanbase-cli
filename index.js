#!/usr/bin/env node

const argv = require('yargs').argv;

const action = argv._[ 0 ];
const instance = argv._[ 1 ];
const name = argv._[ 2 ];

const options = {};

const commandPath = `./commands/${action}-${instance}.command.js`;

try {
    require(commandPath).run(name, options);
} catch (e) {
    console.error(`Error: ${e.message}`);

    console.log(`Usage: ${argv.$0} [action] [instance] [name]`);
    console.log(`       ${argv.$0} generate model User`);
}
