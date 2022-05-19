// NetClaw Raspberry Pi Server
// Code by Charlie & Sam from Netclaw, 22 August 2021
// Test update 2

const Gpio = require('onoff').Gpio;
const up = new Gpio(5, 'out');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const { times } = require('lodash');
//const { response } = require('express');

// Valid commands
const validCommands = ["up", "down", "left", "right", "go", "start", "drop", "stop"];

// Express consts
const app = express();
const port = 8000;

// Api vars
var command;
var auth;

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
	console.log(command);

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
			}
			else if (command == "start") {
				start.writeSync(1);
			}
			else if (command == "drop") {
				drop.writeSync(1);
			}
			else if (command == "stop") {
				stop.writeSync(1);
			}

			res.sendStatus(200); // Send OK if task completed successfully
		}
		else {
			throw('Unrecognised command');
		}
	}
	catch(err) {
		// An error occured
		res.send(err);
		res.sendStatus(400); // Send request error - 400
	}

	
	
})

app.listen(port, () => {
  console.log(`Pi server up at port ${port}`)
})
