const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "uptime",
  description: `Uptime of mine`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Utilities",
  cooldown: 0,
aliases: ["upt"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
const duration1 = moment
      .duration(message.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
    const e = new EmbedBuilder()
    .setAuthor({
      name: `Uptime: ${duration1}`,
      iconURL: message.author.displayAvatarURL()
    })
    .setColor(client.color) 
    message.reply({
      embeds: [e]
    })
  },
};