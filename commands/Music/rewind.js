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
 let l = args[0];
    if (isNaN(l)) {
      return message.reply({embeds: [
                  new EmbedBuilder()
                  .setDescription("Please provide a valid number.")
                  .setColor(client.color)
    ]
                           })
    }
  /*  if (!player.currentTrack.info.isSeekable) {
      return message.reply({
        embeds: [
                  new EmbedBuilder()
                  .setDescription("The track is unrewindable.")
                  .setColor(client.color)
    ]
      })
    }*/

    player.seekTo(player.position - l * 1000)

    return message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription(`Rewinded to ${args[0]}s.`)
                  .setColor(client.color)
    ]
    })
  },
};