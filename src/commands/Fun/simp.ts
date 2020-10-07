import Canvas from "canvas";
import Discord from "discord.js";
import { Command } from "discord-akairo";
import { Message } from "discord.js";

module.exports = class SimpCommand extends Command {
	constructor() {
		super("simp", {
			aliases: ["simp"],
			description: { description: "Embarrass your simp friend", usage: "@dreb" },
			cooldown: 8000,
			typing: true,
			args: [{
				id: "member",
				type: "member",
				match: "rest",
				default: (message: Message) => {
					return message.member;
				},
			}],
		});
	}
	async exec(message: Message, args: any) {
		const member = args.member || args.default;
		const applyText = (canvas: Canvas.Canvas, text: string) => {
			const ctx = canvas.getContext("2d");
			// Declare a base size of the font
			let fontSize = 60;
			do {
				// Assign the font to the context and decrement it so it can be measured again
				ctx.font = `${fontSize -= 1}px sans-serif`;
				// Compare pixel width of the text to the canvas minus the approximate avatar size
			} while (ctx.measureText(text).width > canvas.width / 3);

			// Return the result to use in the actual canvas
			return ctx.font;
		};
		const canvas = Canvas.createCanvas(500, 400);
		const ctx = canvas.getContext("2d");

		const background = await Canvas.loadImage("./images/simp.jpg");
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = "#000000";
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		ctx.font = applyText(canvas, member.displayName);
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(member.displayName, 350, 280);

		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png" }));
		ctx.drawImage(avatar, 300, 140, 100, 100);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "Simper.jpg");
		await message.util?.send(`Haha, you're a simp!! ${member.user}`, attachment);
	}
};