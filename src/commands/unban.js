
const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	if (!info.is_mod()) return;
	
	const name = info.msg_cmd.toLowerCase();
	
	if (!name.match(/^[a-z\d_]+$/)) {
		info.respond("That is not a valid username.");
		return;
	}
	
	client.unban(info.chan, name)
	.then(() => {
		info.respond(`Successfully unbanned ${name}`);
	}, (err) => {
		console.log("ERROR");
		console.log(err);
		info.respond("Something went wrong, could not unban.");
	})
}

module.exports = command;
