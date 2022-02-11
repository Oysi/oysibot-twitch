
const request = require("request");

const info = {};

info.on_message = (channel, tags, message, self) => {
	request(`https://tmi.twitch.tv/group/user/${channel}/chatters`, (err, res, body) => {
		const data = JSON.parse(body);
		let count = 0;
		
		for (chatter_type in data.chatters) {
			for (const name of data.chatters[chatter_type]) {
				if (name.match("jess")) {
					count += 1;
				}
			}
		}
		
		let text
		
		if (count == 1) {
			text = `There is ${count} jess in chat.`
		} else {
			text = `There are ${count} jesses in chat.`
		}
		
		info.client.say(channel, text);
	})
}

module.exports = info;
