const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "clearqueue",
  description: "Removes all songs in the music queue.",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Misc",
  cooldown: 5,
  aliases: ["cq", "clear"],
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
    const memberChannel = message.member.voice.channel.id

    const player = client.poru.players.get(message.guild.id)

    
    let queueLength = player.queue.length
if (queueLength < 1) {
 return message.reply({
    embeds: [
                  new discord.EmbedBuilder()
                  .setDescription("**There is no song in the queue to be cleared!**")
                  .setColor(client.color)]
  })
}
    const e = new discord.EmbedBuilder()
    .setColor(client.color)
    .setAuthor({
      name: `Successfully cleared ${player.queue.length} song(s) from queue!`,
      iconURL: client.user.displayAvatarURL()
    })
    message.reply({embeds: [e]})
    player.queue.clear()

  }}