
require("dotenv").config();

const tmi = require("tmi.js");
const fs = require("fs");

const Channel = require("./Channel.js");
const Command = require("./Command.js");
const Info = require("./Info.js");

Channel.load_channels();
Command.load_commands();

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	},
	channels: Channel.get_channels_array(),
});

global.client = client

client.connect();

client.on("message", (chan, tags, msg, self) => {
	if (self) return;
	
	const info = new Info(chan, tags, msg, self);
	
	if (info.command) {
		info.command.on_message(info);
	}
	
	if (info.chan === "oysi") custom_oysi(info);
	if (info.chan === "urgie") custom_urgie(info);
});

const custom_oysi = (info) => {
}

const custom_urgie = (info) => {
	if (info.tags.username === "urgie") {
		const result = info.msg.match(/^(.+) is (\d+)\% boy\.$/)
		if (result) {
			const name = result[1];
			const amnt = result[2];
			
			if (!info.conf.least_boy) {
				info.conf.least_boy = {
					"name": "none",
					"amnt": "100",
				};
			}
			
			if (!info.conf.most_boy) {
				info.conf.most_boy = {
					"name": "none",
					"amnt": "0",
				};
			}
			
			if (Number(amnt) <= Number(info.conf.least_boy.amnt)) {
				info.conf.least_boy.name = name;
				info.conf.least_boy.amnt = amnt;
			}
			if (Number(amnt) >= Number(info.conf.most_boy.amnt)) {
				info.conf.most_boy.name = name;
				info.conf.most_boy.amnt = amnt;
			}
			
			info.update_conf();
			
			info.say(
				`most boy: ${info.conf.most_boy.name} (${info.conf.most_boy.amnt}%)`
				+ ", "
				+ `least boy: ${info.conf.least_boy.name} (${info.conf.least_boy.amnt}%)`
			);
		}
	}
	if ((info.msg === "!resetboys") && (info.tags.username === "urgie" || info.tags.username === "oysi")) {
		info.conf.least_boy.name = "none";
		info.conf.least_boy.amnt = "100";
		info.conf.most_boy.name = "none";
		info.conf.most_boy.amnt = "0";
		info.update_conf();
		info.say("boys have been reset");
	}
}

// extra comment for testing
