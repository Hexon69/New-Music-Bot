const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "loop",
  description: "Toggles loop mode.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Music",
  cooldown: 5,
  aliases: ["l", "repeat"],
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

    
  if (player.loop === "NONE") {
        const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`<@${message.author.id}> has looped the current track`)
      player.setLoop("TRACK");
      message.channel.send({embeds: [embed]})
    } else if (player.loop === "TRACK") {
        const thing = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`<@${message.author.id}> has looped the whole queue`)
        player.setLoop("QUEUE");
      message.channel.send({embeds: [thing]})
    } else if (player.loop === "QUEUE") {
       const sht = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`<@${message.author.id}> has disabled the loop`)
        player.setLoop("NONE");
      message.channel.send({embeds: [sht]})
  }
  }}