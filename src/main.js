
const tmi = require("tmi.js");
const path = require("path");
const fs = require("fs");

const env = require("../conf.json");

const commands = [];
global.commands = commands;

// Array.prototype.sample = function() {
// 	return this[Math.floor(Math.random()*this.length)];
// }

fs
.readdirSync(`${__dirname}/../data/commands/`)
.forEach((command) => {
	command = command.slice(0, -3)
	console.log(`loading command ${command}...`)
	const chan = require(`${__dirname}/../data/commands/${command}.js`);
	commands[command] = chan;
})

const channels = [];
const channels_array = []
global.channels = channels;

fs
.readdirSync(`${__dirname}/../data/channels/`)
.forEach((channel) => {
	console.log(`loading channel ${channel}...`)
	
	const info = require(`${__dirname}/../data/channels/${channel}/chan.js`);
	
	info.channel = channel;
	info.conf = JSON.parse(fs.readFileSync(`${__dirname}/../data/channels/${channel}/conf.json`));
	info.conf_save = () => {
		fs.writeFileSync(`${__dirname}/../data/channels/${channel}/conf.json`, JSON.stringify(info.conf, null, "\t"));
	}
	
	// initial value
	let changed = false;
	if (!info.conf.commands) {
		info.conf.commands = {};
		changed = true;
	}
	if (info.conf.enabled == null) {
		info.conf.enabled = true;
		changed = true;
	}
	if (changed) {
		info.conf_save();
	}
	
	channels[channel] = info;
	channels_array.push(channel);
})

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: env.username,
		password: env.password
	},
	channels: channels_array
});

for (let key in commands) {
	commands[key].client = client;
}

for (let key in channels) {
	channels[key].client = client;
}

client.connect();

client.on("message", (channel, tags, message, self) => {
	if (self) return;
	
	channel = channel.substring(1);
	
	const info = channels[channel];
	
	if (info.conf.enabled) {
		const result = message.match(/^!([a-zA-Z_]+) ?(.*)$/);
		if (result) {
			const command_name = result[1]
			if (command_name === "oysibot") {
				let changed = false;
				if (!info.conf.commands[command_name]) {
					info.conf.commands[command_name] = {}
					changed = true;
				}
				if (!info.conf.commands[command_name].enabled) {
					info.conf.commands[command_name].enabled = true;
					changed = true;
				}
				if (changed) {
					info.conf_save();
				}
			}
			if (info.conf.commands[command_name] && info.conf.commands[command_name].enabled) {
				const command = commands[result[1]];
				if (command) {
					let message = result[2];
					// if (message === "") {
					// 	message = null;
					// }
					command.channel = info.channel;
					command.conf = info.conf;
					command.conf_cmd = info.conf.commands[command_name];
					command.conf_save = info.conf_save;
					command.on_message(info.channel, tags, message, self);
				}
			}
		}
		
		if (info.on_message) {
			info.on_message(channel, tags, message, self);
		}
	}
});

/*

This is what 'tags' looks like:

{
	'badge-info': null,
	badges: { broadcaster: '1' },
	'client-nonce': '4150c75d526b101597dcc925abc1ea82',
	color: '#FF0000',
	'display-name': 'oysi',
	emotes: null,
	'first-msg': false,
	flags: null,
	id: 'cd2ade2b-e1bd-4156-bb3e-7edfdacffd15',
	mod: false,
	'room-id': '24251949',
	subscriber: false,
	'tmi-sent-ts': '1644556144492',
	turbo: false,
	'user-id': '24251949',
	'user-type': null,
	'emotes-raw': null,
	'badge-info-raw': null,
	'badges-raw': 'broadcaster/1',
	username: 'oysi',
	'message-type': 'chat'
  }
*/