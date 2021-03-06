import { Argument, Command } from "discord-akairo";
import { User } from "discord.js";
import { MessageEmbed, Message } from "discord.js";
import { getMemberColorAsync, flags } from "../../functions/Util";


export default class FetchUserCommand extends Command {
	constructor() {
		super("fetch", {
			cooldown: 30000,
			aliases: ["fu", "fetch"],
			description: { description: "Fetches a discord user, shows relevant information. 30sec cooldown.", usage: "<id>" },
			args: [
				{
					id: "userObject",
					type: Argument.union("user", async (message: Message, phrase: string) => {
						try {
							const u = await message.client.users.fetch(phrase);
							if (u) return u;
						}
						catch {
							//
						}
						return message.author;
					}),
				},
			],
		});
	}
	async exec(message: Message, { userObject }: { userObject: User}): Promise<Message | void> {

		const userinfo = this.handler.modules.get("uinfo");

		if (message.guild?.members.cache.has(userObject.id) && userinfo) {
			return this.handler.runCommand(message, userinfo, await userinfo.parse(message, userObject.id));
		}

		const userFlags = userObject.flags ? userObject.flags.toArray() : [];
		const color = await getMemberColorAsync(message);

		const embed = new MessageEmbed()
			.setColor(color)
			.setDescription(userObject.username)
			.setThumbnail(userObject?.displayAvatarURL({ dynamic: true }))
			.setTitle(userObject.tag)
			.addFields([
				{ name: "ID", value: userObject.id, inline: true },
				{ name: "Account date", value: userObject?.createdAt?.toDateString(), inline: true }],
			);

		userObject.lastMessage ? embed.addField("Last (seen) message", userObject.lastMessage?.createdAt.toLocaleString(), true) : null;
		userObject.locale?.length ? embed.addField("Locale", userObject.locale, true) : null;

		userFlags.length ? embed.addField("Flags", userFlags.map((flag) => flags[flag]).join("\n"), true) : null;
		userObject.bot ? embed.addField("Bot", "✅", true) : null;
		return message.channel.send(embed);
	}
}