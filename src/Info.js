
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
		return Command.get_command(this) || this.channel.get_text_command(this);
	}
	
	is_mod() {
		if (!this.tags) return false;
		if (this.tags.username === "oysi") {
			return true;
		}
		if (!this.tags.badges) return false;
		if (this.tags.badges.broadcaster === "1") {
			return true;
		}
		if (this.tags.badges.moderator === "1") {
			return true;
		}
		return false;
	}
	
	say(msg) {
		client.say(this.chan, msg);
	}
	
	respond(msg) {
		client.say(this.chan, `@${this.tags.username} ${msg}`)
	}
}

module.exports = Info
