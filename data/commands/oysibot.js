
const info = {};

info.on_message = (channel, tags, message, self) => {
	if (!message) {
		
	}
	const parts = message.split(" ");
	if (parts[0] === "cmd") {
		if (parts[1] === "") {
			
		} else {
			const list = [];
			for (let key in commands) {
				let text = "!" + key;
				list.push("!" + key);
			}
			const text = list.join(", ");
			info.client.say(channel, "cmds: " + text);
		}
	} else {
		info.client.say(channel, "hello, I am oysibot, and now I may show you information: bla bla bla");
	}
}

module.exports = info;
