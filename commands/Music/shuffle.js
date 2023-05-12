const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "shuffle",
  description: `Shuffles the queue`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["shu"],
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
    
    if(player.queue.length < 2){
return message.reply({
  embeds: [
                  new EmbedBuilder()
                  .setDescription("Not enough songs in queue atleast add 2 songs in queue.")
                  .setColor(client.color)
    ]
})
}
 
    return message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription("Shuffled the queue.")
                  .setColor(client.color)
    ]
    })
  },
};