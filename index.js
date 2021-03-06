// NetClaw Raspberry Pi Server
// Code by Charlie & Sam from Netclaw, 22 August 2021
// Test update 2

const Gpio = require('onoff').Gpio;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { times } = require('lodash');
//const { response } = require('express');

const pins = {"up":5, "down":6, "left":13, "right":19, "drop":26, "start":21};

const up = new Gpio(pins["up"], 'out');
const down = new Gpio(pins["down"], 'out');
const left = new Gpio(pins["left"], 'out');
const right = new Gpio(pins["right"], 'out');
const drop = new Gpio(pins["drop"], 'out');
const start = new Gpio(pins["start"], 'out');

// Valid commands
const validCommands = ["up", "down", "left", "right", "go", "start", "drop", "stop"];

// Express consts
const app = express();
const port = 8000;

// Api vars
var command;
var auth;
var previousCmd;

// Express options
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  var resp = 'This is a NetClaw node. Please go to netclaw.com.au to play. Version ';
  resp = resp + toString(Math.floor(Date.now() / 60000));
  res.send(resp);
})
app.get('/up', (req, res) => {
	res.send('Up!');
  up.writeSync(1);
  })
  app.get('/stop', (req, res) => {
	res.send('Stop!');
  up.writeSync(0);
  })

app.post('/api', (req, res) => {
	command = req.body.command;

	try {
		if (validCommands.includes(command)) {
			// Send GPIO based on command
			console.log(`Command processed: '${command}'`);

			if (command == "up") {
				up.writeSync(1);
			}
			else if (command == "down") {
				down.writeSync(1);
			}
			else if (command == "left") {
				left.writeSync(1);
			}
			else if (command == "right") {
				right.writeSync(1);
			}
			else if (command == "go") {
				go.writeSync(1);
				setTimeout(function() {
					go.writeSync(0);
				  }, 100);
			}
			else if (command == "start") {
				start.writeSync(1);
				setTimeout(function() {
					start.writeSync(0);
				  }, 100);
			}
			else if (command == "drop") {
				left.writeSync(1);
				setTimeout(function() {
					left.writeSync(0);
				  }, 50);
				drop.writeSync(1);
				setTimeout(function() {
					drop.writeSync(0);
				  }, 100);
			}
			else if (command == "stop") {
				up.writeSync(0);
				down.writeSync(0);
				left.writeSync(0);
				right.writeSync(0);
				drop.writeSync(0);
			}

			res.sendStatus(200); // Send OK if task completed successfully
		}
		else {
			throw('Unrecognised command');
		}
	}
	catch(err) {
		// An error occured
		res.send(400);
	}

	
	
})

app.listen(port, () => {
  console.log(`Pi server up at port ${port}`)
})
