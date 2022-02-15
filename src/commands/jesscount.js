
const Command = require("../Command.js");
const command = new Command();

const request = require("request");

command.on_message = (info) => {
	request(`https://tmi.twitch.tv/group/user/${info.chan}/chatters`, (err, res, body) => {
		const data = JSON.parse(body);
		let count = 0;
		
		for (const chatter_type in data.chatters) {
			for (const name of data.chatters[chatter_type]) {
				if (name.match("jess")) {
					count += 1;
				}
			}
		}
		
		let text;
		
		if (count == 1) {
			text = `There is ${count} jess in chat.`;
		} else {
			text = `There are ${count} jesses in chat.`;
		}
		
		info.say(text);
	})
}

module.exports = command;
