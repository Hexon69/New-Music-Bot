const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "speed",
  description: `Speeds Up The Song`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Filters",
  cooldown: 10,
player: true,
  inVc: true,
  sameVc: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    let player = client.poru.players.get(message.guild.id) 
    if (!args.length)
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`Enter The Speed Limit between < 0.1 - 2.0 >`)
        ]
      });
    if (isNaN(args[0]))
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`Enter A Valid Speed`)
        ]
      });
    if (Number(args[0]) > 2 || Number(args[0]) <= 0)
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`Enter The Speed Limit between < 0.1 - 2.0 >`)
        ]
      });
player.filters.clearFilters();
  player.filters.setTimescale({
    
        "speed": Number(args[0]),
        "pitch": 1.0,
        "rate": 1.0
      
  })

 const embed = new EmbedBuilder()
.setColor(client.color)
 .setDescription(`Speed Set To **${args[0]}**`)
   // console.log(player.filters)
message.channel.send({embeds: [embed]})
  },
};