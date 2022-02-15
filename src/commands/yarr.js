
const Command = require("../Command.js");
const command = new Command();

const pirate_jokes = [
	"What did the sea say to the pirate? Nothing, it just waved!",
	"What's a pirate's favourite letter? You'd think it would be arrr, but it's actually the C!",
	"Why did two pirates get into an argument? Because they couldn't see aye to aye!",
	"Why are pirates called pirates? Because they arrr!",
	"How much did the pirate pay for his hook and his peg? An arm and a leg!",
	"What did the pirate say on his 80th birthday? Aye matey!",
	"Why couldn't the pirates play cards? Because they were standing on the deck!",
	"What do you call a pirate that skips school? Captain Hooky?",
	"Where do pirates buy their hooks? The second hand store!",
	"What's a pirate's favourite country? Arrr-gentina!",
	"How do you make a pirate furious? You take away the 'p'!",
	"What did the pirate say when he left his wooden leg in the freezer? Shiver me timbers!",
	"Why was the pirate ship so cheap? It was on sail!",
	"What's a pirate's favourite type of exercise? The plank!",
	"Why couldn't the pirate stop binge-watching the TV series? Because he was hooked!",
	"What's the difference between a pirate and a raspberry farmer? The pirate buries his treasures, but the farmer treasures his berries.",
	"What has 10 legs, 10 arms, and 10 eyes? 10 pirates!",
	"What's a pirate's favourite instrument? The guitarrr!",
	"What's a parrot's favourite game? Hide and speak!",
	"Why does it take forever for a pirate to learn the alphabet? Because he'll spend years at C!",
	"If Apple was a pirate ship, what would their crew wear? An iPatch!",
	"What's orange and sounds like a parrot? A carrot!",
	"Why are maths teachers secretly pirates? Because they're always trying to find X!",
	"Why is being a pirate so addictive? Because once you lose your first hand, you get hooked!",
	"What does pirate Santa say? Row row row!",
	"What do you call a pirate who steals from the rich and gives to the poor? Robin Hook!",
	"Why don't pirates take a bath before they walk the plank? Because they'll just wash up on shore later!",
	"How much did the pirate pay to get his ears pierced? A buck an ear!",
	"What's a pirate's favourite subject? Arrrt!",
	"What's a pirate's favourite type of fish? A swordfish!",
	"Why did the pirate buy an eyepatch! Because he couldn't get an iPhone!",
	"What happened to the crews when the red pirate ship fought with the blue pirate ship? They got marooned!",
	"What type of haircut does a pirate get? A crew cut!",
	"Why are pirates so good at singing? Because they can hit the high C's!",
	"Where are American pirates from? Arrrkansas!",
	"What was the pirate boxer's biggest strength? His left hook!",
	"What's a pirate's favourite element? Arrrgon . . . or gold!",
]

const fetch_joke = () => {
	return pirate_jokes[Math.floor(Math.random()*pirate_jokes.length)];
}

command.on_message = (info) => {
	info.say(fetch_joke());
}

module.exports = command;
