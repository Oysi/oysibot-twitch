
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
			
			let changed = false;
			
			if (!info.conf.least_boy) {
				info.conf.least_boy = {
					"name": "none",
					"amnt": "100"
				};
				changed = true;
			}
			
			if (!info.conf.most_boy) {
				info.conf.most_boy = {
					"name": "none",
					"amnt": "0"
				};
				changed = true;
			}
			
			if (Number(amnt) <= Number(info.conf.least_boy.amnt)) {
				info.conf.least_boy.name = name;
				info.conf.least_boy.amnt = amnt;
				changed = true;
			}
			if (Number(amnt) >= Number(info.conf.most_boy.amnt)) {
				info.conf.most_boy.name = name;
				info.conf.most_boy.amnt = amnt;
				changed = true;
			}
			
			if (changed) {
				info.conf_save();
			}
			
			info.client.say(
				channel,
				`most boy: ${info.conf.most_boy.name} (${info.conf.most_boy.amnt}%)`
				+ ", "
				+ `least boy: ${info.conf.least_boy.name} (${info.conf.least_boy.amnt}%)`
			)
		}
	}
}

module.exports = info;
