
const Command = require("../Command.js");
const command = new Command();

const request = require("request");

command.on_message = (info) => {
	let username = info.msg_cmd;
	if (username === "") {
		username = info.tags.username;
	}
	
	let url = "https://api.twitch.tv/helix/users?"
	
	const user_id = Number(username);
	if (user_id) {
		url += "id=" + user_id;
	} else {
		url += "login=" + username;
	}
	
	request(
		{
			url: url,
			method: "GET",
			json: true,
			headers: {
				"Client-ID": process.env.CLIENTID,
				"Authorization": "Bearer " + process.env.PASSWORD.substring(6),
			}
		},
		(err, res, body) => {
			try {
				info.say(`${body.data[0].login} : ${body.data[0].id} (${body.data[0].created_at.slice(0, 10)})`);
			} catch (e) {
				console.log("ERROR");
				console.log(e);
				info.say(`@${info.tags.username} could not find user.`);
			}
		}
	)
}

module.exports = command;
