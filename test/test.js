const assert = require('assert');
const Plateau = require('../core/Plateau');
const Position = require('../core/Position');
const Rover = require('../core/Rover');
const InputParser = require('../util/InputParser');

describe('Plateau Class Tests', function () {
	describe('#constructor()', function () {
		it('Should throw an exception when created with negative width', function () {
			assert.throws(() => new Plateau(-1, 4));
		});

		it('Should throw an exception when created with negative height', function () {
			assert.throws(() => new Plateau(1, -4));
		});

		it('Should throw an exception when created with a string height', function () {
			assert.throws(() => new Plateau(1, "-4"));
		});

		it('Should throw an exception when created with a string width', function () {
			assert.throws(() => new Plateau("3", 4));
		});

		it('Should not throw when created with proper args', function () {
			assert.doesNotThrow(() => new Plateau(5, 5));
		})
	});
});


describe('Position Class Tests', function () {
	describe('#constructor()', function () {
		it('Should throw an exception when created with negative x', function () {
			assert.throws(() => new Position(-1, 4));
		});

		it('Should throw an exception when created with negative y', function () {
			assert.throws(() => new Position(1, -4));
		});

		it('Should throw an exception when created with a string y', function () {
			assert.throws(() => new Position(1, "-4"));
		});

		it('Should throw an exception when created with a string x', function () {
			assert.throws(() => new Position("3", 4));
		});

		it('Should not throw when created with proper args', function () {
			assert.doesNotThrow(() => new Position(5, 5));
		})
	});
});

describe('Rover Class Tests', function () {
	describe('#constructor()', function () {
		it('Should throw an exception when created with unsupported heading', function () {
			assert.throws(() => new Rover(new Position(1, 4), "B", new Plateau(5, 5)));
		});
		it('Should throw an exception when created with wrong Position object', function () {
			assert.throws(() => new Rover({x: 1, y: 4}, "N", new Plateau(5, 5)));
		});
		it('Should throw an exception when created with wrong Plateau object', function () {
			assert.throws(() => new Rover(new Position(1, 4), "N", {width: 1, height: 4}));
		});
		it('Should throw an exception when created with Position outside the Plateau limits', function () {
			assert.throws(() => new Rover(new Position(10, 40), "N", new Plateau(5, 5)));
		});
	});

	describe('#executeCommand()', function () {
		it('Should throw an exception when executing unsupported command', function () {
			assert.throws(() => {
				let r = new Rover(new Position(1, 1), "N", new Plateau(5, 5));
				r.executeCommand("LRMZZ");
			});
		});
		it('Should throw an exception when executing a command that moves the rover outside the Plateau limits',
			function () {
				assert.throws(() => {
					let r = new Rover(new Position(1, 1), "N", new Plateau(5, 5));
					r.executeCommand("MMMMMMMMMM");
				});
			});
		it('Should arrive at the same heading when the rover turns 4 times in right direction', function () {
			let r = new Rover(new Position(1, 1), "N", new Plateau(5, 5));
			r.executeCommand("RRRR");
			assert.equal("1 1 N", r.locationAndHeadingString());
		});
		it('Should arrive at the same heading when the rover turns 4 times in left direction', function () {
			let r = new Rover(new Position(1, 1), "E", new Plateau(5, 5));
			r.executeCommand("LLLL");
			assert.equal("1 1 E", r.locationAndHeadingString());
		});
		it('Rover position should be 4 1 E when moved 4 times without changing heading', function () {
			let r = new Rover(new Position(1, 1), "E", new Plateau(5, 5));
			r.executeCommand("MMM");
			assert.equal("4 1 E", r.locationAndHeadingString());
		});
	});
});

describe('Controller Class Tests', function () {
	describe('#constructor()', function () {
		it('Should throw an exception when created with rovers arg being not an instance of Array', function () {
			assert.throws(() => Controller.exec(4, 4, {}));
		});
	});
});

describe('InputParser Class Tests', function () {
	describe('#parseInput()', function () {
		it('Should parse the input correctly', function () {
			assert.deepEqual(InputParser.parseInput(['5 5', '1 2 N', 'LMLMLMLMM', '3 3 E', 'MMRMMRMRRM']),
				{
					plateauWidth: 5,
					plateauHeight: 5,
					rovers: [{pos: '1 2 N', cmd: 'LMLMLMLMM'}, {pos: '3 3 E', cmd: 'MMRMMRMRRM'}]
				});
		});
	});
});
