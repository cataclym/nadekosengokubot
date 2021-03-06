"use strict";
import db from "quick.db";
const ReminderList = new db.table("ReminderList");
import { MessageEmbed } from "discord.js";
import { config } from "../../config.js";
import { Command, Flag, Argument } from "discord-akairo";
import { editMessageWithPaginatedEmbeds } from "@cataclym/discord.js-pagination-ts-nsb";
import { getMemberColorAsync } from "../../functions/Util.js";
import { Message } from "discord.js";
module.exports = class TodoCommand extends Command {
	constructor() {
		super("todo", {
			aliases: ["todo", "note"],
			description: {
				description: "A personal todo list",
				usage: `(Displays list)\n${config.prefix}todo add make cake 07/07/2020\n${config.prefix}todo remove 5\n${config.prefix}todo remove last\n${config.prefix}todo remove first\n${config.prefix}todo remove all`,
			},
		});
	}
	*args() {
		const method = yield {
			type: [
				["add"],
				["remove", "rem", "delete", "del"],
			],
		};
		if (!Argument.isFailure(method)) {
			return Flag.continue(method);
		}
	}

	async exec(message: Message) {
		const color = await getMemberColorAsync(message), reminder: { todo: unknown[] | undefined } = ReminderList.fetch(`${message.author.id}`);
		let reminderArray;
		reminder?.todo?.length ? reminderArray = reminder.todo.map((a: unknown[]) => a.join(" ")) : reminderArray = ["Empty list"];
		const pages = [];
		for (let index = 30, p = 0; p < reminderArray.length; index = index + 30, p = p + 30) {
			const embed = new MessageEmbed()
				.setTitle("Todo")
				.setAuthor(message.author.tag)
				.setThumbnail("https://cdn.discordapp.com/attachments/717045690022363229/726600392107884646/3391ce4715f3c814d6067911438e5bf7.png")
				.setColor(color)
				.setDescription(reminderArray.map((item: string, i: number) => `${+i + 1}. ${item}`).slice(p, index).join("\n") + `\n\nTo learn more about the command, type \`${config.prefix}help todo\``);
			pages.push(embed);
		}
		await editMessageWithPaginatedEmbeds(message, pages, {});
	}
};