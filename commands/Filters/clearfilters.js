const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "clearfilters",
  description: `Clears all filters`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Filters",
  cooldown: 10,
aliases: ["cf"],
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
    
            "speed": 1.0,
            "pitch": 1.0,
            "rate": 1.0
          
  })
 const embed = new EmbedBuilder()
.setColor(client.color)
   
 .setDescription(`**Cleared all the filters.**`)
    console.log(player.filters)
message.channel.send({embeds: [embed]})
  },
};