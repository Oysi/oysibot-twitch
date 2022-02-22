
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	if (info.msg_cmd === "addtomychannel") {
		
	}
	if (!info.is_mod()) return;
	
	const parts = info.msg_cmd.split(" ");
	if (parts[0] === "cmd") {
		if (parts[1] === "list") {
			let list = [];
			for (let name in Command.list) {
				if (info.channel.is_command_enabled(name)) {
					list.push(name + " VoteYea");
				} else {
					list.push(name + " VoteNay");
				}
			}
			info.say(list.join(" | "));
			list = [];
			for (let name in info.conf.channel_commands) {
				if (info.conf.channel_commands[name]) {
					list.push(name);
				}
			}
			if (list.length > 0) {
				info.say("Text commands: " + list.join(" | "));
			}
		} else if (parts[1] === "enable") {
			const name = parts[2];
			if (Command.list[name]) {
				if (!info.channel.is_command_enabled(name)) {
					info.conf.commands[name].enabled = true;
					info.update_conf();
					info.say("cmd enabled: " + name);
				}
			}
		} else if (parts[1] === "disable") {
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
	} else if (parts[0].startsWith("!") && info.is_mod()) {
		if (parts[1] == null || parts[1] === "") {
			info.say("oysibot !<cmd> {<message>, DELETE}");
		} else if (parts[1] === "DELETE") {
			const command_name = parts[0];
			const channel_command = info.conf.channel_commands[command_name];
			if (channel_command) {
				// delete info.conf.channel_commands[command_name];
				info.conf.channel_commands[command_name] = null;
				info.update_conf()
				info.respond("command deleted.");
			} else {
				info.respond("command does not exist.");
			}
		} else {
			const command_name = parts[0];
			const channel_command = info.conf.channel_commands[command_name];
			if (channel_command) {
				info.say(`@${info.tags.username} command already exists. You can delete it by typing: !oysibot ${command_name} DELETE`);
			} else {
				info.conf.channel_commands[command_name] = parts.slice(1).join(" ");
				info.update_conf();
				info.respond("created command " + command_name);
			}
		}
	} else {
		info.say("oysibot {cmd, !<cmd>}");
	}
}

module.exports = command;
