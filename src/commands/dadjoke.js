
const Command = require("../Command.js");
const command = new Command();

const fetch = require("node-fetch");

command.on_message = (info) => {
	if (info.msg_cmd != "") {
		fetch(
			`https://icanhazdadjoke.com/search?term=${info.msg_cmd}`,
			{
				headers: {
					"Accept": "application/json"
				}
			}
		)
		.then(async (res) => {
			try {
				const data = await res.json();
				const entry = data.results[Math.floor(Math.random()*data.results.length)]
				if (entry) {
					info.say(entry.joke);
				} else {
					info.say(`@${info.tags.username} could not find a joke.`)
				}
			} catch (e) {
				console.log("ERROR");
				console.log(e);
			}
		})
	} else {
		fetch(
			"https://icanhazdadjoke.com/",
			{
				headers: {
					"Accept": "application/json"
				}
			}
		)
		.then(async (res) => {
			try {
				const data = await res.json();
				info.say(data.joke);
			} catch (e) {
				console.log("ERROR");
				console.log(e);
			}
		})
	}
}

module.exports = command;
