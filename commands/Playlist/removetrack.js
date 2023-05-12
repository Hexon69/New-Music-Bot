const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist")
module.exports = {
  name: "removetrack",
  description: `Remove a track from your saved playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
aliases: ["pl-removetrack"],
usage: "<playlist name> <track number>",




  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    var color = client.color;

        const Name = args.join(" ").replace(/_/g, ' ');
    if(!Name){
      return message.reply({
embeds: [
                  new EmbedBuilder()
                  .setDescription("Provide me a name!")
                  .setColor(client.color)
    ]
    
                           })
    }
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setDescription(`You don't have a playlist called **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setDescription(`You don't have a playlist called **${Name}**.`)] });
        }
        const Options = args[1];
        if (!Options || isNaN(Options)) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setDescription(`You didn't enter a valid track number (ID of track to remove)\nTo see all your tracks: ${prefix}info ${Name}`)] });
        }
        let tracks = data.songs;
        if (Number(Options) >= data.songs.length || Number(Options) < 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setDescription(`Your provided track number is out of range (\`0\` - ${tracks.length - 1})\nTo see all your tracks: \`${prefix}info\` showdetails ${Name}`)] });

        }
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $pull: {
                    songs: data.songs[Options]
                }
            });
            const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`Removed **${tracks[Options].title}** from \`${Name}\``);
            return message.channel.send({embeds: [embed]});
    
  },
};