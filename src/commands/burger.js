
const Command = require("../Command.js");
const command = new Command();

const fetch = require("node-fetch");

command.on_message = (info) => {
	fetch("https://oysi.tv/api/burger")
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		info.respond(data.link);
	})
}

module.exports = command;
