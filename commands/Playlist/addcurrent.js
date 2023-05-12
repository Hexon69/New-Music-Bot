const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist");
module.exports = {
  name: "addcurrent",
  description: `Add the current playing song to your saved playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
aliases: ["pl-addcurrent"],
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
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        const player = client.poru.players.get(message.guild.id);
        if (!player.isPlaying) {
            let thing = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("There is no music playing.");
            return message.reply({ embeds: [thing] });
        }
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        const song = player.currentTrack.info;
        let oldSong = data.songs;
        if (!Array.isArray(oldSong)) oldSong = [];
        oldSong.push({
            "title": song.title,
            "uri": song.uri,
            "author": song.author,
            "duration": song.length
        });
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $push: {
                    songs: {
                    title: song.title,
                    uri: song.uri,
                    author: song.author,
                    duration: song.length
                        }

                }
            });
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({
              name: `Added Song To Playlist ${Name}`, iconURL: message.author.displayAvatarURL({dynamic: true})
                       })
            .setDescription(`[${song.title.substring(0, 63)}](${song.uri})`)
        return message.channel.send({ embeds: [embed] })

  },
};