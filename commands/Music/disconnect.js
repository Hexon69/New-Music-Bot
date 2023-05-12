const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "disconnect",
  description: "Disconnect the client from the voice channel!",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 5,
  aliases: ["dc"],
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
    const player = client.poru.players.get(message.guild.id)
    if (!player) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("There is no player for the guild!")
            .setColor(client.color)]
      })
    }
    player.destroy()

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Disconnected!")
          .setColor(client.color)]
    })
  }
}