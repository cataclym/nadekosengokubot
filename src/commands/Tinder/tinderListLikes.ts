import db from "quick.db";
const Tinder = new db.table("Tinder");
import { SeparateTinderList } from "../../functions/tinder.js";
import { Command } from "discord-akairo";
import { Message } from "discord.js";

module.exports = class TinderListLikesCommand extends Command {
	constructor() {
		super("tinderlistlikes", {
		});
	}
	async exec(message: Message) {
		const likesID = <string[]> [...new Set(Tinder.get(`likeID.${message.author.id}`))];
		return SeparateTinderList(message, likesID, `Likes (${likesID.length - 1})`);
	}
};