const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist")
module.exports = {
  name: "addqueue",
  description: `Save the current queue to your playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
aliases: ["pl-addqueue"],
  usage: "<playlist name>",
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
const Name = args.join(" ");
 
if(!Name){
      return message.reply({
        embeds: [
                  new EmbedBuilder()
                  .setDescription("You didn't provide name of playlist.")
                  .setColor(client.color)
    ]
      })
}
        const player = client.poru.players.get(message.guild.id);
        if (!player.isPlaying) {
            let thing = new EmbedBuilder()
                .setColor("#ff0000")
                .setDescription("There is no music playing.");
            return message.reply({ embeds: [thing] });
        }
    if (!player.queue) {
            let thing = new EmbedBuilder()
                .setColor("#ff0000")
                .setDescription("There is no music in the queue.");
            return message.reply({ embeds: [thing] });
    }
        const data = await db.find({ UserId: message.author.id, PlaylistName: Name })
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        const song = player.currentTrack.info;
        const tracks = player.queue;

        let oldSong = data.songs;
        if (!Array.isArray(oldSong)) oldSong = [];
        const newSong = [];
        if (player.currentTrack) {
            newSong.push({
                "title": song.title,
                "uri": song.uri,
                "author": song.author,
                "duration": song.length
            });
        }
        for (const track of tracks)
            newSong.push({
                "title": track.info.title,
                "uri": track.info.uri,
                "author": track.info.author,
                "duration": track.info.length
            });
        const playlist = oldSong.concat(newSong);
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name,
        },
            {
                $set: {
                    songs: playlist
                }

            });
        const embed = new EmbedBuilder()
            .setAuthor({
              name: `Added Queue To Playlist ${Name}`, iconURL: message.author.displayAvatarURL({dynamic: true})
                       })
            .setDescription(`**Total Tracks Added: ${playlist.length - oldSong.length}**`)
            .setColor(client.color)
        return message.channel.send({ embeds: [embed] })

  },
};