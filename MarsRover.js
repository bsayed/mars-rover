const InputParser = require('./util/InputParser');
const Controller = require('./core/Controller');


const args = process.argv.slice(2); // ignoring the first 2 args which are 'node binary' and 'path to this script'

if (args.length === 0) {
	InputParser.readFromStdin((input) => {
		console.log("Result:");
		Controller.exec(input.plateauWidth, input.plateauHeight, input.rovers);
	});
} else {
	let input = InputParser.readFromFile(args[0]);
	Controller.exec(input.plateauWidth, input.plateauHeight, input.rovers);
}


