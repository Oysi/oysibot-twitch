
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	info.say(`@${info.tags.username} https://youtu.be/cA5m3IwwB1w`);
	// info.say(`@${info.tags.username} https://www.youtube.com/watch?v=cA5m3IwwB1w`);
}

module.exports = command;
