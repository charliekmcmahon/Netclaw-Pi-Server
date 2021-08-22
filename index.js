// NetClaw Raspberry Pi Server.
// Code by Macca, 22 August 2021

const Gpio = require('onoff').Gpio;
const express = require('express');
const app = express();
const port = 8000;

// Api vars
var command;
var auth;

app.get('/', (req, res) => {
  res.send('This is a NetClaw node. Please go to netclaw.com.au to play.')
})

app.post('/api', (req, res) => {
	command = req;
	console.log(command);
	
	res.send('Success');
	
})

app.listen(port, () => {
  console.log(`Pi server up at port ${port}`)
})
