const fs = require('fs');
const readline = require('readline');

class InputParser {
	static readFromStdin(callback) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		let input = [];
		rl.on('line', (line) => {
			input.push(line.trim());
		});

		rl.on('close', () => {
			callback(InputParser.parseInput(input));
		})

	}

	static readFromFile(inputFilePath) {
		try {
			// Splitting the input on '\n' to create an array with each line as an entry.
			let input = fs.readFileSync(inputFilePath, 'utf8').trim().split('\n');
			return InputParser.parseInput(input);

		} catch (e) {
			console.error(`Reading input data from file failed with: ${e.toString()}`);
			process.exit(1); // Terminating program due to read error.
		}
	}

	static parseInput(input) {
		// Sanity check, at least we need:
		// 1- plateau size
		// 2- rover position
		// 3- rover command
		if (input.length < 3)
			throw new Error("The input should contain at least 3 lines.");

		let [plateauWidth, plateauHeight] = input[0].split(' ');
		plateauWidth = parseInt(plateauWidth);
		plateauHeight = parseInt(plateauHeight);
		let rovers = [];
		for (let i = 1; i < input.length; i += 2) {
			let obj = {pos: input[i], cmd: input[i + 1]};
			rovers.push(obj);
		}

		return {
			plateauWidth: plateauWidth,
			plateauHeight: plateauHeight,
			rovers: rovers
		};
	}
}

module.exports = InputParser;