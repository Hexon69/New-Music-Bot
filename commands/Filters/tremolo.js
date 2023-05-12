const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "tremolo",
  description: `Applies a Tremolo Filter`,
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
    
            "speed": 1.0,
            "pitch": 1.0,
            "rate": 1.0
          
  })
    player.filters.setTremolo({
      
        "frequency": 4.0, // 0 < x
        "depth": 0.75 // 0 < x ≤ 1
      
    })

 const embed = new EmbedBuilder()
.setColor(client.color)
 .setDescription(`**Tremolo** mode is now enabled.`)
message.channel.send({embeds: [embed]})
  },
};