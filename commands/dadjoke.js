const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: 'dadjoke',
    description: '',
    execute(message) {       
        loadTitle(message);
        let color = getRandomColor()
        function loadTitle() {
            fetch('https://www.reddit.com/r/dadjokes.json?limit=150&?sort=top&t=all')
              .then(res => res.json())
              .then(json => json.data.children.map(t => t.data))
              .then(data => postRandomTitle(data))
          }
          function postRandomTitle(data) {
            const randomTitle = data[Math.floor(Math.random() * data.length) + 1];
            const embed = new Discord.MessageEmbed({
                "title": randomTitle.title,
                "description": randomTitle.selftext,
                "color": color,
                "author": {
                  "name": `Submitted by ${randomTitle.author}`
                },
                "footer": {
                  "text": `${randomTitle.ups} updoots`
                }
              });
            message.channel.send(embed)
          }
          function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }
    },
};