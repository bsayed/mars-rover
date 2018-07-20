const Plateau = require('./Plateau');
const Position = require('./Position');
const Rover = require('./Rover');


class Controller {
	static exec(plateauWidth, plateauHeight, rovers) {
		try {
			this.plateau = new Plateau(plateauWidth, plateauHeight);
		} catch (e) {
			console.error(`Creating plateau object failed with: ${e.toString()}`);
			return;
		}

		if (!(rovers instanceof Array))
			throw new Error("Param 'rovers' has to be an Array of objects in the following format: [{pos:'1 2 N', cmd: 'LMMR'}]");

		for (let r of rovers) {
			let posAndHeading = r.pos.split(' '); // Splitting the position string
			let pos;
			try {
				let x = parseInt(posAndHeading[0]);
				let y = parseInt(posAndHeading[1]);
				pos = new Position(x, y);
			} catch (e) {
				console.error(`Parsing of rover position failed with: ${e.toString()}`);
				continue; // skipping this rover, maybe this data got corrupted somehow.
			}
			try {
				let rover = new Rover(pos, posAndHeading[2], this.plateau);
				rover.executeCommand(r.cmd);
				console.log(rover.locationAndHeadingString());
			} catch (e) {
				console.error(`Creating and moving a rover failed with: ${e.toString()}`);
			}
		}
	}
}


module.exports = Controller;