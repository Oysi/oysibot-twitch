
const info = {};

info.on_message = (channel, tags, message, self) => {
	info.client.say(channel, "pong");
}

module.exports = info;
