import { Command } from "discord-akairo";

export default class CommandCommand extends Command {
	constructor() {
		super("", {
			aliases: [""],
			description: { description: "", usage: "" },
			channel: "guild",
		});
	}

	async exec(): Promise<void> {
		//
	}
}