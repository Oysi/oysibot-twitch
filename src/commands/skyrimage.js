
const moment = require("moment");

require("moment-precise-range-plugin");

const Command = require("../Command.js");
const command = new Command();

command.on_message = (info) => {
	const moment_a = moment("2011-11-11 00:00:00");
	const moment_b = moment();
	
	const dif = moment.preciseDiff(moment_b, moment_a, true);
	
	let text = "";
	
	text = "Skyrim is ";
	text += dif.years  + " year"  + (dif.years  == 0 ? "" : "s") + ", ";
	text += dif.months + " month" + (dif.months == 0 ? "" : "s") + ", ";
	text += dif.days   + " day"   + (info.days   == 0 ? "" : "s") + " ";
	text += " old";
	
	info.respond(text);
}

module.exports = command;
