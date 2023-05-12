const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "china",
  description: `Applies a China Filter`,
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

      
  player.filters.setTimescale({
        "speed": 0.75,
        "pitch": 1.25,
        "rate": 1.15
  })

 const embed = new EmbedBuilder()
.setColor(client.color)
 .setDescription(`**China** mode is now enabled.`)
message.channel.send({embeds: [embed]})
  },
};