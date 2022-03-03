
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	if (!info.is_mod()) return;
	
	const name = info.msg_cmd.toLowerCase();
	
	if (!name.match(/^[a-z\d_]+$/)) {
		info.respond("That is not a valid username.");
		return;
	}
	
	info.respond(`testban (nothing actually happens) on ${info.msg_cmd}`)
}

module.exports = command;
