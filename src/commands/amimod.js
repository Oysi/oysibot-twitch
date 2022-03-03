
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	if (info.is_mod()) {
		info.respond("You are mod");
	} else {
		info.respond("You are not mod");
	}
}

module.exports = command;
