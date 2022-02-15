
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	if (info.msg_cmd === "addtomychannel") {
		
	}
	if (!info.is_mod()) return;
	
	const parts = info.msg_cmd.split(" ");
	if (parts[0] === "cmd") {
		if (parts[1] === "list") {
			const list = [];
			for (let name in Command.list) {
				if (info.channel.is_command_enabled(name)) {
					list.push(name + " VoteYea");
				} else {
					list.push(name + " VoteNay");
				}
			}
			info.say(list.join(" | "));
		} else if (parts[1] == "enable") {
			const name = parts[2];
			if (Command.list[name]) {
				if (!info.channel.is_command_enabled(name)) {
					info.conf.commands[name].enabled = true;
					info.update_conf();
					info.say("cmd enabled: " + name);
				}
			}
		} else if (parts[1] == "disable") {
			const name = parts[2];
			if (Command.list[name]) {
				if (info.channel.is_command_enabled(name)) {
					info.conf.commands[name].enabled = false;
					info.update_conf();
					info.say("cmd disabled: " + name);
				}
			}
		} else {
			info.say("oysibot cmd {list, enable, disable}");
		}
	} else {
		info.say("oysibot {cmd}");
	}
}

module.exports = command;
