const fetch = require("node-fetch");
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: "yeet",
    description: "",
    args: false,
    usage: `${prefix}yeet`,
    execute(message) {
    let color = message.member.displayColor
    loadTitle(message)
    message.channel.startTyping()
//Functions ->
        function loadTitle() {
            fetch('https://www.reddit.com/r/YEET.json?limit=1000&?sort=top&t=all')
              .then(res => res.json())
              .then(json => json.data.children.map(t => t.data))
              .then(data => postRandomTitle(data))
          }
          function postRandomTitle(data) {
            const randomTitle = data[Math.floor(Math.random() * data.length) + 1];
            const RTSelftext = randomTitle.selftext.substring(0, 2048);
            const RTTitle = randomTitle.title.substring(0, 256);
            const embed = new Discord.MessageEmbed({
                "title": RTTitle,
                "description": RTSelftext,
                "color": color,
                "author": {
                  "name": `Submitted by ${randomTitle.author}`
                },
                "image": {
                    "url": `${randomTitle.url}`,
                },
                "footer": {
                  "text": `${randomTitle.ups} updoots`
                }
              });
//Functions <-
    message.channel.stopTyping(true)
    message.channel.send(embed);
          } 
    },
}