#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const files = require('./lib/files');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');

clear();

console.log(chalk.yellow(figlet.textSync("panos's generator", {})));

const run = async () => {
	const expName = await inquirer.getExperimentName();
	console.log(`Generating ${chalk.green(expName['Experiment Title'])}`);

	// Make folder structure
	files.makeBaseDir(expName);
};

run();
