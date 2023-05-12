const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "ping",
  description: `Measures bot's latency to Discord API server for performance monitoring.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "ViewChannel"],
  category: "Utilities",
  cooldown: 0,
  aliases: ["latency"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    const ping = Date.now() - message.createdTimestamp;
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: `Message Ping - ${ping}ms\nWs Ping - ${client.ws.ping}ms`,

            iconURL: client.user.displayAvatarURL()
          })
          .setColor(client.color)
      ]
    })

  },
};
