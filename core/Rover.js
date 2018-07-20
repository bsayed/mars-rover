const Position = require('./Position');
const Plateau = require('./Plateau');


class Rover {
	constructor(pos, heading, plateau) {
		// All the possible headings
		this.headings = ['N', 'E', 'S', 'W'];
		// Check if this heading is one of the supported headings
		if (!this.headings.includes(heading))
			throw new Error(
				`Heading: ${heading} is not supported, only the following headings are supported: ${this.headings}`,
			);
		// JavaScript is a dynamically typed language, we might need to check the type of objects to grantee correctness
		if (!(pos instanceof Position)) throw new TypeError('Param pos has to be an instance of the Position class');
		// Set the current position of the rover
		this.position = pos;
		// Set the current heading index
		this.headingIdx = this.headings.indexOf(heading);

		if (!(plateau instanceof Plateau)) throw new Error('Param plateau has to be an instance of Plateau class');
		this.plateau = plateau;

		if (this.position.x > this.plateau.width || this.position.y > this.plateau.height)
			throw new Error(`The initial position of the rover must be within the limits`
				+ `of the plateau. Rover Position:(${this.position.x}, ${this.position.y})` +
				`  Plateau: { Width: ${this.plateau.width}, Height: ${this.plateau.height} }`);
	}

	turnRight() {
		// Turning clockwise and keeping the index between zero and the length of headings - 1
		this.headingIdx = (++this.headingIdx + this.headings.length) % this.headings.length;
	}

	turnLeft() {
		// Turning anticlockwise and keeping the index between zero and the length of headings - 1
		this.headingIdx = (--this.headingIdx + this.headings.length) % this.headings.length;
	}

	move() {
		switch (this.headingIdx) {
			case 0: // Move North
				this.position.y++;
				if (this.position.y > this.plateau.height)
					throw new Error('Rover moved outside the Plateau limit in the North direction.');
				break;
			case 1: // Move East
				this.position.x++;
				if (this.position.x > this.plateau.width)
					throw new Error('Rover moved outside the Plateau limit in the East direction.');
				break;
			case 2: // Move South
				this.position.y--;
				if (this.position.y < 0) throw new Error('Rover moved outside the Plateau limit in the South direction.');
				break;
			case 3: // Move West
				this.position.x--;
				if (this.position.x < 0) throw new Error('Rover moved outside the Plateau limit in the West direction');
				break;
			default:
				throw new Error('Rover current heading is in an supported state!!');
		}
	}

	executeCommand(cmdString) {
		// Breaking down the command string into an array of chars.
		let cmds = cmdString.split('');

		for (let cmd of cmds) {
			switch (cmd) {
				case 'L':
					this.turnLeft();
					break;
				case 'R':
					this.turnRight();
					break;
				case 'M':
					this.move();
					break;
				default:
					throw new Error(`Unsupported command: ${cmd}`);
			}
		}
	}

	locationAndHeadingString() {
		return `${this.position.x} ${this.position.y} ${this.headings[this.headingIdx]}`;
	}
}

module.exports = Rover;