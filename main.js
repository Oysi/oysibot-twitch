
const tmi = require('tmi.js');
const conf = require("./conf.json");

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: conf.username,
		password: conf.password
	},
	channels: conf.channels
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});
