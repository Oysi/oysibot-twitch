
const Channel = require("./Channel.js");
const Command = require("./Command.js");

class Info {
	constructor(chan, tags, msg, self) {
		this.chan = chan.substring(1);
		this.tags = tags;
		this.msg = msg;
		this.self = self;
		
		this.channel = this.get_channel();
		
		this.conf = this.channel.conf;
		this.update_conf = () => {
			this.channel.update_conf();
		}
		
		this.command = this.get_command();
	}
	
	get_channel() {
		return Channel.get_channel(this);
	}
	
	get_command() {
		return Command.get_command(this);
	}
	
	is_mod() {
		return (
			this.tags.username === "oysi"
			|| this.tags.badges.moderator === "1"
			|| this.tags.badges.broadcaster === "1"
		);
	}
	
	say(msg) {
		client.say(this.chan, msg);
	}
}

module.exports = Info
