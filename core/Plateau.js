class Plateau {
	constructor(width, height) {
		if (typeof width !== 'number' || typeof height !== 'number')
			throw new Error("Both the width and height of the Plateau has to be numbers");

		if (width < 0 || height < 0)
			throw new Error('Both the width and height of the Plateau has to be greater than or equal to zero.');

		this.width = parseInt(width);
		this.height = parseInt(height);
	}
}

module.exports = Plateau;