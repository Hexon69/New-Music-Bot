const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "rate",
  description: `Rates Up The Song`,
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
player.filters.clearFilters();
if (!args.length)
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`Enter The Rate Limit between < 0.1 - 2.0 >`)
        ]
      });
    if (isNaN(args[0]))
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`Enter A Valid Rate`)
        ]
      });
    if (Number(args[0]) > 2 || Number(args[0]) <= 0)
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.color)
     ]
      });
 player.filters.setTimescale({
   "speed": 1.0,
        "pitch": 1.0,
        "rate": Number(args[0]),
 })
 const embed = new EmbedBuilder()
.setColor(client.color)
 .setDescription(`Rate Set To **${args[0]}**`)
message.channel.send({embeds: [embed]})
  },
};