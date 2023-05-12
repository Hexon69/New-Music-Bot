const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "resume",
  description: `Resume playing music.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["r"],
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
    // Co

    let player = client.poru.players.get(message.guild.id)

    if (!player.isPaused) {
     return message.reply(
       {
         embeds: [
                  new EmbedBuilder()
                  .setDescription("Song is not paused.")
                  .setColor(client.color)
    ]
       }
     )
    }

    if (player.isPaused) {
      player.pause(false)
      return message.reply({
        embeds: [
                  new EmbedBuilder()
                  .setDescription("Resumed.")
                  .setColor(client.color)
    ]
      })
    }
  },
};