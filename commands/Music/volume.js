const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "volume",
  description: `Change the volume of the bot.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["vol", "v"],
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
    // Code ad
    
    let player = await client.poru.players.get(message.guild.id)

    if(!args[0]){
        const embed = new EmbedBuilder()
      .setColor(client.color)
.setDescription(`The current volume is set to **${player.volume}%**`)
  message.channel.send({embeds: [embed]})
    } else {
      if(150 < args[0]){
          const embed = new EmbedBuilder()
      .setColor(client.color)
.setDescription(`Please use a number between \`0-150\``)
  message.channel.send({embeds: [embed]})
      } else {
      
    player.setVolume(args[0] / 100)
      
      const embed = new EmbedBuilder()
      .setColor(client.color)
.setDescription(`The volume has been changed to **${args[0]}%**`)
  message.channel.send({embeds: [embed]})
          }
    }
  },
};