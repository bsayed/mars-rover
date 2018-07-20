class Position {
	constructor(x, y) {
		if (typeof x !== 'number' || typeof y !== 'number')
			throw new Error("Both the x and y of the Position has to be numbers");

		if (x < 0) throw new Error('X-Coordinate can not be less than zero');
		if (y < 0) throw new Error('Y-Coordinate can not be less than zero');

		this.x = x;
		this.y = y;
	}
}

module.exports = Position;