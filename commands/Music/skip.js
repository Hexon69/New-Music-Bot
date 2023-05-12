const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "skip",
  description: `Skip the song currently playing.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["s"],
  inVc: true,
  sameVc: true,
  player: true,
  
  

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
    
 player.stop()
    
message.reply({
  embeds: [
                  new EmbedBuilder()
                  .setDescription("Skips the song.")
                  .setColor(client.color)
    ]
})
  },
};