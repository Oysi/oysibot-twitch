
const info = {};

info.on_message = (channel, tags, message, self) => {
	if (tags.username === "urgie") {
		const result = message.match(/^(.+) is (\d+)\% boy\.$/)
		if (result) {
			// console.log("name", result[1]);
			// console.log("value", result[2]);
			// info.client.say(channel, result[1] + ", " + result[2]);
			
			const name = result[1];
			const amnt = result[2];
			
			if (!info.conf_cmd.least_boy || (amnt <= info.conf_cmd.least_boy.amnt)) {
				info.conf_cmd.least_boy.name = name;
				info.conf_cmd.least_boy.amnt = amnt;
			}
			if (!info.conf_cmd.most_boy || (amnt >= info.conf_cmd.most_boy.amnt)) {
				info.conf_cmd.most_boy.name = name;
				info.conf_cmd.most_boy.amnt = amnt;
			}
			
			info.client.say(
				channel,
				`most boy: ${info.conf_cmd.most_boy.name} (${info.conf_cmd.most_boy.amnt}%)`
				+ ", "
				+ `least boy: ${info.conf_cmd.least_boy.name} (${info.conf_cmd.least_boy.amnt}%)`
			)
		}
	}
}

module.exports = info;
