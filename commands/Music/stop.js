const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "stop",
  description: `Stops the current music playback and clears the queue.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 0,
  aliases: ["stop"],
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
    player.queue.clear();
    message.reply({
    embeds: [
                  new EmbedBuilder()
                  .setDescription("Stopped the player.")
                  .setColor(client.color)
    ]})
  },
};
