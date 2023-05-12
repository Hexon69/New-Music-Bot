const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pause",
  description: "Pauses the music currently playing",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 5,
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

    if(player.isPaused){
message.reply({
  embeds: [
                  new EmbedBuilder()
                  .setDescription("The player is aleady paused.")
                  .setColor(client.color)
    ]
})
    }
    
    if (!player.isPaused){
      
      player.pause(true)

    return message.reply({
                         embeds: [
                  new EmbedBuilder()
                  .setDescription("Paused")
                  .setColor(client.color)
    ]
    })
      }
  }}