const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "remove",
  description: `Remove a song from the queue.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["nikal"],
  usage: "<song # in queue>",
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

    if (args[0] == 0) {
        const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`You can't remove a song which is currently playing!`)
      message.channel.send({embeds: [embed]});
   }
        if (args[0] > player.queue.length) {
            const thing = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`The song you're trying to remove is not in queue or not found by ${client.user.username}`)
                  message.channel.send({embeds: [thing]});
}
    player.queue.remove(args[0] - 1)
    return message.reply({
      embeds: [
                  new EmbedBuilder()
                  .setDescription("Removed track from the queue.")
                  .setColor(client.color)
    ]
    })
  
    // Code
  },
};