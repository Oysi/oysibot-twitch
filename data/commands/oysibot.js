
const info = {};



info.on_message = (channel, tags, message, self) => {
	const parts = message.split(" ");
	if (parts[0] === "cmd") {
		if (parts[1] === "list") {
			// const list_enabled = [];
			// const list_disabled = [];
			// for (let key in commands) {
			// 	let text = "!" + key;
			// 	if (is_cmd_on(info, key)) {
			// 		list_enabled.push(text);
			// 	} else {
			// 		list_disabled.push(text);
			// 	}
			// }
			// const text = "Enabled: " + list_enabled.join(", ") + ". Disabled: " + list_disabled.join(", ");
			// client.say(channel, text);
			
			let text = "";
			const list = [];
			for (let key in commands) {
				// let cmd = "!" + key;
				let cmd = key;
				if (is_cmd_on(info, key)) {
					list.push(cmd + " VoteYea");
				} else {
					list.push(cmd + " VoteNay");
				}
			}
			client.say(channel, list.join(" | "));
		} else if (parts[1] == "enable") {
			const cmd_name = parts[2];
			let changed = false;
			if (!info.conf.commands[cmd_name]) {
				info.conf.commands[cmd_name] = {};
				changed = true;
			}
			if (info.conf.commands[cmd_name].enabled != true) {
				info.conf.commands[cmd_name].enabled = true;
				changed = true;
				client.say(channel, "cmd enabled: !" + cmd_name);
			}
			if (changed) {
				info.conf_save();
			}
		} else if (parts[1] == "disable") {
			const cmd_name = parts[2];
			let changed = false;
			if (!info.conf.commands[cmd_name]) {
				info.conf.commands[cmd_name] = {};
				changed = true;
			}
			if (info.conf.commands[cmd_name].enabled != false) {
				info.conf.commands[cmd_name].enabled = false;
				changed = false;
				client.say(channel, "cmd disabled: !" + cmd_name);
			}
			if (changed) {
				info.conf_save();
			}
		} else {
			info.client.say(channel, " oysibot cmd <list, enable, disable>");
		}
	} else {
		info.client.say(channel, " oysibot <cmd>");
	}
}

module.exports = info;
