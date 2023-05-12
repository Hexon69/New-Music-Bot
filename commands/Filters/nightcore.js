const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "nightcore",
  description: `Applies a Nightcore Filter`,
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
    
        "speed": 1.165,
        "pitch": 1.125,
        "rate": 1.05
      
  })

 const embed = new EmbedBuilder()
.setColor(client.color)
 .setDescription(`**Nightcore** mode is now enabled.`)
message.channel.send({embeds: [embed]})
  },
};