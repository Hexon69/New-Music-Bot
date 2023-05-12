const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const { convertTime } = require('../../util/convert.js');
const { progressbar } = require('../../util/progressbar.js')

module.exports = {
  name: "nowplaying",
  description: `Show the current playing song.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Music",
  cooldown: 10,
aliases: ["np"],
  inVc: false,
  sameVc: false,
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
    if(!player){
let thing = new EmbedBuilder()
            .setColor("Red")
            .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
}
    if (!player.isPlaying) {
            let thing = new EmbedBuilder()
            .setColor("Red")
            .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
    }
    const song = player.currentTrack.info
        
        var total = song.length;
        var current = player.position;
        
        let embed = new EmbedBuilder()
            .setDescription(`**Now Playing**\n[${song.title}](${song.uri}) - \`[${convertTime(song.length)}]\`- [${song.requester}] \n\n\`${progressbar(player)}\``)
            .setThumbnail(song.image)
            .setColor(client.color)
            .addFields([
                {name: '\u200b', value: `\`${convertTime(current)} / ${convertTime(total)}\``},
            ])
            return message.channel.send({embeds: [embed]})


  },
};