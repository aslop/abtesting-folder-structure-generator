const fs = require('fs');
const path = require('path');
const touch = require('touch');
const { exec } = require('child_process');
let expDir = null;

module.exports = {
	makeBaseDir: async (expName) => {
		expDir = expName['Experiment Title'];
		makeMainStructure();
	},
};

async function makeMainStructure() {
	var baseDir = fs.mkdirSync(expDir);
	fs.mkdirSync(`${process.cwd()}/${expDir}/dist`);
	fs.mkdirSync(`${process.cwd()}/${expDir}/src`);
	fs.mkdirSync(`${process.cwd()}/${expDir}/src/lib`);
	fs.mkdirSync(`${process.cwd()}/${expDir}/src/scss`);
	fs.mkdirSync(`${process.cwd()}/${expDir}/src/html`);

	await copyFromTemplates('index.js', 'src/index.js');
	await copyFromTemplates('package.json');
	await copyFromTemplates('webpack.config.js');
	await copyFromTemplates('.gitignore');
	await copyFromTemplates('.babelrc');
	await copyFromTemplates('.editorconfig');
	await copyFromTemplates('.prettierrc');
	await copyFromTemplates('ab.js', 'src/lib/ab.js');
	await copyFromTemplates('main.scss', 'src/scss/main.scss');

	process.chdir(expDir);
	await execCommand(`ls`);
	await execCommand('npm install');
}

function execCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});

		resolve();
	});
}

function copyFromTemplates(src, dest) {
	return new Promise((resolve, reject) => {
		let tmpDest = dest;
		if (!dest) {
			tmpDest = src;
		}

		fs.copyFileSync(
			`${__dirname}/templates/${src}`,
			`${process.cwd()}/${expDir}/${tmpDest}`,
		);
		resolve();
	});
}
