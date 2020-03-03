const inquirer = require('inquirer');

module.exports = {
	getExperimentName: () => {
		const questions = [
			{
				name: 'Experiment Title',
				type: 'input',
				message: 'Enter the name of the experiment',
				validate: function(value) {
					if (value.length) {
						return true;
					} else {
						return 'Enter the name of the experiment';
					}
				},
			},
		];

		return inquirer.prompt(questions);
	},
};
