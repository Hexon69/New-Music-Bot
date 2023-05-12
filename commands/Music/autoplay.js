
const fetch = require("node-fetch");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "autoplay",
  description: `Toggle music autoplay.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
  aliases: ["ap"],
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
    let player = client.poru.players.get(message.guild.id)
    if (!player) {
      let thing = new EmbedBuilder()
        .setColor("Red")
        .setDescription("There is no music playing.");
      return message.channel.send({ embeds: [thing] });
    }
    let data = await client.db.get(`auto_${message.guild.id}`);
    if (!data) {
      client.db.set(`auto_${message.guild.id}`, `false`)
    }
    if (data === `false`) {
client.db.set(`auto_${message.guild.id}`, `true`)
      let thing = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`Autoplay mode is **enabled** in this server.`)
      return message.channel.send({ embeds: [thing] });
    } else {
client.db.set(`auto_${message.guild.id}`, `false`)
      let thing = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`Autoplay mode is **disabled** in this server.`)
      return message.channel.send({ embeds: [thing] });
    }
  }
}