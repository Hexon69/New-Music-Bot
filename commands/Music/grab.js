const fetch = require("node-fetch");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require("discord.js");
const { convertTime } = require('../../util/convert.js');

const discord = require("discord.js")

module.exports = {
  name: "grab",
  description: `Grabs and sends you the song that is currently playing.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 0,
aliases: ["save"],
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
        const total = song.length;
        const current = player.position;
    const dmbut = new ButtonBuilder().setLabel("Check Your DMs").setStyle(ButtonStyle.Link).setURL(`https://discord.com/users/${client.id}`)
        const row = new ActionRowBuilder().addComponents(dmbut)

        let dm = new EmbedBuilder()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL()})
        .setDescription(`**Check Your DMs!**`)
        .setColor(client.color)
        .setFooter({text: `Requested By ${message.author.tag}`})
        .setTimestamp()
        message.reply({embeds: [dm], components: [row]})
        
        const urlbutt = new ButtonBuilder().setLabel("Search").setStyle(ButtonStyle.Link).setURL(`${player.currentTrack.info.uri}`)
        const row2 = new ActionRowBuilder().addComponents(urlbutt)
        let embed = new EmbedBuilder()
            .setDescription(`**Song Details**\n\n**__Song Name__**: [${player.currentTrack.info.title}](${player.currentTrack.info.uri}) \n**__Song Duration__**: \`[${convertTime(song.length)}]\` \n**__Song Played By__**: [${song.requester}] \n**__Song Saved By__**: [<@${message.author.id}>]`)
            .setThumbnail(song.image)
            .setColor(client.color)
            .addFields([
                { name: "\u200b", value: `\`${convertTime(current)} / ${convertTime(total)}\`` }
            ])
         return message.author.send({embeds: [embed], components: [row2]}).catch(() => null);
  },
};