const Discord = require('discord.io');
const fs = require('fs');
const auth = require('./auth.json');
const characters = require('./dnd');

const prefix = "d?";

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
bot.on('message', function (user, userID, channelID, message, event) {
	// if(!message.startsWith(prefix)) {
	// 	// message start with a D
	// 	let match = message.match(/^d([1-9][0-9]*)$/);
	// 	if (match)        
	// 		bot.sendMessage({
	// 		to: channelID,
	// 		embed: {
	// 			color: 46330,
	// 				fields: [{
	// 				name: user + " rolled the dice",
	// 				value: "dice value : " + Math.floor(Math.random()*parseInt(match[1])+1),
	// 				inline:true
	// 			}]
	// 		}
	// 	});
	//   // end of the code  
	// }
	// // end of the first if
	// else 
	if(message.startsWith(prefix)) {
	// message start with d?
	let cmd = message.slice(prefix.length).split(" ");
		if(cmd[0] == "profile") {
		// message start with ! but the 6 characters left are mystat
		fs.readFile(`./characters/${userID}.json`,'utf8',function(err, data) {
			if(err) {
				bot.sendMessage({
					to: channelID,
					message : "Error user not found"
				});
			}
			else {
				// else
			let d = JSON.parse(data);
			bot.sendMessage({
				to: channelID,
				embed: {
					color: 46330,
					title : `${user.toUpperCase()} STATS : `,
					fields: [{
						name: "character name :",
						value: d.characterName,
						inline:true
					},
					{
						name : "race :",
						value : d.characterRace,
						inline:true
					},
					{
						name : "class :",
						value : d.characterClass,
						inline:true
					},
					{
						name : `Strenth`,
						value : d.characterStats.Strength,
						inline:true
					},
					{
						name : `Intelligence`,
						value : d.characterStats.Intelligence,
						inline:true
					},
					{
						name : `Dexterity`,
						value : d.characterStats.Dexterity,
						inline:true
					},
					{
						name : `Wisdom`,
						value : d.characterStats.Wisdom,
						inline:true
					},
					{
						name : `Charisma`,
						value : d.characterStats.Charisma,
						inline:true
					}
					]
				}
			});
					// end of the else
			}
		});
	}
	else if(cmd[0] == "changeName") {
		let data = fs.readFileSync(`./characters/${userID}.json`);
		let d = JSON.parse(data);
		let oldName = d.characterName;
		d.characterName=cmd[1];
		bot.sendMessage({
			to:channelID,
			message:`Character name ${oldName} changed to ${cmd[1]}.`
		});
		fs.writeFileSync(`./characters/${userID}.json`, JSON.stringify(d, null, 2));
	}
	else if(cmd[0] == "changeClass") {
		let data = fs.readFileSync(`./characters/${userID}.json`);
		let d = JSON.parse(data);
		let oldclass = d.characterClass;
		d.characterClass=cmd[1];
		bot.sendMessage({
			to:channelID,
			message:`Character class ${oldclass} changed to ${cmd[1]}.`
		});
		fs.writeFileSync(`./characters/${userID}.json`, JSON.stringify(d, null, 2));
	}
	else if(cmd[0] == "create") {
		if(fs.existsSync(`./characters/${userID}.json`)) {
			bot.sendMessage({
				to:channelID,
				message:`Error, Character ${cmd[1]} already exist for that user.`
			});
		}
		else {
			characters(userID, cmd[1], cmd[2], cmd[3]);
			bot.sendMessage({
				to:channelID,
				message:`Character ${cmd[1]} created.`
			});
		}
	}
	else if(cmd[0] == "rip") {
		
	}
			// Nothing else happend
}
    // end of the message event
});

bot.on('disconnect', (errMsg, code) => {
	if(errMsg) {
			console.log(errMsg, code);
	}
	bot.connect();
});