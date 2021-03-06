import db from "quick.db";
const Tinder = new db.table("Tinder");
import { SeparateTinderList } from "../../functions/tinder.js";
import { Command } from "discord-akairo";
import { Message } from "discord.js";

module.exports = class TinderListMarriesCommand extends Command {
	constructor() {
		super("tinderlistmarries", {
		});
	}

	async exec(message: Message) {
		const married = <string[]> [...new Set(Tinder.get(`married.${message.author.id}`))];
		return SeparateTinderList(message, married, `Spouses (${married.length - 1})`);
	}
};