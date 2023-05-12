const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "join",
  description: "Summons the bot to your voice channel.",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 5,
  aliases: ["j"],
  inVc: true,
  sameVc: false,
  player: false,
  
  
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    let player = client.poru.players.get(message.guild.id)
    if (player) {
return message.reply({
   embeds: [
                  new EmbedBuilder()
                  .setDescription("**There is already a player for this guild!**")
                  .setColor(client.color)]
 })
}
    const player1 = await client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeaf: true,
      selfMute: false,
    })
    
    message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription(`**Successfully Joined Vc • ${message.member.voice.channel}**`)
                  .setColor(client.color)
   ] })
//interaction.guild.members.me.voice.channel
  }}