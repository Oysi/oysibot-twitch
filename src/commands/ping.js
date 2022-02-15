
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	info.say(`pong @${info.tags.username}`);
}

module.exports = command;
