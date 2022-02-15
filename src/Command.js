
const fs = require("fs");

class Command {
	static list = {};
	
	constructor() {
	}
	
	static load_commands() {
		console.log("loading commands...");
		fs
		.readdirSync(`${__dirname}/commands/`)
		.forEach((file) => {
			const name = file.slice(0, -3);
			console.log(`loading command ${name}...`)
			const command = require(`${__dirname}/commands/${name}.js`);
			command.name = name;
			Command.list[name] = command;
		})
	}
	
	static get_command(info) {
		const result = info.msg.match(/^!([a-zA-Z_]+) ?(.*)$/);
		if (!result) return;
		
		const name = result[1];
		
		const command = Command.list[name];
		if (!command) return;
		
		if (command.mod && !info.is_mod()) return;
		
		if (!info.channel.is_command_enabled(name)) return;
		
		info.msg_cmd = result[2];
		
		return command;
	}
}

module.exports = Command;
