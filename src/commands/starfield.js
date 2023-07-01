
const Command = require("../Command.js");
const command = new Command();

function getTimeUntilStarfield() {
	let date1 = moment.utc();
	let date2 = moment.utc([2023, 8, 1, 22]);

	let diff = date2.diff(date1) / 1000;

	if (diff < 0) {
		return "STARFIELD IS OUT!!!";
	}

	console.log(diff);

	let days = Math.floor(diff/(60*60*24));
	let hours = Math.floor(diff/(60*60)%24);
	let minutes = Math.floor(diff/60%60);
	let seconds = Math.floor(diff%60);

	let arr = [];

	if (days > 0) {
		if (days === 1) {
			arr.push(days + " day");
		} else {
			arr.push(days + " days");
		}
	}
	if (days > 0 || hours > 0) {
		if (hours === 1) {
			arr.push(hours + " hour");
		} else {
			arr.push(hours + " hours");
		}
	}
	if (days > 0 || hours > 0 || minutes > 0) {
		arr.push(minutes + " min");
	}
	if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
		arr.push(seconds + " sec");
	}

	let text = arr.join(" ");

	return arr.join(" ");
}

command.on_message = (info) => {
	const text = getTimeUntilStarfield();
	info.respond(text);
}

module.exports = command;
