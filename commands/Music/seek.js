const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "seek",
  description: `Seek the currently playing song.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["sk"],
  inVc: true,
  sameVc: true,
  player: true,
  usage: "10s",

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

    if (!player.currentTrack.info.isSeekable) {
      return message.reply({
        embeds: [
                  new EmbedBuilder()
                  .setDescription("The track is unseekable.")
                  .setColor(client.color)
    ]
      })
    }

    player.seekTo(args[0] * 1000)

    return message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription(`Seeked to ${args[0]}s.`)
                  .setColor(client.color)
    ]
    })
  },
};